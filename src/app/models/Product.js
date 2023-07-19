const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      enum: ["women", "men", "kid", "other"],
      default: "other",
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//plugins

module.exports = mongoose.model("products", ProductSchema);
