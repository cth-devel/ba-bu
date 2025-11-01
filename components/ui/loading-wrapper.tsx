'use client';

import { useState, useEffect } from 'react';
import Loading from './loading';

interface LoadingWrapperProps {
  children: React.ReactNode;
  minLoadingTime?: number;
  className?: string;
}

const LoadingWrapper = ({
  children,
  minLoadingTime = 1500,
  className = ''
}: LoadingWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  useEffect(() => {
    // Ensure minimum loading time
    const timer = setTimeout(() => {
      if (isLoading) {
        handleLoadingComplete();
      }
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [isLoading, minLoadingTime]);

  return (
    <>
      {isLoading && (
        <Loading
          onLoadingComplete={handleLoadingComplete}
          minDisplayTime={minLoadingTime}
        />
      )}

      <div
        className={`transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default LoadingWrapper;
