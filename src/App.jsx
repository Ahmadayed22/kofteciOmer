import { useState, useEffect } from 'react';
// import photo1 from "./assets/photo1.jpg";
// import photo2 from "./assets/photo2.jpg";
// import photo3 from "./assets/photo3.jpg";


const MenuCarouselAdvanced = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const menuImages = [
    '/menu/photo1.jpg',
    '/menu/photo2.jpg',
    '/menu/photo3.jpg',

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
    <div className="h-[100dvh] flex items-center justify-center p-4 overflow-hidden overscroll-none" >
      <div className="w-full h-full max-w-2xl">
        {/* Header */}


        {/* Carousel Container */}
        <div className="relative bg-white rounded-3xl  shadow-2xl overflow-hidden flex justify-center items-center flex-col">
          <div className="text-center mt-2">
            <h1 className="text-5xl md:text-6xl font-bold bg-[#d65a1f] bg-clip-text text-transparent ">
              Menu
            </h1>
          </div>
          {/* Image Display */}
          <div
            className="relative  aspect-[18/24] w-full  overflow-hidden p-2 touch-pan-y select-none"
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
                <div key={index} className="min-w-full  flex-shrink-0 p-4">
                  <img
                    src={image}
                    alt={`Menu page ${index + 1}`}
                    className=" h-full  rounded-2xl bg-white flex-shrink-0 object-cover shadow-lg mx-auto mb-4 "
                    loading={index === currentIndex ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>


            {/* Page Counter */}

          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-3 px-4 py-6 bg-white overflow-x-auto">
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
          {/* <div className="flex justify-center gap-2 py-6 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 ">
            {menuImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'w-8 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 '
                  : 'w-3 bg-slate-300 hover:bg-slate-400'
                  }`}
                aria-label={`Go to menu page ${index + 1}`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MenuCarouselAdvanced;