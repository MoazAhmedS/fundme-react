import { Heart, Users, Target } from 'lucide-react';

const ValuesSection = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-purple-400" />,
      title: "Passion",
      description: "We believe in the power of passionate individuals to create meaningful change in the world.",
      bgColor: "bg-purple-600/20"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-400" />,
      title: "Community",
      description: "Building strong connections between creators and supporters to foster collaboration and growth.",
      bgColor: "bg-blue-600/20"
    },
    {
      icon: <Target className="h-8 w-8 text-green-400" />,
      title: "Impact",
      description: "Every project we support is chosen for its potential to create positive impact in the world.",
      bgColor: "bg-green-600/20"
    },
    {
      icon: <Heart className="h-8 w-8 text-yellow-400" />,
      title: "Innovation",
      description: "Encouraging creative thinking and groundbreaking ideas that push boundaries.",
      bgColor: "bg-yellow-600/20"
    },
    {
      icon: <Users className="h-8 w-8 text-red-400" />,
      title: "Transparency",
      description: "Maintaining open communication and honesty in all our operations and decisions.",
      bgColor: "bg-red-600/20"
    },
    {
      icon: <Target className="h-8 w-8 text-indigo-400" />,
      title: "Excellence",
      description: "Striving for the highest standards in everything we do to deliver exceptional results.",
      bgColor: "bg-indigo-600/20"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
            <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
              <div className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;