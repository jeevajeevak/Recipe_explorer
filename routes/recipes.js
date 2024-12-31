const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');

// Fetch all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Retrieve recipes from database
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch recipes'});
  }
});

// Fetch recipe by ID

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received ID:', id); // Debugging line

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recipe ID format' });
    }

    const recipe = await Recipe.findById(id);

    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error fetching recipe by ID:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
