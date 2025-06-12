import React from 'react';

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg flex justify-between items-center hover:bg-gray-600 transition-colors duration-300">
      <div>
        <h3 className="text-lg font-semibold text-white">
          {category.name}
        </h3>
        <p className="text-gray-400">
          {category.projectCount || 0} projects
        </p>
      </div>
      
      <div className="text-right">
        <p className="text-green-400 font-semibold">
          {category.projectCount || 0}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;