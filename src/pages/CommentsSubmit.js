import React, { useState } from 'react';
import './CommentsSubmit.css';

export const CommentsSubmit = ({ recipeId, fetchComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      name,
      email,
      rating,
      description,
      recipeId,
    };

    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const data = await response.json();
      console.log('Comment posted:', data);
      fetchComments(); // Fetch new comments after successful submission
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <form className="comments-submit-form" onSubmit={handleSubmit}>
      <h3>Submit Your Comment</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Submit Comment</button>
    </form>
  );
};
