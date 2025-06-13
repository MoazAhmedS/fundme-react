import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../NavigationComponents/Navbar';
import TabsComponent from './TabsComponent';
import { axiosInstance } from '../../../Network/axiosinstance';
import Loader from '../../ui/loader/Loader';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/accounts/API/profile/')
      .then(response => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
        setLoading(false);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-400">
        Failed to load profile.
      </div>
    );
  }

  const { user, projects, donations } = profileData;

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-start mb-8 mt-12">
          <h2 className="text-6xl font-bold text-white mb-2">Welcome, {user.first_name}</h2>
          <p className="text-gray-400 text-lg">Manage your account and projects</p>
        </div>
        <TabsComponent user={user} projects={projects} donations={donations} />
      </div>
    </div>
  );
};

export default Profile;
