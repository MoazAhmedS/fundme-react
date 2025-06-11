import React from "react";
import { FaFacebook } from "react-icons/fa";

const FacebookButton = () => {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-lg bg-[#2362eb] hover:bg-[#2d4373] text-white font-medium text-sm transition"
    >
      <FaFacebook size={20} />
      Continue with Facebook
    </button>
  );
};

export default FacebookButton;
