import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './pages/Home';
import { RecipeCard } from './components/RecipeCard/RecipeCard';
import RecipeDetail from './pages/RecipeDetail';
import './App.css'; // Add styles if needed

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error fetching recipes');
        }
        return res.json();
      })
      .then((data) => {
        setRecipes(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError('Failed to fetch recipes'); // Set error if fetching fails
        setLoading(false); // Set loading to false even on error
        console.error('Recipe Fetch Error:', err.message);
      });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        
        {/* Recipe Management Routes */}
        <Route
          path="/recipes"
          element={
            loading ? (
              <p>Loading recipes...</p> // Loading state
            ) : error ? (
              <p>{error}</p> // Display error if fetching fails
            ) : (
              <div className="recipe-list">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
              </div>
            )
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
