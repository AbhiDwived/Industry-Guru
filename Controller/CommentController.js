const Comment = require("../models/Comment");

const getCommentsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await Comment.find({ productId }).populate("userId");
    res.json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

const createComment = async (req, res) => {
  try {
    const { productId, userId, text, imageUrl, Rating } = req.body; // Updated to include starRating
    const comment = new Comment({
      productId,
      userId,
      text,
      imageUrl,
      Rating, // Include starRating in the new comment
    });
    await comment.save();
    res.json(comment);
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ error: "Failed to save comment" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text, imageUrl, Rating } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { text, imageUrl, Rating },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await Comment.findByIdAndUpdate(commentId, { $inc: { likes: 1 } });
    res.json({ message: "Comment liked successfully" });
  } catch (error) {
    console.error("Error liking comment:", error);
    res.status(500).json({ error: "Failed to like comment" });
  }
};

const dislikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await Comment.findByIdAndUpdate(commentId, { $inc: { dislikes: 1 } });
    res.json({ message: "Comment disliked successfully" });
  } catch (error) {
    console.error("Error disliking comment:", error);
    res.status(500).json({ error: "Failed to dislike comment" });
  }
};

// Exporting the functions as an array
module.exports = [
  getCommentsByProductId,
  createComment,
  updateComment,
  deleteComment,
  likeComment,
  dislikeComment,
];
