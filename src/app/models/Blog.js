const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    authorId: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//plugins

module.exports = mongoose.model("blogs", BlogSchema);
