"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import OptimizedHero from "@/components/ui/optimized-hero";
import ServicesContainer from "@/components/ServicesContainer";
import ServiceItemsSection from "@/components/ServiceItemsSection";
import ServiceGalleryMarquee from "@/components/ServiceGalleryMarquee";
import BookingPopup from "@/components/BookingPopup";
import { WhatsAppIcon, PhoneIcon } from "@/components/Icons";
import gentsHairTreatmentCardsData from "@/data/gentsHairTreatmentCards.json";
import hairCutImagesData from "@/data/hairCutImages.json";
import hairCutCardsData from "@/data/hairCutCards.json";
import gentsHairCutCardsData from "@/data/gentsHairCutCards.json";
import ladiesHairColoringCardsData from "@/data/ladiesHairColoringCards.json";
import gentsHairColoringCardsData from "@/data/gentsHairColoringCards.json";
import ladiesHairTreatmentCardsData from "@/data/ladiesHairTreatmentCards.json";
import ShinyText from "@/components/ShinyText";

const HairCareServicePage = () => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<{
        title: string;
        price: string;
        gender: string;
    } | null>(null);

    // Mobile detection
    const [isMobile, setIsMobile] = useState(false);

    // Initial visible items count
    const INITIAL_ITEMS_MOBILE = 2;
    const INITIAL_ITEMS_DESKTOP = 4;

    const [hairCutLadiesVisible, setHairCutLadiesVisible] = useState(INITIAL_ITEMS_DESKTOP);
    const [hairCutGentsVisible, setHairCutGentsVisible] = useState(INITIAL_ITEMS_DESKTOP);
    const [coloringLadiesVisible, setColoringLadiesVisible] = useState(INITIAL_ITEMS_DESKTOP);
    const [coloringGentsVisible, setColoringGentsVisible] = useState(INITIAL_ITEMS_DESKTOP);
    const [treatmentLadiesVisible, setTreatmentLadiesVisible] = useState(INITIAL_ITEMS_DESKTOP);
    const [treatmentGentsVisible, setTreatmentGentsVisible] = useState(INITIAL_ITEMS_DESKTOP);

    // Items per load: 2 for mobile, 4 for desktop
    const ITEMS_PER_LOAD_MOBILE = 2;
    const ITEMS_PER_LOAD_DESKTOP = 4;
    const ITEMS_PER_LOAD = isMobile ? ITEMS_PER_LOAD_MOBILE : ITEMS_PER_LOAD_DESKTOP;

    const handleBookNow = (title: string, price: string, gender: string) => {
        setSelectedService({ title, price, gender });
        setIsBookingOpen(true);
    };

    // Gallery images from HAIRCARE folder for hair cuts section
    const galleryHairCutImages = [
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (1).webp",
            alt: "Professional hair cutting service",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (2).webp",
            alt: "Premium haircut service",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (3).webp",
            alt: "Luxury hair styling",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (4).webp",
            alt: "Professional hair cutting",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (5).webp",
            alt: "Premium hair cutting",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (6).webp",
            alt: "Modern hair styling service",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (7).webp",
            alt: "Professional haircut",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (8).webp",
            alt: "Luxury hair cutting",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (9).webp",
            alt: "Premium haircut service",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (10).webp",
            alt: "Professional hair cutting service",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (11).webp",
            alt: "Beautiful hair styling",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (12).webp",
            alt: "Modern haircut style",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (13).webp",
            alt: "Professional hair cutting",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (14).webp",
            alt: "Premium hair styling",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (15).webp",
            alt: "Luxury haircut service",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (16).webp",
            alt: "Professional hair cutting",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (17).webp",
            alt: "Modern hair styling",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (18).webp",
            alt: "Premium haircut service",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (19).webp",
            alt: "Professional hair cutting",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (20).webp",
            alt: "Beautiful hair styling",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (21).webp",
            alt: "Luxury haircut style",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (22).webp",
            alt: "Professional hair cutting",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (23).webp",
            alt: "Modern hair styling service",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (24).webp",
            alt: "Premium haircut service",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (25).webp",
            alt: "Professional hair cutting",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (26).webp",
            alt: "Beautiful hair styling",
        },
        {
            src: "/images/HAIRCARE/HAIRCUT-STYLES (27).webp",
            alt: "Luxury haircut service",
        },
    ];

    const hairCutImages = hairCutImagesData;

    // Hair Cut Cards for Expandable Component
    const hairCutCards = hairCutCardsData.map((card) => ({
        ...card,
        ctaLink: siteConfig.contact.whatsapp,
        content: () => (
            <div>
                <p className="mb-4">{card.contentData.description}</p>
                <ul className="list-disc list-inside space-y-2">
                    {card.contentData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
        ),
    }));

    // Gents Hair Cut Cards for Expandable Component
    const gentsHairCutCards = gentsHairCutCardsData.map((card) => ({
        ...card,
        ctaLink: siteConfig.contact.whatsapp,
        content: () => (
            <div>
                <p className="mb-4">{card.contentData.description}</p>
                <ul className="list-disc list-inside space-y-2">
                    {card.contentData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
        ),
    }));

    // Hair Coloring Cards for Expandable Component - Ladies
    const ladiesHairColoringCards = ladiesHairColoringCardsData.map((card) => ({
        ...card,
        ctaLink: siteConfig.contact.whatsapp,
        content: () => (
            <div>
                <p className="mb-4">{card.contentData.description}</p>
                <ul className="list-disc list-inside space-y-2">
                    {card.contentData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
        ),
    }));

    // Hair Coloring Cards for Expandable Component - Gents
    const gentsHairColoringCards = gentsHairColoringCardsData.map((card) => ({
        ...card,
        ctaLink: siteConfig.contact.whatsapp,
        content: () => (
            <div>
                <p className="mb-4">{card.contentData.description}</p>
                <ul className="list-disc list-inside space-y-2">
                    {card.contentData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
        ),
    }));

    // Hair Treatment Cards for Expandable Component - Ladies
    const ladiesHairTreatmentCards = ladiesHairTreatmentCardsData.map(
        (card) => ({
            ...card,
            ctaLink: siteConfig.contact.whatsapp,
            content: () => (
                <div>
                    <p className="mb-4">{card.contentData.description}</p>
                    <ul className="list-disc list-inside space-y-2">
                        {card.contentData.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
            ),
        })
    );

    // Hair Treatment Cards for Expandable Component - Gents
    const gentsHairTreatmentCards = gentsHairTreatmentCardsData.map((card) => ({
        ...card,
        ctaLink: siteConfig.contact.whatsapp,
        content: () => (
            <div>
                <p className="mb-4">{card.contentData.description}</p>
                <ul className="list-disc list-inside space-y-2">
                    {card.contentData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
        ),
    }));

    // Detect mobile/desktop and initialize accordingly
    useEffect(() => {
        const checkMobile = () => {
            const mobile = typeof window !== 'undefined' && window.innerWidth < 1024;
            setIsMobile(mobile);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initialize sections based on mobile/desktop
    useEffect(() => {
        const initialCount = isMobile ? INITIAL_ITEMS_MOBILE : INITIAL_ITEMS_DESKTOP;
        setHairCutLadiesVisible(initialCount);
        setHairCutGentsVisible(initialCount);
        setColoringLadiesVisible(initialCount);
        setColoringGentsVisible(initialCount);
        setTreatmentLadiesVisible(initialCount);
        setTreatmentGentsVisible(initialCount);
    }, [isMobile]);

    // Hair coloring images from HAIRCARE folder for page content
    const hairColorImages = [
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (1).webp",
            alt: "Professional hair coloring service",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (2).webp",
            alt: "Beautiful hair highlights",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (3).webp",
            alt: "Hand-painted balayage highlights",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (4).webp",
            alt: "Professional color correction",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (5).webp",
            alt: "Professional hair coloring service",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (6).webp",
            alt: "Beautiful hair highlights",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (7).webp",
            alt: "Hand-painted balayage highlights",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (8).webp",
            alt: "Professional color correction",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (9).webp",
            alt: "Professional hair coloring service",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (10).webp",
            alt: "Beautiful hair highlights",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (11).webp",
            alt: "Hand-painted balayage highlights",
        },
    ];

    // Gallery images from HAIRCARE folder for hair color image strip
    const galleryHairColorImages = [
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (1).webp",
            alt: "Professional hair coloring service",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (2).webp",
            alt: "Beautiful hair highlights",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (3).webp",
            alt: "Hand-painted balayage highlights",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (4).webp",
            alt: "Professional color correction",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (5).webp",
            alt: "Professional hair coloring service",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (6).webp",
            alt: "Beautiful hair highlights",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (7).webp",
            alt: "Hand-painted balayage highlights",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (8).webp",
            alt: "Professional color correction",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (9).webp",
            alt: "Professional hair coloring service",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (10).webp",
            alt: "Beautiful hair highlights",
        },
        {
            src: "/images/HAIRCARE/HAIRCOLOR-STYLES (11).webp",
            alt: "Hand-painted balayage highlights",
        },
    ];

    const hairCutServices = [
        {
            name: "Basic Haircut",
            price: "₹300",
            duration: "30-45 min",
            description: "Simple trim and style",
        },
        {
            name: "Stylish Cut",
            price: "₹500",
            duration: "45-60 min",
            description: "Modern cut with styling",
        },
        {
            name: "Premium Cut",
            price: "₹800",
            duration: "60-90 min",
            description: "Luxury cut with consultation",
        },
    ];

    const hairColorServices = [
        {
            name: "Single Color",
            price: "₹1,200",
            duration: "2-3 hours",
            description: "Full hair coloring",
        },
        {
            name: "Highlights",
            price: "₹2,000",
            duration: "3-4 hours",
            description: "Partial highlighting",
        },
        {
            name: "Balayage",
            price: "₹3,500",
            duration: "4-5 hours",
            description: "Hand-painted highlights",
        },
        {
            name: "Color Correction",
            price: "₹4,000",
            duration: "4-6 hours",
            description: "Fix previous color issues",
        },
    ];

    return (
        <>
            <div className="sr-only">
                <h1>BA-BU Family Salon - Hair Care Services</h1>
                <p>
                    Professional hair cutting, styling, coloring, and treatments
                    for all hair types and textures.
                </p>
            </div>

            {/* Main Hero Section */}
            <OptimizedHero
                title="Hair Care Services"
                subtitle="Professional Hair Styling & Treatments"
                backgroundImage="/images/HAIRCARE/haircare-heropage.webp"
            />

            {/* Hair Cuts Section */}
            <section className="hair-cuts-section">
                <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                    <h3 className="m-0 p-0">
                        <ShinyText
                            text="Hair Cuts & Styling"
                            disabled={true}
                            speed={0}
                            className="text-5xl sm:text-7xl font-gunteerz font-extrabold text-white my-16 py-3 text-center golden-gradient-button"
                        />
                    </h3>
                    <div className="text-left sm:text-center sm:mx-16 mb-16">
                        <p className="text-lg sm:text-2xl text-white leading-relaxed tracking-wider">
                            At{" "}
                            <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">
                                BA-BU Salon
                            </span>
                            , we provide professional hair cutting services for
                            everyone. Our expert stylists and barbers ensure
                            precision, elegance, and perfect results for both
                            men and women. Whether you're looking for a trendy
                            new style, a classic cut, or a complete
                            transformation, we use top professional products and
                            the latest techniques to create looks that suit your
                            face shape, hair texture, and lifestyle.
                        </p>
                    </div>
                </div>

                <ServiceItemsSection
                    ladiesCards={hairCutCards}
                    gentsCards={gentsHairCutCards}
                    ladiesVisible={hairCutLadiesVisible}
                    gentsVisible={hairCutGentsVisible}
                    onLadiesLoadMore={() => setHairCutLadiesVisible(prev =>
                        Math.min(prev + ITEMS_PER_LOAD, hairCutCards.length)
                    )}
                    onGentsLoadMore={() => setHairCutGentsVisible(prev =>
                        Math.min(prev + ITEMS_PER_LOAD, gentsHairCutCards.length)
                    )}
                    onBookNow={handleBookNow}
                    itemsPerLoad={ITEMS_PER_LOAD}
                />
            </section>

            {/* Hair Cut Styles Gallery - Infinite Scroll */}
            <ServiceGalleryMarquee
                title="Our Hair Cut Styles"
                subtitle="Browse through our collection of stunning haircuts and styles"
                images={galleryHairCutImages}
                className="pt-16 sm:pt-20 lg:pt-24"
            />

            {/* Hair Coloring Section */}
            <section className="hair-coloring-section">
                <div className="pt-12 sm:pt-16 lg:pt-20 bg-black">
                    <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                        <h3 className="m-0 p-0">
                            <ShinyText
                                text="Hair Coloring"
                                disabled={true}
                                speed={0}
                                className="text-5xl sm:text-7xl font-gunteerz font-extrabold text-white my-16 py-3 text-center golden-gradient-button"
                            />
                        </h3>
                        <div className="text-left sm:text-center sm:mx-16 mb-16">
                            <p className="text-lg sm:text-2xl text-white leading-relaxed tracking-wider">
                                At{" "}
                                <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">
                                    BA-BU Salon
                                </span>
                                , our expert colorists offer professional hair
                                coloring services including highlighting, global
                                color, henna treatments, balayage, and more.
                                Using premium products, we ensure vibrant,
                                lasting color that enhances your natural beauty
                                while protecting your hair's health. Whether you
                                want a subtle touch-up or a bold new shade, we
                                tailor every color to suit your style and skin
                                tone.
                            </p>
                        </div>
                    </div>
                </div>

                <ServiceItemsSection
                    ladiesCards={ladiesHairColoringCards}
                    gentsCards={gentsHairColoringCards}
                    ladiesVisible={coloringLadiesVisible}
                    gentsVisible={coloringGentsVisible}
                    onLadiesLoadMore={() => setColoringLadiesVisible(prev =>
                        Math.min(prev + ITEMS_PER_LOAD, ladiesHairColoringCards.length)
                    )}
                    onGentsLoadMore={() => setColoringGentsVisible(prev =>
                        Math.min(prev + ITEMS_PER_LOAD, gentsHairColoringCards.length)
                    )}
                    onBookNow={handleBookNow}
                    itemsPerLoad={ITEMS_PER_LOAD}
                />
            </section>

            {/* Hair Color Styles Gallery - Infinite Scroll */}
            <ServiceGalleryMarquee
                title="Our Hair Color Styles"
                subtitle="Explore our collection of beautiful hair colors and highlights"
                images={galleryHairColorImages}
            />

            {/* Hair Treatments Section */}
            <section className="hair-treatments-section">
                <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                    <h3 className="m-0 p-0">
                        <ShinyText
                            text="Hair Treatments"
                            disabled={true}
                            speed={0}
                            className="text-5xl sm:text-7xl font-gunteerz font-extrabold text-white my-16 py-3 text-center golden-gradient-button"
                        />
                    </h3>
                    <div className="text-left sm:text-center sm:mx-16 mb-16">
                        <p className="text-lg sm:text-2xl text-white leading-relaxed tracking-wider">
                            Experience revitalizing hair treatments at{" "}
                            <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">
                                BA-BU Salon
                            </span>{" "}
                            designed to nourish, repair, and strengthen your
                            hair. From anti-dandruff and protein treatments to
                            deep hair spas and scalp care, our customized
                            therapies restore health and shine to all hair
                            types. Let our experts rejuvenate your hair with the
                            latest techniques and premium products for silky,
                            manageable locks every day.
                        </p>
                    </div>
                </div>

                <ServiceItemsSection
                    ladiesCards={ladiesHairTreatmentCards}
                    gentsCards={gentsHairTreatmentCards}
                    ladiesVisible={treatmentLadiesVisible}
                    gentsVisible={treatmentGentsVisible}
                    onLadiesLoadMore={() => setTreatmentLadiesVisible(prev =>
                        Math.min(prev + ITEMS_PER_LOAD, ladiesHairTreatmentCards.length)
                    )}
                    onGentsLoadMore={() => setTreatmentGentsVisible(prev =>
                        Math.min(prev + ITEMS_PER_LOAD, gentsHairTreatmentCards.length)
                    )}
                    onBookNow={handleBookNow}
                    itemsPerLoad={ITEMS_PER_LOAD}
                />
            </section>

            {/* CTA Section - Responsive Design */}
            <section className="cta-section py-12 sm:py-16 lg:py-20 bg-black text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-gunteerz font-bold mb-4 sm:mb-6 leading-tight">
                        Ready to Transform Your Hair?
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4 sm:px-0">
                        Book your hair care appointment today and experience the
                        BA-BU difference
                    </p>

                    {/* Responsive Button Layout */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                        <a
                            href={siteConfig.contact.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg text-center hover:bg-green-700 tracking-wider flex items-center justify-center gap-2"
                            aria-label="Contact us on WhatsApp for hair care services"
                        >
                            <WhatsAppIcon />
                            WhatsApp Us
                        </a>
                        <a
                            href={`tel:${siteConfig.contact.phone}`}
                            className="w-full sm:w-auto golden-gradient-button text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 text-base sm:text-lg text-center shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wider flex items-center justify-center gap-2"
                            aria-label="Call us for hair care services"
                        >
                            <PhoneIcon />
                            Call Now
                        </a>
                    </div>
                </div>
            </section>

            {/* Explore Other Services - Interactive Hero (Weddings & Skin) */}
            <ServicesContainer
                serviceSectionsOverride={[
                    {
                        id: "weddings",
                        title: "Wedding Services",
                        backgroundImage:
                            "/images/weddings/gallery/wedding-08.webp",
                    },
                    {
                        id: "skin-body-care",
                        title: "Skin & Body Care",
                        backgroundImage:
                            "/images/SKINANDBODY/skin-body-hero.webp",
                    },
                ]}
            />

            {/* Booking Popup */}
            <BookingPopup
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                serviceDetails={selectedService}
            />
        </>
    );
};

export default HairCareServicePage;