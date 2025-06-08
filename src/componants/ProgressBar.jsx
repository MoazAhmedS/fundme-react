import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="relative w-full">
      <div className="absolute right-0 -top-6 text-sm text-gray-400 font-medium">
        {percentage}%
      </div>

      <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
        <div
          className="bg-purple-500 h-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressBar;
