// CategoryCard.jsx
import React from "react";
import {
  Laptop,
  Stethoscope,
  GraduationCap,
  Leaf,
  Palette,
  Heart,
  Zap,
  Shirt,
  Folder
} from "lucide-react";

const iconMap = {
  Technology: Laptop,
  Healthcare: Stethoscope,
  Education: GraduationCap,
  Environment: Leaf,
  Arts: Palette,
  "Social Impact": Heart,
  Energy: Zap,
  Fashion: Shirt
};

export const CategoryCard = ({ category, projectsCount = 0 }) => {
  const Icon = iconMap[category.name] || Folder;

  return (
    <div
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 group hover:scale-105 cursor-pointer"
      onClick={() => console.log(`Selected category: ${category.name}`)}
    >
      <div className="flex flex-col items-center text-center">
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-4 rounded-full mb-4 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all duration-300">
          <Icon className="h-8 w-8 text-purple-400 group-hover:text-purple-300" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
          {category.name}
        </h3>
        <p className="text-gray-400 text-sm mb-3">
          Inspiring projects in {category.name.toLowerCase()}
        </p>
      </div>
    </div>
  );
};
