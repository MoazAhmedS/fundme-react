import React, { useState } from "react";
import { ArrowLeft } from 'lucide-react';
import projects from "../../utilities/mockProjects";
import Navbar from '../NavigationComponents/Navbar';
import Footer from '../NavigationComponents/Footer';
import ProjectInfo from './ProjectInfo';
import RateProject from './RateProject';
import ProjectImageCarousel from './ImageCarousel';
import ProjectRatings from './ProjectRatings';
import DonationCard from './DonationCard';
import CommentSection from '../commentSystem/CommentSection';

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

  // Comment state
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      comment: "This is an amazing project! Looking forward to seeing the results.",
      timestamp: "2 days ago"
    },
    {
      id: 2,
      user: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      comment: "Just donated $50. Keep up the great work!",
      timestamp: "1 week ago"
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
      comment: reviewNote || `Rated ${userRating} stars`,
      timestamp: "Just now"
    };

    setReviews([newReview, ...reviews]);
    setUserRating(0);
    setReviewNote("");
    alert("Rating submitted successfully!");
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
      <Navbar className="shadow-lg" />
      
      {/* Back Button */}
      <div className="px-8 py-6 border-b border-gray-700">
        <button className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex justify-center gap-16 px-8 pb-20">
        {/* Left Section */}
        <div className="flex-none" style={{ width: '700px' }}>
          <ProjectImageCarousel images={project.images} />
          <ProjectInfo project={project} />
          <RateProject 
            handleRatingSubmit={handleRatingSubmit} 
            userRating={userRating}
            setUserRating={setUserRating}
            userHover={userHover}
            setUserHover={setUserHover}
            reviewNote={reviewNote}
            setReviewNote={setReviewNote}
            renderInteractiveStars={renderInteractiveStars}
          />
          <ProjectRatings reviews={reviews} />
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8 shadow-lg">
            <CommentSection 
              initialComments={comments.map(comment => ({
                id: comment.id,
                user_id: comment.user,
                comment: comment.comment,
                created_date: comment.timestamp,
                replies: []
              }))} 
            />
          </div>
        </div>
        
        {/* Right Section - Donation Card */}
        <DonationCard 
          project={project}
          currentDonations={currentDonations}
          donationAmount={donationAmount}
          setDonationAmount={setDonationAmount}
          handleDonate={handleDonate}
          error={error}
          percentage={percentage}
        />
      </div>

      <Footer className="bg-gray-900 border-t border-gray-700" />
    </div>
  );
};

export default ProjectDetails;