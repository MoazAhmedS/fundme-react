import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa";

const EmailResetNotice = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#101827] text-white px-4">
      <div className="max-w-md w-full bg-[#1f2937] p-8 rounded-xl shadow-lg text-center">
        <FaEnvelopeOpenText className="text-yellow-400 text-6xl mb-4 mx-auto" />
        <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
        <p className="mb-4">
          A reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.
        </p>
        <Link to="/login" className="inline-block mt-4 text-purple-300 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default EmailResetNotice;
