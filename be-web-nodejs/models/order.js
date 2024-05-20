const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Refers to the User model
    required: true,
  },
  products: [productSchema], // Array of products
  totalQuantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "CreditCard"],
  },
  status: {
    type: String,
    enum: ["paid", "pending", "failed"],
    default: "pending",
  },
  oderId: {
    type: String,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
