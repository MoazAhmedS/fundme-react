import React from 'react';
import Card from './Card';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Moaz Ahmad Sayed",
      role: "BackEnd Developer",
      bio: "Passionate about connecting innovative projects with supporters worldwide.",
      image: "moaz.jpeg"
    }, {
      name: "Abdullah ayman mohamed",
      role: "BackEnd Developer",
      bio: "Passionate about connecting innovative projects with supporters worldwide.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786"
    }, {
      name: "Mahmoud Samir Oraby",
      role: "FrontEnd Developer",
      bio: "Passionate about connecting innovative projects with supporters worldwide.",
      image: "oraby.jpeg"
    }, {
      name: "Girgis Kelliny Girgis ",
      role: "BackEnd Developer",
      bio: "Passionate about connecting innovative projects with supporters worldwide.",
      image: "girgis.jpeg"
    }, {
      name: "Ebram Rasmy Ayad Zakher",
      role: "FrontEnd Developer",
      bio: "Passionate about connecting innovative projects with supporters worldwide.",
      image: "Ebram.jpeg"
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The passionate individuals working to make innovation accessible to everyone
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <img 
                src={member.image} 
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-purple-400 font-medium mb-3">{member.role}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;