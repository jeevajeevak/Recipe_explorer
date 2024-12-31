import React from 'react';
import { RecipeCard } from '../RecipeCard/RecipeCard';
import './RecipeCardList.css';

export const RecipeCardList = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return <p>No recipes available.</p>;
  }

  return (
    <div className="recipe-card-list">
      <button
        className="scroll-arrow left-arrow"
        onClick={() => scroll('left')}
        aria-label="Scroll left"
      >
        &lt;
      </button>
      <div className="scroll-container">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} /> //{/* Use _id as the key */}
        ))}
      </div>
      <button
        className="scroll-arrow right-arrow"
        onClick={() => scroll('right')}
        aria-label="Scroll right"
      >
        &gt;
      </button>
    </div>
  );
};

const scroll = (direction) => {
  const container = document.querySelector('.scroll-container');
  const scrollAmount = 300; // Adjust the scroll distance as needed
  container.scrollBy({
    left: direction === 'right' ? scrollAmount : -scrollAmount,
    behavior: 'smooth',
  });
};
