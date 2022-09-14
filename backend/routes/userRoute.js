const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/userModel");

router.get("/", async (req, res) => {
  const user = await User.find().sort("name");
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("The user does not exist");

  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let newUser = await User.findOne({ email: req.body.email });
  if (newUser) return res.status(409).send("User already Registered");

  newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  await newUser.save();

  const token = newUser.generateAuthToken();
  res.header("x-auth-token", token).send(newUser);
});

router.put("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return;

  if (!user.owned.includes(req.body.owned)) {
    user.owned.push(req.body.owned);
  }

  if (req.body.pokemon) {
    user.pokemon = req.body.pokemon;
  }

  const result = await user.save();
  res.send(result);
});

module.exports = router;
