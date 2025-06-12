import React from "react";

const FormWrapper = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-md bg-[#17202f] p-8 rounded-2xl shadow-lg">
      {title && (
        <h2 className="text-2xl font-semibold text-white text-center">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-sm text-[#8c94a2] text-center mt-1 mb-4">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};

export default FormWrapper;