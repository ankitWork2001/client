import React, { useState, useEffect } from 'react';
import img from '../../assets/caraousel_image.webp'
const images = [
  { src: 'https://images.unsplash.com/photo-1624521793559-136bfe16fc86?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Slide 1' },
  { src: img, alt: 'Slide 2' },
  { src: 'https://images.unsplash.com/photo-1590599145008-e4ec48682067?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFtYXpvbnxlbnwwfHwwfHx8MA%3D%3D', alt: 'Slide 3' },
];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 2 : prev - 1
    );
  };

  // Move to next slide
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= images.length - 2 ? 0 : prev + 1
    );
  };

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval); // Cleanup
  }, [currentIndex]); // Add currentIndex to reset interval on interaction

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-6 overflow-hidden">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 50}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="min-w-[50%] px-2">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-[300px] object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
      >
        ❯
      </button>
    </div>
  );
};

export default HeroBanner;
