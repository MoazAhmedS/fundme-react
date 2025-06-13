import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const DateInput = ({ name, value, onChange, label, className = "" }) => (
  <div className="relative">
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full bg-[#374252] text-white rounded-lg px-4 py-2 pr-10 border border-gray-600 ${className}`}
    />
  </div>
);

export default DateInput;