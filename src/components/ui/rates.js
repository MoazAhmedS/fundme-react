import React, { useState } from 'react';

function StarRating({ rating = 0, totalRatings = 0, stars = 5, starColor = 'text-yellow-500' }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(stars)].map((_, index) => {
          const currentRating = index + 1;
          const isActive = currentRating <= Math.floor(rating);
          const isHalfStar = currentRating === Math.ceil(rating) && rating % 1 !== 0;

          return (
            <div key={index} className="relative">
              <svg
                className={`w-5 h-5 ${isActive ? starColor : 'text-gray-400'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.42c.969 0 1.371 1.24.588 1.81l-3.585 2.606a1 1 0 00-.363 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.585-2.606a1 1 0 00-1.175 0l-3.585 2.606c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.363-1.118L2.139 9.397c-.783-.57-.38-1.81.588-1.81h4.42a1 1 0 00.95-.69l1.286-3.97z" />
              </svg>
              
              {/* Half star overlay */}
              {isHalfStar && (
                <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                  <svg
                    className={`w-5 h-5 ${starColor}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.42c.969 0 1.371 1.24.588 1.81l-3.585 2.606a1 1 0 00-.363 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.585-2.606a1 1 0 00-1.175 0l-3.585 2.606c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.363-1.118L2.139 9.397c-.783-.57-.38-1.81.588-1.81h4.42a1 1 0 00.95-.69l1.286-3.97z" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <span className="text-white font-semibold">{rating}</span>
      <span className="text-gray-400">({totalRatings} ratings)</span>
    </div>
  );
}

export default StarRating;