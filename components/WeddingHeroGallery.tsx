'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WeddingHeroGalleryProps {
  images: string[];
  title: string;
  subtitle: string;
  className?: string;
}

const WeddingHeroGallery = ({ images, title, subtitle, className = '' }: WeddingHeroGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    gsap.from('.hero-content', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.2,
    });

    gsap.from('.hero-images .hero-image', {
      scale: 1.1,
      opacity: 0,
      duration: 2,
      ease: 'power2.out',
      stagger: 0.1,
    });
  }, []);

  return (
    <div ref={heroRef} className={`relative h-screen overflow-hidden ${className}`}>
      {/* Background Images */}
      <div className="hero-images absolute inset-0">
        {images.slice(0, 3).map((image, index) => (
          <div
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            className={`hero-image absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Wedding hero ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
        <div className="max-w-4xl">
          <h1 className="hero-content text-6xl md:text-8xl font-gunteerz font-black mb-6 text-white drop-shadow-lg">
            {title}
          </h1>
          <p className="hero-content text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            {subtitle}
          </p>
          <div className="hero-content flex justify-center space-x-4">
            {images.slice(0, 3).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Explore</span>
          <div className="w-px h-8 bg-white/50 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default WeddingHeroGallery;
