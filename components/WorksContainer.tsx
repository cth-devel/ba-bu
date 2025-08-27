"use client";

import { useRef } from "react";
import Gallery from "./Gallery";
import OptimizedHero from "./ui/optimized-hero";

interface WorksContainerProps {
    className?: string;
}

const WorksContainer = ({ className }: WorksContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const worksSections = [
        {
            id: 'weddings',
            title: 'Weddings',
            subtitle: 'Complete Wedding Makeover Packages',
            description: 'Professional bridal makeup, hair styling, and groom grooming services for your special day.',
            backgroundImage: '/images/jonathan-borba-qJ2mhxmateo-unsplash.jpg',
            features: ['Bridal Makeup', 'Hair Styling', 'Groom Grooming', 'Pre-wedding Care']
        },
        {
            id: 'hair-care',
            title: 'Hair Care',
            subtitle: 'Professional Hair Services',
            description: 'From basic cuts to advanced styling, we care for all hair types and textures.',
            backgroundImage: '/images/engin-akyurt-35NAaB_Nmx8-unsplash.jpg',
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
                            <Gallery showBackground={false} showPadding={false} />
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
