const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Refers to the User model
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Refers to the Product model
    required: true,
  },
  quantity: {
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
    type: Number,
    enum: [PAYMENT_METHOD.CASH, PAYMENT_METHOD.CARD, PAYMENT_METHOD.ONLINE],
    required: true,
  },
  status: {
    type: Number,
    enum: [STATUS.UNPAID, STATUS.PAID],
    default: STATUS.UNPAID,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, STATUS, PAYMENT_METHOD };
