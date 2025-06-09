import React from 'react';
import HeroSection from '../about/HeroSection';
import Navbar from '../NavigationComponents/Navbar';
import Footer from '../NavigationComponents/Footer';
import MissionSection from '../about/MissionSection';
import TeamSection from '../about/TeamSection';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar/>
      <HeroSection />
      <MissionSection/>
      <TeamSection/>
      <Footer/>
    </div>
  );
};

export default AboutUs;