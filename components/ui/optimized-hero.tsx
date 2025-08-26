'use client';

import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface OptimizedHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  className?: string;
  height?: string;
}

const OptimizedHero = ({
  title,
  subtitle,
  backgroundImage,
  className = '',
  height = 'h-screen',
}: OptimizedHeroProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const animateHero = useCallback(() => {
    if (!heroRef.current || !contentRef.current) return;

    // Create a single timeline for hero animations
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate content elements - initial reveal only
    if (contentRef.current?.children) {
      tl.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    }

    // Background parallax effect with optimized ScrollTrigger
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1, // Add slight smoothing
          // Optimize performance
          onUpdate: (self) => {
            if (self.progress > 0.1 && !self.isActive) {
              self.refresh();
            }
          },
        },
      });
    }

    return tl;
  }, []);

  useEffect(() => {
    const timeline = animateHero();

    return () => {
      // Cleanup animations
      if (timeline) {
        timeline.kill();
      }
      // Cleanup ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === heroRef.current) {
          trigger.kill();
        }
      });
    };
  }, [animateHero]);

  return (
    <section
      ref={heroRef}
      className={`hero-section relative ${height} flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Optimized background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Hero content - Responsive Design */}
      <div ref={contentRef} className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-gunteerz font-black uppercase tracking-wide sm:tracking-wider mb-4 sm:mb-6 leading-tight">
          {title}
        </h1>
        <h2 className="hero-subtitle text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] bg-clip-text text-transparent mb-2 sm:mb-4 px-2 sm:px-0">
          {subtitle}
        </h2>
      </div>
    </section>
  );
};

export default OptimizedHero;
