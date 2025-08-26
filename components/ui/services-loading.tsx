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
        <div className="mb-12">
          <h1 className="text-5xl lg:text-7xl font-gunteerz font-black text-white mb-4 tracking-wider">
            BA-BU
          </h1>
          <p className="text-xl lg:text-2xl text-[#ffd277] font-medium">
            Family Salon
          </p>
        </div>

        {/* Rotating service icons */}
        <div className="mb-12">
          <div className="relative w-24 h-24 mx-auto mb-6">
            {icons.map((iconData, index) => {
              const IconComponent = iconData.icon;
              return (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    index === currentIcon
                      ? 'opacity-100 scale-100 rotate-0'
                      : 'opacity-0 scale-75 rotate-12'
                  }`}
                >
                  <IconComponent className={`w-16 h-16 ${iconData.color}`} />
                </div>
              );
            })}
          </div>
          <p className="text-lg text-white/80 font-medium">
            {icons[currentIcon].label}
          </p>
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-[#ffd277]/30 text-xs font-medium">
          ✂️ Hair Care
        </div>
        <div className="absolute top-32 right-24 text-[#ffd277]/30 text-xs font-medium">
          ✨ Skin Care
        </div>
        <div className="absolute bottom-32 left-24 text-[#ffd277]/30 text-xs font-medium">
          💄 Makeup
        </div>
        <div className="absolute bottom-20 right-20 text-[#ffd277]/30 text-xs font-medium">
          🧖‍♀️ Spa
        </div>
      </div>
    </div>
  );
};

export default Loading;
