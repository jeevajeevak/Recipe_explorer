const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  item: { type: String },
  quantity: { type: String }
});

const RecipeSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  duration: { type: String },
  rating: { type: Number },
  chef: { type: String },
  type: { type: String },
  image: { type: String },
  ingredients: [IngredientSchema],
  directions: [{ type: String }]
});

module.exports = mongoose.model('Recipe', RecipeSchema);
