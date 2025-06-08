import React from "react";
import PropTypes from "prop-types";

const GradientButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition ${className}`}
    >
      {children}
    </button>
  );
};

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default GradientButton;
