import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RateProject = ({ projectId, userId = 3, onRatingSubmitted }) => {
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewNote, setReviewNote] = useState('');
  const [hasRated, setHasRated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    checkUserRating();
  }, [projectId]);

  const checkUserRating = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/interactions/API/projects/rating/${projectId}/`,
        {
          headers: {
            Authorization: `Token 98ab31bfe9196f9c17b5cc2c5c593585dec5401d`,
          }
        }
      );
      
      const userRatingExists = response.data.some(rating => rating.user === userId);
      setHasRated(userRatingExists);
    } catch (err) {
      console.error('Error checking user rating:', err);
    }
  };

  const handleRatingSubmit = async () => {
    if (userRating === 0) {
      setError('Please select a rating');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/interactions/API/projects/${projectId}/rate/`,
        {
          rate_value: userRating,
          note: reviewNote || null
        },
        {
          headers: {
            Authorization: `Token 98ab31bfe9196f9c17b5cc2c5c593585dec5401d`,
          }
        }
      );

      if (response.status === 201 || response.status === 200) {
        setSuccess(true);
        setHasRated(true);
        
        if (onRatingSubmitted) {
          onRatingSubmitted();
        }
        
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Error submitting rating:', err);
      setError(err.response?.data?.detail || 'Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  // If user has already rated
  if (hasRated && !success) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 mb-8">
        <h3 className="text-xl font-bold text-white text-center mb-2">Rate This Project</h3>
        <p className="text-gray-400 text-center text-sm">You have already rated this project.</p>
      </div>
    );
  }

  // Show rating form
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
      <h3 className="text-xl font-bold text-white mb-4">Rate This Project</h3>
      
      <div className="mb-4">
        <p className="text-gray-300 mb-2 text-sm">Your Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setUserRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none transition-colors p-1"
            >
              <svg
                className={`w-6 h-6 ${
                  star <= (hoveredRating || userRating)
                    ? 'text-white fill-white'
                    : 'text-gray-500'
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                {star <= (hoveredRating || userRating) ? (
                  // Filled star
                  <path 
                    fill="currentColor"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                ) : (
                  // Outline star
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                )}
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-300 mb-2 text-sm">Add a Note (Optional)</p>
        <textarea
          value={reviewNote}
          onChange={(e) => setReviewNote(e.target.value)}
          placeholder="Share your thoughts about this project..."
          className="w-full p-3 bg-gray-700/70 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-sm"
          rows="3"
          style={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-3">{error}</p>
      )}

      {success && (
        <p className="text-green-400 text-sm mb-3">Rating submitted successfully!</p>
      )}

      <button
        onClick={handleRatingSubmit}
        disabled={loading || userRating === 0}
        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
          loading || userRating === 0
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        {loading ? 'Submitting...' : 'Submit Rating'}
      </button>
    </div>
  );
};

export default RateProject;