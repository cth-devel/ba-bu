"use client";

import { useEffect, useRef, useState } from "react";
import OptimizedImage from "./optimized-image";
import Image from "next/image";

interface GalleryImage {
    src: string;
    alt: string;
    title?: string;
}

interface OptimizedGalleryProps {
    images: GalleryImage[];
    title: string;
    description?: string;
    className?: string;
}

const OptimizedGallery = ({
    images,
    title,
    description,
    className,
}: OptimizedGalleryProps) => {
    const galleryRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const openModal = (image: GalleryImage) => {
        setSelectedImage(image);
        setIsModalOpen(true);
        try { document.body.style.overflow = "hidden"; } catch {}
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
        try { document.body.style.overflow = ""; } catch {}
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        if (isModalOpen) document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isModalOpen]);

    // Grid-based varying tile sizes (inspired by components/Gallery.tsx)
    // Use auto-rows and span classes to create different visual heights
    const autoRowClasses = "auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[260px]";
    const tileClassPresets = [
        // Larger feature/tall tile
        "col-span-1 row-span-2",
        // Standard tile
        "col-span-1 row-span-1",
        // Another tall tile
        "col-span-1 row-span-2",
        // Standard tile
        "col-span-1 row-span-1",
    ];

    return (
        <>
        <section
            ref={galleryRef}
            className={`py-12 sm:py-16 lg:py-20 bg-white ${className || ""}`}
        >
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-gunteerz font-black text-black mb-4 sm:mb-6 leading-tight">
                        {title}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                        {description}
                    </p>
                </div>

                {/* Responsive Grid Layout */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${autoRowClasses} gap-4 sm:gap-6`}>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`group animate-fade-in-up ${tileClassPresets[index % tileClassPresets.length]} cursor-pointer`}
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => openModal(image)}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && openModal(image)}
                            aria-label={`View gallery image ${index + 1}`}
                            role="button"
                        >
                            <div className="relative h-full overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                <OptimizedImage
                                    src={image.src}
                                    alt={image.alt}
                                    width={300}
                                    height={200}
                                    className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    containerStyle={{ width: "100%", height: "100%" }}
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    quality={80}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        {isModalOpen && selectedImage && (
            <div
                ref={modalRef}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4"
                onClick={closeModal}
                role="dialog"
                aria-modal="true"
                aria-label="Gallery image modal"
            >
                <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                    <Image
                        src={selectedImage!.src}
                        alt={selectedImage!.alt}
                        width={1200}
                        height={800}
                        className="max-w-[95vw] sm:max-w-[90vw] max-h-[95vh] sm:max-h-[90vh] object-contain rounded-lg sm:rounded-xl"
                        priority
                    />
                    <button
                        onClick={closeModal}
                        className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>
            </div>
        )}
        </>
    );
};

export default OptimizedGallery;
