import React, { useState } from "react";
import FormWrapper from "../Froms/FormWrapper";
import FormFieldWrapper from "../Froms/FormFieldWrapper";
import Label from "../Froms/Label";
import ErrorMessage from "../Froms/ErrorMessage";
import SubmitButton from "../Froms/SubmitButton";
import ProjectName from "../NavigationComponents/ProjectName";
import { FaEnvelope } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);

    if (!e.target.value) {
      setError("Email is required");
    } else if (!validateEmail(e.target.value)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
    } else if (!validateEmail(email)) {
      setError("Invalid email format");
    } else {
      setError("");
      alert("Reset link sent!");
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
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email Address */}
          <FormFieldWrapper>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
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

          <SubmitButton text="Send Reset Link" isLoading={false} disabled={!!error || !email} />

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