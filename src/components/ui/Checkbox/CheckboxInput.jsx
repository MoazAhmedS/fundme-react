// src/components/common/Checkbox/Checkbox.jsx
const Checkbox = ({ 
  label, 
  name, 
  checked, 
  onChange, 
  disabled = false,
  size = 'md',
  className = ''
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <label className={`inline-flex items-center space-x-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`form-checkbox rounded text-purple-600 focus:ring-purple-500 ${sizes[size]}`}
      />
      {label && <span className="text-gray-700">{label}</span>}
    </label>
  );
};

export default Checkbox;