const mongoose = require("mongoose");

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
  feedbacks: [
    {
      feedBackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FeedBack",
        required: true,
      },
    },
  ],
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
    enum: ["available", "soldOut"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
