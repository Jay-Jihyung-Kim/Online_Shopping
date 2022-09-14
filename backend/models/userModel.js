const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstName: { type: String, maxlength: 20, required: true },
  lastName: { type: String, maxlength: 20, required: true },
  email: { type: String, required: true, maxlength: 20, unique: true },
  password: { type: String, minlength: 5, maxlength: 150, required: true },
  cart: { type: Array },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().max(20).required(),
    lastName: Joi.string().max(20).required(),
    email: Joi.string().email().min(5).max(20).required(),
    password: Joi.string().min(5).max(150).required(),
  });
  return schema.validate({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  });
}

module.exports.User = User;
module.exports.validateUser = validateUser;
