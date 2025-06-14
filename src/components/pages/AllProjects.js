import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../NavigationComponents/Footer";
import ProjectCard from "../ProjectCard";
import Pagination from "../NavigationComponents/Pagination";
import Navbar from "../NavigationComponents/Navbar";
import { axiosInstance } from "../../Network/axiosinstance";

function AllProjects() {
  document.title = "Project";
  const [projects, setProjects] = useState([]);
  const [defaultProjects, setDefaultProjects] = useState([]);
  const [defaultTotalCount, setDefaultTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const pageSize = 9;

  const fetchPage = (page, query = "") => {
    const url = query.trim()
      ? `/Project/API/Search/?search=${encodeURIComponent(query)}&page=${page}`
      : `/Project/API/?page=${page}`;

    axiosInstance.get(url)
      .then((res) => {
        const results = res.data.results || [];
        setProjects(results);
        setTotalCount(res.data.count || results.length);
        setCurrentPage(page);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setProjects([]);
        setTotalCount(0);
      });
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
    fetchPage(1, searchInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    fetchPage(1);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen pb-20">
      <div className="text-center pt-10">
        <h1 className="text-4xl font-bold ">
          Discover Amazing{" "}
          <span className="bg-gradient-to-r from-[#d14afb] to-[#6e8afb] bg-clip-text text-transparent cursor-pointer">
            Projects
          </span>
        </h1>
        <p className="text-xl mt-5 text-[#999ea7]">
          Support innovative ideas and help bring groundbreaking projects to life
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <div className="relative w-full max-w-xl mx-4 flex items-center">
          <input
            type="text"
            placeholder="Search by title or tag..."
            className="w-full px-4 py-3 rounded-l-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-[#d14afb] to-[#6e8afb] text-white h-12 w-12 rounded-r-full flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No projects found.
            </div>
          )}
        </div>
      </div>

      {totalCount > 0 && (
        <Pagination
          count={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={(page) => fetchPage(page, searchQuery)}
        />
      )}

    </div>
  );
}

export default AllProjects;