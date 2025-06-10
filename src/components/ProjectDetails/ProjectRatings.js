import React from 'react';

const ProjectRatings = ({ reviews }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.42c.969 0 1.371 1.24.588 1.81l-3.585 2.606a1 1 0 00-.363 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.585-2.606a1 1 0 00-1.175 0l-3.585 2.606c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.363-1.118L2.139 9.397c-.783-.57-.38-1.81.588-1.81h4.42a1 1 0 00.95-.69l1.286-3.97z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8 shadow-lg">
      <h3 className="text-white text-xl font-semibold mb-6">
        Project Ratings ({reviews.length})
      </h3>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="flex items-start space-x-4 p-4 bg-gray-700/50 rounded-lg">
            <img
              src={review.avatar}
              alt={review.user}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-white font-medium">{review.user}</span>
                  {renderStars(review.rating)}
                </div>
                <span className="text-gray-400 text-sm">{review.timestamp}</span>
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectRatings;