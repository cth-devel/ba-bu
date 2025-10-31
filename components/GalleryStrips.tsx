'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

interface GalleryStripsProps {
  className?: string;
  images?: string[];
}

const TOTAL_COLUMNS = 4;
const ANIMATION_DURATION = 60;
const MOBILE_ANIMATION_DURATION = 60; // Faster on mobile for smoother experience

const defaultGalleryImages = Array.from({ length: 52 }, (_, index) => {
  return `/images/gallery/gallery (${index + 1}).webp`;
});

const extractImageOrder = (imagePath: string): number | null => {
  // Decode URL-encoded path if needed, then extract number
  const decodedPath = decodeURIComponent(imagePath);
  const match = decodedPath.match(/\((\d+)\)/);
  if (!match) {
    return null;
  }
  return Number(match[1]);
};

const GalleryStrips = ({ className = '', images }: GalleryStripsProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const galleryImages = images || defaultGalleryImages;

  const columnImages = useMemo(() => {
    return Array.from({ length: TOTAL_COLUMNS }, (_, columnIndex) =>
      galleryImages.filter((_, imageIndex) => imageIndex % TOTAL_COLUMNS === columnIndex)
    );
  }, [galleryImages]);

  const handleStripMouseEnter = useCallback((stripIndex: number) => {
    const stripElement = stripRefs.current[stripIndex];
    if (!stripElement) {
      return;
    }

    stripElement.style.animationPlayState = 'paused';
  }, []);

  const handleStripMouseLeave = useCallback((stripIndex: number) => {
    const stripElement = stripRefs.current[stripIndex];
    if (!stripElement) {
      return;
    }

    stripElement.style.animationPlayState = 'running';
  }, []);

  const handleImageSelect = useCallback((imagePath: string) => {
    setSelectedImage(imagePath);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    if (!modalRef.current) {
      document.body.style.overflow = '';
      setIsModalOpen(false);
      setSelectedImage(null);
      return;
    }

    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        document.body.style.overflow = '';
        setIsModalOpen(false);
        setSelectedImage(null);
      },
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleModalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleModalClose, isModalOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <section className={`relative h-[100svh] w-screen overflow-hidden bg-primary ${className}`}>
        {/* Dark gradient overlays - desktop only (top/bottom) */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-32 bg-gradient-to-b from-black to-transparent hidden md:block" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-black to-transparent hidden md:block" />

        <div className="flex h-full w-full items-stretch px-2 sm:px-4 lg:px-8">
          {/* Mobile: 4 rows with horizontal scrolling */}
          <div className="grid h-full w-full grid-cols-1 grid-rows-4 gap-2 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
            {columnImages.map((column, stripIndex) => (
              <div
                key={`gallery-strip-${stripIndex}`}
                className="relative h-full w-full overflow-hidden border-none bg-white/5 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-shadow duration-500 hover:shadow-[0_30px_90px_rgba(255,210,119,0.25)] focus-within:shadow-[0_30px_90px_rgba(255,210,119,0.25)]"
                onMouseEnter={() => handleStripMouseEnter(stripIndex)}
                onMouseLeave={() => handleStripMouseLeave(stripIndex)}
                onFocusCapture={() => handleStripMouseEnter(stripIndex)}
                onBlurCapture={() => handleStripMouseLeave(stripIndex)}
              >
                <div
                  ref={(element) => {
                    stripRefs.current[stripIndex] = element;
                  }}
                  className={`strip-motion flex min-w-[200%] h-full w-full flex-row gap-2 md:flex-col md:min-w-full md:min-h-[200%] md:gap-4 ${stripIndex % 2 === 0 ? 'strip-motion-up md:strip-motion-up' : 'strip-motion-down md:strip-motion-down'}`}
                >
                  {[...column, ...column].map((imageSrc, imagePosition) => {
                    const imageOrder = extractImageOrder(imageSrc) ?? imagePosition + 1;
                    const isFirstCycle = imagePosition < column.length;
                    const shouldPriority = stripIndex === 0 && isFirstCycle && imagePosition < 4;

                    return (
                      <button
                        key={`gallery-strip-${stripIndex}-image-${imagePosition}`}
                        type="button"
                        onClick={() => handleImageSelect(imageSrc)}
                        className="group relative flex-shrink-0 w-48 h-full overflow-hidden border-none bg-black/40 shadow-lg transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffd277]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:w-full md:h-80 md:hover:-translate-y-1 sm:h-96 lg:h-[28rem] xl:h-[32rem]"
                        aria-label={`View gallery image ${imageOrder}`}
                      >
                        <Image
                          src={imageSrc}
                          alt={`Gallery image ${imageOrder}`}
                          fill
                          sizes="(max-width: 640px) 192px, (max-width: 1024px) 45vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          priority={shouldPriority && isFirstCycle}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && selectedImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Selected gallery image preview"
          onClick={handleModalClose}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Selected gallery image preview"
              width={1600}
              height={1066}
              className="h-auto w-full max-h-[85vh] object-contain"
              priority
            />
            <button
              type="button"
              onClick={handleModalClose}
              className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors duration-300 hover:bg-black/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffd277]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Close gallery preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : null}

      <style jsx>{`
        /* Mobile: Horizontal scrolling animations with hardware acceleration */
        @keyframes strip-scroll-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes strip-scroll-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        /* Desktop: Vertical scrolling animations with hardware acceleration */
        @keyframes strip-scroll-up {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, -50%, 0);
          }
        }

        @keyframes strip-scroll-down {
          0% {
            transform: translate3d(0, -50%, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .strip-motion {
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
          transform-style: preserve-3d;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }

        /* Optimize images for smooth animation */
        .strip-motion img,
        .strip-motion button {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }

        /* Reduce repaints on mobile */
        @media (max-width: 767px) {
          .strip-motion {
            contain: layout style paint;
          }
        }

        /* Mobile: Horizontal animations - faster and optimized */
        @media (max-width: 767px) {
          .strip-motion {
            animation-duration: ${MOBILE_ANIMATION_DURATION}s;
          }

          .strip-motion-up {
            animation-name: strip-scroll-left;
          }

          .strip-motion-down {
            animation-name: strip-scroll-right;
          }
        }

        /* Desktop: Vertical animations */
        @media (min-width: 768px) {
          .strip-motion {
            animation-duration: ${ANIMATION_DURATION}s;
          }

          .strip-motion-up {
            animation-name: strip-scroll-up;
          }

          .strip-motion-down {
            animation-name: strip-scroll-down;
          }
        }
      `}</style>
    </>
  );
};

export default GalleryStrips;

