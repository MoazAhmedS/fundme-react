import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../NavigationComponents/Footer";
import ProjectCard from "../ProjectCard";
import Pagination from "../NavigationComponents/Pagination";
import SearchBar from "../NavigationComponents/SearchBar";
import Navbar from "../NavigationComponents/Navbar";

function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [defaultProjects, setDefaultProjects] = useState([]);
  const [defaultTotalCount, setDefaultTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const pageSize = 9;

  const fetchPage = (page) => {
    axios
      .get(`http://127.0.0.1:8000/Project/API/?page=${page}`)
      .then((res) => {
        setProjects(res.data.results);
        setDefaultProjects(res.data.results); // store for fallback
        setDefaultTotalCount(res.data.count);
        setTotalCount(res.data.count);
        setCurrentPage(page);
      })
      .catch((err) => console.error(err));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      // Reset to default paginated data
      setProjects(defaultProjects);
      setTotalCount(defaultTotalCount);
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/Project/API/Search/?search=${encodeURIComponent(query)}`)
      .then((res) => {
        // Ensure the result is always an array
        const results = Array.isArray(res.data) ? res.data : [];
        setProjects(results);
        setTotalCount(results.length);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setProjects([]);
        setTotalCount(0);
      });
  };

  useEffect(() => {
    fetchPage(1);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
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

      {/* Search bar */}
      <SearchBar placeholder="Search by title or tag..." onSearch={handleSearch} />

      {/* Projects */}
      <div className="container mx-auto px-10 my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Pagination (only shown when not searching) */}
      {totalCount > 0 && !searchQuery && (
        <Pagination
          count={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={fetchPage}
        />
      )}

      <Footer />
    </div>
  );
}

export default AllProjects;
