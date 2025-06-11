import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormWrapper from "../../Froms/FormWrapper";
import FormFieldWrapper from "../../Froms/FormFieldWrapper";
import Label from "../../Froms/Label";
import ErrorMessage from "../../Froms/ErrorMessage";
import ShowHidePassword from "../../Froms/ShowHidePassword";
import SubmitButton from "../../Froms/SubmitButton";
import FacebookButton from "../../Froms/FacebookButton";
import ProjectName from "../../NavigationComponents/ProjectName";
import FileUploader from "../../Froms/FileUploader";
import Alert from "../../alert"; // Adjust the path if needed
import { axiosInstance } from "../../../Network/axiosinstance"; // Adjust the path if needed
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Validators
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateName = (name) => /^\S+$/.test(name);
const validatePhone = (phone) => /^(010|011|012|015)\d{8}$/.test(phone);
const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profilePicture: null,
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value) return `${name === "firstName" ? "First" : "Last"} name is required`;
        if (!validateName(value)) return `${name === "firstName" ? "First" : "Last"} name must not contain spaces`;
        break;
      case "email":
        if (!value) return "Email is required";
        if (!validateEmail(value)) return "Invalid email format";
        break;
      case "phone":
        if (!value) return "Phone number is required";
        if (!validatePhone(value)) return "Invalid phone number format";
        break;
      case "profilePicture":
        if (!value) return "Profile picture is required";
        break;
      case "password":
        if (!value) return "Password is required";
        if (!validatePassword(value))
          return "Password must be at least 8 characters, include uppercase, lowercase, digit, and special character";
        break;
      case "confirmPassword":
        if (!value) return "Confirm password is required";
        if (value !== formData.password) return "Passwords do not match";
        break;
      case "termsAccepted":
        if (!value) return "You must accept the terms";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    const errorMsg = validateField(name, val);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
      ...(name === "password" && formData.confirmPassword
        ? { confirmPassword: validateField("confirmPassword", formData.confirmPassword) }
        : {}),
    }));
  };

  const isFormValid =
    Object.values(errors).every((e) => e === "") &&
    Object.entries(formData).every(
      ([key, val]) => (key === "profilePicture" ? val !== null : val !== "" && val !== false)
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);
    setServerError("");

    if (Object.values(newErrors).every((err) => err === "")) {
      const submissionData = new FormData();
      submissionData.append("first_name", formData.firstName);
      submissionData.append("last_name", formData.lastName);
      submissionData.append("email", formData.email);
      submissionData.append("phone", formData.phone);
      submissionData.append("password", formData.password);
      submissionData.append("confirm_password", formData.confirmPassword);
      submissionData.append("image", formData.profilePicture);

      try {
        const response = await axiosInstance.post("/accounts/API/register/", submissionData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
          navigate("/email-verification");
      } catch (err) {
        const data = err.response?.data;
        if (typeof data === "object") {
          const messages = Object.values(data).flat().join(" ");
          setServerError(messages);
        } else {
          setServerError("Something went wrong during sign up.");
        }
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

      {successMessage && (
        <div className="w-full bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-2 rounded-lg flex items-center mb-4">
          <button onClick={() => setSuccessMessage("")} className="mr-3">
            <span className="text-green-700 font-bold">×</span>
          </button>
          <span>{successMessage}</span>
        </div>
      )}
      {serverError && (
        <div className="mb-4">
          <Alert message={serverError} onClose={() => setServerError("")} />
        </div>
      )}
      <FormWrapper title="Create Account" subtitle="Join our community of innovators">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <FormFieldWrapper>
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="firstName"
                  id="firstName"
                  placeholder="e.g. John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`${inputClass("firstName")} pl-10`}
                />
              </div>
              {errors.firstName && <ErrorMessage message={errors.firstName} />}
            </FormFieldWrapper>

            {/* Last Name */}
            <FormFieldWrapper>
              <Label htmlFor="lastName">Last Name</Label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="lastName"
                  id="lastName"
                  placeholder="e.g. Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`${inputClass("lastName")} pl-10`}
                />
              </div>
              {errors.lastName && <ErrorMessage message={errors.lastName} />}
            </FormFieldWrapper>
          </div>

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

          {/* Phone */}
          <FormFieldWrapper>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                name="phone"
                id="phone"
                type="tel"
                placeholder="e.g. 01012345678"
                value={formData.phone}
                onChange={handleChange}
                className={`${inputClass("phone")} pl-10`}
              />
            </div>
            {errors.phone && <ErrorMessage message={errors.phone} />}
          </FormFieldWrapper>

          {/* Profile Picture */}
          <FormFieldWrapper>
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <FileUploader
              id="profilePicture"
              name="profilePicture"
              onChange={handleChange}
              error={errors.profilePicture}
            />
            {errors.profilePicture && <ErrorMessage message={errors.profilePicture} />}
          </FormFieldWrapper>

          {/* Password */}
          <FormFieldWrapper>
            <Label htmlFor="password">Password</Label>
            <ShowHidePassword
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`${inputClass("password")} pl-10`}
            />
            {errors.password && <ErrorMessage message={errors.password} />}
          </FormFieldWrapper>

          {/* Confirm Password */}
          <FormFieldWrapper>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <ShowHidePassword
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className={`${inputClass("confirmPassword")} pl-10`}
            />
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword} />
            )}
          </FormFieldWrapper>

          {/* Terms */}
          <FormFieldWrapper>
            <label className="text-white flex items-center space-x-2">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>
            {errors.termsAccepted && (
              <ErrorMessage message={errors.termsAccepted} />
            )}
          </FormFieldWrapper>

          <SubmitButton text="Create Account" isLoading={false} disabled={!isFormValid} />

          <p className="text-sm text-white text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 underline">
              Sign in
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

export default SignUp;
