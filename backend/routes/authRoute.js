const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/userModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.find().sort("email");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Unrecognized Email or Password");

  const token = user.generateAuthToken();

  res.send({ token: token, user_id: user._id, cart: user.cart });
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().email().max(20).required(),
    password: Joi.string().min(5).max(50).required(),
  });

  return schema.validate({
    email: user.email,
    password: user.password,
  });
}

module.exports = router;
