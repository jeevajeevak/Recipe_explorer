// models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true }
}, {
  timestamps: true
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
