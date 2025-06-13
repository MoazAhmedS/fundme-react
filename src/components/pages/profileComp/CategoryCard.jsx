import React from 'react';

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-gray-700 px-3 py-5 rounded-md hover:bg-gray-600 transition-colors duration-200 w-full max-w-xs mx-auto">
      <h3 className="text-xl font-medium text-white text-center truncate">
        {category.name}
      </h3>
    </div>
  );
};

export default CategoryCard;
