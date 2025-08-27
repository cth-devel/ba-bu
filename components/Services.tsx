"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
            description: "Complete wedding makeover packages for brides and grooms. Professional bridal makeup, hair styling, and groom grooming services for your special day.",
            src: "/images/jonathan-borba-qJ2mhxmateo-unsplash.jpg",
            features: ["Bridal Makeup", "Hair Styling", "Groom Grooming", "Pre-wedding Care"]
        },
        {
            id: 2,
            name: "Hair Care",
            description: "Professional hair cutting, styling, coloring, and treatments. From basic cuts to advanced styling, we care for all hair types and textures.",
            src: "/images/engin-akyurt-35NAaB_Nmx8-unsplash.jpg",
            features: ["Hair Cutting", "Styling", "Coloring", "Treatments"]
        },
        {
            id: 3,
            name: "Skin & Body Care",
            description: "Rejuvenating facial treatments, spa services, and body care treatments. Professional skincare for all skin types and concerns.",
            src: "/images/baylee-gramling-a3xr2mVjT5M-unsplash.jpg",
            features: ["Facial Treatments", "Spa Services", "Body Care", "Wellness"]
        }
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
                                priority={index < 2}
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div
                                id={`service-content-desktop-${index}`}
                                className="content-overlay relative text-white text-center max-w-full px-4 z-10"
                            >
                                <SplitText
                                    text={service.name}
                                    className="text-6xl lg:text-7xl font-[900] font-serif py-12 w-full"
                                    duration={0.8}
                                    delay={80}
                                />

                                {/* Modern Features Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-8 max-w-3xl mx-auto">
                                    {service.features.map((feature, featureIndex) => (
                                        <div
                                            key={featureIndex}
                                            className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
                                        >
                                            <span className="text-white text-base lg:text-xl font-medium group-hover:text-white transition-colors duration-300 tracking-widest">
                                                {feature}
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-yellow-300/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    aria-label={`Learn more about ${service.name}`}
                                    className="text-lg border-b-2 border-secondary text-secondary hover:bg-secondary hover:text-black transition-all duration-300 px-8 py-3 tracking-wider font-semibold"
                                >
                                    Know More{" "}
                                    <ArrowRight className="inline-block ml-2" />
                                </button>
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
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-6">
                                <div className="w-full">
                                    <h3 className="text-white text-6xl font-[900] mb-2 tracking-wider">
                                        {service.name}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {service.features.map((feature, featureIndex) => (
                                            <div
                                                key={featureIndex}
                                                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 hover:bg-white/20 transition-all duration-300"
                                            >
                                                <span className="text-white/90 text-sm font-semibold">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
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
