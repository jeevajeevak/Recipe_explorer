// routes/Comments.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment'); // Your Comment model

// POST a new comment
router.post('/', async (req, res) => {
  console.log('POST /api/comments called with body:', req.body);
  const { name, email, rating, description, recipeId } = req.body;

  // Validate required fields
  if (!name || !email || !rating || !description || !recipeId) {
    console.log('Validation failed: Missing fields');
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newComment = new Comment({
      name,
      email,
      rating,
      description,
      recipeId
    });
    const savedComment = await newComment.save();
    console.log('Comment saved:', savedComment);
    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error saving comment:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// GET comments for a specific recipe by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`GET /api/comments/${id} called`);

  try {
    const comments = await Comment.find({ recipeId: id });
    console.log(`Found ${comments.length} comments for recipe ID ${id}`);
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to load comments' });
  }
});

module.exports = router;
