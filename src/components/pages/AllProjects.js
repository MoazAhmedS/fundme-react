import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/NavigationComponents/Navbar";
import Footer from "./components/NavigationComponents/Footer";
import ProjectCard from "./components/ProjectCard";
import Pagination from "./components/NavigationComponents/Pagination";
import SearchBar from "./components/NavigationComponents/SearchBar";

function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 9;

  const fetchPage = (page) => {
    axios
      .get(`http://127.0.0.1:8000/Project/API/?page=${page}`)
      .then((res) => {
        setProjects(res.data.results);
        setTotalCount(res.data.count);
        setCurrentPage(page);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPage(1);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
        <Navbar />
        <div className="text-center pt-10">
            <h1 className="text-4xl font-bold ">Discover Amazing <span className="bg-gradient-to-r from-[#d14afb] to-[#6e8afb] bg-clip-text text-transparent cursor-pointer">Projects</span></h1>
            <p className="text-xl mt-5 text-[#999ea7]">Support innovative ideas and help bring groundbreaking projects to life</p>
        </div>
        <SearchBar />
        <div className="container mx-auto px-10 my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
            ))}
        </div>

        <Pagination
            count={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={fetchPage}
        />

         <Footer />
    </div>
  );
}

export default AllProjects;


