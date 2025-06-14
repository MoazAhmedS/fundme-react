import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormWrapper from "../Froms/FormWrapper";
import FormFieldWrapper from "../Froms/FormFieldWrapper";
import Label from "../Froms/Label";
import ErrorMessage from "../Froms/ErrorMessage";
import ShowHidePassword from "../Froms/ShowHidePassword";
import SubmitButton from "../Froms/SubmitButton";
import FacebookButton from "../Froms/FacebookButton";
import ProjectName from "../NavigationComponents/ProjectName";
import { FaEnvelope } from "react-icons/fa";
import { axiosInstance } from "../../Network/axiosinstance";
import Alert from "../alert";
import { useNavigate } from "react-router-dom";
import FormInput from "../Froms/FormInput";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).every((err) => err === "")) {
      try {
        const response = await axiosInstance.post("/accounts/API/Login/", formData);
        const { token,user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("fname", user.first_name);
        localStorage.setItem("avatar", user.image);
        localStorage.setItem("super", user.is_superuser);
        localStorage.setItem("user_id", user.id);

        console.log(token);
        navigate("/");
      } catch (error) {
        const errMsg = error.response?.data?.message || "Login failed. Check Your Email or Password.";
        setLoginError(errMsg);
      }
    }
  };

  const inputClass = (field) =>
    `w-full px-3 py-2 rounded-lg bg-[#374252] text-white border pr-10 ${errors[field]
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
        {loginError && (
          <div className="mb-4">
            <Alert message={loginError} onClose={() => setLoginError(null)} />
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email */}
          <FormFieldWrapper>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <FormInput
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
              <FormInput type="checkbox" name="rememberMe" />
              <span>Remember me</span>
            </label>

            <Link to="/forgot-password" className="text-purple-400 underline">
              Forgot Password?
            </Link>
          </div>

          <SubmitButton text="Sign in" isLoading={false} disabled={!isFormValid} />

          <p className="text-sm text-white text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-400 underline">
              Sign up
            </Link>
          </p>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-4 text-sm text-white">Or continue with</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <div className="mt-2">
            <FacebookButton />
          </div>
        </form>
      </FormWrapper>
    </div>
  );
};

export default Login;
