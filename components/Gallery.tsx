"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3993465/pexels-photo-3993465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3764011/pexels-photo-3764011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3993463/pexels-photo-3993463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2061820/pexels-photo-2061820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

// Responsive grid sizes for different screen sizes
const responsiveGridSizes = {
  mobile: [
    'col-span-2 row-span-2',
    'col-span-2 row-span-1',
    'col-span-2 row-span-1',
    'col-span-2 row-span-2',
    'col-span-2 row-span-1',
    'col-span-2 row-span-2',
    'col-span-2 row-span-1',
    'col-span-2 row-span-1',
  ],
  tablet: [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-2',
    'col-span-2 row-span-1',
    'col-span-1 row-span-1',
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-2 row-span-1',
  ],
  desktop: [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-2',
    'col-span-2 row-span-1',
    'col-span-1 row-span-1',
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-2 row-span-1',
  ]
};

interface GalleryProps {
  showBackground?: boolean;
  showPadding?: boolean;
}

const Gallery = ({ showBackground = true, showPadding = true }: GalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const component = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Check screen size for responsive grid
  useLayoutEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Simple GSAP animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray(".gallery-image-item");
      images.forEach((image: any, index: number) => {
        gsap.from(image, {
          opacity: 0,
          scale: 0.9,
          y: 50,
          zIndex: 100,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, component);

    return () => ctx.revert();
  }, []);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';

    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setIsModalOpen(false);
          setSelectedImage(null);
          document.body.style.overflow = 'unset';
        },
      });
    }
  };

  const handleHoverEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile) {
      gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleHoverLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile) {
      gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.in" });
    }
  };

  // Get appropriate grid sizes based on screen size
  const getGridSizes = () => {
    if (isMobile) return responsiveGridSizes.mobile;
    return responsiveGridSizes.tablet;
  };

  return (
    <section
      id="gallery-section"
      ref={component}
      className={`${showBackground ? 'bg-black' : ''} ${showPadding ? 'py-12 sm:py-16 lg:py-20' : ''} w-full px-4 sm:px-6 lg:px-8`}
    >
      <div className={`${showPadding ? 'px-4 sm:px-6 lg:px-8' : ''}`}>
        {/* Responsive Gallery Grid */}
        <div
          id="gallery-grid"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px] gap-3 sm:gap-4 w-full"
        >
          {galleryImages.map((image, index) => (
            <div
              key={image}
              id={`gallery-item-${index}`}
              className={`${getGridSizes()[index % getGridSizes().length]} gallery-image-item relative overflow-hidden cursor-pointer group rounded-lg sm:rounded-xl`}
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
              onClick={() => openModal(image)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openModal(image)}
              aria-label={`View gallery image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                priority={index < 4}
                loading={index < 4 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>

              {/* Mobile touch indicator */}
              {isMobile && (
                <div className="absolute top-2 right-2 bg-white/20 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  Tap to view
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Modal */}
      {isModalOpen && selectedImage && (
        <div
          id="gallery-modal"
          ref={modalRef}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={closeModal}
          onKeyDown={(e) => e.key === 'Escape' && closeModal()}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image modal"
        >
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Enlarged gallery view"
              width={1200}
              height={800}
              className="max-w-[95vw] sm:max-w-[90vw] max-h-[95vh] sm:max-h-[90vh] object-contain rounded-lg sm:rounded-xl"
              priority
            />
            <button
              id="gallery-modal-close-button"
              onClick={closeModal}
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;