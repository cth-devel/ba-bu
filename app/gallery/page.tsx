'use client';

import ServicesLoadingWrapper from '@/components/ui/loading-wrapper';
import GalleryStrips from '@/components/GalleryStrips';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GalleryPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    // Set initial state explicitly before animation
    gsap.set(title, {
      opacity: 0,
      y: 50,
    });

    // Use requestAnimationFrame to ensure DOM is ready after navigation
    const rafId = requestAnimationFrame(() => {
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="sr-only">
        <h1>BA-BU Family Salon - Gallery</h1>
        <p>Explore our portfolio of beautiful transformations and stunning beauty work.</p>
      </div>

      {/* Gallery Hero Section - 100svh with centered text */}
      <section
        ref={heroRef}
        className="flex h-[100svh] w-screen items-center justify-center bg-primary px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <h1
            ref={titleRef}
            className="text-7xl sm:text-8xl lg:text-[12rem] xl:text-[14rem] font-sans font-extrabold tracking-wider"
          >
            <span className="bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent tracking-widest px-4 py-2">
              Gallery
            </span>
          </h1>
        </div>
      </section>

      {/* Gallery Page Container */}
      <div className="w-full bg-primary">
        <ServicesLoadingWrapper minLoadingTime={2000}>
          <GalleryStrips />
        </ServicesLoadingWrapper>
      </div>
    </>
  );
};

export default GalleryPage;