// InteractiveStarRating.jsx
import React, { useState } from 'react';

function InteractiveStarRating({ onRatingChange, stars = 5, starColor = 'text-yellow-500' }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (currentRating) => {
    setRating(currentRating);
    onRatingChange(currentRating);
  };

  return (
    <div className="flex">
      {[...Array(stars)].map((_, index) => {
        const currentRating = index + 1;

        return (
          <svg
            key={index}
            className={`w-8 h-8 cursor-pointer transition-colors ${
              currentRating <= (hover || rating) ? starColor : 'text-gray-400'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleClick(currentRating)}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.42c.969 0 1.371 1.24.588 1.81l-3.585 2.606a1 1 0 00-.363 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.585-2.606a1 1 0 00-1.175 0l-3.585 2.606c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.363-1.118L2.139 9.397c-.783-.57-.38-1.81.588-1.81h4.42a1 1 0 00.95-.69l1.286-3.97z" />
          </svg>
        );
      })}
    </div>
  );
}

export default InteractiveStarRating;