import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft } from 'lucide-react';
import Navbar from '../NavigationComponents/Navbar';
import Footer from '../NavigationComponents/Footer';
import ProjectInfo from './ProjectInfo';
import RateProject from './RateProject';
import ProjectImageCarousel from './ImageCarousel';
import ProjectRatings from './ProjectRatings';
import DonationCard from './DonationCard';
import ProjectCommentSection from './ProjectCommentSection'; // Import the new component

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

      <div className="px-8 py-6 border-b border-gray-700">
        <button className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </button>
      </div>

      <div className="flex-grow flex justify-center gap-16 px-8 pb-20">
        <div className="flex-none" style={{ width: '700px' }}>
          <ProjectImageCarousel images={project.images} />
          <ProjectInfo project={project} key={project.current_donations} />
          
          <RateProject 
            projectId={project.id}
            userId={project.user_id}
            onRatingSubmitted={handleRatingSubmitted}
          />
          
          <ProjectRatings 
            projectId={project.id}
            refreshTrigger={refreshRatings}
          />
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8 shadow-lg">
            {/* Use the new ProjectCommentSection instead */}
            <ProjectCommentSection projectId={project.id} />
          </div>
        </div>

        <DonationCard 
          project={project}
          setProject={setProject}
        />
      </div>

      <Footer className="bg-gray-900 border-t border-gray-700" />
    </div>
  );
};

export default ProjectDetails;