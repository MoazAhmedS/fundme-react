import React from 'react';

function Alert({ message, onClose }) {
  return (
    <div className="w-full bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2 rounded-lg flex items-center">
      <button onClick={onClose} className="mr-3">
        <span className="text-red-700 font-bold">×</span>
      </button>
      <span>{message}</span>
    </div>
  );
}

export default Alert;