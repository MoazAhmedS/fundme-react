import { icons } from 'lucide-react';

const ContactInfoCard = ({ icon, title, value, description }) => {
  const IconComponent = icons[icon];
  
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300">
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
          {IconComponent && <IconComponent className="h-8 w-8 text-purple-400" />}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-lg font-medium text-purple-400 mb-2">{value}</p>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ContactInfoCard;