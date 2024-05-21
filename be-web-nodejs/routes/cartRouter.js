const express = require("express");
const bodyParser = require("body-parser");
const Cart = require("../models/cart");
const cors = require("./cors");

var authenticate = require("../authenticate");

const cartRouter = express.Router();
cartRouter.use(bodyParser.json());

cartRouter.get("/", cors.cors, authenticate.verifyUser, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).send({ error: "User not authenticated" });
    }

    const cartItems = await Cart.find({ userId: user._id }).populate(
      "products"
    );

    res.send(cartItems);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});

cartRouter.post("/", cors.cors, async (req, res) => {
  try {
    const { products, userId, totalPrice, status } = req.body;

    const cartItem = new Cart({
      userId: userId,
      products,
      totalPrice,
      status,
    });
    await cartItem.save();
    res.status(201).send(cartItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a product by ID
cartRouter.put("/:id", cors.cors, async (req, res) => {
  try {
    const product = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).send("Product not found");
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a product by ID
cartRouter.delete("/:id", cors.cors, async (req, res) => {
  try {
    const product = await Cart.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.send("delete success fully");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = cartRouter;
