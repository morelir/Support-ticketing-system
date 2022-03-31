const mongoose = require("mongoose");
const Joi = require("joi");

let Activity = {
  date: { type: Date, default: Date.now },
  user: String,
  id: String,
  action: String,
  data: String,
};

const purchase_request_schema = new mongoose.Schema({
  number: Number,
  products: [],
  status: String,
  urgencyLevel: String,
  team: String,
  teamMemberID: Number,
  note:String,
  existPurchase:{
    type: Boolean,
    default: false,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  activity: [Activity],
});

exports.Purchase_Request_Model = mongoose.model("purchase_requests", purchase_request_schema);

exports.valid_purchase_request = (_bodyData) => {
  let joiSchema = Joi.object({
    number: Joi.number().min(1).max(99).required(),
    status: Joi.string().min(1).max(99).required(),
    clientID: Joi.number().min(9).max(9).required(),
    team: Joi.string().min(1).max(99).required(),
  });
  return joiSchema.validate(_bodyData);
};
