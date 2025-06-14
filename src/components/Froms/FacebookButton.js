import React, { useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Network/axiosinstance"; // adjust path
import Alert from "../alert"; // adjust if stored elsewhere

const FacebookButton = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  const handleFacebookResponse = async (response) => {
    const accessToken = response.accessToken;

    try {
      const res = await axiosInstance.post("/accounts/API/auth/facebook/", {
        access_token: accessToken,
      });

      const { token, user, message } = res.data;

      if (message) {
        // Account created but not verified
        navigate("/verify-email");
      } else if (token) {
        // Login success
        localStorage.setItem("token", token);
        localStorage.setItem("fname", user.first_name);
        localStorage.setItem("avatar", user.image);
        console.log("Facebook login successful:", res.data);
        navigate("/");
      } else {
        setAlertMessage("Unexpected response from server.");
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.error ||
        "Facebook login failed. Please try again.";
      setAlertMessage(errMsg);
    }
  };

  return (
    <>
      {alertMessage && (
        <div className="mb-4">
          <Alert message={alertMessage} onClose={() => setAlertMessage("")} />
        </div>
      )}
      <FacebookLogin
        appId="1771344910478742"
        autoLoad={false}
        callback={handleFacebookResponse}
        fields="name,email,picture"
        render={(renderProps) => (
          <button
            type="button"
            onClick={renderProps.onClick}
            className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-lg bg-[#2362eb] hover:bg-[#2d4373] text-white font-medium text-sm transition"
          >
            <FaFacebook size={20} />
            Continue with Facebook
          </button>
        )}
      />
    </>
  );
};

export default FacebookButton;
