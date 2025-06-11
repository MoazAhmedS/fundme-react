import React, { useState } from 'react';
import UserDataTab from './UserDataTab';
import ProjectsTab from './ProjectsTab';

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState('user-data');

  return (
    <div className="space-y-6">
      <div className="grid w-full grid-cols-4 bg-gray-800 h-10 items-center rounded-md p-1">
        <button 
          onClick={() => setActiveTab('user-data')}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
            activeTab === 'user-data' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-gray-300'
          }`}
        >
          User Data
        </button>
        <button 
          onClick={() => setActiveTab('projects')}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
            activeTab === 'projects' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-gray-300'
          }`}
        >
          My Projects
        </button>
        <button 
          onClick={() => setActiveTab('donations')}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
            activeTab === 'donations' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-gray-300'
          }`}
        >
          My Donations
        </button>
        <button 
          onClick={() => setActiveTab('categories')}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
            activeTab === 'categories' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-gray-300'
          }`}
        >
          Categories
        </button>
      </div>
      
      <div>
        {activeTab === 'user-data' && <UserDataTab />}
        {activeTab === 'projects' && <ProjectsTab />}
      </div>
    </div>
  );
};

export default TabsComponent;