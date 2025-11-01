"use client";

import React from "react";
import ShinyText from "@/components/ShinyText";

interface GalleryImage {
    src: string;
    alt: string;
    title?: string;
}

interface ServiceGalleryMarqueeProps {
    title: string;
    subtitle: string;
    images: GalleryImage[];
    className?: string;
}

const ServiceGalleryMarquee: React.FC<ServiceGalleryMarqueeProps> = ({
    title,
    subtitle,
    images,
    className = "",
}) => {
    return (
        <section className={`py-16 sm:py-20 lg:py-24 bg-black ${className}`}>
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h3 className="text-xl sm:text-2xl font-gunteerz font-bold text-white mb-4">
                        <ShinyText
                            text={title}
                            disabled={true}
                            speed={0}
                            className="text-2xl sm:text-6xl py-4 font-gunteerz font-bold text-white mb-4 tracking-wide"
                        />
                    </h3>
                    <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto tracking-wider">
                        {subtitle}
                    </p>
                </div>

                {/* Infinite Scroll Gallery */}
                <div className="relative overflow-hidden py-8">
                    <div className="flex animate-scroll-right">
                        {/* First set of images */}
                        {images.map((image, index) => (
                            <div
                                key={`first-${index}`}
                                className="flex-shrink-0 w-80 sm:w-96 lg:w-[28rem] mx-2 sm:mx-4"
                            >
                                <div className="relative h-80 sm:h-96 lg:h-[28rem] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                    {image.title && (
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h4 className="text-white font-semibold text-sm sm:text-base">
                                                {image.title}
                                            </h4>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Duplicate set for seamless loop */}
                        {images.map((image, index) => (
                            <div
                                key={`second-${index}`}
                                className="flex-shrink-0 w-80 sm:w-96 lg:w-[28rem] mx-2 sm:mx-4"
                            >
                                <div className="relative h-80 sm:h-96 lg:h-[28rem] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                    {image.title && (
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h4 className="text-white font-semibold text-sm sm:text-base">
                                                {image.title}
                                            </h4>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceGalleryMarquee;


