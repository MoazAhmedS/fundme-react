import React from 'react';
import Navigation from '../NavigationComponents/Navbar';
import TabsComponent from '../profile/TabsComponent';

const Profile = () => {
  return (
     <div className="min-h-screen bg-gray-900">
      <Navigation />
       <div className="max-w-6xl mx-auto px-4 py-8">
     <div className="flex flex-col items-start mb-8 mt-12"> 
    <h5 className="text-6xl font-bold text-white mb-2">Profile</h5>
    <p className="text-gray-400 text-lg">Manage your account and projects</p>
  </div>
        <TabsComponent />
      </div>
    </div>
  );
};

export default Profile;