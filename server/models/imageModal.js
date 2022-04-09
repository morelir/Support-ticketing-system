const mongoose = require("mongoose");
const Joi = require("joi");

const imageSchema = new mongoose.Schema({
  ticketID: String,
  filePath: String,
});

exports.ImageModel = mongoose.model("images", imageSchema);
