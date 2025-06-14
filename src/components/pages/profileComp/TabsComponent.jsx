import React, { useState } from 'react';
import UserDataTab from './UserDataTab';
import ProjectsTab from './ProjectsTab';
import DonationsTab from './DonationsTab';
import CategoriesTab from './CategoriesTab';

const TabsComponent = ({ user, projects, donations }) => {
  const [activeTab, setActiveTab] = useState('user-data');

  const isSuperUser = user?.is_superuser; // dont forget this //////////////////////////
  const gridCols = isSuperUser ? 'grid-cols-4' : 'grid-cols-3';

  return (
    <div className="space-y-6">
      <div className={`grid w-full ${gridCols} bg-gray-800 h-10 items-center rounded-md p-1`}>
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
        {isSuperUser && (
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
        )}
      </div>

      <div>
        {activeTab === 'user-data' && <UserDataTab user={user} />}
        {activeTab === 'projects' && <ProjectsTab projects={projects} />}
        {activeTab === 'donations' && <DonationsTab donations={donations} />}
        {activeTab === 'categories' && isSuperUser && <CategoriesTab />} 
      </div>
    </div>
  );
};


export default TabsComponent;
