import React from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';

export const Hero = ({ recipe }) => {
  const navigate = useNavigate();

  const handleGetRecipe = () => {
    if (recipe && recipe._id) {
      navigate(`/recipe/${recipe._id}`); // Navigate to the RecipeDetail page with the recipe's ID
    } else {
      console.error('No valid recipe ID available');
    }
  };

  return (
    <section className="hero">
      <div className="content">
        <h2 className="recipe-title">Recipe of the Day</h2>
        {recipe ? (
          <>
            <h3>{recipe.title}</h3> {/* Use 'title' for the recipe name */}
            <p>{recipe.description}</p>
            <button className="hero-button" onClick={handleGetRecipe}>
              Get Recipe
            </button>
          </>
        ) : (
          <p>No recipe available for today.</p>
        )}
      </div>
      {recipe && (
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      )}
    </section>
  );
};
