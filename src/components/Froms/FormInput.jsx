import React from "react";

const FormInput = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
  ...props
}) => {

  return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        {...props}
      />
  );
};

export default FormInput;