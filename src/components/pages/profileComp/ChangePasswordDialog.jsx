import React, { useState } from 'react';
import ErrorMessage from '../../Froms/ErrorMessage';
import FormFieldWrapper from '../../Froms/FormFieldWrapper';
import Label from '../../Froms/Label';
import ShowHidePassword from '../../Froms/ShowHidePassword';
import Loader from '../../ui/loader/Loader';

const ChangePasswordDialog = ({ isOpen, onClose, onConfirm }) => {
  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setPasswords(prev => {
    const updated = { ...prev, [name]: value };

    const newErrors = { ...errors };

    if (name === 'old_password') {
      newErrors.old_password = !value.trim() ? 'Current password is required' : '';
    }

    if (name === 'new_password') {
      if (!value.trim()) {
        newErrors.new_password = 'New password is required';
      } else if (!validatePassword(value)) {
        newErrors.new_password = 'Password must be at least 8 characters with letters and numbers';
      } else {
        newErrors.new_password = '';
      }

      if (updated.confirm_new_password) {
        newErrors.confirm_new_password =
          value !== updated.confirm_new_password ? 'Passwords do not match' : '';
      }
    }

    if (name === 'confirm_new_password') {
      newErrors.confirm_new_password =
        value !== updated.new_password ? 'Passwords do not match' : '';
    }

    setErrors(newErrors);
    return updated;
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const newErrors = {};
    
    if (!passwords.old_password.trim()) {
      newErrors.old_password = 'Current password is required';
    }
    
    if (!passwords.new_password.trim()) {
      newErrors.new_password = 'New password is required';
    } else if (!validatePassword(passwords.new_password)) {
      newErrors.new_password = 'Password must be at least 8 characters with letters and numbers';
    }
    
    if (passwords.new_password !== passwords.confirm_new_password) {
      newErrors.confirm_new_password = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    
    try {
      await onConfirm(passwords);
      setPasswords({
        old_password: '',
        new_password: '',
        confirm_new_password: ''
      });
      setErrors({});
    } catch (error) {
      if (error.response?.data?.old_password) {
        newErrors.old_password = error.response.data.old_password.join(' ');
      }
      if (error.response?.data?.new_password) {
        newErrors.new_password = error.response.data.new_password.join(' ');
      }
      setErrors(newErrors);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Change Password</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormFieldWrapper>
              <Label htmlFor="old_password">Current Password *</Label>
              <ShowHidePassword
                id="old_password"
                name="old_password"
                value={passwords.old_password}
                onChange={handleChange}
                placeholder="Enter current password"
                className={`${errors.old_password ? 'border-red-500' : 'border-gray-600'} bg-gray-700 pl-10`}
                disabled={isLoading}
              />
              {errors.old_password && <ErrorMessage message={errors.old_password} />}
            </FormFieldWrapper>
            
            <FormFieldWrapper>
              <Label htmlFor="new_password">New Password *</Label>
              <ShowHidePassword
                id="new_password"
                name="new_password"
                value={passwords.new_password}
                onChange={handleChange}
                placeholder="Enter new password"
                className={`${errors.new_password ? 'border-red-500' : 'border-gray-600'} bg-gray-700 pl-10`}
                disabled={isLoading}
              />
              {errors.new_password ? (
                <ErrorMessage message={errors.new_password} />
              ) : (
                <p className="text-xs text-gray-400 mt-1">
                  Minimum 8 characters with letters and numbers
                </p>
              )}
            </FormFieldWrapper>
            
            <FormFieldWrapper>
              <Label htmlFor="confirm_new_password">Confirm New Password *</Label>
              <ShowHidePassword
                id="confirm_new_password"
                name="confirm_new_password"
                value={passwords.confirm_new_password}
                onChange={handleChange}
                placeholder="Confirm new password"
                className={`${errors.confirm_new_password ? 'border-red-500' : 'border-gray-600'} bg-gray-700 pl-10`}
                disabled={isLoading}
              />
              {errors.confirm_new_password && <ErrorMessage message={errors.confirm_new_password} />}
            </FormFieldWrapper>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-md disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 flex items-center justify-center min-w-[120px]"
            >
              {isLoading ? (
                <Loader size={15} color="white" /> 
              ) : (
                'Change Password'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordDialog;