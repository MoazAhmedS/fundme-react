import React from "react";

export const CTSCard = ({ icon: Icon, title, description, items, fcolor, tcolor ,hovColor}) => {
   const ffcolor = fcolor || "from-purple-600";
   const ttcolor = tcolor || "to-blue-600";
   const hhovColor = hovColor || "hover:border-purple-600";
  return (
    <div className={`text-center p-8 bg-gray-800/40 rounded-xl border border-gray-700 ${hhovColor} transition-colors group`}>
      <div className={`w-16 h-16 bg-gradient-to-r ${ffcolor} ${ttcolor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="text-left text-gray-300 space-y-2">
        {items.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
};
