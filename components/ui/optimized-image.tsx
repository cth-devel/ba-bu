'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  if (!isInView) {
    return (
      <div
        ref={imageRef}
        className={cn(
          'bg-gray-200 animate-pulse rounded-lg',
          className
        )}
        style={{ width, height }}
      />
    );
  }

  return (
    <div
      ref={imageRef}
      className={cn(
        'relative overflow-hidden transition-opacity duration-300',
        !isLoaded && 'opacity-0',
        isLoaded && 'opacity-100',
        className
      )}
      style={{ width, height }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
