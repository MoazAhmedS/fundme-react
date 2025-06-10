import React from 'react';

const RateProject = ({ 
  handleRatingSubmit, 
  userRating, 
  setUserRating, 
  userHover,
  setUserHover,
  reviewNote, 
  setReviewNote, 
  renderInteractiveStars 
}) => {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8 shadow-lg">
      <h3 className="text-white text-xl font-semibold mb-6 text-left">Rate This Project</h3>
      
      <div className="mb-4 text-left">
        <label className="text-gray-300 text-sm mb-2 block text-left">Your Rating</label>
        <div className="flex justify-start">
          {renderInteractiveStars()}
        </div>
      </div>

      <div className="mb-6 text-left">
        <label className="text-gray-300 text-sm mb-2 block text-left">Add a Note (Optional)</label>
        <textarea
          value={reviewNote}
          onChange={(e) => setReviewNote(e.target.value)}
          placeholder="Share your thoughts about this project..."
          className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none text-left"
          rows="4"
        />
      </div>

      <div className="text-left">
        <button
          onClick={handleRatingSubmit}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RateProject;