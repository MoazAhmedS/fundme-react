import React, { useState } from 'react';
import DeleteAccountDialog from '../profile/DeleteAccountDialog';
import ChangePasswordDialog from '../profile/ChangePasswordDialog';

// List of countries for the dropdown
const countries = [
  { code: 'EG', name: 'Egypt' },
  { code: 'US', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  // Add more countries as needed
];

const UserDataTab = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@fundme.com',
    phone: '+20 100 123 4567',
    birthDate: '1990-01-01',
    facebookLink: '',
    country: 'EG',
    avatarInitials: 'AU'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would typically send the updated data to your API
    console.log('Saving user data:', userData);
    setIsEditing(false);
    // Add API call to save data
  };

  const handleDeleteAccount = async (password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/API/profile/delete/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ password })
      });

      if (!response.ok) throw new Error('Failed to delete account');
      window.location.href = '/login';
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };

  const handleChangePassword = async (passwords) => {
    try {
      // Call your API to change password
      const response = await fetch('https://api.example.com/account/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(passwords)
      });

      if (!response.ok) throw new Error('Failed to change password');
      setIsChangePasswordDialogOpen(false);
      alert('Password changed successfully');
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Here you would typically upload the image to your server
        // For now, we'll just update the local state
        setUserData(prev => ({ ...prev, avatarUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-white flex items-center justify-between">
          Personal Information
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 bg-green-600 hover:bg-green-700 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 border border-gray-600 hover:bg-gray-700 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
              </svg>
              Edit
            </button>   
          )}
        </h3>
      </div>
      
      <div className="p-6 pt-0 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="relative flex h-24 w-24 shrink-0 overflow-hidden rounded-full bg-purple-600">
              {userData.avatarUrl ? (
                <img src={userData.avatarUrl} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center rounded-full text-xl text-white">
                  {userData.avatarInitials}
                </span>
              )}
            </div>
            {isEditing && (
              <label className="absolute -bottom-2 -right-2 rounded-full bg-blue-600 p-2 hover:bg-blue-700 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white">
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                </svg>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{userData.firstName} {userData.lastName}</h3>
            <p className="text-gray-400">{userData.email}</p>
            {!isEditing && userData.facebookLink && (
              <a 
                href={userData.facebookLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm flex items-center mt-1"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                Facebook Profile
              </a>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
            <input 
              name="firstName"
              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" 
              disabled={!isEditing}
              value={userData.firstName} 
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
            <input 
              name="lastName"
              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" 
              disabled={!isEditing}
              value={userData.lastName} 
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email (Not changeable)</label>
            <input 
              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-600 px-3 py-2 text-gray-400 text-sm disabled:cursor-not-allowed disabled:opacity-50" 
              disabled 
              value={userData.email} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="flex gap-2">
              <input 
                type="password"
                className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm disabled:cursor-not-allowed disabled:opacity-50" 
                disabled={!isEditing} 
                value={userData.password}
                onChange={handleInputChange} 
              />
              <button 
                onClick={() => setIsChangePasswordDialogOpen(true)}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white"
              >
                Change password
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Birth Date
            </label>
            <input 
              name="birthDate"
              type="date"
              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" 
              disabled={!isEditing}
              value={userData.birthDate} 
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Country
            </label>
            <select
              name="country"
              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              disabled={!isEditing}
              value={userData.country}
              onChange={handleInputChange}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Facebook Profile Link
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </div>
              <input 
                name="facebookLink"
                type="url"
                className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-10 py-2 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" 
                disabled={!isEditing}
                placeholder="https://facebook.com/yourprofile"
                value={userData.facebookLink} 
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mobile Phone (Egyptian numbers only)
            </label>
            <input 
              name="phone"
              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" 
              disabled={!isEditing}
              placeholder="+20 100 123 4567" 
              value={userData.phone} 
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="flex space-x-4 pt-6 border-t border-gray-700">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Create Project
          </button>
          <button 
            onClick={() => setIsDeleteDialogOpen(true)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
            Delete Account
          </button>
        </div>

        <DeleteAccountDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteAccount}
        />

        <ChangePasswordDialog
          isOpen={isChangePasswordDialogOpen}
          onClose={() => setIsChangePasswordDialogOpen(false)}
          onConfirm={handleChangePassword}
        />
      </div>
    </div>
  );
};

export default UserDataTab;