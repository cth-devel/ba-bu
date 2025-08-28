'use client';

import { useState, useEffect } from 'react';
import { Scissors, Palette, Sparkles, Heart, Star } from 'lucide-react';

interface LoadingProps {
  onLoadingComplete: () => void;
  minDisplayTime?: number;
}

const Loading = ({ onLoadingComplete, minDisplayTime = 1500 }: LoadingProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIcon, setCurrentIcon] = useState(0);
  const [progress, setProgress] = useState(0);

  const icons = [
    { icon: Scissors, color: 'text-[#ffd277]', label: 'Hair Styling' },
    { icon: Palette, color: 'text-[#ffd277]', label: 'Beauty Services' },
    { icon: Sparkles, color: 'text-[#ffd277]', label: 'Treatments' },
    { icon: Heart, color: 'text-[#ffd277]', label: 'Wellness' },
    { icon: Star, color: 'text-[#ffd277]', label: 'Premium Care' }
  ];

  useEffect(() => {
    // Icon rotation effect
    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 400);

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 150);

    // Ensure minimum display time
    const minTimeTimer = setTimeout(() => {
      if (progress >= 100) {
        setIsVisible(false);
        setTimeout(() => {
          onLoadingComplete();
        }, 400);
      }
    }, minDisplayTime);

    return () => {
      clearInterval(iconInterval);
      clearInterval(progressInterval);
      clearTimeout(minTimeTimer);
    };
  }, [progress, minDisplayTime, onLoadingComplete, icons.length]);

  useEffect(() => {
    if (progress >= 100) {
      const finalTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onLoadingComplete();
        }, 400);
      }, 300);
      return () => clearTimeout(finalTimer);
    }
  }, [progress, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-[#77530a]/20 to-[#ffd277]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-[#ffd277]/20 to-[#77530a]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-[#77530a]/15 to-[#ffd277]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center">
        {/* Brand */}
        <div className="">
          <div className="flex justify-center">
            <img
              src="/BABU-White.svg"
              alt="BA-BU Family Salon Logo"
              className="w-32 h-32 lg:w-1/2 lg:h-1/2 object-contain"
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-8">
          <p className="text-lg text-white/90 mb-2">Loading our premium services...</p>
          <p className="text-sm text-white/70">Preparing your beauty journey</p>
        </div>

        {/* Progress bar */}
        <div className="w-80 mx-auto mb-8">
          <div className="bg-white/10 rounded-full h-3 overflow-hidden border border-white/20">
            <div
              className="bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] h-3 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/80 text-sm mt-3 font-medium">{Math.round(progress)}%</p>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center space-x-3">
          <div className="w-3 h-3 bg-[#ffd277] rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-[#ffd277] rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-3 h-3 bg-[#ffd277] rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>

      {/* Floating service indicators */}
      <div className="absolute inset-0 pointer-events-none font-gunteerz tracking-widest">
        <div className="absolute top-24 left-40 text-[#ffd277]/30 text-6xl transform -rotate-12 font-[900]">
           Hair Styling
        </div>
        <div className="absolute top-48 right-24 text-[#ffd277]/30 text-7xl transform rotate-3 font-[900]">
           Beauty Services
        </div>
        <div className="absolute bottom-40 left-56 text-[#ffd277]/30 text-4xl transform rotate-12 font-[900]">
           Treatments
        </div>
        <div className="absolute bottom-48 right-48 text-[#ffd277]/30 text-6xl transform rotate-6 font-[900]">
           Wellness
        </div>
        <div className="absolute top-1/3 left-1/3  text-[#ffd277]/30 text-6xl transform -rotate-6 font-[900]">
          Premium Care
        </div>

      </div>
    </div>
  );
};

export default Loading;
