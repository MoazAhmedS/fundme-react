import { useState } from 'react';
import ProjectName from './ProjectName';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111827] px-6 py-4" style={{ borderBottom: "1px solid rgb(101, 101, 104)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ProjectName></ProjectName>

          <ul className="hidden md:flex space-x-10 font-medium">
            <li className="cursor-pointer text-[#999ea7] hover:text-gray-300 transition-colors duration-200">Home</li>
            <li className="cursor-pointer text-[#999ea7] hover:text-gray-300 transition-colors duration-200">Projects</li>
            <li className="cursor-pointer text-[#999ea7] hover:text-gray-300 transition-colors duration-200">About Us</li>
            <li className="cursor-pointer text-[#999ea7] hover:text-gray-300 transition-colors duration-200">Contact Us</li>
          </ul>

          <div className="flex items-center space-x-6">
            <button className="hidden md:block text-[#999ea7] cursor-pointer hover:text-gray-300 bg-transparent p-0 transition-colors duration-200">
              Login
            </button>
            <button className="hidden md:block px-5 py-2 font-semibold rounded-md bg-gradient-to-r from-[#d14afb] to-[#6e8afb] text-white hover:opacity-90 transition-all duration-200">
              Sign Up
            </button>

            <button 
              className="md:hidden text-white focus:outline-none transition-transform duration-300 hover:scale-110"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className={`
          md:hidden bg-[#111827] overflow-hidden
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'}
        `}>
          <ul className="flex flex-col space-y-4 font-medium px-6">
            <li className="cursor-pointer text-[#999ea7] hover:text-gray-300 transition-colors duration-200 transform hover:translate-x-1">
              Home
            </li>
            <li className="cursor-pointer text-[#999ea7] hover:text-gray-300 transition-colors duration-200 transform hover:translate-x-1">
              Projects
            </li>
            <li className="cursor-pointer text-[#999ea7] hover:text-gray-300 transition-colors duration-200 transform hover:translate-x-1">
              About Us
            </li>
            <li className="cursor-pointer text-[#999ea7] hover:text-gray-300 transition-colors duration-200 transform hover:translate-x-1">
              Contact Us
            </li>
            <li className="pt-2">
              <button className="w-full text-left text-[#999ea7] cursor-pointer hover:text-gray-300 bg-transparent p-0 transition-colors duration-200">
                Login
              </button>
            </li>
            <li>
              <button className="w-full text-left px-5 py-2 font-semibold rounded-md bg-gradient-to-r from-[#d14afb] to-[#6e8afb] text-white hover:opacity-90 transition-all duration-200">
                Sign Up
              </button>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="h-20 md:h-16"></div>
    </>
  );
}

export default Navbar;