import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../../Network/axiosinstance";
import StarRating from '../../ui/rates';
import Alert from '../../alert';

const RateProject = ({ 
  projectId, 
  onRatingSubmitted, 
  isAuthenticated, 
  onRequireLogin 
}) => {
  const [userRating, setUserRating] = useState(0);
  const [reviewNote, setReviewNote] = useState('');
  const [hasRated, setHasRated] = useState(null); // null = loading, true/false = state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loginAlert, setLoginAlert] = useState(null);
  const user_id = isAuthenticated ? parseInt(localStorage.getItem("user_id")) : null;

  useEffect(() => {
    let isMounted = true;

    const checkUserRating = async () => {
      if (!isAuthenticated) {
        setHasRated(false);
        return;
      }

      try {
        const response = await axiosInstance.get(
          `interactions/API/projects/rating/${projectId}/`
        );

        if (isMounted) {
          const userRatingExists = response.data.some(rating => rating.user === user_id);
          setHasRated(userRatingExists);
        }
      } catch (err) {
        console.error('Error checking user rating:', err);
        if (isMounted) setHasRated(false);
      }
    };

    checkUserRating();

    return () => {
      isMounted = false;
    };
  }, [projectId, user_id, isAuthenticated]);

  const handleRatingSubmit = async () => {
    if (!isAuthenticated) {
      onRequireLogin();
      setLoginAlert({
        message: 'Please login to rate this project',
        type: 'warning'
      });
      return;
    }

    if (userRating === 0) {
      setError('Please select a rating');
      return;
    }

    setLoading(true);
    setError('');
    setLoginAlert(null);

    try {
      const response = await axiosInstance.post(
        `interactions/API/projects/${projectId}/rate/`,
        {
          rate_value: userRating,
          note: reviewNote || null
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

  // Loading state - show nothing or a loader
  if (hasRated === null) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 mb-8">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-10 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  // Already rated state
  if (hasRated && !success) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 mb-8">
        <h3 className="text-xl font-bold text-white text-center mb-2">Rate This Project</h3>
        <p className="text-gray-400 text-center text-sm">You have already rated this project.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 text-left rounded-xl p-6 border border-gray-700 mb-8">
      <h3 className="text-xl text-center font-bold text-white mb-4">
        {isAuthenticated ? 'Rate This Project' : 'Login to Rate'}
      </h3>

      {loginAlert && (
        <div className="mb-4">
          <Alert 
            message={loginAlert.message} 
            type={loginAlert.type} 
            onClose={() => setLoginAlert(null)} 
          />
        </div>
      )}

      <div className="mb-4">
        <p className="text-gray-300 mb-2 text-sm">Your Rating</p>
        <StarRating
          initialRating={userRating}
          onChange={(rating) => {
            if (isAuthenticated) {
              setUserRating(rating);
              setError('');
            }
          }}
          starColor={isAuthenticated ? "text-yellow-500" : "text-gray-600"}
          disabled={!isAuthenticated}
        />
        {!isAuthenticated && (
          <p className="text-gray-500 text-xs mt-1">Login to enable rating</p>
        )}
      </div>

      <div className="mb-4">
        <p className="text-gray-300 mb-2 text-sm">Add a Note (Optional)</p>
        <textarea
          value={reviewNote}
          onChange={(e) => isAuthenticated && setReviewNote(e.target.value)}
          placeholder={
            isAuthenticated 
              ? "Share your thoughts about this project..." 
              : "Please login to add a review note"
          }
          className={`w-full p-3 text-white rounded-lg resize-none focus:outline-none placeholder-gray-500 text-sm ${
            isAuthenticated
              ? 'bg-gray-700/70 focus:ring-2 focus:ring-purple-500'
              : 'bg-gray-800/50 cursor-not-allowed'
          }`}
          rows="3"
          disabled={!isAuthenticated}
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-3">{error}</p>
      )}

      {success && (
        <p className="text-green-400 text-sm mb-3">Rating submitted successfully!</p>
      )}

      <div className='flex justify-end'>
        <button
          onClick={handleRatingSubmit}
          disabled={loading || userRating === 0 || !isAuthenticated}
          className={`px-6 py-2 rounded-lg text-right font-medium transition-all duration-200 text-sm ${
            !isAuthenticated
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : loading || userRating === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {!isAuthenticated 
            ? 'Login to Rate' 
            : loading 
              ? 'Submitting...' 
              : 'Submit Rating'
          }
        </button>
      </div>
    </div>
  );
};

export default RateProject;