import React, { useState, useEffect, useRef } from 'react';
import img from '../../assets/caraousel_image.webp';

const images = [
  { src: 'https://images.unsplash.com/photo-1624521793559-136bfe16fc86?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Slide 1' },
  { src: img, alt: 'Slide 2' },
  { src: 'https://images.unsplash.com/photo-1590599145008-e4ec48682067?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFtYXpvbnxlbnwwfHwwfHx8MA%3D%3D', alt: 'Slide 3' },
  { src: 'https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Slide 4' },
  { src: 'https://plus.unsplash.com/premium_photo-1683887064255-1c428d0b3934?q=80&w=1486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Slide 5' },
  { src: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Slide 6' },
  { src: 'https://plus.unsplash.com/premium_photo-1683984171269-04c84ee23234?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Slide 7' },
];

// Clone first and last slides for seamless loop
const extendedImages = [
  images[images.length - 1],
  ...images,
  images[0],
];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start from the first actual image
  const [transition, setTransition] = useState(true);
  const sliderRef = useRef(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
    setTransition(true);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
    setTransition(true);
  };

  // Auto slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Transition end check
  useEffect(() => {
    const handleTransitionEnd = () => {
      // Jump without transition to real slide if at clones
      if (currentIndex === 0) {
        setTransition(false);
        setCurrentIndex(images.length);
      } else if (currentIndex === extendedImages.length - 1) {
        setTransition(false);
        setCurrentIndex(1);
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('transitionend', handleTransitionEnd);
    }

    return () => {
      if (slider) {
        slider.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-6 overflow-hidden">
      <div
        ref={sliderRef}
        className={`flex ${transition ? 'transition-transform duration-500 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${currentIndex * 50}%)` }}
      >
        {extendedImages.map((img, idx) => (
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
