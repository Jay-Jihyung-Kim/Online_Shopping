const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  URL: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: String },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports.Cart = Cart;
