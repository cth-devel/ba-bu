"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";
import ShinyText from "./ShinyText";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/images/WEDDING/WEDDING (29).webp",
    alt: "Wedding moment 29",
    className: "absolute top-0 left-0 lg:-top-40 lg:-left-40 w-3/4 h-full rounded-lg shadow-2xl",
    rotate: -10,
  },
  {
    src: "/images/WEDDING/WEDDING (24).webp",
    alt: "Wedding moment 24",
    className: "absolute bottom-0 right-0 w-2/3 h-full rounded-lg shadow-2xl",
    rotate: 8,
  },
  {
    src: "/images/WEDDING/WEDDING (18).webp",
    alt: "Wedding moment 18",
    className: "absolute top-10 left-1/2 lg:top-20 lg:-left-1/3 w-2/5 h-full rounded-lg shadow-2xl",
    rotate: 4,
  },
];

const GalleryPreview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  const [loadedFlags, setLoadedFlags] = useState<boolean[]>(() => images.map(() => false));
  // Toggle to render images; when true, images render and skeletons hide after load
  const SHOW_GALLERYPREVIEW_IMAGES = true;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !textContentRef.current || !imagesRef.current) return;

    const heading = textContentRef.current.querySelector("h2");
    const paragraph = textContentRef.current.querySelector("p");
    const button = textContentRef.current.querySelector("a");
    const imageElements = gsap.utils.toArray(imagesRef.current.children);

    // Set initial state
    gsap.set([heading, paragraph, button], {
      yPercent: 100,
      autoAlpha: 0
    });
    gsap.set(imageElements, {
      yPercent: 50,
      scale: 0.8,
      autoAlpha: 0
    });

    // Reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      defaults: {
        duration: 1,
        ease: "power3.out",
      },
    });

    tl.to(heading, { yPercent: 0, autoAlpha: 1 })
      .to(paragraph, { yPercent: 0, autoAlpha: 1 }, "-=0.7")
      .to(button, { yPercent: 0, autoAlpha: 1 }, "-=0.7")
      .to(
        imageElements,
        {
          yPercent: 0,
          scale: 1,
          autoAlpha: 1,
          stagger: 0.2,
        },
        "-=0.7"
      );

    // Smooth scrolling parallax effect for images
    imageElements.forEach((img: any, i) => {
      gsap.to(img, {
        yPercent: (i + 1) * -10, // Move images up at different speeds
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      // Ensure content is visible when component unmounts
      gsap.set([heading, paragraph, button], {
        yPercent: 0,
        autoAlpha: 1
      });
      gsap.set(imageElements, {
        yPercent: 0,
        scale: 1,
        autoAlpha: 1
      });

      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      id="gallery-preview-section"
      ref={sectionRef}
      className="relative min-w-screen min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-24"
    >
      <div className="relative z-10 px-10 grid md:grid-cols-2 md:grid-rows-2 items-center gap-12">
        {/* Text Content */}
        <div
          id="gallery-preview-text-content"
          ref={textContentRef}
          className="text-white text-center md:text-left"
        >
          <h2
            id="gallery-preview-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4"
          >
            <ShinyText
              text="Our Artistry in Action"
              disabled={false}
              speed={3}
              className="text-4xl md:text-6xl lg:text-8xl font-bold text-secondary mb-4 tracking-wider"
            />
          </h2>
          <p
            id="gallery-preview-description"
            className="text-base md:text-xl text-gray-300 mb-8 max-w-md mx-auto md:mx-0 tracking-widest"
          >
            Each style is a masterpiece, a testament to our passion for beauty
            and precision. Explore our gallery to witness the transformations
            and find inspiration for your next look.
          </p>
          <Link href="/gallery" aria-label="Go to full gallery">
            <AnimatedButton text="Explore Our Gallery" />
          </Link>
        </div>

        {/* Image Collage */}
        <div
          id="gallery-preview-image-collage"
          ref={imagesRef}
          className="relative h-[300px] w-full sm:h-[400px] md:h-[500px] row-span-2"
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`absolute rounded-lg overflow-hidden shadow-2xl ${img.className}`}
              style={{ transform: `rotate(${img.rotate}deg)` }}
            >
              {/* Skeleton placeholder */}
              <div
                className={`${SHOW_GALLERYPREVIEW_IMAGES ? (loadedFlags[idx] ? "hidden" : "block") : "block"} absolute inset-0 bg-gray-700/40 animate-pulse`}
                aria-hidden="true"
              />
              {SHOW_GALLERYPREVIEW_IMAGES && (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={75}
                  onLoadingComplete={() => {
                    setLoadedFlags((prev) => {
                      const next = [...prev];
                      next[idx] = true;
                      return next;
                    });
                  }}
                  className={`object-cover object-center transition-opacity duration-500 ${loadedFlags[idx] ? "opacity-100" : "opacity-0"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;

