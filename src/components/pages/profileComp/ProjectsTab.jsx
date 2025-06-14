import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import ProjectCard from '../../ProjectCard';
import { Plus } from 'lucide-react';

const ProjectsTab = ({ projects = [] }) => {
  const hasProjects = projects.length > 0;
    const navigate = useNavigate();

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 relative">
      <h3 className="text-2xl font-semibold text-white text-center mb-6">My Projects</h3>

      {/* Create Project Button */}
      <button
          onClick={() => navigate('/create-project')}

        className="absolute top-6 right-6 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Project
      </button>

      {/* Display projects or fallback message */}
      {hasProjects ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            
              <div key={project.id} className="w-[350px] shrink-0 px-2 py-4">
                  <ProjectCard project={project} />
                </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-4">You don't have any projects yet.</p>
      )}
    </div>
  );
};

export default ProjectsTab;
