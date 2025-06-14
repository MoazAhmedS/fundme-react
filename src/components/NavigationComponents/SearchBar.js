import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ placeholder = "Search by title or tag...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value); // Trigger parent search
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 mb-10">
      <div
        className="flex items-center bg-gray-900 rounded-2xl px-4 py-2 shadow-md transition-all focus-within:ring-2"
        style={{ border: "1px solid #999ea7" }}
      >
        <Search className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          className="bg-transparent outline-none text-white w-full placeholder-gray-500"
        />
      </div>
    </div>
  );
};

export default SearchBar;
