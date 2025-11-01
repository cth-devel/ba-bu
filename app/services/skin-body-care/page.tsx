"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import OptimizedHero from "@/components/ui/optimized-hero";
import ServicesContainer from "@/components/ServicesContainer";
import ServiceItemsSection from "@/components/ServiceItemsSection";
import BookingPopup from "@/components/BookingPopup";
import ShinyText from "@/components/ShinyText";
import { WhatsAppIcon, PhoneIcon } from "@/components/Icons";

// Import JSON data files
import ladiesCleanupCardsData from "@/data/ladiesCleanupCards.json";
import gentsCleanupCardsData from "@/data/gentsCleanupCards.json";
import facialsCardsData from "@/data/facialsCards.json";
import ladiesThreadingCardsData from "@/data/ladiesThreadingCards.json";
import bleachingCardsData from "@/data/bleachingCards.json";
import waxingCardsData from "@/data/waxingCards.json";
import pedicureManicureCardsData from "@/data/pedicureManicureCards.json";
import massageServicesCardsData from "@/data/massageServicesCards.json";

const SkinBodyCareServicePage = () => {
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

    const [cleanupLadiesVisible, setCleanupLadiesVisible] = useState(INITIAL_ITEMS_DESKTOP);
    const [cleanupGentsVisible, setCleanupGentsVisible] = useState(INITIAL_ITEMS_DESKTOP);
    const [facialsVisible, setFacialsVisible] = useState(INITIAL_ITEMS_DESKTOP);
    const [threadingVisible, setThreadingVisible] = useState(INITIAL_ITEMS_DESKTOP);
    const [bleachingVisible, setBleachingVisible] = useState(INITIAL_ITEMS_DESKTOP);
    const [waxingVisible, setWaxingVisible] = useState(INITIAL_ITEMS_DESKTOP);
    const [pedicureManicureVisible, setPedicureManicureVisible] = useState(INITIAL_ITEMS_DESKTOP);
    const [massageVisible, setMassageVisible] = useState(INITIAL_ITEMS_DESKTOP);

    // Items per load: 2 for mobile, 4 for desktop
    const ITEMS_PER_LOAD_MOBILE = 2;
    const ITEMS_PER_LOAD_DESKTOP = 4;
    const ITEMS_PER_LOAD = isMobile ? ITEMS_PER_LOAD_MOBILE : ITEMS_PER_LOAD_DESKTOP;

    const handleBookNow = (title: string, price: string, gender: string) => {
        setSelectedService({ title, price, gender });
        setIsBookingOpen(true);
    };

    // Transform card data to match ServiceItemsSection format
    const ladiesCleanupCards = ladiesCleanupCardsData.map((card: any) => ({
        ...card,
        ctaLink: siteConfig.contact.whatsapp,
        content: () => (
            <div>
                <p className="text-gray-600 leading-relaxed">{card.content}</p>
            </div>
        ),
    }));

    const gentsCleanupCards = gentsCleanupCardsData.map((card: any) => ({
        ...card,
        ctaLink: siteConfig.contact.whatsapp,
        content: () => (
            <div>
                <p className="text-gray-600 leading-relaxed">{card.content}</p>
            </div>
        ),
    }));

    const facialsCards = facialsCardsData.map((card: any) => ({
        ...card,
        ctaLink: siteConfig.contact.whatsapp,
        content: () => (
            <div>
                <p className="text-gray-600 leading-relaxed">{card.content}</p>
            </div>
        ),
    }));

    const ladiesThreadingCards = ladiesThreadingCardsData.map((card: any) => ({
        ...card,
        ctaLink: siteConfig.contact.whatsapp,
        content: () => (
            <div>
                <p className="text-gray-600 leading-relaxed">{card.content}</p>
            </div>
        ),
    }));

    const bleachingCards = bleachingCardsData.map((card: any) => ({
        ...card,
        ctaLink: siteConfig.contact.whatsapp,
        content: () => (
            <div>
                <p className="text-gray-600 leading-relaxed">{card.content}</p>
            </div>
        ),
    }));

    const waxingCards = waxingCardsData.map((card: any) => ({
        ...card,
        ctaLink: siteConfig.contact.whatsapp,
        content: () => (
            <div>
                <p className="text-gray-600 leading-relaxed">{card.content}</p>
            </div>
        ),
    }));

    const pedicureManicureCards = pedicureManicureCardsData.map((card: any) => ({
        ...card,
        ctaLink: siteConfig.contact.whatsapp,
        content: () => (
            <div>
                <p className="text-gray-600 leading-relaxed">{card.content}</p>
            </div>
        ),
    }));

    const massageServicesCards = massageServicesCardsData.map((card: any) => ({
        ...card,
        ctaLink: siteConfig.contact.whatsapp,
        content: () => (
            <div>
                <p className="text-gray-600 leading-relaxed">{card.content}</p>
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
        setCleanupLadiesVisible(initialCount);
        setCleanupGentsVisible(initialCount);
        setFacialsVisible(initialCount);
        setThreadingVisible(initialCount);
        setBleachingVisible(initialCount);
        setWaxingVisible(initialCount);
        setPedicureManicureVisible(initialCount);
        setMassageVisible(initialCount);
    }, [isMobile]);

    return (
        <>
            <div className="sr-only">
                <h1>BA-BU Family Salon - Skin & Body Care Services</h1>
                <p>
                    Professional skincare, body treatments, and wellness
                    services for all skin types and concerns.
                </p>
            </div>

            {/* Main Hero Section */}
            <OptimizedHero
                title="Skin & Body Care Services"
                subtitle="Professional Skincare & Wellness Treatments"
                backgroundImage="/images/skin-care/fleur-kaan-w4Dj3MshHQ0-unsplash.webp"
            />

            {/* Cleanup & Detan Section */}
            <section className="cleanup-detran-section">
                <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                    <h3 className="m-0 p-0">
                        <ShinyText
                            text="Cleanup & Detan"
                            disabled={true}
                            speed={0}
                            className="text-5xl sm:text-7xl font-gunteerz font-extrabold text-white my-16 py-3 text-center golden-gradient-button"
                        />
                    </h3>
                    <div className="text-left sm:text-center sm:mx-16 mb-16">
                        <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed tracking-wider">
                            Professional facial cleanup and tan removal
                            treatments
                        </p>
                    </div>
                </div>

                <ServiceItemsSection
                    ladiesCards={ladiesCleanupCards}
                    gentsCards={gentsCleanupCards}
                    ladiesVisible={cleanupLadiesVisible}
                    gentsVisible={cleanupGentsVisible}
                    onLadiesLoadMore={() => setCleanupLadiesVisible(prev =>
                        Math.min(prev + ITEMS_PER_LOAD, ladiesCleanupCards.length)
                    )}
                    onGentsLoadMore={() => setCleanupGentsVisible(prev =>
                        Math.min(prev + ITEMS_PER_LOAD, gentsCleanupCards.length)
                    )}
                    onBookNow={handleBookNow}
                    itemsPerLoad={ITEMS_PER_LOAD}
                />
            </section>

            {/* Facials Section */}
            <section className="facials-section">
                <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                    <h3 className="m-0 p-0">
                        <ShinyText
                            text="Facials"
                            disabled={true}
                            speed={0}
                            className="text-5xl sm:text-7xl font-gunteerz font-extrabold text-white my-16 py-3 text-center golden-gradient-button"
                        />
                    </h3>
                    <div className="text-left sm:text-center sm:mx-16 mb-16">
                        <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed tracking-wider">
                            Pamper your skin with rejuvenating facial treatments
                            at{" "}
                            <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">
                                BA-BU Salon
                            </span>
                            . Our range of facials, including{" "}
                            <span className="font-semibold text-[#ffd277]">
                                brightening
                            </span>
                            ,{" "}
                            <span className="font-semibold text-[#ffd277]">
                                anti-aging
                            </span>
                            ,{" "}
                            <span className="font-semibold text-[#ffd277]">
                                hydrating
                            </span>
                            , and{" "}
                            <span className="font-semibold text-[#ffd277]">
                                gold facials
                            </span>
                            , are designed to cleanse, nourish, and refresh your
                            skin for a radiant, healthy glow. Each session is
                            customized to suit your skin type, using premium
                            skincare products and gentle techniques that deliver
                            visible results.
                        </p>
                    </div>
                </div>

                {/* Facials Section */}
                <div className="py-12 sm:py-16 lg:py-20 bg-black">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="mb-16">
                            <ServiceItemsSection
                                ladiesCards={facialsCards}
                                gentsCards={[]}
                                ladiesVisible={facialsVisible}
                                gentsVisible={0}
                                onLadiesLoadMore={() => setFacialsVisible(prev =>
                                    Math.min(prev + ITEMS_PER_LOAD, facialsCards.length)
                                )}
                                onGentsLoadMore={() => {}}
                                onBookNow={handleBookNow}
                                itemsPerLoad={ITEMS_PER_LOAD}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Threading Section */}
            <section className="threading-section">
                <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                    <h3 className="m-0 p-0">
                        <ShinyText
                            text="Threading"
                            disabled={true}
                            speed={0}
                            className="text-5xl sm:text-7xl font-gunteerz font-extrabold text-white my-16 py-3 text-center golden-gradient-button"
                        />
                    </h3>
                    <div className="text-left sm:text-center sm:mx-16 mb-16">
                        <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed tracking-wider">
                            Achieve perfectly shaped brows and smooth, flawless
                            skin with professional threading services at{" "}
                            <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">
                                BA-BU Salon
                            </span>
                            . Our experts specialize in precise{" "}
                            <span className="font-semibold text-[#ffd277]">
                                eyebrow shaping
                            </span>
                            ,{" "}
                            <span className="font-semibold text-[#ffd277]">
                                upper lip
                            </span>
                            ,{" "}
                            <span className="font-semibold text-[#ffd277]">
                                chin
                            </span>
                            , and{" "}
                            <span className="font-semibold text-[#ffd277]">
                                full-face threading
                            </span>{" "}
                            using gentle techniques that minimize discomfort and
                            irritation. Experience clean, defined results that
                            enhance your natural features — because beauty
                            begins with perfect brows.
                        </p>
                    </div>
                </div>

                {/* Threading Section */}
                <div className="py-12 sm:py-16 lg:py-20 bg-black">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="mb-16">
                            <ServiceItemsSection
                                ladiesCards={ladiesThreadingCards}
                                gentsCards={[]}
                                ladiesVisible={threadingVisible}
                                gentsVisible={0}
                                onLadiesLoadMore={() => setThreadingVisible(prev =>
                                    Math.min(prev + ITEMS_PER_LOAD, ladiesThreadingCards.length)
                                )}
                                onGentsLoadMore={() => {}}
                                onBookNow={handleBookNow}
                                itemsPerLoad={ITEMS_PER_LOAD}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Bleaching Section */}
            <section className="bleaching-section">
                <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                    <h3 className="m-0 p-0">
                        <ShinyText
                            text="Bleaching"
                            disabled={true}
                            speed={0}
                            className="text-5xl sm:text-7xl font-gunteerz font-extrabold text-white my-16 py-3 text-center golden-gradient-button"
                        />
                    </h3>
                    <div className="text-left sm:text-center sm:mx-16 mb-16">
                        <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed tracking-wider">
                            Brighten your look with professional{" "}
                            <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">
                                bleaching services
                            </span>{" "}
                            at{" "}
                            <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">
                                BA-BU Salon
                            </span>
                            . Our experts use safe, high-quality products to
                            lighten facial hair and even skin tone, giving your
                            complexion a radiant, smooth glow. Whether it's a{" "}
                            <span className="font-semibold text-[#ffd277]">
                                full-face bleach
                            </span>
                            ,{" "}
                            <span className="font-semibold text-[#ffd277]">
                                neck bleach
                            </span>
                            , or{" "}
                            <span className="font-semibold text-[#ffd277]">
                                detan and bleach combo
                            </span>
                            , we ensure gentle care suited for all skin types.
                            Reveal a fresher, brighter you with our specialized
                            skin-lightening treatments.
                        </p>
                    </div>
                </div>

                {/* Bleaching Section */}
                <div className="py-12 sm:py-16 lg:py-20 bg-black">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="mb-16">
                            <ServiceItemsSection
                                ladiesCards={bleachingCards}
                                gentsCards={[]}
                                ladiesVisible={bleachingVisible}
                                gentsVisible={0}
                                onLadiesLoadMore={() => setBleachingVisible(prev =>
                                    Math.min(prev + ITEMS_PER_LOAD, bleachingCards.length)
                                )}
                                onGentsLoadMore={() => {}}
                                onBookNow={handleBookNow}
                                itemsPerLoad={ITEMS_PER_LOAD}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Waxing Section */}
            <section className="waxing-section">
                <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                    <h3 className="m-0 p-0">
                        <ShinyText
                            text="Waxing"
                            disabled={true}
                            speed={0}
                            className="text-5xl sm:text-7xl font-gunteerz font-extrabold text-white my-16 py-3 text-center golden-gradient-button"
                        />
                    </h3>
                    <div className="text-left sm:text-center sm:mx-16 mb-16">
                        <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed tracking-wider">
                            Get smooth, flawless skin with{" "}
                            <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">
                                BA-BU Salon's professional waxing services
                            </span>
                            . We offer full-body, half-body, face, arms, legs,
                            and bikini waxing using top-quality wax and hygienic
                            techniques. Our expert aestheticians ensure a
                            comfortable, gentle experience with long-lasting
                            results. Stay confident and hair-free with safe,
                            skin-friendly waxing that leaves your skin silky and
                            refreshed.
                        </p>
                    </div>
                </div>
                {/* Waxing Section */}
                <div className="py-12 sm:py-16 lg:py-20 bg-black">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="mb-16">
                            <ServiceItemsSection
                                ladiesCards={waxingCards}
                                gentsCards={[]}
                                ladiesVisible={waxingVisible}
                                gentsVisible={0}
                                onLadiesLoadMore={() => setWaxingVisible(prev =>
                                    Math.min(prev + ITEMS_PER_LOAD, waxingCards.length)
                                )}
                                onGentsLoadMore={() => {}}
                                onBookNow={handleBookNow}
                                itemsPerLoad={ITEMS_PER_LOAD}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pedicure & Manicure Section */}
            <section className="pedicure-manicure-section">
                <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                    <h3 className="m-0 p-0">
                        <ShinyText
                            text="Pedicure & Manicure"
                            disabled={true}
                            speed={0}
                            className="text-5xl sm:text-7xl font-gunteerz font-extrabold text-white my-16 py-3 text-center golden-gradient-button"
                        />
                    </h3>
                    <div className="text-left sm:text-center sm:mx-16 mb-16">
                        <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed tracking-wider">
                            Pamper your hands and feet with professional{" "}
                            <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">
                                pedicure and manicure services
                            </span>{" "}
                            at{" "}
                            <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">
                                BA-BU Salon
                            </span>
                            . Our treatments include nail trimming, shaping,
                            cuticle care, exfoliation, relaxing massages, and
                            polish application. Choose from classic, gel, or spa
                            options designed to keep your nails healthy,
                            beautiful, and perfectly polished for any occasion.
                        </p>
                    </div>
                </div>

                {/* Pedicure & Manicure Section */}
                <div className="py-12 sm:py-16 lg:py-20 bg-black">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="mb-16">
                            <ServiceItemsSection
                                ladiesCards={pedicureManicureCards}
                                gentsCards={[]}
                                ladiesVisible={pedicureManicureVisible}
                                gentsVisible={0}
                                onLadiesLoadMore={() => setPedicureManicureVisible(prev =>
                                    Math.min(prev + ITEMS_PER_LOAD, pedicureManicureCards.length)
                                )}
                                onGentsLoadMore={() => {}}
                                onBookNow={handleBookNow}
                                itemsPerLoad={ITEMS_PER_LOAD}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Massage Services Section */}
            <section className="massage-services-section">
                <div className="w-full text-center px-4 sm:px-6 lg:px-8">
                    <h3 className="m-0 p-0">
                        <ShinyText
                            text="Massage Services"
                            disabled={true}
                            speed={0}
                            className="text-5xl sm:text-7xl font-gunteerz font-extrabold text-white my-16 py-3 text-center golden-gradient-button"
                        />
                    </h3>
                    <div className="text-left sm:text-center sm:mx-16 mb-16">
                        <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed tracking-wider">
                            Relax and rejuvenate with expert massage services at{" "}
                            <span className="font-bold bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text text-transparent">
                                BA-BU Salon
                            </span>
                            . Our skilled therapists offer a variety of massage
                            techniques designed to relieve stress, improve
                            circulation, and promote overall wellness. Whether
                            you want a soothing full-body massage or targeted
                            therapy, enjoy a calming experience that refreshes
                            your body and mind.
                        </p>
                    </div>
                </div>

                {/* Massage Services Section */}
                <div className="py-12 sm:py-16 lg:py-20 bg-black">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="mb-16">
                            <ServiceItemsSection
                                ladiesCards={massageServicesCards}
                                gentsCards={[]}
                                ladiesVisible={massageVisible}
                                gentsVisible={0}
                                onLadiesLoadMore={() => setMassageVisible(prev =>
                                    Math.min(prev + ITEMS_PER_LOAD, massageServicesCards.length)
                                )}
                                onGentsLoadMore={() => {}}
                                onBookNow={handleBookNow}
                                itemsPerLoad={ITEMS_PER_LOAD}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Responsive Design */}
            <section className="cta-section py-12 sm:py-16 lg:py-20 bg-black text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-gunteerz font-bold mb-4 sm:mb-6 leading-tight">
                        Ready to Transform Your Skin?
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4 sm:px-0">
                        Book your skin care appointment today and experience the
                        BA-BU difference
                    </p>

                    {/* Responsive Button Layout */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                        <a
                            href={siteConfig.contact.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg text-center hover:bg-green-700 tracking-wider flex items-center justify-center gap-2"
                            aria-label="Contact us on WhatsApp for skin care services"
                        >
                            <WhatsAppIcon />
                            WhatsApp Us
                        </a>
                        <a
                            href={`tel:${siteConfig.contact.phone}`}
                            className="w-full sm:w-auto golden-gradient-button text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 text-base sm:text-lg text-center shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wider flex items-center justify-center gap-2"
                            aria-label="Call us for skin care services"
                        >
                            <PhoneIcon />
                            Call Now
                        </a>
                    </div>
                </div>
            </section>

            {/* Explore Other Services - Interactive Hero (Weddings & Hair) */}
            <ServicesContainer
                serviceSectionsOverride={[
                    {
                        id: "weddings",
                        title: "Wedding Services",
                        backgroundImage:
                            "/images/weddings/gallery/wedding-08.webp",
                    },
                    {
                        id: "hair-care",
                        title: "Hair Care Services",
                        backgroundImage:
                            "/images/hair-care/styling/style-04.avif",
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

export default SkinBodyCareServicePage;
