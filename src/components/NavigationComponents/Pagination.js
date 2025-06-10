import React from 'react';

function Pagination({ count, pageSize, currentPage, onPageChange }) {
  const totalPages = Math.ceil(count / pageSize);
  if (totalPages === 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center my-6">
      <ul className="flex items-center space-x-2 bg-[#1c0b3a] px-4 py-2 rounded-xl">
        {currentPage > 1 && (
          <li>
            <button
              className="px-3 py-2 text-white rounded-xl hover:bg-[#2b134f] transition"
              onClick={() => onPageChange(currentPage - 1)}
            >
              &lt;
            </button>
          </li>
        )}

        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`px-4 py-2 rounded-xl text-white font-medium transition-all duration-200 ${
                number === currentPage
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg'
                  : 'bg-[#1c0b3a] hover:bg-[#2b134f]'
              }`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}

        {currentPage < totalPages && (
          <li>
            <button
              className="px-3 py-2 text-white rounded-xl hover:bg-[#2b134f] transition"
              onClick={() => onPageChange(currentPage + 1)}
            >
              &gt;
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
