import React, { useState, useEffect } from 'react';
import DonationCard from './DonationCard';

const DonationsTab = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://api.example.com/donations/user-donations');
        if (!response.ok) {
          throw new Error('Failed to fetch donations');
        }
        const data = await response.json();
        setDonations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        <h3 className="text-2xl font-semibold text-white mb-4">My Donations</h3>
        <p className="text-gray-400">Loading donation history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        <h3 className="text-2xl font-semibold text-white mb-4">My Donations</h3>
        <p className="text-gray-400">Error: {error}</p>
      </div>
    );
  }

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