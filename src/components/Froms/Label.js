const Label = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-1 text-sm font-medium text-white"
    >
      {children}
    </label>
  );
};

export default Label;
