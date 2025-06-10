import React from "react";
import { Calendar, Wallet } from "lucide-react";
import GradientButton from "./GradientButton";
import ProgressBar from "./ProgressBar";
import StarRating from "./ui/rates";

function getRemainingDays(endDate) {
  const diff = Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24));
  const days = Math.max(0, diff);
  return days === 1 ? 1 : days;
}

const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-gray-800/50 text-white rounded-xl shadow-lg overflow-hidden max-w-sm w-full
      transform transition-all duration-300 ease-in-out
      hover:scale-105 hover:shadow-xl hover:z-10 relative
      border border-gray-700 hover:border-gray-600">
      
      <div className="overflow-hidden">
        <img 
          src={`http://localhost:8000${project.images[0].path}`} 
          alt={project.title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 space-y-4">
        <span className="inline-block bg-gray-700 text-sm text-white px-3 py-1 rounded-full transition-colors group-hover:bg-gray-600">
          {project.categoryObject.name}
        </span>

        <h3 className="text-lg font-semibold group-hover:text-white transition-colors">
          {project.title}
        </h3>
        
        <p className="text-sm text-gray-400 overflow-hidden whitespace-nowrap overflow-ellipsis group-hover:text-gray-300 transition-colors">
          {project.details}
        </p>

        <div className="flex justify-center">
          <StarRating stars={5} initialRating={project.rates || 0} readOnly />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <p className="group-hover:text-gray-300 transition-colors">Progress</p>
            <p className="group-hover:text-white transition-colors">
              {Math.min(Math.round((project.current_donations / project.target) * 100), 100)}%
            </p>
          </div>
          <ProgressBar percentage={Math.min((project.current_donations / project.target) * 100, 100)} />
        </div>

        <div className="flex justify-between text-sm text-gray-300 mt-4">
          <div className="group-hover:text-white transition-colors">
            <p className="font-semibold">${project.target.toLocaleString()}</p>
            <p>Target</p>
          </div>
          
          <div className="flex items-center gap-1 group-hover:text-white transition-colors">
            <Wallet size={16} className="group-hover:text-gray-300 transition-colors" /> 
            <div>
              <p className="font-semibold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(project.current_donations)}
              </p>
              <p>Funding</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 group-hover:text-white transition-colors">
            <Calendar size={16} className="group-hover:text-gray-300 transition-colors" />
            <div>
              <p className="font-semibold">
                {getRemainingDays(project.end_date)}
              </p>
              <p>Days left</p>
            </div>
          </div>
        </div>

        <GradientButton 
          onClick={() => alert("Funding project")}
          className="w-full mt-4 group-hover:opacity-100 transition-opacity"
        >
          Fund This Project
        </GradientButton>
      </div>
    </div>
  );
};

export default ProjectCard;