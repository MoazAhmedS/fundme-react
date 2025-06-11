import React, { useState } from "react";
import FormWrapper from "../Froms/FormWrapper";
import FormFieldWrapper from "../Froms/FormFieldWrapper";
import Label from "../Froms/Label";
import ErrorMessage from "../Froms/ErrorMessage";
import ShowHidePassword from "../Froms/ShowHidePassword";
import SubmitButton from "../Froms/SubmitButton";
import ProjectName from "../NavigationComponents/ProjectName";

const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (!value) return "This field is required";

    if (name === "newPassword" && !validatePassword(value)) {
      return "Password must be at least 8 characters long, include uppercase, lowercase, digit, and special character";
    }

    if (name === "confirmPassword" && value !== formData.newPassword) {
      return "Passwords do not match";
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
      alert("Password reset successfully!");
      // TODO: Send request to backend
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

      <FormWrapper
        title="Reset Your Password"
        subtitle="Enter your new password below"
      >
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* New Password */}
          <FormFieldWrapper>
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <ShowHidePassword
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                className={`${inputClass("newPassword")} pl-10`}
              />
            </div>
            {errors.newPassword && (
              <ErrorMessage message={errors.newPassword} />
            )}
          </FormFieldWrapper>

          {/* Confirm New Password */}
          <FormFieldWrapper>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <ShowHidePassword
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${inputClass("confirmPassword")} pl-10`}
              />
            </div>
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword} />
            )}
          </FormFieldWrapper>

          <p className="text-xs text-gray-400">
            Password must be at least 8 characters long
          </p>

          <SubmitButton text="Reset Password" isLoading={false} disabled={!isFormValid} />
        </form>
      </FormWrapper>
    </div>
  );
};

export default ResetPassword;
