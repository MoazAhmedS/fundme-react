import React from 'react';

function Alert({ message, onClose, type = 'error' }) {
  const alertStyles = {
    error: {
      bg: 'bg-red-100',
      border: 'border-red-500',
      text: 'text-red-700',
      icon: '×'
    },
    success: {
      bg: 'bg-green-100',
      border: 'border-green-500',
      text: 'text-green-700',
      icon: '✓'
    },
    warning: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-500',
      text: 'text-yellow-700',
      icon: '⚠'
    },
    info: {
      bg: 'bg-blue-100',
      border: 'border-blue-500',
      text: 'text-blue-700',
      icon: 'ℹ'
    }
  };

  const currentStyle = alertStyles[type] || alertStyles.error;

  return (
    <div className={`w-full ${currentStyle.bg} border-l-4 ${currentStyle.border} ${currentStyle.text} px-4 py-2 rounded-lg flex items-center`}>
      {onClose && (
        <button onClick={onClose} className="mr-3">
          <span className={`${currentStyle.text} font-bold`}>{currentStyle.icon}</span>
        </button>
      )}
      <span>{message}</span>
    </div>
  );
}

export default Alert;