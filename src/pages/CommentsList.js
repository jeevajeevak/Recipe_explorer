import React from 'react';

export const CommentsList = ({ comments }) => {
  if (comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <div key={comment._id} className="comment-item">
          <div className="comment-header">
            <strong>{comment.name}</strong> 
            <span className="rating">⭐ {comment.rating}</span>
          </div>
          <p>{comment.description}</p>
        </div>
      ))}
    </div>
  );
};
