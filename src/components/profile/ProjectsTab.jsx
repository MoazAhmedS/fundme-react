import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../ProjectCard';

const ProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://api.example.com/projects/user-projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        <h3 className="text-2xl font-semibold text-white mb-4">My Projects</h3>
        <p className="text-gray-400">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        <h3 className="text-2xl font-semibold text-white mb-4">My Projects</h3>
        <p className="text-gray-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
      <h3 className="text-2xl font-semibold text-white mb-6">My Projects</h3>
      
      {projects.length === 0 ? (
        <p className="text-gray-400">You don't have any projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              to={`/project/${project.slug}`}
              className="block hover:scale-105 transition-transform duration-300"
            >
              <ProjectCard 
                project={project}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsTab;