'use client';

import { useRef } from 'react';
import OptimizedImage from './optimized-image';

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

interface OptimizedGalleryProps {
  images: GalleryImage[];
  title: string;
  description: string;
  className?: string;
}

const OptimizedGallery = ({
  images,
  title,
  description,
  className,
}: OptimizedGalleryProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={galleryRef} className={`py-12 sm:py-16 lg:py-20 bg-white ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-gunteerz font-black text-black mb-4 sm:mb-6 leading-tight">
            {title}
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            {description}
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={400}
                  className="w-full h-48 sm:h-64 lg:h-80 transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-semibold text-sm sm:text-base">{image.title || `Style ${index + 1}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OptimizedGallery;
