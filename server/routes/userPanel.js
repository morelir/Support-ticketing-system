const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");
const { authToken } = require("../auth/authToken");
const { ImageModel } = require("../models/imageModal");
const { TicketModel, validNewTicket } = require("../models/ticketModel");
const { organizeTickets } = require("../utils/functions");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const filePath = file.originalname;
    cb(null, filePath);
  },
});

const upload = multer({ storage });
router.post(
  "/NewTicket",
  authToken,
  upload.single("file"),
  async (req, res) => {
    let validBody = validNewTicket(req.query);
    console.log("pass valid");
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      let ticket = new TicketModel(req.query);
      await ticket.save();
      let tickets = await TicketModel.find({
        clientID: req.query.clientID,
      }).lean();
      let [data, low, medium, high] = organizeTickets(tickets);
      res.json({ tickets: data, low: low, medium: medium, high: high });
    } catch (err) {
      res.status(401).json({ msg: "Error" });
    }
  }
);

router.get("/tickets", authToken, async (req, res) => {
  try {
    let tickets = await TicketModel.find({
      clientID: req.tokenData._id,
    }).lean();
    let [data, low, medium, high] = organizeTickets(tickets);
    res.json({ tickets: data, low: low, medium: medium, high: high });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/UpdateTicket", authToken, async (req, res) => {
  try {
    let ticket = await TicketModel.findOne({ _id: req.body.id });
    req.body.updates.map((update, pos) => {
      ticket[update] = req.body.values[pos];
    });
    await ticket.save();
    console.log(ticket);
    res.json({ ticket: ticket });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
