import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
            <div 
              key={donation.id}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
            >
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
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationsTab;