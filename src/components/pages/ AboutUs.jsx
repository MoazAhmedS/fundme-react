import React from 'react';
import HeroSection from '../about/HeroSection';
import Navbar from '../NavigationComponents/Navbar';
import Footer from '../NavigationComponents/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
     <Navbar/>
      <HeroSection />
      <Footer/>
    </div>
  );
};

export default AboutUs;