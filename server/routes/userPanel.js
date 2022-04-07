const express = require("express");
const router = express.Router();
const { authToken } = require("../auth/authToken");
const { TicketModel, validNewTicket } = require("../models/ticketModel");

router.post("/NewTicket", authToken, async (req, res) => {
  console.log(req.body);
  console.log(req.body.file);
  let validBody = validNewTicket(req.body);
  if (validBody.error) {
    console.log("error")
    return res.status(400).json(validBody.error.details);
  }
  try {
    let ticket = new TicketModel(req.body);
    await ticket.save(); //שומר את המידע ב db
    let tickets = await TicketModel.find({
      clientID: req.body.clientID,
    }).lean();
    res.json(tickets);
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Error" });
  }
});

const generateTicketNumber = async () => {
  let data = await TicketModel.findOne({}, "-_id number").sort("-open_date");
  if (data) {
    return data.number + 1;
  } else {
    return data;
  }
};

module.exports = router;
