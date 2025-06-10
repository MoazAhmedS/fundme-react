import React, { useState } from "react";
import { User, Calendar, DollarSign, ArrowLeft, Share2, Bookmark, Tag } from 'lucide-react';
import ProgressBar from "./ProgressBar";
import ImageCarousel from "./imageSlider";
import StarRating from "./ui/rates";
import Badge from "./ui/ Badge/Badge";
import projects from "../utilities/mockProjects";
import Navbar from './NavigationComponents/Navbar';
import Footer from './NavigationComponents/Footer';

const ProjectDetails = ({ projectId }) => {
  const project = projects.find((proj) => proj.id === projectId);
  const [currentDonations, setCurrentDonations] = useState(project ? project.current_donations : 0);
  const [donationAmount, setDonationAmount] = useState("");
  const [error, setError] = useState("");
  
  // Rating state
  const [userRating, setUserRating] = useState(0);
  const [reviewNote, setReviewNote] = useState("");
  const [userHover, setUserHover] = useState(0);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Alice Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      rating: 5,
      comment: "Absolutely brilliant project! The innovation behind this is remarkable.",
      timestamp: "3 days ago"
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      rating: 4,
      comment: "Great concept, well executed. Looking forward to the final results.",
      timestamp: "1 week ago"
    },
    {
      id: 3,
      user: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      rating: 5,
      comment: "This project has the potential to change everything. Highly recommended!",
      timestamp: "2 weeks ago"
    }
  ]);

  if (!project) {
    return (
      <div className="bg-gray-900 min-h-screen flex justify-center items-center">
        <p className="text-white text-xl">Project not found</p>
      </div>
    );
  }

  const percentage = ((currentDonations / project.target) * 100).toFixed(0);

  const handleDonate = () => {
    const amount = parseFloat(donationAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
    } else if (amount > (project.target - currentDonations)) {
      setError("Amount exceeds the target.");
    } else {
      setError("");
      setCurrentDonations(currentDonations + amount);
      setDonationAmount("");
      alert(`Donated $${amount}`);
    }
  };

  const handleRatingSubmit = () => {
    if (userRating === 0) {
      alert("Please select a rating");
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      user: "You",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: userRating,
      comment: reviewNote || `${userRating}`,
      timestamp: "Just now"
    };

    setReviews([newReview, ...reviews]);
    setUserRating(0);
    setReviewNote("");
    alert("Rating submitted successfully!");
  };

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

  const renderInteractiveStars = () => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <svg
              key={index}
              className={`w-8 h-8 cursor-pointer transition-colors ${
                currentRating <= (userHover || userRating) ? 'text-purple-500' : 'text-gray-400'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              onMouseEnter={() => setUserHover(currentRating)}
              onMouseLeave={() => setUserHover(0)}
              onClick={() => setUserRating(currentRating)}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.42c.969 0 1.371 1.24.588 1.81l-3.585 2.606a1 1 0 00-.363 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.585-2.606a1 1 0 00-1.175 0l-3.585 2.606c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.363-1.118L2.139 9.397c-.783-.57-.38-1.81.588-1.81h4.42a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Navbar />
      
      {/* Back Button */}
      <div className="px-8 py-6">
        <button className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex justify-center gap-16 px-8 pb-20">
        {/* Left Section */}
        <div className="flex-none" style={{ width: '700px' }}>
          {/* Image Carousel */}
          <div className="relative mb-6">
            <ImageCarousel images={project.images} />
          </div>

          {/* Project Info Section */}
          <div className="mb-12">
            {/* Category and Share Row */}
            <div className="flex justify-between items-center mb-6">
              <span className="px-4 py-2 bg-purple-600 text-white text-sm rounded-full font-medium">
                {project.category}
              </span>
              <button className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>

            {/* Project Title */}
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              {project.title}
            </h1>

            {/* Star Rating */}
            <div className="mb-6">
              <StarRating 
                rating={project.rating} 
                totalRatings={project.total_ratings}
                starColor="text-yellow-400"
              />
            </div>

            {/* Project Description */}
            <div className="text-gray-300 text-lg leading-relaxed mb-8">
              {project.details}
            </div>

            {/* Tags Section */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
              <div className="flex items-center mb-4">
                <Tag className="w-5 h-5 text-gray-400 mr-2" />
                <h3 className="text-white text-lg font-semibold">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags && project.tags.map((tag, index) => (
                  <Badge key={index} variant="default">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Rate This Project Section - LEFT ALIGNED */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
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

          {/* Project Ratings Section */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
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
        </div>

        {/* Right Section - Donation Card */}
        <div className="flex-none bg-gray-800 rounded-xl p-8 h-fit  top-6" style={{ width: '420px' }}>
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-300 text-lg">Progress</span>
            </div>
            <ProgressBar percentage={percentage} />
          </div>

          {/* Stats Row */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-3xl font-bold text-white mb-1">
                ${currentDonations.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Raised</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1 flex items-center justify-center">
                <User className="mr-2" size={24} />
                {project.backers}
              </p>
              <p className="text-sm text-gray-400">Backers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1 flex items-center justify-center">
                <Calendar className="mr-2" size={24} />
                {project.days_left}
              </p>
              <p className="text-sm text-gray-400">Days left</p>
            </div>
          </div>

          {/* Donation Input */}
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="Enter amount ($)"
            className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 mb-4 border border-gray-600 focus:border-blue-500 focus:outline-none text-lg"
          />

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            className="w-full p-4 mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 font-bold text-lg transition-all duration-200 transform hover:scale-105"
          >
            Donate ${donationAmount || 0}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
              <p className="text-red-400 text-center text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetails;