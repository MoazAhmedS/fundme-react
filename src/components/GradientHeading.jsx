import React from "react";

const GradientHeading = ({ text }) => {
  return (
    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
      {text}
    </h1>
  );
};

export default GradientHeading;
