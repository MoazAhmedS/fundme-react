import React from 'react';
import { Users, Target, Heart, Award } from 'lucide-react';
import Card from './Card';

const ImpactSection = () => {
  const stats = [
    { 
      icon: <Users className="h-12 w-12 mx-auto mb-4 text-purple-400" />, 
      value: "50K+", 
      label: "Active Users" 
    },
    { 
      icon: <Target className="h-12 w-12 mx-auto mb-4 text-purple-400" />, 
      value: "2,500+", 
      label: "Projects Funded" 
    },
    { 
      icon: <Heart className="h-12 w-12 mx-auto mb-4 text-purple-400" />, 
      value: "$15M+", 
      label: "Total Raised" 
    },
    { 
      icon: <Award className="h-12 w-12 mx-auto mb-4 text-purple-400" />, 
      value: "78%", 
      label: "Success Rate" 
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} hoverEffect={false}>
              {stat.icon}
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
