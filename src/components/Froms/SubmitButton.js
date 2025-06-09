const SubmitButton = ({ text = "Submit", isLoading = false }) => {
  return (
    <button
      type="submit"
      className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-[#d14afb] to-[#6e8afb] text-white hover:opacity-90 transition"
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : text}
    </button>
  );
};

export default SubmitButton;
