'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const halfPage = (documentHeight - windowHeight) / 2;

      setIsVisible(scrollPosition > halfPage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-10 z-50 lg:bottom-6 lg:right-6 w-auto">
                   <button
               onClick={scrollToTop}
               className="bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
               aria-label="Scroll to top"
             >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ScrollToTop;
