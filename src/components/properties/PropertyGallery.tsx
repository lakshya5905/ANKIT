import React, { useState } from 'react';
import { PropertyImage } from '../../types/property';
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[16/9] bg-stone-200 rounded-3xl flex items-center justify-center text-slate-500">
        No photos available
      </div>
    );
  }

  const currentImage = images[currentIndex] || images[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main Large Viewer */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden bg-stone-900 group shadow-md">
        <img
          src={currentImage.url}
          alt={currentImage.altText || title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Counter Badge */}
        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition-colors"
          title="View Fullscreen"
        >
          <Maximize className="w-4 h-4" />
        </button>

        {/* Prev / Next Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-md transition-all opacity-80 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-md transition-all opacity-80 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Bar */}
      {images.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative shrink-0 w-20 sm:w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                currentIndex === idx
                  ? 'border-[#0f383c] ring-2 ring-[#0f383c]/30 scale-95'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={img.altText || `Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in"
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
          >
            <img
              src={currentImage.url}
              alt={currentImage.altText || title}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
