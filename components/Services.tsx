"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mobileSectionRef = useRef<HTMLElement>(null);

    const services = [
        {
            id: 1,
            name: "Bridal & Groom Packages",
            description:
                "Complete wedding makeover packages for brides and grooms. Professional bridal makeup, hair styling, and groom grooming services for your special day.",
            src: "/images/weddings/gallery/wedding-08.webp",
            features: [
                "Bridal/Groom Makeup",
                "Hair Styling",
                "Saree Draping",
                "Guest Makeup",
            ],
            page: "/services/weddings",
        },
        {
            id: 2,
            name: "Hair Care",
            description:
                "Professional hair cutting, styling, coloring, and treatments. From basic cuts to advanced styling, we care for all hair types and textures.",
            src: "/images/HAIRCARE/haircare-heropage.webp",
            features: ["Hair Cutting", "Hair Styling", "Hair Coloring", "Hair Treatments"],
            page: "/services/hair-care",
        },
        {
            id: 3,
            name: "Skin & Body Care",
            description:
                "Rejuvenating facial treatments, spa services, and body care treatments. Professional skincare for all skin types and concerns.",
            src: "/images/SKINANDBODY/skin-body-hero.webp",
            features: [
                "Facial Treatments",
                "Spa Services",
                "Body Care",
                "Wellness",
            ],
            page: "/services/skin-body-care",
        },
    ];

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            if (!containerRef.current || !sectionRef.current) return;

            const section = sectionRef.current;
            const container = containerRef.current;
            const panels = gsap.utils.toArray(".panel");
            const numPanels = panels.length;

            // Calculate the total width needed for horizontal scrolling
            const totalWidth = numPanels * window.innerWidth;
            container.style.width = `${totalWidth}px`;

            const pin = gsap.to(container, {
                x: () => -(container.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => `+=${container.scrollWidth - window.innerWidth}`,
                    snap: 1 / (panels.length - 1),
                    invalidateOnRefresh: true,
                },
            });

            return () => {
                pin.kill();
                ScrollTrigger.getAll().forEach((st) => st.kill());
            };
        });

        mm.add("(max-width: 767px)", () => {
            if (!mobileSectionRef.current) return;

            const mobileCards = gsap.utils.toArray(".mobile-service-card");
            mobileCards.forEach((card: any) => {
                const title = card.querySelector("h3");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                });

                tl.from(card, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                });

                if (title) {
                    tl.from(
                        title,
                        {
                            yPercent: 50,
                            opacity: 0,
                            duration: 0.6,
                            ease: "power3.out",
                        },
                        "-=0.5"
                    );
                }
            });

            return () => {
                ScrollTrigger.getAll().forEach((st) => st.kill());
            };
        });

        return () => {
            mm.revert();
        };
    }, [services.length]);

    return (
        <>
            <section
                id="services-section-desktop"
                ref={sectionRef}
                className="relative bg-black overflow-hidden hidden md:block services-horizontal-scroll"
            >
                <div
                    id="services-container-desktop"
                    ref={containerRef}
                    className="h-screen flex items-center relative services-container"
                    style={{ width: `${services.length * 100}vw` }}
                >
                    {services.map((service, index) => (
                        <div
                            id={`service-panel-desktop-${index}`}
                            key={index}
                            className="panel w-screen h-screen relative flex items-center justify-center services-panel"
                        >
                            <Image
                                src={service.src}
                                alt={service.name}
                                fill
                                className="object-cover"
                                loading="lazy"
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div
                                id={`service-content-desktop-${index}`}
                                className="content-overlay relative text-white text-center max-w-full px-4 z-10"
                            >
                                <SplitText
                                    text={service.name}
                                    className="text-7xl lg:text-8xl font-[900] font-serif py-12 w-full"
                                    duration={0.8}
                                    delay={80}
                                />

                                <Link
                                    href={service.page}
                                    aria-label={`Go to services page from ${service.name}`}
                                    className="inline-block text-lg px-10 py-3 tracking-wider font-semibold rounded-full golden-gradient-button text-black shadow-[0_8px_30px_rgb(255,215,0,0.25)] hover:shadow-[0_10px_40px_rgb(255,215,0,0.4)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                                >
                                    Know More{" "}
                                    <ArrowRight className="inline-block ml-2" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section
                id="services-section-mobile"
                ref={mobileSectionRef}
                className="md:hidden bg-black py-20"
            >
                <div
                    id="services-header-mobile"
                    className="text-center mb-12 px-4"
                >
                    <h2 className="text-5xl sm:text-6xl font-sans font-extrabold text-white mb-4">
                        Our Services
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-secondary to-yellow-300 mx-auto"></div>
                </div>
                <div
                    id="services-grid-mobile"
                    className="grid grid-cols-1 gap-16"
                >
                    {services.map((service, index) => (
                        <div
                            id={`service-card-mobile-${index}`}
                            key={index}
                            className="mobile-service-card relative h-96 overflow-hidden cursor-pointer group shadow-lg"
                        >
                            <Image
                                src={service.src}
                                alt={service.name}
                                fill
                                className="object-cover"
                            />
                            {/* Visible CTA button for mobile */}
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-6">
                                <div className="w-full">
                                    <h3 className="text-white text-7xl font-[900] mb-2 tracking-wider">
                                        {service.name}
                                    </h3>
                                    {/* Features removed on mobile view */}
                                    <Link
                                        href={service.page}
                                        aria-label={`Know more about ${service.name}`}
                                        className="inline-block mt-4 text-base px-6 py-2 tracking-wider font-semibold rounded-full golden-gradient-button text-black shadow-[0_8px_30px_rgb(255,215,0,0.25)] hover:shadow-[0_10px_40px_rgb(255,215,0,0.4)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                                    >
                                        Know More <ArrowRight className="inline-block ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Services;
