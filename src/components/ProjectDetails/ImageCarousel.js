import React from 'react';
import ImageCarousel from '../imageSlider';
const ProjectImageCarousel = ({ images }) => {
  return (
    <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg">
      <ImageCarousel images={images} />
    </div>
  );
};

export default ProjectImageCarousel;