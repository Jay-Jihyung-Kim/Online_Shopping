const express = require("express");
const router = express.Router();
const { Cart } = require("../models/cartModel");

router.get("/", async (req, res) => {
  const cart = await Cart.find();

  res.send(cart);
});

router.get("/:id", async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) return res.status(404).send("Cart is Empty!");

  res.send(cart);
});

router.post("/", async (req, res) => {
  let cart = new Cart({
    userId: req.body.userId,
    URL: req.body.URL,
    name: req.body.name,
    color: req.body.color,
    quantity: req.body.quantity,
    price: req.body.price,
    date: req.body.date,
  });

  const result = await cart.save();
  res.send(result);
});

router.put("/", async (req, res) => {
  let cart = await Cart.find({
    userId: req.body.userId,
    name: req.body.name,
  });

  if (!cart) return;

  if (req.body.quantity) cart.quantity = req.body.quantity;

  const result = await cart.save();
  res.send(result);
});

module.exports = router;
