const FormWrapper = ({ title, children }) => {
  return (
    <div className="max-w-md w-full bg-[#1a1a3b] text-white rounded-2xl shadow-lg p-8">
      {title && (
        <h2 className="text-2xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#d14afb] to-[#6e8afb]">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default FormWrapper;
