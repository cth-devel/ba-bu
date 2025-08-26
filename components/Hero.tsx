'use client';

import { useEffect, useState, useRef } from 'react';
import { siteConfig } from '@/config/site';
import ShinyText from './ShinyText';
import AnimatedButton from './AnimatedButton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const videos = ['/hero-full.MP4'];

  useEffect(() => {
    if (contentRef.current) {
      // Set initial state
      gsap.set(['.hero-title', '.hero-subtitle', '.hero-location', '.hero-cta'], {
        opacity: 0,
        y: 30
      });

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.5 // Small delay to ensure content is rendered
      });

      timeline
        .to('.hero-title', { opacity: 1, y: 0, duration: 1 })
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 1 }, '-=0.7')
        .to('.hero-location', { opacity: 1, y: 0, duration: 1 }, '-=0.7')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 1 }, '-=0.7');

      return () => {
        // Ensure content is visible when component unmounts
        gsap.set(['.hero-title', '.hero-subtitle', '.hero-location', '.hero-cta'], {
          opacity: 1,
          y: 0
        });
        timeline.kill();
      };
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const videoContainer = videoContainerRef.current;

    if (section && videoContainer) {
      gsap.to(videoContainer, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  useEffect(() => {
    // Auto-advance videos every 8 seconds
    intervalRef.current = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 8000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [videos.length]);

  useEffect(() => {
    // Play the current video and pause others
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (index === currentVideoIndex) {
          videoRef.play().catch(console.error);
        } else {
          videoRef.pause();
          videoRef.currentTime = 0;
        }
      }
    });
  }, [currentVideoIndex]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <section
          ref={sectionRef}
          className="relative h-screen flex items-center justify-center overflow-hidden"
      >
          {/* Video Background Carousel */}
          <div ref={videoContainerRef} className="absolute inset-0 z-0">
              {videos.map((videoSrc, index) => (
                  <video
                      key={videoSrc}
                      ref={(el) => (videoRefs.current[index] = el)}
                      autoPlay={index === 0}
                      muted
                      loop
                      playsInline
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                          index === currentVideoIndex
                              ? "opacity-100"
                              : "opacity-0"
                      }`}
                  >
                      <source src={videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
              ))}

              {/* Fallback Background Image */}
              <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0"
                  style={{
                      backgroundImage: `url('https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
                  }}
              />

              {/* Overlay removed per request */}
          </div>

          {/* Content */}
          <div
              ref={contentRef}
              className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8"
          >
              <div className="max-w-4xl mx-auto">
                  {/* Main Tagline */}
                  <h1 className="hero-title text-5xl sm:text-6xl lg:text-8xl font-gunterz font-md mb-6 text-primary-gradient tracking-wider">
                      <ShinyText
                          text={siteConfig.tagline}
                          disabled={false}
                          speed={3}
                          className="text-5xl sm:text-6xl lg:text-8xl font-gunterz font-md px-4 py-2 text-primary-gradient"
                      />
                  </h1>

                  {/* Subtitle */}
                  <h3 className="hero-subtitle text-xl sm:text-4xl mb-4 text-white">
                      Premium Family Salon Experience
                  </h3>

                  {/* Location */}
                  <p className="hero-location text-lg mb-8 text-white">
                      North Paravur, Kerala
                  </p>

                  {/* CTA Button */}
                  <div className="hero-cta flex justify-center">
                      <AnimatedButton
                          text={siteConfig.hero.ctaText}
                          onClick={scrollToContact}
                      />
                  </div>
              </div>
          </div>
      </section>
  );
};

export default Hero;
