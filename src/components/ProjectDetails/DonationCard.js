import React from 'react';
import { User, Calendar } from 'lucide-react';
import ProgressBar from '../ProgressBar';

const DonationCard = ({ 
  project, 
  currentDonations, 
  donationAmount, 
  setDonationAmount, 
  handleDonate, 
  error, 
  percentage 
}) => {
  return (
    <div className="flex-none bg-gray-800 rounded-xl p-8 h-fit top-6 shadow-lg" style={{ width: '420px' }}>
      {/* Progress Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-300 text-lg">Progress</span>
        </div>
        <ProgressBar percentage={percentage} />
      </div>
      
      {/* Stats Row */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-3xl font-bold text-white mb-1">
            ${currentDonations.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400">Raised</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-white mb-1 flex items-center justify-center">
            <User className="mr-2" size={24} />
            {project.backers}
          </p>
          <p className="text-sm text-gray-400">Backers</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-white mb-1 flex items-center justify-center">
            <Calendar className="mr-2" size={24} />
            {project.days_left}
          </p>
          <p className="text-sm text-gray-400">Days left</p>
        </div>
      </div>

      {/* Donation Input */}
      <input
        type="number"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
        placeholder="Enter amount ($)"
        className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 mb-4 border border-gray-600 focus:border-blue-500 focus:outline-none text-lg"
      />

      {/* Donate Button */}
      <button
        onClick={handleDonate}
        className="w-full p-4 mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 font-bold text-lg transition-all duration-200 transform hover:scale-105"
      >
        Donate ${donationAmount || 0}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
          <p className="text-red-400 text-center text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default DonationCard;