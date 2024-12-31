import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { RecipeCard } from '../components/RecipeCard/RecipeCard';
import './Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [dailyRecipe, setDailyRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recipes');

        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched Recipes:', data); // Debugging log
        setRecipes(data);

        // Set daily recipe randomly
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          console.log('Daily Recipe:', data[randomIndex]);
          setDailyRecipe(data[randomIndex]);
        } else {
          setDailyRecipe(null); // No recipes to display
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError(error.message);
      }
    };

    fetchRecipes();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (recipes.length === 0) {
    return <p>Loading recipes...</p>;
  }

  return (
    <div>
      <Navbar />
      <Hero recipe={dailyRecipe || { title: 'No Recipe Today', description: 'Check back tomorrow!' }} />
      <section>
        <h2>Popular Recipes</h2>
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;