const express = require("express");
const bodyParser = require("body-parser");
const Product = require("../models/product");
const {
  searchAndFilterProducts,
} = require("../repository/searchAndFilterProducts");
const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("feedbacks");
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Get a single product by ID
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Update a product by ID
productRouter.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).send("Product not found");
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Delete a product by ID
productRouter.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});
//Filter product
productRouter.post("/filter", async (req, res) => {
  try {
    const filters = req.body;
    const products = await searchAndFilterProducts(filters);
    res.json(products);
  } catch (error) {
    console.error("Error searching and filtering products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = productRouter;
