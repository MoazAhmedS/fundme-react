import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../../Network/axiosinstance";
import ProgressBar from '../../ProgressBar';
import { Calendar, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../alert';

const DonationCard = ({ project, setProject, isAuthenticated, onRequireLogin }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [error, setError] = useState('');
  const [daysLeft, setDaysLeft] = useState(0);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  
  // Track current donations in component state
  const [currentDonations, setCurrentDonations] = useState(project.current_donations || 0);

  useEffect(() => {
    setCurrentDonations(project.current_donations || 0);
  }, [project.current_donations]);

  useEffect(() => {
    const currentDate = new Date();
    const endDate = new Date(project.end_date);
    const timeDiff = endDate - currentDate;

    if (timeDiff < 0) {
      setProject(prev => ({ ...prev, status: false }));
      setDaysLeft(0);
    } else {
      setDaysLeft(Math.ceil(timeDiff / (1000 * 3600 * 24)));
    }
  }, [project.end_date, setProject]);

  const handleDonate = async () => {
    // Check authentication first
    if (!isAuthenticated) {
      onRequireLogin();
      return;
    }

    // Validate donation amount
    if (!donationAmount || Number(donationAmount) <= 0) {
      setAlert({message:'Please enter a valid donation amount'});
      return;
    }

    try {
      const response = await axiosInstance.post(
        `donation/API/projects/${project.id}/donate/`, 
        { amount: Number(donationAmount) }
      );

      // Check if response is successful
      if (response.status >= 200 && response.status < 300) {
        const updatedAmount = Number(donationAmount);
        const newTotal = currentDonations + updatedAmount;
        
        // Update local state immediately
        setCurrentDonations(newTotal);

        // Clear error and donation amount
        setDonationAmount('');
        setError('');

        // Show success message
        setAlert({
          message: `Thank you for your donation of $${updatedAmount}!`,
          type: 'success'
        });

        // Update parent state
        setProject((prev) => ({
          ...prev,
          current_donations: newTotal,
          backers: (prev.backers || 0) + 1,
        }));
      } else {
        throw new Error('Failed to process donation');
      }
    } catch (err) {
      console.error('Error during donation:', err);
      const errorMsg = err.response?.data?.error || 
                      err.response?.data?.message || 
                      'Failed to process donation';
      setAlert({
        message: errorMsg,
        type: 'error'
      });
    }
  };

  // Effect to update parent state whenever `currentDonations` changes
  useEffect(() => {
    setProject((prev) => ({
      ...prev,
      current_donations: currentDonations
    }));
  }, [currentDonations, setProject]);

  // Calculate progress percentage using local state
  const progressPercentage = Math.min(100, ((currentDonations / project.target) * 100).toFixed(2));

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-96" style={{ height: 'fit-content' }}>
      {alert && (
        <div className="mb-4">
          <Alert 
            message={alert.message} 
            type={alert.type} 
            onClose={() => setAlert(null)} 
          />
        </div>
      )}
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-300">Progress</span>
        </div>
        <ProgressBar percentage={progressPercentage} />
      </div>
      
      <div className="flex justify-between text-center mb-6">
        <div>
          <p className="text-2xl font-bold text-white flex items-center justify-center">
            <Target size={20} className="mr-1"/> 
            ${(project.target || 0).toLocaleString()}
          </p>
          <p className="text-sm text-gray-400">Target</p>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-green-400 flex items-center justify-center">
            <TrendingUp size={20} className="mr-1"/> 
            ${currentDonations.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400">Current</p>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-white flex items-center justify-center">
            <Calendar size={20} className="mr-1"/> 
            {daysLeft}
          </p>
          <p className="text-sm text-gray-400">Days left</p>
        </div>
      </div>
      
      <input
        type="number"
        value={donationAmount}
        onChange={(e) => {
          setDonationAmount(e.target.value);
          setError('');
        }}
        placeholder="Enter amount ($)"
        className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        min="1"
        disabled={!project.status || daysLeft <= 0}
      />
      
      <button
        onClick={handleDonate}
        className={`w-full p-3 rounded-lg text-white font-bold transition-all duration-200 ${
          !project.status || daysLeft <= 0 
            ? 'bg-gray-600 cursor-not-allowed'
            : isAuthenticated
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
              : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
        }`}
        disabled={!project.status || daysLeft <= 0}
      >
        {!project.status || daysLeft <= 0 
          ? 'Project Ended'
          : isAuthenticated
            ? `Donate $${donationAmount || 0}`
            : 'Login to Donate'
        }
      </button>
    

      {!isAuthenticated && (
        <p className="text-gray-400 mt-4 text-sm text-center">
          You need to be logged in to make a donation
        </p>
      )}
    </div>
  );
};

export default DonationCard;