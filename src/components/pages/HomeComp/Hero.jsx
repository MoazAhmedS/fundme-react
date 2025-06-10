import React from 'react';
import GradientButton from '../../GradientButton';
import { ArrowRight } from 'lucide-react';
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-blue-900/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Fund the{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover groundbreaking projects, support innovative creators, and be part of the next big thing. 
            Your contribution can change the world.
          </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <GradientButton className="!w-fit group">
                <span className="flex items-center">
                Start Funding Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
            </GradientButton>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-800">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">$2.5M+</div>
              <div className="text-gray-400 mt-2">Total Funded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">1,250+</div>
              <div className="text-gray-400 mt-2">Projects Funded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">25K+</div>
              <div className="text-gray-400 mt-2">Happy Backers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;