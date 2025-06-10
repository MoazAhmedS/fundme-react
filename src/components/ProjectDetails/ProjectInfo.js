import React from 'react';
import Badge from '../ui/Badge/Badge';
import { Share2, Tag } from 'lucide-react';


const ProjectInfo = ({ project }) => {
  return (
    <div className="mb-12 bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <span className="px-4 py-2 bg-purple-600 text-white text-sm rounded-full font-medium">
          {project.category}
        </span>
        <button className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </button>
      </div>
      <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
        {project.title}
      </h1>
      <div className="mb-6">
        {/* Placeholder for StarRating component */}
      </div>
      <div className="text-gray-300 text-lg leading-relaxed mb-8">
        {project.details}
      </div>
      <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 mb-4">
        <div className="flex items-center mb-4">
          <Tag className="w-5 h-5 text-gray-400 mr-2" />
          <h3 className="text-white text-lg font-semibold">Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags && project.tags.map((tag, index) => (
            <Badge key={index} variant="default">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;