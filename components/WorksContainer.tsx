"use client";

import { useRef } from "react";
import Gallery from "./Gallery";
import OptimizedGallery from "./ui/optimized-gallery";
import OptimizedHero from "./ui/optimized-hero";

interface WorksContainerProps {
    className?: string;
    weddingsBackgroundImage?: string;
    hairCareBackgroundImage?: string;
}

const WorksContainer = ({ className, weddingsBackgroundImage, hairCareBackgroundImage }: WorksContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Section-specific galleries
    const weddingsGalleryImages = [
        { src: "/images/weddings/gallery/wedding-01.jpg", alt: "Wedding gallery image 1" },
        { src: "/images/weddings/gallery/wedding-02.jpg", alt: "Wedding gallery image 2" },
        { src: "/images/weddings/gallery/wedding-03.jpg", alt: "Wedding gallery image 3" },
        { src: "/images/weddings/gallery/wedding-04.jpg", alt: "Wedding gallery image 4" },
        { src: "/images/weddings/gallery/wedding-05.jpg", alt: "Wedding gallery image 5" },
        { src: "/images/weddings/gallery/wedding-08.jpg", alt: "Wedding gallery image 8" },
        { src: "/images/weddings/gallery/wedding-09.webp", alt: "Wedding gallery image 9" },
        { src: "/images/weddings/gallery/wedding-10.webp", alt: "Wedding gallery image 10" },
        { src: "/images/weddings/gallery/wedding-11.webp", alt: "Wedding gallery image 11" },
        { src: "/images/weddings/gallery/wedding-12.webp", alt: "Wedding gallery image 12" },
        { src: "/images/weddings/gallery/wedding-13.webp", alt: "Wedding gallery image 13" },
        { src: "/images/weddings/gallery/wedding-14.webp", alt: "Wedding gallery image 14" },
        { src: "/images/weddings/gallery/wedding-15.webp", alt: "Wedding gallery image 15" },
        { src: "/images/weddings/gallery/wedding-16.webp", alt: "Wedding gallery image 16" },
        { src: "/images/weddings/gallery/wedding-17.webp", alt: "Wedding gallery image 17" },
        { src: "/images/weddings/gallery/wedding-18.webp", alt: "Wedding gallery image 18" },
    ];

    const hairCareGalleryImages = [
        { src: "/images/hair-care/styling/style-01.jpg", alt: "Hair styling image 1" },
        { src: "/images/hair-care/styling/style-02.jpg", alt: "Hair styling image 2" },
        { src: "/images/hair-care/styling/style-03.jpg", alt: "Hair styling image 3" },
        { src: "/images/hair-care/styling/style-04.avif", alt: "Hair styling image 4" },
        { src: "/images/hair-care/styling/style-05.jpg", alt: "Hair styling image 5" },
        { src: "/images/hair-care/styling/style-06.jpg", alt: "Hair styling image 6" },
        { src: "/images/hair-care/styling/style-07.webp", alt: "Hair styling image 7" },
        { src: "/images/hair-care/styling/style-08.jpg", alt: "Hair styling image 8" },
        { src: "/images/hair-care/styling/style-09.webp", alt: "Hair styling image 9" },
        { src: "/images/hair-care/styling/style-10.webp", alt: "Hair styling image 10" },
        { src: "/images/hair-care/styling/style-11.webp", alt: "Hair styling image 11" },
        { src: "/images/hair-care/styling/style-12.webp", alt: "Hair styling image 12" },
        { src: "/images/hair-care/styling/style-13.jpg", alt: "Hair styling image 13" },
        { src: "/images/hair-care/styling/style-14.webp", alt: "Hair styling image 14" },
        { src: "/images/hair-care/coloring/color-01.jpg", alt: "Hair coloring image 1" },
        { src: "/images/hair-care/coloring/color-02.jpg", alt: "Hair coloring image 2" },
        { src: "/images/hair-care/coloring/color-03.jpg", alt: "Hair coloring image 3" },
        { src: "/images/hair-care/coloring/color-04.jpg", alt: "Hair coloring image 4" },
    ];

    const worksSections = [
        {
            id: 'weddings',
            title: 'Weddings',
            subtitle: 'Complete Wedding Makeover Packages',
            description: 'Professional bridal makeup, hair styling, and groom grooming services for your special day.',
            backgroundImage: weddingsBackgroundImage || '/images/jonathan-borba-qJ2mhxmateo-unsplash.jpg',
            features: ['Bridal Makeup', 'Hair Styling', 'Groom Grooming', 'Pre-wedding Care']
        },
        {
            id: 'hair-care',
            title: 'Hair Care',
            subtitle: 'Professional Hair Services',
            description: 'From basic cuts to advanced styling, we care for all hair types and textures.',
            backgroundImage: hairCareBackgroundImage || '/images/engin-akyurt-35NAaB_Nmx8-unsplash.jpg',
            features: ['Hair Cutting', 'Styling', 'Coloring', 'Treatments']
        },
        {
            id: 'skin-body-care',
            title: 'Skin & Body Care',
            subtitle: 'Rejuvenating Treatments & Wellness',
            description: 'Professional skincare for all skin types and concerns.',
            backgroundImage: '/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg',
            features: ['Facial Treatments', 'Spa Services', 'Body Care', 'Wellness']
        }
    ];

    return (
        <div ref={containerRef} className={`w-full bg-primary ${className || ""}`}>
            {worksSections.map((section) => (
                <section
                    key={section.id}
                    id={`works-${section.id}-section`}
                    className="works-section relative w-full min-h-screen"
                >
                    <OptimizedHero
                        title={section.title}
                        subtitle={section.subtitle}
                        backgroundImage={section.backgroundImage}
                        className="w-full"
                        height="h-screen"
                    />

                    {/* Gallery Section - Responsive */}
                    <div className="gallery-section relative w-full bg-gradient-to-br from-primary via-primary/95 to-primary/90">

                        {/* Gallery Component - Responsive Width */}
                        <div className="w-full py-8 sm:py-10 lg:py-12">
                            {section.id === 'weddings' ? (
                                <OptimizedGallery
                                    images={weddingsGalleryImages}
                                    title={`${section.title} Gallery`}
                                    description={section.description}
                                    className="!bg-transparent"
                                />
                            ) : section.id === 'hair-care' ? (
                                <OptimizedGallery
                                    images={hairCareGalleryImages}
                                    title={`${section.title} Gallery`}
                                    description={section.description}
                                    className="!bg-transparent"
                                />
                            ) : (
                                <Gallery showBackground={false} showPadding={false} />
                            )}
                        </div>

                        {/* CTA Section - Responsive Design */}
                        <div className="text-center pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
                            <div className="bg-gradient-to-r from-accent1/20 to-accent2/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-accent1/30 max-w-4xl mx-auto">
                                <h3 className="text-2xl sm:text-3xl font-gunteerz font-bold text-white mb-3 sm:mb-4 leading-tight">
                                    Ready for a {section.title} Transformation?
                                </h3>
                                <p className="text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                                    Book your {section.title.toLowerCase()} appointment today and experience the BA-BU difference
                                    in professional services and treatments
                                </p>
                                <button
                                    className="bg-gradient-to-r from-accent1 to-accent2 text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full hover:from-accent2 hover:to-accent1 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-sm sm:text-base w-full sm:w-auto"
                                    aria-label={`Book ${section.title} appointment`}
                                >
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default WorksContainer;
