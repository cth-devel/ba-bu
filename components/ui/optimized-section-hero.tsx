'use client';

import { useRef } from 'react';

interface OptimizedSectionHeroProps {
  title: string;
  description: string;
  className?: string;
  backgroundClass?: string;
}

const OptimizedSectionHero = ({
  title,
  description,
  className = '',
  backgroundClass = 'bg-gradient-to-br from-black via-gray-900 to-black',
}: OptimizedSectionHeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className={`py-12 sm:py-16 lg:py-20 xl:py-24 ${backgroundClass} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="section-hero-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-gunteerz font-black text-white mb-6 sm:mb-8 leading-tight animate-fade-in-up">
          {title}
        </h2>
        <p className="section-hero-description text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium animate-fade-in-up px-4 sm:px-0" style={{ animationDelay: '200ms' }}>
          {description}
        </p>
      </div>
    </section>
  );
};

export default OptimizedSectionHero;
