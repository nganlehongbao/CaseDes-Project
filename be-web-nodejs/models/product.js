const mongoose = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  phoneModel: {
    type: String,
    required: true,
  },
  price: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"], // Add more currencies as needed
      default: "USD",
    },
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  like: {
    type: Number,
    default: 0,
  },
  feedback: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feedback", // Refers to the feedback
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  material: String,
  bought: {
    type: Number,
    default: 0,
  },
  inventory: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [0, 1, 2], // 0 is available ,1 is out_of , 2 is discontinued.
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
