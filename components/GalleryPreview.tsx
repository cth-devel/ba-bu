"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/images/ba-bu-family-salon-ernakulam-mw0w9iz9vd.webp",
    alt: "A stylish haircut and beard trim for a male client.",
    className: "absolute top-0 left-0 w-4/5 h-3/5 rounded-lg shadow-2xl",
    rotate: -8,
  },
  {
    src: "/images/ba-bu-family-salon-ernakulam-salons-hdt7xnk5d1.jpg",
    alt: "The modern and clean interior of the salon.",
    className: "absolute bottom-0 right-0 w-3/4 h-2/3 rounded-lg shadow-2xl",
    rotate: 6,
  },
  {
    src: "/images/ba-bu-family-salon-ernakulam-jq0ppxb1ra.avif",
    alt: "A client receiving a professional hair treatment.",
    className: "absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-lg shadow-2xl",
    rotate: 2,
  },
];

const GalleryPreview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0"
    >
      <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div
          id="gallery-preview-text-content"
          ref={textContentRef}
          className="text-white text-center md:text-left"
        >
          <h2
            id="gallery-preview-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4"
            style={{ fontFamily: "'Gunterz-Bold', sans-serif" }}
          >
            Our Artistry in Action
          </h2>
          <p
            id="gallery-preview-description"
            className="text-base md:text-lg text-gray-300 mb-8 max-w-md mx-auto md:mx-0 tracking-widest"
          >
            Each style is a masterpiece, a testament to our passion for beauty
            and precision. Explore our gallery to witness the transformations
            and find inspiration for your next look.
          </p>
          <Link href="/works" aria-label="Go to full gallery">
            <AnimatedButton text="Explore Our Works" />
          </Link>
        </div>

        {/* Image Collage */}
        <div
          id="gallery-preview-image-collage"
          ref={imagesRef}
          className="relative h-[300px] w-full sm:h-[400px] md:h-[500px]"
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`absolute rounded-lg overflow-hidden shadow-2xl ${img.className}`}
              style={{ transform: `rotate(${img.rotate}deg)` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                quality={75}
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;

