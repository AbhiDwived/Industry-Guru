const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imageUrl: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  Rating: { type: Number, min: 1, max: 5 }, // Assuming star rating can range from 1 to 5
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
