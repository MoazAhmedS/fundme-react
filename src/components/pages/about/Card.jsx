import React from 'react';

const Card = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-lg p-6 ${hoverEffect ? 'hover:border-gray-600 transition-all duration-300 group hover:scale-105' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;