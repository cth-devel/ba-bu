'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ceremony } from '@/data/weddingData';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface WeddingCeremonyGalleryProps {
  ceremony: Ceremony;
  layoutType: 'grid' | 'masonry' | 'single';
  className?: string;
}

const WeddingCeremonyGallery = ({ ceremony, layoutType, className = '' }: WeddingCeremonyGalleryProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const images = gallery.querySelectorAll('img');
    gsap.from(images, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gallery,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, [ceremony]);

  const renderLayout = () => {
    switch (layoutType) {
      case 'masonry':
        return (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {ceremony.images.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`${ceremony.name} ${i + 1}`}
                width={500}
                height={700}
                className="w-full h-auto mb-4 object-cover rounded-lg shadow-lg"
              />
            ))}
          </div>
        );
      case 'single':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Image
                src={ceremony.images[0]}
                alt={`${ceremony.name} 1`}
                width={1200}
                height={800}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            {ceremony.images.slice(1).map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`${ceremony.name} ${i + 2}`}
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            ))}
          </div>
        );
      case 'grid':
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ceremony.images.map((src, i) => (
              <div key={i} className="aspect-square relative">
                <Image
                  src={src}
                  alt={`${ceremony.name} ${i + 1}`}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div ref={galleryRef} id={`ceremony-${ceremony.id}`} className={className}>
      <h2 className="text-4xl font-gunteerz text-white text-center mb-4">{ceremony.name}</h2>
      <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-8">{ceremony.description}</p>
      {renderLayout()}
    </div>
  );
};

export default WeddingCeremonyGallery;