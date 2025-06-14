import React, { useState } from 'react';
import ProjectCard from '../../ProjectCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ProjectSlider = ({ title, subtitle, projects, atTop = false }) => {
  const visibleCount = 3;
  const cardWidth = 350; // match ProjectCard width
  const gap = 24; // gap-6 in px

  const maxStartIndex = projects.length - visibleCount;

  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxStartIndex));
  };

  const totalWidth = projects.length * (cardWidth + gap);

  return (
    <section className="py-16 px-4 text-white text-center overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>}
        {subtitle && <p className="text-lg text-gray-400 mb-10">{subtitle}</p>}

        <div className="relative flex items-center justify-center">
          {!atTop && (
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className={`absolute left-[-50px] z-10 p-3 rounded-full transition
                ${startIndex === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-white hover:text-black'}`}
            >
              <ArrowLeft size={24} />
            </button>
          )}

          <div className="w-full max-w-[1100px] overflow-hidden">
            {atTop && (
              <div className="flex justify-between mb-4">
                <button
                  onClick={handlePrev}
                  disabled={startIndex === 0}
                  className={`p-3 rounded-full transition
                    ${startIndex === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-white hover:text-black'}`}
                >
                  <ArrowLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={startIndex === maxStartIndex}
                  className={`p-3 rounded-full transition
                    ${startIndex === maxStartIndex ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-white hover:text-black'}`}
                >
                  <ArrowRight size={24} />
                </button>
              </div>
            )}
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                width: `${totalWidth}px`,
                transform: `translateX(-${startIndex * (cardWidth + gap)}px)`,
              }}
            >
              {projects.map((project) => (
                <div key={project.id} className="w-[350px] shrink-0 px-2 py-4">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>

          {!atTop && (
            <button
              onClick={handleNext}
              disabled={startIndex === maxStartIndex}
              className={`absolute right-[-50px] z-10 p-3 rounded-full transition
                ${startIndex === maxStartIndex ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-white hover:text-black'}`}
            >
              <ArrowRight size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectSlider;