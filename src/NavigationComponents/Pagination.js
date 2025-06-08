import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8; 

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5; 
    pages.push(1);
    
    if (totalPages <= maxVisible) {
      for (let i = 2; i <= totalPages - 1; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
    }
    
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages.slice(0, maxVisible); 
  };

  return (
    <div className="flex items-center justify-center my-8">
      <nav className="flex items-center bg-[#0B0B2B] p-2 rounded-lg w-fit"> 
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-white hover:bg-[#1E1E3F]'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex mx-1 w-[180px] justify-center"> 
          {getVisiblePages().map((page, index) => (
            <div key={index} className="mx-0.5">
              {page === '...' ? (
                <span className="text-gray-400 px-2 flex items-center justify-center w-10">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => handlePageClick(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-[#d14afb] to-[#6e8afb] text-white'
                      : 'text-gray-300 hover:bg-[#1E1E3F]'
                  }`}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-white hover:bg-[#1E1E3F]'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
}

export default Pagination;