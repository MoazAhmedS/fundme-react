import React, { useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FaFacebook } from "react-icons/fa";
import { useNavigate,useLocation } from "react-router-dom";
import { axiosInstance } from "../../Network/axiosinstance"; 
import Alert from "../alert"; 

const FacebookButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [alertMessage, setAlertMessage] = useState("");

  const handleFacebookResponse = async (response) => {
    const accessToken = response.accessToken;

    try {
      const res = await axiosInstance.post("/accounts/API/auth/facebook/", {
        access_token: accessToken,
      });

      const { token, user, message } = res.data;

      if (message) {
        navigate("/verify-email");
      } else if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("fname", user.first_name);
        localStorage.setItem("avatar", user.image);
        localStorage.setItem("super", user.is_superuser);
        localStorage.setItem("user_id", user.id);

        console.log("Facebook login successful:", res.data);
        const from = location.state?.from || "/";
        navigate(from);
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
