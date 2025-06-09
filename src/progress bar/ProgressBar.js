// src/components/ProgressBar.js

import React from 'react';

function ProgressBar({ percentage }) {
  return (
    <div className='w-full max-w-md bg-gray-800 p-4 rounded-lg'>
      <div className='flex justify-between mb-2'>
        <span className='text-gray-300'>Progress</span>
        <span className='text-white'>{percentage}%</span>
      </div>
      <div className='w-full bg-gray-600 rounded-full h-2.5'>
        <div
          className='bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full'
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;