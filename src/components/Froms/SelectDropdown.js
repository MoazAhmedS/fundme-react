const SelectDropdown = ({ id, options = [], value, onChange }) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 rounded-lg bg-[#1e1e3f] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#d14afb]"
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdown;
