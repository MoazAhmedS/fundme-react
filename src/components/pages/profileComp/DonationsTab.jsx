import React from 'react';
import DonationCard from './DonationCard';

const DonationsTab = ({ donations = [] }) => {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
      <h3 className="text-2xl font-semibold text-white mb-6">My Donations</h3>

      {donations.length === 0 ? (
        <p className="text-gray-400">You haven't made any donations yet.</p>
      ) : (
        <div className="space-y-4">
          {donations.map((donation) => (
            <DonationCard 
              key={donation.id}
              donation={donation}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationsTab;
