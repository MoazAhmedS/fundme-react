import React, { useState } from 'react';
import ShowHidePassword from '../../Froms/ShowHidePassword'
import FormFieldWrapper from '../../Froms/FormFieldWrapper';
const DeleteAccountDialog = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onConfirm(password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">Delete Account</h2>
          <p className="text-sm text-gray-300 mt-1">
            This action cannot be undone. Your account and all associated data will be permanently deleted.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormFieldWrapper>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Enter your password to confirm
            </label>
            <div className="relative">
              <ShowHidePassword
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 pl-10 pr-10 py-2 text-white text-sm"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          </FormFieldWrapper>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!password || isLoading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Deleting...' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountDialog;