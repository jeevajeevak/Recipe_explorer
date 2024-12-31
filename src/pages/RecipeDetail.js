import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { CommentsSubmit } from './CommentsSubmit';
import { CommentsList } from './CommentsList';
import 'boxicons/css/boxicons.min.css';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(null);

  // Fetch comments
  const fetchComments = useCallback(async () => {
    const url = `http://localhost:5000/api/comments/${id}`;
    try {
      setCommentsLoading(true);
      console.log('Fetching comments from:', url);

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error fetching comments: ${response.statusText}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Fetched Comments:', data);
        setComments(data);
      } else {
        throw new Error('Response is not JSON');
      }
    } catch (err) {
      console.error('Comments Fetch Error:', err.message);
      setError('Failed to load comments');
    } finally {
      setCommentsLoading(false);
    }
  }, [id]);

  // Fetch recipe details
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const recipeUrl = `http://localhost:5000/api/recipes/${id}`;
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching recipe details from:', recipeUrl);

        const response = await fetch(recipeUrl);
        
        if (!response.ok) {
          throw new Error(`Recipe not found: ${response.statusText}`);
        }

        // Check if response is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Fetched Recipe Data:', data);

          if (!data.ingredients || !data.directions) {
            throw new Error('Incomplete recipe data');
          }

          setRecipe(data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error Fetching Recipe:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
    fetchComments();
  }, [id, fetchComments]);

  const handleStepClick = (index) => {
    setActiveStep(index === activeStep ? null : index);
  };

  const fallbackImage = 'https://via.placeholder.com/600x400.png?text=No+Image+Available';

  if (loading) {
    return <p>Loading recipe details...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="recipe-detail">
      <Navbar />
      <div className="recipe-image-container">
        <img
          src={recipe?.image || fallbackImage}
          alt={recipe?.title || 'Recipe Image'}
          className="recipe-detail-image"
        />
        <div className="recipe-meta-overlay">
          <h2>{recipe?.title || 'Recipe Title'}</h2>
          <div className="recipe-meta">
            <span>🕒 {recipe?.duration || 'N/A'}</span>
            <span>👨‍🍳 {recipe?.chef || 'Unknown Chef'}</span>
            <span> 🥩{recipe?.type || 'Vegetarian'}</span>
            <span>⭐ {recipe?.rating || 'No Ratings'}</span>
          </div>
        </div>
      </div>
      <div className="recipe-content">
        <div className="ingredients">
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.item}: <strong>{ingredient.quantity}</strong></li>
              ))
            ) : (
              <li>No ingredients available</li>
            )}
          </ul>
        </div>
        <div className="directions">
          <h3>Steps:</h3>
          <ol>
            {recipe.directions.length > 0 ? (
              recipe.directions.map((direction, index) => (
                <li
                  key={index}
                  className={`step-container ${activeStep === index ? 'active' : ''}`}
                >
                  <button
                    className="step-button"
                    onClick={() => handleStepClick(index)}
                  >
                    <span>Step {index + 1}</span>
                    <i
                      className={`bx ${
                        activeStep === index
                          ? 'bx-chevron-down'
                          : 'bx-chevron-right'
                      }`}
                    ></i>
                  </button>
                  {activeStep === index && (
                    <p className="step-details">{direction}</p>
                  )}
                </li>
              ))
            ) : (
              <li>No directions available</li>
            )}
          </ol>
        </div>
      </div>

      <div className="comments-section">
      <div className="comments-submit">
        <CommentsSubmit recipeId={id} fetchComments={fetchComments} />
      </div>
        <div className="comments-list">
         {commentsLoading ? (
           <p>Loading comments...</p>
           ) : (
          <CommentsList comments={comments} />
       )}
      </div>
        </div>

    </div>
  );
};

export default RecipeDetail;
