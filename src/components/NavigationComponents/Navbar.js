import { useState, useEffect, useRef } from "react";
import ProjectName from "./ProjectName";
import { useNavigate, Link,useLocation } from "react-router-dom";
import { User, LogOut } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({
    token: null,
    fname: null,
    avatar: null
  });
  const dropdownRef = useRef();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fname = localStorage.getItem("fname");
    const avatar = localStorage.getItem("avatar");

    setUserData({
      token,
      fname,
      avatar
    });
  }, []);

  const firstName = userData.fname
    ? userData.fname.charAt(0).toUpperCase() + userData.fname.slice(1).toLowerCase()
    : "";

  const avatarLetter = firstName.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fname");
    localStorage.removeItem("avatar");
    localStorage.removeItem("super");
    setUserData({
      token: null,
      fname: null,
      avatar: null
    });
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111827] px-6 py-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <ProjectName />
          </Link>

          <ul className="hidden md:flex space-x-10 font-medium">
            <li>
              <Link to="/" className="text-[#999ea7] hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/project" className="text-[#999ea7] hover:text-gray-300">Projects</Link>
            </li>
            <li>
              <Link to="/about" className="text-[#999ea7] hover:text-gray-300">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="text-[#999ea7] hover:text-gray-300">Contact Us</Link>
            </li>
          </ul>

          <div className="relative flex items-center space-x-4" ref={dropdownRef}>
            {userData.token ? (
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-white cursor-pointer select-none"
              >
                {userData.avatar ? (
                  <img
                    src={`http://localhost:8000${userData.avatar}`}
                    alt={firstName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm font-bold">
                    {avatarLetter}
                  </div>
                )}
                <span className="hidden md:block text-[#d1d5db]">{firstName}</span>
              </div>
            ) : (
              <>
                <Link to="/login" state={{ from: location.pathname }} className="hidden md:block text-[#999ea7] hover:text-gray-300">Login</Link>
                <Link to="/signup" className="hidden md:block px-5 py-2 font-semibold rounded-md bg-gradient-to-r from-[#d14afb] to-[#6e8afb] text-white hover:opacity-90 transition-all duration-200">
                  Sign Up
                </Link>
              </>
            )}

            {dropdownOpen && (
              <div style={{ marginTop: "130px" }} className="absolute right-0 w-48 bg-[#1f2937] rounded-md shadow-lg z-50">
                <div className="py-2">
                  <Link
                    to="/profile"
                    className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" /> Profile
                  </Link>
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
          className={`md:hidden bg-[#111827] overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 py-4" : "max-h-0 py-0"
            }`}
        >
          <ul className="flex flex-col space-y-4 font-medium px-6">
            <li>
              <Link to="/" className="text-[#999ea7] hover:text-gray-300" onClick={toggleMenu}>Home</Link>
            </li>
            <li>
              <Link to="/project" className="text-[#999ea7] hover:text-gray-300" onClick={toggleMenu}>Projects</Link>
            </li>
            <li>
              <Link to="/about" className="text-[#999ea7] hover:text-gray-300" onClick={toggleMenu}>About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="text-[#999ea7] hover:text-gray-300" onClick={toggleMenu}>Contact Us</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="h-20 md:h-16" />
    </>
  );
}

export default Navbar;