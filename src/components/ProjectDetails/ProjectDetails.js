import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft, X, Star } from 'lucide-react';
import Navbar from '../NavigationComponents/Navbar';
import Footer from '../NavigationComponents/Footer';
import ProjectInfo from './ProjectInfo';
import RateProject from './RateProject';
import ProjectImageCarousel from './ImageCarousel';
import ProjectRatings from './ProjectRatings';
import DonationCard from './DonationCard';
import ProjectCommentSection from './ProjectCommentSection';

const ProjectDetails = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [reviewNote, setReviewNote] = useState("");
  const [refreshRatings, setRefreshRatings] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/Project/API/${projectId}/`);
        setProject(response.data);
        setUserRating(response.data.rates || 0);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setFetchError("Failed to load project.");
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleRatingSubmitted = () => {
    setRefreshRatings(prev => prev + 1);
  };

  const handleCancelProject = async () => {
    try {
      console.log('Canceling project:', projectId);
      alert('Project canceled successfully');
    } catch (error) {
      console.error('Error canceling project:', error);
      alert('Failed to cancel project');
    }
  };

  const handleMakeFeatured = async () => {
    try {
      console.log('Making project featured:', projectId);
      alert('Project made featured successfully');
    } catch (error) {
      console.error('Error making project featured:', error);
      alert('Failed to make project featured');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex justify-center items-center">
        <p className="text-white text-xl">Loading project...</p>
      </div>
    );
  }

  if (fetchError || !project) {
    return (
      <div className="bg-gray-900 min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-xl">{fetchError || "Project not found"}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Navbar className="shadow-lg" />

      {/* Back button with better padding */}
      <div className="px-12 py-6 border-b border-gray-700">
        <button className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </button>
      </div>

      {/* Main content with much wider layout */}
      <div className="flex-grow max-w-[1800px] mx-auto w-full px-12 py-8">
        <div className="grid grid-cols-12 gap-12">
          {/* Left side - Main content (8 columns = 66.67%) */}
          <div className="col-span-8">
            <ProjectImageCarousel images={project.images} />
            
            {/* Pass the updated project object */}
            <ProjectInfo project={project} key={project.current_donations} />
            
            {/* Action buttons section */}
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 mb-8 shadow-lg">
              <div className="flex gap-6">
                <button
                  onClick={handleCancelProject}
                  className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 text-lg"
                >
                  <X className="w-5 h-5" />
                  Cancel Project
                </button>
                
                <button
                  onClick={handleMakeFeatured}
                  className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 text-lg"
                >
                  <Star className="w-5 h-5" />
                  Make Featured
                </button>
              </div>
            </div>
            
            <RateProject 
              projectId={project.id}
              userId={project.user_id}
              onRatingSubmitted={handleRatingSubmitted}
            />
            
            <ProjectRatings 
              projectId={project.id}
              refreshTrigger={refreshRatings}
            />
            
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 mb-8 shadow-lg">
              <ProjectCommentSection projectId={project.id} />
            </div>
          </div>

          {/* Right side - Donation card (4 columns = 33.33%) */}
          <div className="col-span-4">
            <div className="sticky top-20">
              <DonationCard 
                project={project}
                setProject={setProject}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer className="bg-gray-900 border-t border-gray-700" />
    </div>
  );
};

export default ProjectDetails;