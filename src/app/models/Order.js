const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    products: [
      {
        _id: {
          type: mongoose.ObjectId,
          ref: "products",
        },
        title: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    statusOrder: {
      type: String,
      enum: ["processing", "shipping", "shipped", "success", "failed"],
      default: "processing",
    },
    payment: {
      type: String,
      enum: ["cash", "credit_card", "vnpay"],
      default: "cash",
    },
    orderNote: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
//plugins
module.exports = mongoose.model("orders", OrderSchema);
