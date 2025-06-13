import React, { useState } from 'react';

const ChangePasswordDialog = ({ isOpen, onClose, onConfirm }) => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords
    const newErrors = {};
    if (!passwords.oldPassword) newErrors.oldPassword = 'Required';
    if (!passwords.newPassword) newErrors.newPassword = 'Required';
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onConfirm(passwords);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Change Password</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm"
                value={passwords.oldPassword}
                onChange={handleChange}
              />
              {errors.oldPassword && <p className="text-red-500 text-xs mt-1">{errors.oldPassword}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm"
                value={passwords.newPassword}
                onChange={handleChange}
              />
              {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm"
                value={passwords.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordDialog;