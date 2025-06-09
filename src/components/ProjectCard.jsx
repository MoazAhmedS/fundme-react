import React from "react";
import { Calendar, Users } from "lucide-react";
import GradientButton from "./GradientButton";
import ProgressBar from "./ProgressBar";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-[#0f172a] text-white rounded-2xl shadow-lg overflow-hidden max-w-sm w-full">
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />

      <div className="p-5 space-y-4">
        <span className="inline-block bg-gray-700 text-sm text-white px-3 py-1 rounded-full">
          {project.category}
        </span>

        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-gray-400">{project.description}</p>

        <div>
          <p className="text-sm text-gray-400 mb-1">Progress</p>
             <ProgressBar percentage={project.progress} />

        </div>

        <div className="flex justify-between text-sm text-gray-300 mt-4">
          <div>
            <p className="font-semibold text-white">${project.raised.toLocaleString()}</p>
            <p>Raised</p>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <div>
              <p className="font-semibold text-white">{project.backers}</p>
              <p>Backers</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <div>
              <p className="font-semibold text-white">{project.daysLeft}</p>
              <p>Days left</p>
            </div>
          </div>
        </div>

        <GradientButton onClick={() => alert("Funding project")}>
        Fund This Project
        </GradientButton>
      </div>
    </div>
  );
};

export default ProjectCard;
