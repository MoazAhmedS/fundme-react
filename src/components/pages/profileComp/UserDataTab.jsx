import React, { useState, useEffect, useRef } from 'react';
import DeleteAccountDialog from './DeleteAccountDialog';
import ChangePasswordDialog from './ChangePasswordDialog';
import { Save, Pencil, Plus, Trash } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';
import { axiosInstance } from '../../../Network/axiosinstance';
import FormInput from '../../Froms/FormInput';
import DateInput from '../../Froms/DatePickerComponent';
import FormFieldWrapper from '../../Froms/FormFieldWrapper';
import ErrorMessage from '../../Froms/ErrorMessage';
import Alert from '../../alert';
import { useNavigate } from 'react-router-dom';

const countries = [
  { code: '', name: 'Select Country:' },
  { code: 'EG', name: 'Egypt' },
  { code: 'US', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
];

const validateName = (name) => /^[a-zA-Z]+$/.test(name);
const validatePhone = (phone) => /^(010|011|012|015)\d{8}$/.test(phone);
const validateUrl = (url) => {
  if (!url) return true;
  try {
    new URL(url);
    return /^(https?:\/\/)?(www\.)?facebook\.com\/.+$/.test(url);
  } catch {
    return false;
  }
};

const UserDataTab = ({ user }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    facebookLink: '',
    country: '',
    avatarInitials: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    facebookLink: '',
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });
  const originalUserData = useRef(null);

  useEffect(() => {
    if (user) {
      const initials = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase();
      const newUserData = {
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email,
        phone: user.phone || '',
        birthDate: user.birth_date || '',
        facebookLink: user.facebook || '',
        country: user.country || '',
        avatarInitials: initials,
        avatarUrl: `http://localhost:8000${user.image}` || '',
      };
      
      setUserData(newUserData);
      originalUserData.current = { ...newUserData };
    }
  }, [user]);

  useEffect(() => {
    if (originalUserData.current) {
      const changesDetected = Object.keys(userData).some(key => {
        if (key === 'avatarInitials' || key === 'avatarUrl') return false;
        return userData[key] !== originalUserData.current[key];
      });
      setHasChanges(changesDetected);
    }
  }, [userData]);

  const showAlert = (message, type = 'error') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ ...alert, show: false }), 5000);
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          error = 'This field is required';
        } else if (!validateName(value)) {
          error = 'Should contain only letters with no spaces';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'This field is required';
        } else if (!validatePhone(value)) {
          error = 'Please enter a valid Egyptian phone number (e.g., 01012345678)';
        }
        break;
      case 'facebookLink':
        if (value && !validateUrl(value)) {
          error = 'Please enter a valid Facebook URL (e.g., https://facebook.com/yourprofile)';
        }
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name, value);
  };

  const validateAllFields = () => {
    let isValid = true;
    
    isValid = validateField('firstName', userData.firstName) && isValid;
    isValid = validateField('lastName', userData.lastName) && isValid;
    isValid = validateField('phone', userData.phone) && isValid;
    isValid = validateField('facebookLink', userData.facebookLink) && isValid;
    
    return isValid;
  };

  const handleSave = async () => {
    if (!hasChanges) {
      showAlert('No changes detected', 'info');
      setIsEditing(false);
      return;
    }

    if (!validateAllFields()) {
      showAlert('Please fix all errors before saving', 'error');
      return;
    }

    try {
      const payload = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        birth_date: userData.birthDate || null,
        facebook: userData.facebookLink || null,
        country: userData.country || null,
      };

      if (userData.avatarFile) {
        const formData = new FormData();
        formData.append('image', userData.avatarFile);
        
        const avatarResponse = await axiosInstance.patch(
          '/accounts/API/profile/edit/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        
        if (avatarResponse.data.image) {
          const newImageUrl = avatarResponse.data.image;
          setUserData(prev => ({ 
            ...prev, 
            avatarUrl: avatarResponse.data.image,
            avatarFile: null 
          }));
          const url = new URL(newImageUrl);
          const relativePath = url.pathname;
          localStorage.setItem('avatar', relativePath);
        }
      }

      await axiosInstance.patch('/accounts/API/profile/edit/', payload);
      
      originalUserData.current = { 
        ...userData,
        avatarFile: null 
      };
      
      showAlert('Profile updated successfully', 'success');
      setIsEditing(false);
    } catch (error) {
      showAlert('Failed to update profile. Please try again.', 'error');
      console.error(error);
    }
  };

  const handleDeleteAccount = async (password) => {
    try {
      await axiosInstance.delete('/accounts/API/profile/delete/', {
        data: { password },
      });
      showAlert('Account deleted successfully', 'success');
      localStorage.removeItem('token');
      setTimeout(() => {
          navigate('/');
      }, 2000);
    } catch (error) {
      showAlert('Failed to delete account. Please check your password and try again.', 'error');
      console.error(error);
    }
  };

