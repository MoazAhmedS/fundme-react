// ProjectImageCarousel.js
import React from 'react';
import ImageCarousel from '../../imageSlider';

const ProjectImageCarousel = ({ images }) => {
  const fullImageUrls = images.map(img => `http://127.0.0.1:8000${img.path}`);
  return (
    <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg">
      <ImageCarousel images={fullImageUrls} />
    </div>
  );
};

export default ProjectImageCarousel;
