import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full max-w-md mx-auto mt-10 mb-10">
      <div
        className="flex items-center bg-gray-900 rounded-2xl px-4 py-2 shadow-md transition-all focus-within:ring-2"
        style={{ border: "1px solid #999ea7" }} // ← custom border
      >
        <Search className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none text-white w-full placeholder-gray-500"
        />
      </div>
    </div>
  );
};

export default SearchBar;
