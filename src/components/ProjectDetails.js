import React, { useState } from "react";
import { User, Calendar, DollarSign, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import ProgressBar from "./ProgressBar";
import ImageCarousel from "./imageSlider";
import StarRating from "./ui/rates";
import projects from "../utilities/mockProjects";
import Navbar from './NavigationComponents/Navbar';
import Footer from './NavigationComponents/Footer';

const ProjectDetails = ({ projectId }) => {
  const project = projects.find((proj) => proj.id === projectId);
  const [currentDonations, setCurrentDonations] = useState(project ? project.current_donations : 0);
  const [donationAmount, setDonationAmount] = useState("");
  const [error, setError] = useState("");

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

          {/* Project Info Section - Separate from Image Slider */}
          <div>
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

            {/* Star Rating - Under Title */}
            <div className="mb-6">
              <StarRating 
                rating={project.rating} 
                totalRatings={project.total_ratings}
                starColor="text-yellow-400"
              />
            </div>

            {/* Project Description */}
            <div className="text-gray-300 text-lg leading-relaxed">
              {project.details}
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