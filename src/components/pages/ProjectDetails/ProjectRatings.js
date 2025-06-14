import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../../Network/axiosinstance";

const ProjectRatings = ({ projectId, refreshTrigger }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchRatings();
  }, [projectId, refreshTrigger]);

  const fetchRatings = async () => {
    try {
      const response = await axiosInstance.get(
        `interactions/API/projects/rating/${projectId}/`
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

  const getUserName = (user) => {
    if (!user) return 'Anonymous';
    return `${user.first_name} ${user.last_name}`;
  };

  const getUserInitials = (user) => {
    if (!user) return 'A';
    return `${user.first_name?.charAt(0) || ''}${user.last_name?.charAt(0) || ''}` || 'U';
  };

  const getUserAvatar = (user) => {
    if (user?.image) {
      return (
        <img 
          src={`http://localhost:8000${user.image}`} 
          alt={`${getUserName(user)}`}
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    }
    
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-indigo-500'
    ];
    const color = colors[(user?.id || 0) % colors.length];
    
    return (
      <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center flex-shrink-0`}>
        <span className="text-white text-sm font-semibold">
          {getUserInitials(user)}
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
        <p className="text-gray-400">Loading ratings...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 text-left rounded-xl p-6 border border-gray-700 mb-8">
      <h3 className="text-xl text-center font-bold text-white mb-6">
        Project Ratings ({ratings.length})
        {averageRating > 0 && (
          <span className="ml-2 text-yellow-400">
            Average: {averageRating}/5
          </span>
        )}
      </h3>

      {ratings.length === 0 ? (
        <p className="text-gray-400">No ratings yet. Be the first to rate this project!</p>
      ) : (
        <div className="space-y-6">
          {ratings.map((rating, index) => (
            <div key={rating.id} className={index !== 0 ? 'pt-6 border-t border-gray-700' : ''}>
              <div className="flex items-start gap-3">
                {getUserAvatar(rating.user_id)}
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">{getUserName(rating.user_id)}</span>
                      {renderStars(rating.rate_value)}
                    </div>
                  </div>
                  
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