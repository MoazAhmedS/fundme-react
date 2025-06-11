import React from 'react';

const UserDataTab = () => {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-white flex items-center justify-between">
          Personal Information
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 border border-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
            </svg>
            Edit
          </button>
        </h3>
      </div>
      
      <div className="p-6 pt-0 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="relative flex h-24 w-24 shrink-0 overflow-hidden rounded-full bg-purple-600">
              <span className="flex h-full w-full items-center justify-center rounded-full text-xl text-white">AU</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Admin User</h3>
            <p className="text-gray-400">admin@fundme.com</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
            <input 
              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm disabled:cursor-not-allowed disabled:opacity-50" 
              disabled 
              value="Admin" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
            <input 
              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm disabled:cursor-not-allowed disabled:opacity-50" 
              disabled 
              value="User" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email (Not changeable)</label>
            <input 
              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-600 px-3 py-2 text-gray-400 text-sm disabled:cursor-not-allowed disabled:opacity-50" 
              disabled 
              value="admin@fundme.com" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input 
              type="password"
              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm disabled:cursor-not-allowed disabled:opacity-50" 
              disabled 
              value="••••••••" 
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mobile Phone (Egyptian numbers only)
            </label>
            <input 
              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm disabled:cursor-not-allowed disabled:opacity-50" 
              disabled 
              placeholder="+20 100 123 4567" 
              value="+20 100 123 4567" 
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
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-600 hover:bg-red-700 text-white">
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
      </div>
    </div>
  );
};

export default UserDataTab;