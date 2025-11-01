"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  "/images/ba-bu-family-salon-ernakulam-h2t14qkf70.avif",
  "/images/ba-bu-family-salon-ernakulam-jq0ppxb1ra.avif",
  "/images/ba-bu-family-salon-ernakulam-mo876rr3ve.avif",
  "/images/ba-bu-family-salon-ernakulam-mw0w9iz9vd.webp",
  "/images/ba-bu-family-salon-ernakulam-salons-hdt7xnk5d1.webp",
  "/images/ba-bu-family-salon-north-paravoor-ernakulam-salons-rt79kzzgtq.avif",
  "/images/baylee-gramling-a3xr2mVjT5M-unsplash.webp",
  "/images/engin-akyurt-35NAaB_Nmx8-unsplash.webp",
  "/images/john-arano-CCTCHXEsan8-unsplash.webp",
  "/images/jonathan-borba-qJ2mhxmateo-unsplash.webp",
  "/images/mitchell-orr-dcAw8Ms-teQ-unsplash.webp",
  "/images/quentin-mahe-mAW3jUP6G6E-unsplash.webp",
  "/images/sofia-vila-flor-ebNYeZ8SR2o-unsplash.webp",
  "/images/wali-38sbVK-LI1Q-unsplash.webp",
  "/images/about-img-1.webp",
  "/images/about-img-2.webp",
];

const ChromaGrid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".chroma-grid-item");
      items.forEach((item: any) => {
        gsap.from(item, {
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power3.in",
      onComplete: () => {
        setIsModalOpen(false);
        setSelectedImage(null);
      },
    });
  };

  return (
    <section id="chroma-gallery-section" className="py-20 bg-black">
      <div className="max-w-7xl mx-6 px-4 sm:px-6 lg:px-8">
        <div id="gallery-header" className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-sans font-extrabold text-white mb-4">
            Our Gallery
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-yellow-300 mx-auto mb-6"></div>
          <p className="text-lg text-white/80 max-w-2xl mx-auto tracking-wider">
            Explore the artistry and moments we've captured.
          </p>
        </div>

        <div
          id="chroma-grid"
          ref={gridRef}
          className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-[250px] gap-4"
        >
          {galleryImages.map((image, index) => (
            <div
              key={image}
              id={`chroma-grid-item-${index}`}
              className={cn(
                "chroma-grid-item relative rounded-lg overflow-hidden cursor-pointer group",
                index % 6 === 0 && "sm:col-span-2 sm:row-span-2"
              )}
              onClick={() => openModal(image)}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
              />

            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedImage && (
        <div
          id="gallery-modal"
          ref={modalRef}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Enlarged gallery view"
              width={1200}
              height={800}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <button
              id="gallery-modal-close-button"
              onClick={closeModal}
              className="absolute -top-3 -right-3 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ChromaGrid;