const handleChangePassword = async (passwords) => {
    try {
      await axiosInstance.patch('/accounts/API/profile/edit/', passwords);
      showAlert('Password changed successfully','success');
      setIsChangePasswordDialogOpen(false);
    } catch (error) {
      showAlert(error.response?.data?.message || 'Failed to change password');
      console.error(error);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        showAlert('Please select an image file', 'error');
        return;
      }
      if (file.size > 2 * 1024 * 1024) { 
        showAlert('Image size should be less than 2MB', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ 
          ...prev, 
          avatarUrl: reader.result,
          avatarFile: file 
        }));
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="rounded-lg text-left border border-gray-700 bg-gray-800 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-white flex items-center justify-between">
          Personal Information
          {isEditing ? (
            <button
              onClick={handleSave}
              disabled={!hasChanges || Object.values(errors).some(error => error)}
              className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-9 rounded-md px-3 ${
                hasChanges && !Object.values(errors).some(error => error)
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 border border-gray-600 hover:bg-gray-700 text-white"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </button>
          )}
        </h3>
      </div>

      <div className="p-6 pt-0 space-y-6">
        {alert.show && (
          <div className="mb-4">
            <Alert 
              message={alert.message} 
              type={alert.type} 
              onClose={() => setAlert({ ...alert, show: false })} 
            />
          </div>
        )}

        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="relative flex h-24 w-24 shrink-0 overflow-hidden rounded-full bg-purple-600">
              {userData.avatarUrl ? (
                <img src={userData.avatarUrl} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center rounded-full text-xl text-white">
                  {userData.avatarInitials}
                </span>
              )}
            </div>
            {isEditing && (
              <label className="absolute -bottom-2 -right-2 rounded-full bg-blue-600 p-2 hover:bg-blue-700 cursor-pointer">
                <Pencil className="h-4 w-4 text-white" />
                <FormInput
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{userData.firstName} {userData.lastName}</h3>
            <p className="text-gray-400">{userData.email}</p>
            {!isEditing && userData.facebookLink && (
              <a
                href={userData.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm flex items-center mt-1"
              >
                <FaFacebook className="w-4 h-4 mr-1 text-blue-600" />
                Facebook Profile
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
              <FormInput
                name="firstName"
                className={`flex h-10 w-full rounded-md border ${errors.firstName ? 'border-red-500' : 'border-gray-600'} bg-gray-700 px-3 py-2 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                disabled={!isEditing}
                value={userData.firstName}
                onChange={handleInputChange}
                onBlur={() => validateField('firstName', userData.firstName)}
              />
              {errors.firstName && <ErrorMessage message={errors.firstName} />}
            </div>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
              <FormInput
                name="lastName"
                className={`flex h-10 w-full rounded-md border ${errors.lastName ? 'border-red-500' : 'border-gray-600'} bg-gray-700 px-3 py-2 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                disabled={!isEditing}
                value={userData.lastName}
                onChange={handleInputChange}
                onBlur={() => validateField('lastName', userData.lastName)}
              />
              {errors.lastName && <ErrorMessage message={errors.lastName} />}
            </div>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email (Not changeable)</label>
              <FormInput
                className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-600 px-3 py-2 text-gray-400 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                disabled
                value={userData.email}
              />
            </div>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="flex gap-2">
                <FormInput
                  type="password"
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  disabled
                  value="********"
                />
                <button
                  onClick={() => setIsChangePasswordDialogOpen(true)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white"
                >
                  Change password
                </button>
              </div>
            </div>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Birth Date
              </label>
              <DateInput
                name="birthDate"
                type="date"
                className="w-full bg-[#374252] text-white rounded-lg px-4 py-2 pr-2 border border-gray-600"
                disabled={!isEditing}
                value={userData.birthDate}
                onChange={handleInputChange}
              />
            </div>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Country
              </label>
              <select
                name="country"
                className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                disabled={!isEditing}
                value={userData.country}
                onChange={handleInputChange}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Facebook Profile Link
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaFacebook className="w-4 h-4 mr-1 text-gray-300" />
                </div>
                <FormInput
                  name="facebookLink"
                  type="url"
                  className={`flex h-10 w-full rounded-md border ${errors.facebookLink ? 'border-red-500' : 'border-gray-600'} bg-gray-700 px-10 py-2 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                  disabled={!isEditing}
                  placeholder="https://facebook.com/yourprofile"
                  value={userData.facebookLink}
                  onChange={handleInputChange}
                  onBlur={() => validateField('facebookLink', userData.facebookLink)}
                />
              </div>
              {errors.facebookLink && <ErrorMessage message={errors.facebookLink} />}
            </div>
          </FormFieldWrapper>

          <FormFieldWrapper>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mobile Phone (Egyptian numbers only) *
              </label>
              <FormInput
                name="phone"
                className={`flex h-10 w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-600'} bg-gray-700 px-3 py-2 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                disabled={!isEditing}
                value={userData.phone}
                onChange={handleInputChange}
                onBlur={() => validateField('phone', userData.phone)}
              />
              {errors.phone && <ErrorMessage message={errors.phone} />}
            </div>
          </FormFieldWrapper>
        </div>

        <div className="flex space-x-4 pt-6 border-t border-gray-700">
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete Account
          </button>
        </div>

        <DeleteAccountDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteAccount}
        />

        <ChangePasswordDialog
          isOpen={isChangePasswordDialogOpen}
          onClose={() => setIsChangePasswordDialogOpen(false)}
          onConfirm={handleChangePassword}
        />
      </div>
    </div>
  );
};

export default UserDataTab;