const mongoose = require("mongoose");
const Joi = require("joi");

const ticketSchema = new mongoose.Schema({
  number: String,
  clientID: String,
  status: String,
  title: String,
  description: String,
  urgencyLevel: String,
  filePath:String,
  open_date: {
    type: Date,
    default: Date.now,
  },
  close_date: {
    type: Date,
    default: null,
  },
});

exports.TicketModel = mongoose.model("tickets", ticketSchema);

exports.validNewTicket = (_bodyData) => {
  let joiSchema = Joi.object({
    number: Joi.string().min(2).max(99).required(),
    status: Joi.string().valid("Open").required(),
    clientID: Joi.string().min(2).max(99).required(),
    title: Joi.string().min(2).max(1000).required(),
    description: Joi.string().min(2).max(1000).required(),
    filePath: Joi.string().min(2).max(1000).required(),
    urgencyLevel: Joi.string().valid("Low", "Medium", "High").required(),
  });
  return joiSchema.validate(_bodyData);
};
