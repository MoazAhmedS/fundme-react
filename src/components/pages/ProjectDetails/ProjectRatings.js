import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectRatings = ({ projectId, refreshTrigger }) => { // Add refreshTrigger prop
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchRatings();
  }, [projectId, refreshTrigger]); // Add refreshTrigger to dependencies

  const fetchRatings = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/interactions/API/projects/rating/${projectId}/`,
        {
          headers: {
            Authorization: `Token 98ab31bfe9196f9c17b5cc2c5c593585dec5401d`,
          }
        }
      );
      
      setRatings(response.data);
      
      // Calculate average rating
      if (response.data.length > 0) {
        const avg = response.data.reduce((sum, rating) => sum + rating.rate_value, 0) / response.data.length;
        setAverageRating(avg.toFixed(1));
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching ratings:', err);
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-500' : 'text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.42c.969 0 1.371 1.24.588 1.81l-3.585 2.606a1 1 0 00-.363 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.585-2.606a1 1 0 00-1.175 0l-3.585 2.606c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.363-1.118L2.139 9.397c-.783-.57-.38-1.81.588-1.81h4.42a1 1 0 00.95-.69l1.286-3.97z" />
          </svg>
        ))}
      </div>
    );
  };

  const getTimeAgo = (date) => {
    // This is a simple implementation - you might want to use a library like moment.js
    const now = new Date();
    const ratingDate = new Date(date);
    const diffTime = Math.abs(now - ratingDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Just now';
    } else if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return `${Math.floor(diffDays / 30)} months ago`;
    }
  };

  const getUserName = (userId) => {
    // Mock user names - replace with actual user data from your API
    const names = {
      1: 'You',
      2: 'Alice Johnson',
      3: 'Michael Chen',
      4: 'Emma Davis'
    };
    return names[userId] || `User ${userId}`;
  };

  const getUserAvatar = (userId) => {
    // Generate avatar background color based on user ID
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-indigo-500'
    ];
    return colors[userId % colors.length];
  };

  if (loading) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
        <p className="text-gray-400">Loading ratings...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
      <h3 className="text-xl font-bold text-white mb-6">
        Project Ratings ({ratings.length})
      </h3>

      {ratings.length === 0 ? (
        <p className="text-gray-400">No ratings yet. Be the first to rate this project!</p>
      ) : (
        <div className="space-y-6">
          {ratings.map((rating, index) => (
            <div key={rating.id} className={index !== 0 ? 'pt-6 border-t border-gray-700' : ''}>
              <div className="flex items-start gap-3">
                {/* User Avatar */}
                <div className={`w-10 h-10 ${getUserAvatar(rating.user)} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-sm font-semibold">
                    {getUserName(rating.user).charAt(0).toUpperCase()}
                  </span>
                </div>
                
                {/* Rating Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">{getUserName(rating.user)}</span>
                      {renderStars(rating.rate_value)}
                    </div>
                    <span className="text-gray-500 text-sm">{getTimeAgo(new Date())}</span>
                  </div>
                  
                  {/* Note/Comment */}
                  {rating.note && (
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {rating.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectRatings;