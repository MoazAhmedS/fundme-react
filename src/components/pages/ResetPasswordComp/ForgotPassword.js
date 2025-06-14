import React, { useState } from "react";
import FormWrapper from "../../Froms/FormWrapper";
import FormFieldWrapper from "../../Froms/FormFieldWrapper";
import Label from "../../Froms/Label";
import ErrorMessage from "../../Froms/ErrorMessage";
import SubmitButton from "../../Froms/SubmitButton";
import ProjectName from "../../NavigationComponents/ProjectName";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { Link , useNavigate} from "react-router-dom";
import { axiosInstance } from "../../../Network/axiosinstance";
import Alert from "../../alert";
import FormInput from "../../Froms/FormInput";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const ForgotPassword = () => {
    document.title = "Forgot Password";
  
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [alertMsg, setAlertMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value) setError("Email is required");
    else if (!validateEmail(e.target.value)) setError("Invalid email format");
    else setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return setError("Email is required");
    if (!validateEmail(email)) return setError("Invalid email format");

    setError("");
    setAlertMsg(null);
    setLoading(true);

    try {
      const res = await axiosInstance.post("/accounts/API/forgot-password/", {
        email,
      });
      const msg = res?.data?.message || "Reset link sent successfully!";
      navigate("/email-reset-password")
      setEmail("");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to send reset link. Please try again.";
      setAlertMsg({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-3 py-2 rounded-lg bg-[#374252] text-white border pr-10 ${
    error ? "border-red-500" : email ? "border-green-500" : "border-gray-600"
  }`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#101827] px-4">
      <div className="mt-8 mb-6">
        <ProjectName />
      </div>

      <FormWrapper
        title="Forgot Password"
        subtitle="Enter your email address and we'll send you a reset link."
      >
        {alertMsg && (
          <Alert
            message={alertMsg.message}
            onClose={() => setAlertMsg(null)}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormFieldWrapper>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <FormInput
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={handleChange}
                className={`${inputClass} pl-10`}
              />
            </div>
            {error && <ErrorMessage message={error} />}
          </FormFieldWrapper>

          <SubmitButton
            text="Send Reset Link"
            isLoading={loading}
            disabled={!!error || !email || loading}
          />

          <div className="text-center mt-4">
            <Link
              to="/login"
              className="text-purple-400 underline text-sm inline-flex items-center gap-1"
            >
              <FaArrowLeft className="text-xs" />
              Back to Login
            </Link>
          </div>
        </form>
      </FormWrapper>
    </div>
  );
};

export default ForgotPassword;