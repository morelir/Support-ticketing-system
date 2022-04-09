const express = require("express");
const router = express.Router();
const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");
const { authToken } = require("../auth/authToken");
const { ImageModel } = require("../models/imageModal");
const { TicketModel, validNewTicket } = require("../models/ticketModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const filePath = file.originalname;
    console.log(file);
    let image = new ImageModel({
      filePath: filePath,
    });
    image.save().then(() => {
      cb(null, filePath);
    });
    // ImageModel.create({ filePath}).then(() => {
    //   cb(null, filePath);
    // });
  },
});

const upload = multer({ storage });
//upload.single("file")
router.post("/AddFile", upload.single("file"), async (req, res) => {
  res.json();
});

router.get("/tickets", authToken, async (req, res) => {
  try {
    let tickets = await TicketModel.find({
      clientID: "624763d0eb906509bd283df7",
    }).lean();
    console.log(tickets)
    let data = await mergeTicketsWithImage(tickets);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

router.post("/NewTicket", authToken, async (req, res) => {
  console.log(req.body);
  let validBody = validNewTicket(req.body);
  if (validBody.error) {
    console.log("error");
    return res.status(400).json(validBody.error.details);
  }
  try {
    let ticket = new TicketModel(req.body);
    await ticket.save(); //שומר את המידע ב db
    let tickets = await TicketModel.find({
      clientID: req.body.clientID,
    }).lean();
    let data = mergeTicketsWithImage(tickets);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Error" });
  }
});

const mergeTicketsWithImage = async (tickets) => {
  try {
    let data = await Promise.all(
      tickets.map(async (ticket) => {
        let image = await ImageModel.findOne(
          { filePath: { $regex: ticket.number, $options: "i" } },
          "-_id filePath"
        ).lean();

        return {
          ...ticket,
          filePath: image.filePath,
        };
      })
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = router;
