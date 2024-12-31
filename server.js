// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipes');
const commentsRoutes = require('./routes/Comments');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Built-in middleware to parse JSON requests

// API Routes
app.use('/api/auth', authRoutes); 
app.use('/api/comments', commentsRoutes);  // Comments route
app.use('/api/recipes', recipeRoutes); // Recipes route

// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all route for React app
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
);

// Fallback for unmatched API routes (optional but recommended)
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
