import React from 'react';
import { Share2, Tag } from 'lucide-react';
import Badge from '../ui/Badge/Badge';
import StarRating from '../ui/rates';

const ProjectInfo = ({ project }) => {
  // Remove duplicate tags
  const uniqueTags = [...new Set(project.tag_names?.map(tag => tag.trim()) || [])];

  return (
    <div className="mb-12">
      {/* Header section with category and share button */}
      <div className="flex justify-between items-center mb-6">
        <span className="px-4 py-2 bg-purple-600 text-white text-sm rounded-full font-medium">
          {project.category || 'Uncategorized'}
        </span>
        <button className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </button>
      </div>

      {/* Project title */}
    <h1 className="text-left font-bold text-white mb-4 leading-tight text-5xl">
  {project.title}
</h1>

{/* Rating section - inline layout */}
<div className="flex items-center mb-6">
  <StarRating 
    rating={project.rates || 0}  
    starColor="text-yellow-500"
  />
</div>

{/* Project description */}
<div className="text-gray-100 font-bold text-2xl leading-relaxed mb-6 text-left">
  {project.details}
</div>



     

      {/* Tags section */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Tag className="w-5 h-5 text-gray-400 mr-2" />
          <h3 className="text-white text-lg font-semibold">Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {uniqueTags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="default"
              className="bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-600/50 transition-colors"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;