import React from "react";

const SelectDropdown = ({ name, value, onChange, options, placeholder }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-[#374252] text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdown;
