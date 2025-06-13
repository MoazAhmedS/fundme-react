const MissionSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              At FundMe, we believe that innovation should never be limited by access to funding. 
              Our platform bridges the gap between visionary creators and supporters who share their passion for change.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether it's sustainable technology, social impact initiatives, or creative projects, 
              we provide the tools and community needed to bring ideas to life.
            </p>
          </div>    
          <div className="relative">
            <img 
              src="mission.jpeg" 
              alt="Team collaboration" 
              className="rounded-xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;