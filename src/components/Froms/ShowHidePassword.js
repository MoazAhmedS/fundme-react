import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
const ShowHidePassword = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  className = "",
  placeholder = "",
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder} 
        className={`w-full px-3 py-2 rounded-lg bg-[#1e1e3f] text-white border pr-10 ${className}`}
      />
      <div
        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-white"
        onClick={() => setShow(!show)}
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </div>
    </div>
  );
};
export default ShowHidePassword;