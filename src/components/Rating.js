import './Rating.css';

export const Rating = ({ rating, onRate }) => (
  <div className="rating">
    {[...Array(5)].map((_, index) => (
      <span
        key={index}
        onClick={() => onRate(index + 1)}
        className={`star ${index < rating ? 'star-filled' : ''}`}
      >★</span>
    ))}
  </div>
);
