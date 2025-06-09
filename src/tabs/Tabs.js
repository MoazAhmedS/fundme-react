// src/tabs/Tabs.js

import React, { useState } from 'react';

function Tabs() {
  const [activeTabs, setActiveTabs] = useState('tab1');

  const tabs = [
    { id: "tab1", label: "Home" },
    { id: "tab2", label: "About" },
    { id: "tab3", label: "Services" },
    { id: "tab4", label: "Contact" },
  ];

  const tabContents = {
    tab1: (
      <div>
        <h2 className='mb-3 text-2xl font-bold text-white'>Welcome to Our Site!</h2>
        <p className='mb-2 text-gray-300'>Explore the latest articles and resources to stay up-to-date with industry trends.</p>
      </div>
    ),
    tab2: (
      <div>
        <h2 className='mb-4 text-2xl font-bold text-white'>About Us</h2>
        <p className='mb-4 text-gray-300'>We are a team of dedicated professionals committed to providing exceptional service and innovative solutions.</p>
      </div>
    ),
    tab3: (
      <div>
        <h2 className='mb-4 text-2xl font-bold text-white'>Our Services</h2>
        <p className='mb-4 text-gray-300'>From consulting to implementation, we offer comprehensive services tailored to meet your unique needs.</p>
      </div>
    ),
    tab4: (
      <div>
        <h2 className='mb-4 text-2xl font-bold text-white'>Contact Us</h2>
        <p className='mb-4 text-gray-300'>Reach out to us today for inquiries, quotes, or just to say hello. We're here to help!</p>
      </div>
    ),
  };

  return (
    <div className='max-w-[500px] rounded-3xl border bg-black p-8 mx-10 shadow-xl space-y-5'>
      <div className='flex flex-wrap border-b'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-semibold border-b-4 ${tab.id === activeTabs ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTabs(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabContents[activeTabs]}
      </div>
    </div>
  );
}

export default Tabs;