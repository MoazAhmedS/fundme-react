import React from 'react';
import { Link } from 'react-router-dom';

const DonationCard = ({ donation }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg flex justify-between items-center hover:bg-gray-600 transition-colors duration-300">
      <div>
        <Link to={`/project/${donation.projectSlug}`}>
          <h3 className="text-lg font-semibold text-white hover:text-purple-400 transition-colors">
            {donation.projectName}
          </h3>
        </Link>
        <p className="text-gray-400">
          Donated on {new Date(donation.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
      
      <div className="text-right">
        <p className="text-green-400 font-semibold">
          ${donation.amount.toLocaleString()}
        </p>
        {donation.recurring && (
          <span className="text-xs text-gray-400">(Recurring)</span>
        )}
      </div>
    </div>
  );
};

export default DonationCard;