import React from 'react';
import { Link } from 'react-router-dom';

const DonationCard = ({ donation }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg flex justify-between items-center hover:bg-gray-600 transition-colors duration-300">
      <div>
        <p className="text-white font-medium text-left">
          {donation.project_title}
        </p>
        <p className="text-gray-400 text-sm">
          Donated on{' '}
          {new Date(donation.donation_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      <div className="text-right">
        <p className="text-green-400 font-semibold">
          ${parseFloat(donation.amount).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default DonationCard;
