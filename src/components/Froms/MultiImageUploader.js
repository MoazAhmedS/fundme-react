import React from "react";
import { FaUpload, FaTimes } from "react-icons/fa";

const MultiImageUploader = ({ images, onChange, onRemove }) => {
  const handleSelectImages = (e) => {
    const files = Array.from(e.target.files);
    onChange(files);
  };

  return (
    <div>
      <label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-gray-600 bg-[#374252] text-gray-300 rounded-xl cursor-pointer p-6 hover:bg-[#4a5568] transition"
      >
        <FaUpload className="text-2xl" />
        <span className="text-sm font-medium">Upload Images</span>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          multiple
          onChange={handleSelectImages}
          className="hidden"
        />
      </label>

      <div className="flex flex-wrap gap-3 mt-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative">
            <img
              src={img}
              alt="preview"
              className="w-24 h-24 rounded-lg object-cover border border-gray-500"
            />
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 text-xs"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiImageUploader;
