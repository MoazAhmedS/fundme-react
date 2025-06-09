import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ShowHidePassword = ({ id, value, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-lg bg-[#1e1e3f] text-white border border-gray-600 pr-10"
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
