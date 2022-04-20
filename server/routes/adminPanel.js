const express = require("express");
const router = express.Router();
const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");
const bcrypt = require("bcrypt");
const { authToken } = require("../auth/authToken");
const { UserModel, validUser } = require("../models/userModel");
const { TicketModel } = require("../models/ticketModel");
const { organizeTickets } = require("../utils/functions.js");

router.get("/clientTickets", authToken, async (req, res) => {
  try {
    let tickets = await TicketModel.find({
      clientID: req.query.id,
    }).lean();
    let [data, low, medium, high] = await organizeTickets(tickets);
    res.json({ tickets: data, low: low, medium: medium, high: high });
  } catch (err) {
    console.log(err);
  }
});

router.get("/users", authToken, async (req, res) => {
  try {
    let users = await UserModel.find({ role: "regular" }).lean();
    users = await Promise.all(
      users.map(async (user) => {
        let [generalTickets, openTickets] = await Promise.all([
          TicketModel.count({ clientID: user._id }).lean(),
          TicketModel.count({
            clientID: user._id,
            status: "Open",
          }).lean(),
        ]);
        return {
          ...user,
          generalTickets: generalTickets,
          openTickets: openTickets,
        };
      })
    );
    console.log(users);
    res.json({ users: users });
  } catch (err) {
    console.log(err);
  }
});


router.post("/newClient", authToken, async (req, res) => {
  let validBody = validUser(req.body);
  if (validBody.error) {
    return res.status(400).json({ msg: "The user is not valid" });
  }
  try {
    let user = new UserModel(req.body);
    console.log(user);
    user.pass = await bcrypt.hash(user.pass, 10);
    await user.save(); //שומר את המידע ב db
    let users = await UserModel.find({ role: "regular" });
    res.json({ users: users });
  } catch (err) {
    res.status(401).json({
      msg: "Email or Password already in system or there another problem",
    });
  }
});

module.exports = router;
