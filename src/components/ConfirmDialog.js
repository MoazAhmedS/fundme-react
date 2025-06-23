import React from 'react';
import Alert from './alert';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  alert, setAlert
}) => {
  if (!isOpen) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
        {alert?.message && (
          <div className="mb-4">
            <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />
          </div>
        )}
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-sm text-gray-300 mt-1">
            {message}
          </p>
        </div>

        <form onSubmit={handleConfirm} className="space-y-4">
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              {cancelText}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmDialog;