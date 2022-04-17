const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { UserModel, validUser } = require("../models/userModel");
const { authToken } = require("../auth/authToken");

router.get("/", (req, res) => {
  res.json({ msg: "express work " });
});




router.get("/userInfo", authToken, async (req, res) => {
  let user = await UserModel.findOne({ _id: req.tokenData._id }, { pass: 0 });
  console.log(user)
  res.json(user);
});

module.exports = router;
