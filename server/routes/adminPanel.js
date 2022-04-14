const express = require("express");
const router = express.Router();
const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");
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
    let users = await UserModel.find({ role: "regular" });
    res.json({ users: users });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
