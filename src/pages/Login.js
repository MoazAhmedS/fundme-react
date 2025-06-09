import React, { useState } from "react";
import FormWrapper from "../components/Froms/FormWrapper";
import FormFieldWrapper from "../components/Froms/FormFieldWrapper";
import Label from "../components/Froms/Label";
import ErrorMessage from "../components/Froms/ErrorMessage";
import ShowHidePassword from "../components/Froms/ShowHidePassword";
import SubmitButton from "../components/Froms/SubmitButton";
import FacebookButton from "../components/Froms/FacebookButton";
import ProjectName from "../components/NavigationComponents/ProjectName";
import { FaEnvelope } from "react-icons/fa";


const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!validateEmail(value)) return "Invalid email format";
        break;
      case "password":
        if (!value) return "Password is required";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const isFormValid =
    Object.values(errors).every((e) => e === "") &&
    Object.values(formData).every((val) => val !== "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).every((err) => err === "")) {
      alert("Login successful!");
    }
  };

  const inputClass = (field) =>
    `w-full px-3 py-2 rounded-lg bg-[#374252] text-white border pr-10 ${
      errors[field]
        ? "border-red-500"
        : formData[field]
        ? "border-green-500"
        : "border-gray-600"
    }`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#101827] px-4">
      <div className="mt-8 mb-6">
        <ProjectName />
      </div>

      <FormWrapper title="Welcome Back" subtitle="Sign in to your account">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email */}
          <FormFieldWrapper>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                id="email"
                type="email"
                placeholder="example@domain.com"
                value={formData.email}
                onChange={handleChange}
                className={`${inputClass("email")} pl-10`}
              />
            </div>
            {errors.email && <ErrorMessage message={errors.email} />}
          </FormFieldWrapper>

          {/* Password */}
            <FormFieldWrapper>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <ShowHidePassword
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`${inputClass("password")} pl-10`} 
                    />
                </div>
                {errors.password && <ErrorMessage message={errors.password} />}
            </FormFieldWrapper>



          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2 text-white">
              <input type="checkbox" name="rememberMe" />
              <span>Remember me</span>
            </label>

            <a href="/forgot-password" className="text-purple-400 underline">
              Forgot Password?
            </a>
          </div>

          <SubmitButton text="Login" isLoading={false} disabled={!isFormValid} />

          <p className="text-sm text-white text-center mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-purple-400 underline">
              Sign up
            </a>
          </p>

          <p className="text-sm text-white text-center mt-2">Or continue with</p>

          <div className="mt-2">
            <FacebookButton />
          </div>
        </form>
      </FormWrapper>
    </div>
  );
};

export default Login;
