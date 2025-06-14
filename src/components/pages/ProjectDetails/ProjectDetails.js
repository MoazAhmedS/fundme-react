import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../Network/axiosinstance";
import { ArrowLeft, X, Star } from 'lucide-react';
import ProjectInfo from './ProjectInfo';
import RateProject from './RateProject';
import ProjectRatings from './ProjectRatings';
import DonationCard from './DonationCard';
import ProjectCommentSection from './ProjectCommentSection';
import ConfirmDialog from '../../ConfirmDialog';
import Alert from '../../alert';
import ImageCarousel from "../../imageSlider";
import ProjectSlider from "../HomeComp/ProjectSliders";
import Loader from "../../ui/loader/Loader";
import { useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const navigate = useNavigate();

  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [refreshRatings, setRefreshRatings] = useState(0);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [currentUser, setCurrentUser] = useState(null);
  const issuper = localStorage.getItem("super") === "true";
  const user_id = Number(localStorage.getItem("user_id"));
  if (project) {
    document.title = project.title;

  } else {
    document.title = "Project Details";

  }
  const [loadingRecommend, setLoadingRecommend] = useState(true);
  const [RecommendProjects, setRecommendProjects] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [projectRes, userRes, similarRes] = await Promise.all([
          axiosInstance.get(`Project/API/${projectId}/`),
          axiosInstance.get(`accounts/API/profile/`),
          axiosInstance.get(`Project/API/${projectId}/similar/`)
        ]);

        setProject(projectRes.data);
        setCurrentUser(userRes.data.user);
        setRecommendProjects(similarRes.data.similar_projects);
      } catch (err) {
        console.error("Fetch error:", err);
        setFetchError("Failed to load project or related data.");
      } finally {
        setLoading(false);
        setLoadingRecommend(false);
      }
    };

    fetchAll();
  }, [projectId]);

  console.log("hh", RecommendProjects);
  const handleCancelProject = () => {
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = async () => {
    try {
      const response = await axiosInstance.post(
        `Project/API/cancel/${projectId}/`,
        {}
      );

      console.log('API Response:', response.data);

      if (response.data.success) {
        setAlert({ message: response.data.message, type: 'success' });
        setProject((prev) => ({ ...prev, status: false }));
        setShowCancelDialog(false);
      } else {
        setAlert({ message: response.data.message, type: 'error' });
      }
    } catch (error) {
      console.error('Error canceling project:', error);

      if (error.response && error.response.data) {
        console.error('Error response data:', error.response.data);
        setAlert({ message: error.response.data.message, type: 'error' });
      } else {
        setAlert({ message: 'Failed to cancel project', type: 'error' });
      }
    }
  };

  const handleMakeFeatured = async () => {
    try {
      console.log('Toggling featured status for project:', projectId);

      await axiosInstance.post(`Project/API/projects/${projectId}/toggle-featured/`);

      setAlert({
        message: 'Project featured status updated successfully',
        type: 'success'
      });

      // Optimistically update the project state
      setProject(prev => ({
        ...prev,
        is_featured: !prev.is_featured,
      }));

    } catch (error) {
      console.error('Error toggling featured status:', error);
      setAlert({
        message: 'Failed to update featured status',
        type: 'error'
      });
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

  const isProjectCreator = currentUser && project && currentUser.id === project.user_id;

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <div className="px-12 py-6 border-b border-gray-700">
        <button onClick={() => navigate('/project')}
        className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </button>
      </div>

      <div className="flex-grow max-w-[1800px] mx-auto w-full px-12 py-8">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-8">
            {alert.message && (
              <span className="py-20"><Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} /></span>
            )}
            <ImageCarousel images={project.images} />

            <ProjectInfo project={project} key={project.current_donations} />

            {(issuper || project.user_id === user_id) && (
              <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 mb-8 shadow-lg">
                <div className="flex gap-6">

                  {issuper && (
                    <button
                      onClick={handleMakeFeatured}
                      className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 text-sm"
                    >
                      <Star className="w-5 h-5" />
                      {project?.is_featured ? 'Remove Featured' : 'Make Featured'}
                    </button>
                  )}

                  {project.user_id === user_id && (
                    <button
                      onClick={handleCancelProject}
                      className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 text-sm"
                    >
                      <X className="w-5 h-5" />
                      Cancel Project
                    </button>
                  )}

                </div>
              </div>
            )}

            <RateProject
              projectId={project.id}
              userId={project.user_id}
              onRatingSubmitted={() => setRefreshRatings(prev => prev + 1)}
            />

            <ProjectRatings
              projectId={project.id}
              refreshTrigger={refreshRatings}
            />

            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 mb-8 shadow-lg">
              <ProjectCommentSection projectId={project.id} />
            </div>
            <div className="bg-gray-800/50 rounded-xl  border border-gray-700 mb-8 shadow-lg">
              {loadingRecommend ? (
                <div className="flex justify-center items-center">
                  <Loader size={40} color="white" />
                </div>
              ) : (
                <div className="bg-gray-800/30">
                  <ProjectSlider
                    title="🌟 Recommended Projects"
                    subtitle="Curated selection of high-quality projects we think you'll love"
                    projects={RecommendProjects}
                    atTop={true}
                  />
                </div>

              )}            </div>
          </div>

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

      <ConfirmDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Project"
        message="Are you sure you want to cancel this project? This action cannot be undone."
      />
    </div>
  );
};

export default ProjectDetails;