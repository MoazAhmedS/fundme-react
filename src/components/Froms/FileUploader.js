const FileUploader = ({ id, name, onChange, error, className = "" }) => {
  return (
    <input
      type="file"
      id={id}
      name={name}
      accept="image/*"
      onChange={onChange}
      className={`w-full text-white bg-[#374252] rounded-lg px-3 py-2 border 
        ${error ? "border-red-500" : "border-gray-600"}
        file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white
        file:bg-gradient-to-r file:from-[#905fe8] file:to-[#2862eb] file:cursor-pointer
        ${className}`}
    />
  );
};

export default FileUploader;
