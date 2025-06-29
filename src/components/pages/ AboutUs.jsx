import React from 'react';
import HeroSection from './about/HeroSection';
import Navbar from '../NavigationComponents/Navbar';
import Footer from '../NavigationComponents/Footer';
import MissionSection from './about/MissionSection';
import TeamSection from './about/TeamSection';
import ImpactSection from './about/ImpactSection';
import ValuesSection from './about/ValuesSection';

const AboutUs = () => {
  document.title = "About Us";
  return (
    <>
    <div className="min-h-screen bg-gray-900 text-white">
      <HeroSection />
      <MissionSection/>
      <ImpactSection/>
      <TeamSection/>
      <ValuesSection/>
    </div>
    </>
  );
};

export default AboutUs;