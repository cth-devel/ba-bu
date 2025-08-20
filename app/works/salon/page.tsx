'use client';

import { useLayoutEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Gallery from '@/components/Gallery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pauseAllVideos } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

// Separate component to handle search params safely
const SalonPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const image = searchParams.get('image');

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (heroRef.current && contentRef.current) {
      gsap.to(heroRef.current, {
        height: '60vh',
        duration: 1,
        ease: 'power3.inOut',
      });
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
      );
    }
  }, []);

  // Parallax scroll effect for hero section
  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (hero) {
      gsap.to(hero, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [title, image]); // Re-run when title or image changes

  const handleBackNavigation = () => {
    pauseAllVideos();
    gsap.to("main", {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        router.push("/works");
      },
    });
  };

  return (
    <>
      <main id="salon-gallery-main">
        <div
          ref={heroRef}
          id="salon-hero"
          className="min-h-screen w-full bg-cover bg-center bg-fixed flex items-center justify-center overflow-hidden relative"
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          <h1
            id="salon-hero-title"
            className="text-6xl lg:text-8xl font-gunteerz font-black text-white text-center relative z-10"
          >
            {title}
          </h1>
        </div>

        <section
          ref={contentRef}
          id="salon-gallery-section"
          className="min-h-screen min-w-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-24"
        >
          <div className="!w-full">
            <div
              id="salon-header"
              className="text-center mb-20"
            >
              <button
                id="back-to-works-btn"
                onClick={handleBackNavigation}
                className="inline-flex items-center text-accent1 hover:text-white transition-colors duration-300 mb-8 group"
              >
                <svg
                  className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Works
              </button>

              <h1
                id="salon-title"
                className="text-5xl lg:text-7xl font-gunteerz font-black text-white mb-6"
              >
                Salon Services
              </h1>
              <p
                id="salon-description"
                className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Professional grooming and beauty services for the entire family.
                Experience excellence in every service we provide.
              </p>
            </div>

            <Gallery />

            <div
              ref={ctaRef}
              id="salon-cta"
              className="text-center"
            >
              <div className="bg-gradient-to-r from-accent1/20 to-accent2/20 rounded-2xl p-8 border border-accent1/30">
                <h3
                  id="cta-title"
                  className="text-3xl font-gunteerz font-bold text-white mb-4"
                >
                  Ready for a Transformation?
                </h3>
                <p
                  id="cta-description"
                  className="text-gray-300 mb-6 max-w-2xl mx-auto"
                >
                  Book your appointment today and experience the BA-BU difference in professional grooming and beauty services
                </p>
                <button
                  id="book-appointment-btn"
                  onClick={() => {
                    pauseAllVideos();
                    router.push("/contact");
                  }}
                  className="bg-gradient-to-r from-accent1 to-accent2 text-black font-bold py-4 px-8 rounded-full hover:from-accent2 hover:to-accent1 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// Main component with Suspense boundary to fix useSearchParams issue
const SalonPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent1 mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold">Loading salon gallery...</p>
        </div>
      </div>
    }>
      <SalonPageContent />
    </Suspense>
  );
};

export default SalonPage;
