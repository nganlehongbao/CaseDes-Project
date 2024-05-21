const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Refers to the User model
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
  phoneNumber: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  oderId: {
    type: String,
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "CreditCard"],
  },
  status: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "pending",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
