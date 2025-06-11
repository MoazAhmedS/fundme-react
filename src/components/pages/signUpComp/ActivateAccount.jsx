import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { axiosInstance } from '../../../Network/axiosinstance';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Activating your account...");
  const [success, setSuccess] = useState(null); // null = loading, true = success, false = error

  useEffect(() => {
    axiosInstance
      .get(`/accounts/API/activate/${uid}/${token}/`)
      .then((res) => {
        const backendMessage = res?.data?.message || "Account activated.";
        setMessage(backendMessage);
        setSuccess(true);
        setTimeout(() => navigate("/login"), 10000);
      })
      .catch((err) => {
        const errMessage =
          err.response?.data?.message ||
          "Activation failed. Invalid or expired link.";
        setMessage(errMessage);
        setSuccess(false);
      });
  }, [uid, token, navigate]);

  const renderIcon = () => {
    if (success === null)
      return <FaSpinner className="animate-spin text-yellow-400 text-4xl mb-4" />;
    if (success)
      return <FaCheckCircle className="text-green-500 text-4xl mb-4" />;
    return <FaTimesCircle className="text-red-500 text-4xl mb-4" />;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#101827] px-4">
      <div className="max-w-md w-full bg-[#1f2937] p-8 rounded-xl shadow-lg text-center text-white">
<div className="flex justify-center mb-4">
  {renderIcon()}
</div>
        <h1 className="text-2xl font-bold mb-3">
          {success === null
            ? "Activating..."
            : success
            ? "Activation Successful"
            : "Activation Failed"}
        </h1>
        <p className="mb-6 text-gray-300">{message}</p>
        {success !== null && (
          <Link
            to="/login"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Go to Login
          </Link>
        )}
        {success && (
          <p className="text-sm text-gray-400 mt-3">Redirecting in 10 seconds...</p>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;
