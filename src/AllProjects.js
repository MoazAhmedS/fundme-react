import { useEffect, useState } from "react";
import Footer from "./components/NavigationComponents/Footer";
import Navbar from "./components/NavigationComponents/Navbar";
import axios from "axios";
import ProjectCard from "./components/ProjectCard";

function AllProjects() {
const [projects, setProjects] = useState([]);
useEffect(() => {
    axios
    .get("http://127.0.0.1:8000/Project/API/")
    .then((res) => {console.log(res.data); setProjects(res.data);})
    .catch((err) => {console.log(err);});
    }, []);
return (
    <div className="bg-gray-900 text-white min-h-screen">
        <Navbar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-20 container mx-auto px-10 ">
                {projects.map((project) => (
                <ProjectCard 
                    project={project}
                />
                ))}
            </div>
        <Footer />
    </div>
);
}
export default AllProjects;

