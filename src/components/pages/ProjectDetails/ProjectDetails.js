import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, X, Star } from 'lucide-react';
import Navbar from '../../NavigationComponents/Navbar';
import Footer from '../../NavigationComponents/Footer';
import ProjectInfo from './ProjectInfo';
import RateProject from './RateProject';
import ProjectImageCarousel from './ImageCarousel';
import ProjectRatings from './ProjectRatings';
import DonationCard from './DonationCard';
import ProjectCommentSection from './ProjectCommentSection';
import ConfirmDialog from '../../ConfirmDialog';
import Alert from '../../alert'; 

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [refreshRatings, setRefreshRatings] = useState(0);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [currentUser, setCurrentUser] = useState(null); // New state for current user
  const Auth_Token = '98ab31bfe9196f9c17b5cc2c5c593585dec5401d';
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectResponse = await axios.get(`http://127.0.0.1:8000/Project/API/${projectId}/`);
        setProject(projectResponse.data);
      } catch (error) {
        console.error(error);
        setFetchError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        // Fetch current user info to determine permissions
        const token = localStorage.getItem('access_token');
        const userResponse = await axios.get(`http://127.0.0.1:8000/accounts/API/profile/`, {
          headers: {
            'Authorization': `Token ${Auth_Token}`
          }
        });
        setCurrentUser(userResponse.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchProject();
    fetchUser();
  }, [projectId]);

  const handleCancelProject = () => {
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/Project/API/cancel/${projectId}/`,
        {},
        {
          headers: {
            'Authorization': `Token ${Auth_Token}`
          }
        }
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
      console.log('Making project featured:', projectId);
      setAlert({ message: 'Project made featured successfully', type: 'success' });
    } catch (error) {
      console.error('Error making project featured:', error);
      setAlert({ message: 'Failed to make project featured', type: 'error' });
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

  // Check if the current user is the creator of the project
  const isProjectCreator = currentUser && project && currentUser.id === project.user_id;

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Navbar className="shadow-lg" />
      
      <div className="px-12 py-6 border-b border-gray-700">
        <button className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </button>
      </div>

      <div className="flex-grow max-w-[1800px] mx-auto w-full px-12 py-8">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-8">
            {alert.message && (
              <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />
            )}
            <ProjectImageCarousel images={project.images} />
            
            <ProjectInfo project={project} key={project.current_donations} />

            {project.status && (
              <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 mb-8 shadow-lg">
                <div className="flex gap-6">
                 {currentUser && currentUser.user_info && currentUser.user_info.is_superuser && (
  // Button shown only if the current user is a superuser
  <button
    onClick={handleMakeFeatured}
    className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 text-lg"
  >
    <Star className="w-5 h-5" />
    Make Featured
  </button>
)}

                  {isProjectCreator && (
                    <button
                      onClick={handleCancelProject}
                      className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 text-lg"
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

      <Footer className="bg-gray-900 border-t border-gray-700" />
    </div>
  );
};

export default ProjectDetails;