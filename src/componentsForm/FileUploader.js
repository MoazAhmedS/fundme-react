const FileUploader = ({ id, onChange }) => {
  return (
    <input
      type="file"
      id={id}
      onChange={onChange}
      className="w-full text-white file:bg-[#6e8afb] file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none file:cursor-pointer"
    />
  );
};

export default FileUploader;
