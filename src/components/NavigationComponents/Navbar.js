import { useState, useEffect, useRef } from "react";
import ProjectName from "./ProjectName";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react"; 


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error("Error parsing user data from localStorage:", err);
      }
    }
  }, []);

  const firstName = user?.first_name
    ? user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1).toLowerCase()
    : "";

  const avatarLetter = firstName.charAt(0).toUpperCase();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


// داخل function Navbar()
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null);            
  setDropdownOpen(false);   
  navigate("/login");
};

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111827] px-6 py-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ProjectName />

          <ul className="hidden md:flex space-x-10 font-medium">
            <li className="text-[#999ea7] hover:text-gray-300 cursor-pointer">Home</li>
            <li className="text-[#999ea7] hover:text-gray-300 cursor-pointer">Projects</li>
            <li className="text-[#999ea7] hover:text-gray-300 cursor-pointer">About Us</li>
            <li className="text-[#999ea7] hover:text-gray-300 cursor-pointer">Contact Us</li>
          </ul>

          <div className="relative flex items-center space-x-4" ref={dropdownRef}>
            {user ? (
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-white cursor-pointer select-none"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm font-bold">
                  {avatarLetter}
                </div>
                <span className="hidden md:block text-[#d1d5db]">{firstName}</span>
              </div>
            ) : (
              <>
                <button className="hidden md:block text-[#999ea7] hover:text-gray-300">Login</button>
                <button className="hidden md:block px-5 py-2 font-semibold rounded-md bg-gradient-to-r from-[#d14afb] to-[#6e8afb] text-white hover:opacity-90 transition-all duration-200">
                  Sign Up
                </button>
              </>
            )}

            {dropdownOpen && (
              <div style={{marginTop:"130px"}} className="absolute right-0 w-48 bg-[#1f2937] rounded-md shadow-lg z-50">
                <div className="py-2">
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="w-4 h-4 mr-2" /> Profile
                  </button>
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className="md:hidden text-white ml-4 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-[#111827] overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 py-4" : "max-h-0 py-0"
          }`}
        >
          <ul className="flex flex-col space-y-4 font-medium px-6">
            <li className="text-[#999ea7] hover:text-gray-300 cursor-pointer">Home</li>
            <li className="text-[#999ea7] hover:text-gray-300 cursor-pointer">Projects</li>
            <li className="text-[#999ea7] hover:text-gray-300 cursor-pointer">About Us</li>
            <li className="text-[#999ea7] hover:text-gray-300 cursor-pointer">Contact Us</li>
          </ul>
        </div>
      </nav>

      <div className="h-20 md:h-16" />
    </>
  );
}

export default Navbar;
