"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import OptimizedHero from "@/components/ui/optimized-hero";
import OptimizedSectionHero from "@/components/ui/optimized-section-hero";
import OptimizedGallery from "@/components/ui/optimized-gallery";
import OptimizedPricing from "@/components/ui/optimized-pricing";
import ServicesContainer from "@/components/ServicesContainer";
import ExpandableHairCutCards from "@/components/ExpandableHairCutCards";
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

    // Mobile load more state for each section
    const [hairCutLadiesVisible, setHairCutLadiesVisible] = useState(4);
    const [hairCutGentsVisible, setHairCutGentsVisible] = useState(4);
    const [coloringLadiesVisible, setColoringLadiesVisible] = useState(4);
    const [coloringGentsVisible, setColoringGentsVisible] = useState(4);
    const [treatmentLadiesVisible, setTreatmentLadiesVisible] = useState(4);
    const [treatmentGentsVisible, setTreatmentGentsVisible] = useState(4);

    const ITEMS_PER_LOAD = 4;

    const handleBookNow = (title: string, price: string, gender: string) => {
        setSelectedService({ title, price, gender });
        setIsBookingOpen(true);
    };
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

    const hairColorImages = [
        {
            src: "/images/hair-care/coloring/color-01.webp",
            alt: "Professional hair coloring service",
            title: "Single Color",
        },
        {
            src: "/images/hair-care/coloring/color-02.webp",
            alt: "Beautiful hair highlights",
            title: "Highlights",
        },
        {
            src: "/images/hair-care/coloring/color-03.webp",
            alt: "Hand-painted balayage highlights",
            title: "Balayage",
        },
        {
            src: "/images/hair-care/coloring/color-04.webp",
            alt: "Professional color correction",
            title: "Color Correction",
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
                backgroundImage="/images/hair-care/styling/style-04.avif"
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
                        <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed tracking-wider">
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

                {/* Hair Cuts Section */}
                <div className=" bg-black">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="mb-16">
                            {/* Hair Cuts - Two Column Layout (Ladies | Gents) */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                <section
                                    role="region"
                                    aria-labelledby="haircuts-ladies-heading"
                                    className="lg:pr-2"
                                >
                                    <div className="mb-6">
                                        <h5
                                            id="haircuts-ladies-heading"
                                            className="text-lg font-gunteerz font-semibold text-white text-left"
                                        >
                                            For Ladies
                                        </h5>
                                    </div>
                                    <div
                                        className={`${
                                            hairCutLadiesVisible < hairCutCards.length
                                                ? 'overflow-visible max-h-none'
                                                : 'md:max-h-[60vh] md:overflow-y-auto lg:max-h-[70vh] xl:max-h-[75vh] overscroll-contain touch-pan-y [@media(min-width:950px)]:overflow-visible [@media(min-width:950px)]:max-h-none'
                                        }`}
                                        onWheel={hairCutLadiesVisible < hairCutCards.length ? undefined : (e) => {
                                            // Disable scroll behavior on screens 950px and above
                                            if (window.innerWidth >= 950) {
                                                return;
                                            }

                                            const container = e.currentTarget;
                                            const isScrollingDown = e.deltaY > 0;
                                            const isScrollingUp = e.deltaY < 0;
                                            const isAtBottom =
                                                container.scrollHeight -
                                                    container.scrollTop ===
                                                container.clientHeight;
                                            const isAtTop =
                                                container.scrollTop === 0;

                                            // Only prevent default if container can still scroll
                                            if (
                                                (isScrollingDown && !isAtBottom) ||
                                                (isScrollingUp && !isAtTop)
                                            ) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                container.scrollTop += e.deltaY;
                                            }
                                        }}
                                    >
                                        <ExpandableHairCutCards
                                            cards={hairCutCards.slice(0, hairCutLadiesVisible)}
                                            gender="female"
                                            onBookNow={handleBookNow}
                                            showLoadMore={hairCutLadiesVisible < hairCutCards.length}
                                        />
                                        {/* Mobile Load More Button (only when sections are stacked) */}
                                        {hairCutLadiesVisible < hairCutCards.length && (
                                            <div className="lg:hidden mt-4 text-center">
                                                <button
                                                    onClick={() => setHairCutLadiesVisible(prev =>
                                                        Math.min(prev + ITEMS_PER_LOAD, hairCutCards.length)
                                                    )}
                                                    className="px-8 py-4 golden-gradient-button text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wider"
                                                >
                                                    Load More
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                <section
                                    role="region"
                                    aria-labelledby="haircuts-gents-heading"
                                    className="lg:pl-2"
                                >
                                    <div className="mb-6">
                                        <h5
                                            id="haircuts-gents-heading"
                                            className="text-lg font-gunteerz font-semibold text-white text-left"
                                        >
                                            For Gents
                                        </h5>
                                    </div>
                                    <div
                                        className={`${
                                            hairCutGentsVisible < gentsHairCutCards.length
                                                ? 'overflow-visible max-h-none'
                                                : 'md:max-h-[60vh] md:overflow-y-auto lg:max-h-[70vh] xl:max-h-[75vh] overscroll-contain touch-pan-y [@media(min-width:950px)]:overflow-visible [@media(min-width:950px)]:max-h-none'
                                        }`}
                                        onWheel={(e) => {
                                            // Disable scroll behavior on screens 950px and above
                                            if (window.innerWidth >= 950) {
                                                return;
                                            }

                                            const container = e.currentTarget;
                                            const isScrollingDown = e.deltaY > 0;
                                            const isScrollingUp = e.deltaY < 0;
                                            const isAtBottom =
                                                container.scrollHeight -
                                                    container.scrollTop ===
                                                container.clientHeight;
                                            const isAtTop =
                                                container.scrollTop === 0;

                                            // Only prevent default if container can still scroll
                                            if (
                                                (isScrollingDown && !isAtBottom) ||
                                                (isScrollingUp && !isAtTop)
                                            ) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                container.scrollTop += e.deltaY;
                                            }
                                        }}
                                    >
                                        <ExpandableHairCutCards
                                            cards={gentsHairCutCards.slice(0, hairCutGentsVisible)}
                                            gender="male"
                                            onBookNow={handleBookNow}
                                            showLoadMore={hairCutGentsVisible < gentsHairCutCards.length}
                                        />
                                        {/* Mobile Load More Button (only when sections are stacked) */}
                                        {hairCutGentsVisible < gentsHairCutCards.length && (
                                            <div className="lg:hidden mt-4 text-center">
                                                <button
                                                    onClick={() => setHairCutGentsVisible(prev =>
                                                        Math.min(prev + ITEMS_PER_LOAD, gentsHairCutCards.length)
                                                    )}
                                                    className="px-8 py-4 golden-gradient-button text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wider"
                                                >
                                                    Load More
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hair Cut Styles Gallery - Infinite Scroll */}
                <section className="pt-16 sm:pt-20 lg:pt-24 bg-black">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h3 className="text-xl sm:text-2xl font-gunteerz font-bold text-white mb-4">
                                <ShinyText
                                    text="Our Hair Cut Styles"
                                    disabled={true}
                                    speed={0}
                                    className="text-2xl sm:text-6xl py-4 font-gunteerz font-bold text-white mb-4 tracking-wide"
                                />
                            </h3>
                            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto tracking-wider">
                                Browse through our collection of stunning
                                haircuts and styles
                            </p>
                        </div>

                        {/* Infinite Scroll Gallery */}
                        <div className="relative overflow-hidden py-8">
                            <div className="flex animate-scroll-right">
                                {/* First set of images */}
                                {hairCutImages.map((image, index) => (
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
                                {hairCutImages.map((image, index) => (
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
            </section>

            {/* Hair Coloring Section */}
            <section className="hair-coloring-section">
                {/* Hair Coloring Section */}
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
                            <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed tracking-wider">
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
                        {/* Hair Coloring - Two Column Layout (Ladies | Gents) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                            <section
                                role="region"
                                aria-labelledby="coloring-ladies-heading"
                                className="lg:pr-2"
                            >
                                <div className="mb-6">
                                    <h5
                                        id="coloring-ladies-heading"
                                        className="text-lg font-gunteerz font-semibold text-white text-left"
                                    >
                                        For Ladies
                                    </h5>
                                </div>
                                <div
                                    className="md:max-h-[60vh] md:overflow-y-auto lg:max-h-[70vh] xl:max-h-[75vh] overscroll-contain touch-pan-y"
                                    onWheel={(e) => {
                                        const container = e.currentTarget;
                                        const isScrollingDown = e.deltaY > 0;
                                        const isScrollingUp = e.deltaY < 0;
                                        const isAtBottom =
                                            container.scrollHeight -
                                                container.scrollTop ===
                                            container.clientHeight;
                                        const isAtTop = container.scrollTop === 0;

                                        // Only prevent default if container can still scroll
                                        if (
                                            (isScrollingDown && !isAtBottom) ||
                                            (isScrollingUp && !isAtTop)
                                        ) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            container.scrollTop += e.deltaY;
                                        }
                                    }}
                                >
                                    <ExpandableHairCutCards
                                        cards={ladiesHairColoringCards.slice(0, coloringLadiesVisible)}
                                        gender="female"
                                        onBookNow={handleBookNow}
                                        showLoadMore={coloringLadiesVisible < ladiesHairColoringCards.length}
                                    />
                                    {/* Mobile Load More Button (only when sections are stacked) */}
                                    {coloringLadiesVisible < ladiesHairColoringCards.length && (
                                        <div className="lg:hidden mt-4 text-center">
                                            <button
                                                onClick={() => setColoringLadiesVisible(prev =>
                                                    Math.min(prev + ITEMS_PER_LOAD, ladiesHairColoringCards.length)
                                                )}
                                                className="px-6 py-3 golden-gradient-button text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                            >
                                                Load More
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </section>

                            <section
                                role="region"
                                aria-labelledby="coloring-gents-heading"
                                className="lg:pl-2"
                            >
                                <div className="mb-6">
                                    <h5
                                        id="coloring-gents-heading"
                                        className="text-lg font-gunteerz font-semibold text-white text-left"
                                    >
                                        For Gents
                                    </h5>
                                </div>
                                <div
                                    className="md:max-h-[60vh] md:overflow-y-auto lg:max-h-[70vh] xl:max-h-[75vh] overscroll-contain touch-pan-y"
                                    onWheel={(e) => {
                                        const container = e.currentTarget;
                                        const isScrollingDown = e.deltaY > 0;
                                        const isScrollingUp = e.deltaY < 0;
                                        const isAtBottom =
                                            container.scrollHeight -
                                                container.scrollTop ===
                                            container.clientHeight;
                                        const isAtTop = container.scrollTop === 0;

                                        // Only prevent default if container can still scroll
                                        if (
                                            (isScrollingDown && !isAtBottom) ||
                                            (isScrollingUp && !isAtTop)
                                        ) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            container.scrollTop += e.deltaY;
                                        }
                                    }}
                                >
                                    <ExpandableHairCutCards
                                        cards={gentsHairColoringCards.slice(0, coloringGentsVisible)}
                                        gender="male"
                                        onBookNow={handleBookNow}
                                        showLoadMore={coloringGentsVisible < gentsHairColoringCards.length}
                                    />
                                    {/* Mobile Load More Button (only when sections are stacked) */}
                                    {coloringGentsVisible < gentsHairColoringCards.length && (
                                        <div className="lg:hidden mt-4 text-center">
                                            <button
                                                onClick={() => setColoringGentsVisible(prev =>
                                                    Math.min(prev + ITEMS_PER_LOAD, gentsHairColoringCards.length)
                                                )}
                                                className="px-6 py-3 golden-gradient-button text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                            >
                                                Load More
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Hair Color Styles Gallery - Infinite Scroll */}
                <section className="py-16 sm:py-20 lg:py-24 bg-black">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8 sm:mb-12">
                            <h3 className="text-xl sm:text-2xl font-gunteerz font-bold text-white mb-4">
                                <ShinyText
                                    text="Our Hair Color Styles"
                                    disabled={true}
                                    speed={0}
                                    className="text-2xl sm:text-6xl py-4 font-gunteerz font-bold text-white mb-4 tracking-wide"
                                />
                            </h3>
                            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto tracking-wider ">
                                Explore our collection of beautiful hair colors
                                and highlights
                            </p>
                        </div>

                        {/* Infinite Scroll Gallery */}
                        <div className="relative overflow-hidden py-8">
                            <div className="flex animate-scroll-right">
                                {/* First set of images */}
                                {hairColorImages.map((image, index) => (
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
                                {hairColorImages.map((image, index) => (
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
            </section>

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
                        <p className="text-lg sm:text-2xl text-gray-300 leading-relaxed tracking-wider">
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
                {/* Hair Treatments Section */}
                <div className="py-12 sm:py-16 lg:py-20 bg-black">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="mb-16">
                            {/* Hair Treatments - Two Column Layout (Ladies | Gents) */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                <section
                                    role="region"
                                    aria-labelledby="treatments-ladies-heading"
                                    className="lg:pr-2"
                                >
                                    <div className="mb-6">
                                        <h5
                                            id="treatments-ladies-heading"
                                            className="text-lg font-gunteerz font-semibold text-white text-left"
                                        >
                                            For Ladies
                                        </h5>
                                    </div>
                                    <div
                                        className={`${
                                            hairCutGentsVisible < gentsHairCutCards.length
                                                ? 'overflow-visible max-h-none'
                                                : 'md:max-h-[60vh] md:overflow-y-auto lg:max-h-[70vh] xl:max-h-[75vh] overscroll-contain touch-pan-y [@media(min-width:950px)]:overflow-visible [@media(min-width:950px)]:max-h-none'
                                        }`}
                                        onWheel={(e) => {
                                            // Disable scroll behavior on screens 950px and above
                                            if (window.innerWidth >= 950) {
                                                return;
                                            }

                                            const container = e.currentTarget;
                                            const isScrollingDown = e.deltaY > 0;
                                            const isScrollingUp = e.deltaY < 0;
                                            const isAtBottom =
                                                container.scrollHeight -
                                                    container.scrollTop ===
                                                container.clientHeight;
                                            const isAtTop =
                                                container.scrollTop === 0;

                                            // Only prevent default if container can still scroll
                                            if (
                                                (isScrollingDown && !isAtBottom) ||
                                                (isScrollingUp && !isAtTop)
                                            ) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                container.scrollTop += e.deltaY;
                                            }
                                        }}
                                    >
                                        <ExpandableHairCutCards
                                            cards={ladiesHairTreatmentCards.slice(0, treatmentLadiesVisible)}
                                            gender="female"
                                            onBookNow={handleBookNow}
                                            showLoadMore={treatmentLadiesVisible < ladiesHairTreatmentCards.length}
                                        />
                                        {/* Mobile Load More Button (only when sections are stacked) */}
                                        {treatmentLadiesVisible < ladiesHairTreatmentCards.length && (
                                            <div className="lg:hidden mt-4 text-center">
                                                <button
                                                    onClick={() => setTreatmentLadiesVisible(prev =>
                                                        Math.min(prev + ITEMS_PER_LOAD, ladiesHairTreatmentCards.length)
                                                    )}
                                                    className="px-8 py-4 golden-gradient-button text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wider"
                                                >
                                                    Load More
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                <section
                                    role="region"
                                    aria-labelledby="treatments-gents-heading"
                                    className="lg:pl-2"
                                >
                                    <div className="mb-6">
                                        <h5
                                            id="treatments-gents-heading"
                                            className="text-lg font-gunteerz font-semibold text-white text-left"
                                        >
                                            For Gents
                                        </h5>
                                    </div>
                                    <div
                                        className={`${
                                            hairCutGentsVisible < gentsHairCutCards.length
                                                ? 'overflow-visible max-h-none'
                                                : 'md:max-h-[60vh] md:overflow-y-auto lg:max-h-[70vh] xl:max-h-[75vh] overscroll-contain touch-pan-y [@media(min-width:950px)]:overflow-visible [@media(min-width:950px)]:max-h-none'
                                        }`}
                                        onWheel={(e) => {
                                            // Disable scroll behavior on screens 950px and above
                                            if (window.innerWidth >= 950) {
                                                return;
                                            }

                                            const container = e.currentTarget;
                                            const isScrollingDown = e.deltaY > 0;
                                            const isScrollingUp = e.deltaY < 0;
                                            const isAtBottom =
                                                container.scrollHeight -
                                                    container.scrollTop ===
                                                container.clientHeight;
                                            const isAtTop =
                                                container.scrollTop === 0;

                                            // Only prevent default if container can still scroll
                                            if (
                                                (isScrollingDown && !isAtBottom) ||
                                                (isScrollingUp && !isAtTop)
                                            ) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                container.scrollTop += e.deltaY;
                                            }
                                        }}
                                    >
                                        <ExpandableHairCutCards
                                            cards={gentsHairTreatmentCards.slice(0, treatmentGentsVisible)}
                                            gender="male"
                                            onBookNow={handleBookNow}
                                            showLoadMore={treatmentGentsVisible < gentsHairTreatmentCards.length}
                                        />
                                        {/* Mobile Load More Button (only when sections are stacked) */}
                                        {treatmentGentsVisible < gentsHairTreatmentCards.length && (
                                            <div className="lg:hidden mt-4 text-center">
                                                <button
                                                    onClick={() => setTreatmentGentsVisible(prev =>
                                                        Math.min(prev + ITEMS_PER_LOAD, gentsHairTreatmentCards.length)
                                                    )}
                                                    className="px-8 py-4 golden-gradient-button text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wider"
                                                >
                                                    Load More
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
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
                            "/images/engin-akyurt-35NAaB_Nmx8-unsplash.webp",
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
