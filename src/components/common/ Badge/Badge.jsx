const Badge = ({ children, variant = "default" }) => {
  const baseStyle = "inline-flex items-center px-3 py-1 text-sm font-medium rounded-full";

  const variants = {
    default: "bg-purple-100 text-purple-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <span className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;
