import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import photo1 from "./assets/photo1.jpg";
import photo2 from "./assets/photo2.jpg";
import photo3 from "./assets/photo3.jpg";


const MenuCarouselAdvanced = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const menuImages = [
    photo1,
    photo2,
    photo3,

  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? menuImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === menuImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
            Our Menu
          </h1>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Image Display */}
          <div
            className="relative aspect-square w-full overflow-hidden p-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-all duration-500 ease-out h-full"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {menuImages.map((image, index) => (
                <div key={index} className="min-w-full h-full flex-shrink-0">
                  <img
                    src={image}
                    alt={`Menu page ${index + 1}`}
                    className="w-full h-full p-2  object-contain rounded-2xl bg-white"
                    loading={index === currentIndex ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>


            {/* Page Counter */}
            <div className="absolute top-1 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
              {currentIndex + 1} / {menuImages.length}
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-3 px-4 py-6 bg-gradient-to-r from-slate-50 to-slate-100 overflow-x-auto">
            {menuImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden transition-all duration-300 ${index === currentIndex
                  ? 'ring-4 ring-orange-500 scale-110'
                  : 'ring-2 ring-slate-200 hover:ring-orange-300 opacity-60 hover:opacity-100'
                  }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 py-6 bg-slate-50">
            {menuImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'w-8 bg-gradient-to-r from-orange-500 to-red-500'
                  : 'w-3 bg-slate-300 hover:bg-slate-400'
                  }`}
                aria-label={`Go to menu page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCarouselAdvanced;