import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeCard.css';

export const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Ensure the recipe has a valid _id
    if (recipe._id && typeof recipe._id === 'string' && recipe._id.trim() !== '') {
      navigate(`/recipe/${recipe._id}`);
    } else {
      console.error('Invalid or missing recipe ID');
    }
  };

  return (
    <div className="recipe-card">
      <div className="image-container">
        <img
          src={recipe.image}
          alt={`Image of ${recipe.title}`}
          className="recipe-image"
        />
        <span className="recipe-rating">{recipe.rating}</span>
      </div>
      <div className="rec-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-description">{recipe.description}</p>
        <button className="recipe-button" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};
