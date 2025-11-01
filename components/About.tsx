"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CountUp from "./CountUp";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShinyText from "./ShinyText";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const image1Ref = useRef<HTMLDivElement>(null);
    const image2Ref = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    const [isImage1Loaded, setIsImage1Loaded] = useState<boolean>(false);
    const [isImage2Loaded, setIsImage2Loaded] = useState<boolean>(false);

    // Toggle to render images; when true, images render and skeletons hide after load
    const SHOW_ABOUT_IMAGES = true;

    // GSAP Animations for scroll-based triggers
    useEffect(() => {
        const section = sectionRef.current;
        const image1 = image1Ref.current;
        const image2 = image2Ref.current;
        const content = contentRef.current;
        const stats = statsRef.current;
        const heading = headingRef.current;

        if (section && image1 && image2 && content && stats && heading) {
            // Parallax for images on scroll
            gsap.to(image1, {
                yPercent: -15,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            gsap.to(image2, {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // Content and stats animation
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            });

            // Set initial state
            gsap.set(heading, {
                y: 30,
                opacity: 0,
            });
            gsap.set(stats.children, {
                y: 50,
                opacity: 0,
            });

            timeline
                .to(heading, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                })
                .to(
                    stats.children,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power3.out",
                    },
                    "-=0.5"
                );

            return () => {
                // Ensure content is visible when component unmounts
                gsap.set(heading, {
                    y: 0,
                    opacity: 1,
                });
                gsap.set(stats.children, {
                    y: 0,
                    opacity: 1,
                });

                timeline.kill();
                ScrollTrigger.getAll().forEach((st) => st.kill());
            };
        }
    }, []);

    // Interactive mouse-move parallax effect
    useEffect(() => {
        const section = sectionRef.current;
        const image1 = image1Ref.current;
        const image2 = image2Ref.current;

        if (!section || !image1 || !image2) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { width, height, left, top } =
                section.getBoundingClientRect();

            const x = clientX - left;
            const y = clientY - top;

            const xPercent = x / width - 0.5;
            const yPercent = y / height - 0.5;

            const xPos = xPercent * 30; // 30px max move
            const yPos = yPercent * 30;

            gsap.to(image1, {
                x: -xPos,
                y: -yPos,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto",
            });
            gsap.to(image2, {
                x: xPos,
                y: yPos,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto",
            });
        };

        const handleMouseLeave = () => {
            gsap.to([image1, image2], {
                x: 0,
                y: 0,
                duration: 1,
                ease: "power2.out",
            });
        };

        section.addEventListener("mousemove", handleMouseMove as EventListener);
        section.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            section.removeEventListener(
                "mousemove",
                handleMouseMove as EventListener
            );
            section.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const stats = [
        { number: "5000+", label: "Happy Clients" },
        { number: "5+", label: "Years Experience" },
        { number: "4.8", label: "Average Rating" },
    ];

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-24 bg-primary overflow-hidden"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Column */}
                    <div className="relative h-[500px] lg:h-[600px]">
                        <div
                            ref={image1Ref}
                            className="absolute top-0 left-0 w-3/5 h-3/4"
                        >
                            {/* Skeleton placeholder */}
                            <div
                                className={`${SHOW_ABOUT_IMAGES ? (isImage1Loaded ? "hidden" : "block") : "block"} absolute inset-0 rounded-sm bg-gray-700/40 animate-pulse`}
                                aria-hidden="true"
                            />
                            {SHOW_ABOUT_IMAGES && (
                                <Image
                                    src="/images/about-img-1.webp"
                                    alt="BA-BU Salon Interior 1"
                                    width={400}
                                    height={600}
                                    onLoadingComplete={() => setIsImage1Loaded(true)}
                                    className={`shadow-2xl object-cover w-full h-full transition-opacity duration-500 ${isImage1Loaded ? "opacity-100" : "opacity-0"}`}
                                />
                            )}
                        </div>
                        <div
                            ref={image2Ref}
                            className="absolute bottom-0 right-0 w-3/5 h-3/4"
                        >
                            {/* Skeleton placeholder */}
                            <div
                                className={`${SHOW_ABOUT_IMAGES ? (isImage2Loaded ? "hidden" : "block") : "block"} absolute inset-0 rounded-sm bg-gray-700/40 animate-pulse`}
                                aria-hidden="true"
                            />
                            {SHOW_ABOUT_IMAGES && (
                                <Image
                                    src="/images/about-img-2.webp"
                                    alt="BA-BU Salon Interior 2"
                                    width={400}
                                    height={600}
                                    onLoadingComplete={() => setIsImage2Loaded(true)}
                                    className={`shadow-2xl object-cover w-full h-full transition-opacity duration-500 ${isImage2Loaded ? "opacity-100" : "opacity-0"}`}
                                />
                            )}
                        </div>
                    </div>

                    {/* Content Column */}
                    <div ref={contentRef}>
                        <h2
                            ref={headingRef}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 font-gunteerz tracking-wide"
                        >
                            About BA-BU Family Salon
                        </h2>
                        <div className="w-24 h-1 bg-primary-gradient mb-6"></div>

                        <p className="text-lg text-gray-300 mb-6 leading-relaxed tracking-widest">
                        Welcome to BA-BU Family Salon—the leading unisex family and beauty salon in North Paravur (Mannam), Andipillikkav, and Mathilmoola, Thrissur, Kerala. For over 5 years, we have been the premier destination for families seeking exceptional haircuts, grooming, facials, and beauty treatments at affordable prices in Kerala. Our experienced team provides personalized care and uses the finest products and latest techniques for every service, whether it's a fresh haircut, relaxing facial, or bridal and groom package. Enjoy a luxurious, family-friendly atmosphere and professional results every time. Visit our conveniently located unisex salons in North Paravur (Mannam), Andipillikkav, and Mathilmoola, Thrissur, and let BA-BU Family Salon help you look and feel your best in Kerala.
                        </p>

                        {/* Read More Button */}
                        <div className="mb-8">
                            <a
                                href="/aboutus"
                                className="group inline-flex items-center justify-center px-6 py-3 btn-gradient font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-500 hover:scale-110 transform hover:-translate-y-2 border-2 border-yellow-300/30 hover:border-yellow-200/50"
                                aria-label="Read more about BA-BU Family Salon"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && (window.location.href = '/aboutus')}
                            >
                                <span className="mr-3 text-lg font-medium drop-shadow-sm tracking-widest text-black">Read More</span>
                                <svg
                                    className="w-4 h-4 text-black transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </a>
                        </div>

                        {/* Stats Section */}
                        <div
                            ref={statsRef}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12"
                        >
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center transition-transform duration-300 ease-in-out hover:scale-110"
                                >
                                    <h3 className="text-4xl font-bold text-white">
                                        {stat.label === "Service Support" ? (
                                            stat.number
                                        ) : (
                                            <>
                                                <ShinyText
                                                    text={stat.number}
                                                    disabled={false}
                                                    speed={3}
                                                    className="text-4xl font-bold text-white"
                                                />
                                            </>
                                        )}
                                    </h3>
                                    <p className="text-gray-400 mt-1">
                                        {stat.label}

                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
