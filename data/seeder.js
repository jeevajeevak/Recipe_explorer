const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('../models/Recipe');
const recipes = require('./recipes.json').recipes; // Access the nested array

dotenv.config();
const connectDB = require('../config/db');

const importData = async () => {
  try {
    await connectDB();

    // Log the data before insertion to check its contents
    console.log('Data to be imported:', recipes);

    // Clear existing recipes
    await Recipe.deleteMany();

    // Insert new recipes
    await Recipe.insertMany(recipes);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
