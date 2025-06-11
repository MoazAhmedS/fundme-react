import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from '../ProgressBar';
import { Calendar, Target, TrendingUp } from 'lucide-react';

const DonationCard = ({ project, setProject }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [error, setError] = useState('');
  const [daysLeft, setDaysLeft] = useState(0);
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
    if (!donationAmount || Number(donationAmount) <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/donation/API/projects/${project.id}/donate/`, 
        { amount: Number(donationAmount) },
        {
          headers: {
            Authorization: `Token 98ab31bfe9196f9c17b5cc2c5c593585dec5401d`,
          }
        }
      );

      if (response.status === 200) {
        const updatedAmount = Number(donationAmount);
        const newTotal = currentDonations + updatedAmount;
        
        // Update local state immediately
        setCurrentDonations(newTotal);

        // Update parent state
        setProject(prev => ({
          ...prev,
          current_donations: newTotal,
          backers: (prev.backers || 0) + 1
        }));

        setDonationAmount('');
        setError('');
      } else {
        setError('Failed to process donation');
      }
    } catch (err) {
      console.error('Error during donation:', err);
      setError(err.response?.data?.detail || 'Failed to process donation');
    }
  };

  // Calculate progress percentage using local state
  const progressPercentage = ((currentDonations / project.target) * 100).toFixed(2);

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-96" style={{ height: 'fit-content' }}>
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-300">Progress</span>
          <span className="text-gray-300">{progressPercentage}%</span>
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
        onChange={(e) => setDonationAmount(e.target.value)}
        placeholder="Enter amount ($)"
        className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        min="1"
      />
      
      <button
        onClick={handleDonate}
        className="w-full p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-bold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
        disabled={!project.status || daysLeft <= 0}
      >
        {project.status && daysLeft > 0 
          ? `Donate $${donationAmount || 0}`
          : 'Project Ended'
        }
      </button>
      
      {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
    </div>
  );
};

export default DonationCard;