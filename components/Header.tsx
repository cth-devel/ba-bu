"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Home, User, Briefcase, Image as ImageIcon, Phone, MapPin, X, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
    const headerRef = useRef<HTMLElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showPromoBanner, setShowPromoBanner] = useState(true);
    const [currentAddressIndex, setCurrentAddressIndex] = useState(0);
    const [wrapsSincePromo, setWrapsSincePromo] = useState(0);
    const [showMobilePromo, setShowMobilePromo] = useState(false);
    const [promoSlideIn, setPromoSlideIn] = useState(false);
    const pathname = usePathname();

    const addresses = [
        'Andipillikkav',
        'Mannam',
        'Mathilmoola'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (showMobilePromo) {
                return; // pause rotation while promo is visible on mobile
            }

            setCurrentAddressIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % addresses.length;
                if (nextIndex === 0) {
                    setWrapsSincePromo((prev) => prev + 1);
                }
                return nextIndex;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [showMobilePromo, addresses.length]);

    // Trigger promo strictly after a full cycle on mobile
    useEffect(() => {
        if (wrapsSincePromo === 0) return;
        if (typeof window === 'undefined' || window.innerWidth >= 1024) return; // mobile only

        setShowMobilePromo(true);
        setWrapsSincePromo(0);
    }, [wrapsSincePromo]);

    // Handle slide-in/out lifecycle when the mobile promo is shown
    useEffect(() => {
        if (!showMobilePromo) return;
        let enterTimer: number | undefined;
        let exitTimer: number | undefined;
        let cleanupTimer: number | undefined;

        setPromoSlideIn(false);
        enterTimer = window.setTimeout(() => setPromoSlideIn(true), 20);
        exitTimer = window.setTimeout(() => setPromoSlideIn(false), 2020);
        cleanupTimer = window.setTimeout(() => setShowMobilePromo(false), 2020 + 500);

        return () => {
            if (enterTimer) window.clearTimeout(enterTimer);
            if (exitTimer) window.clearTimeout(exitTimer);
            if (cleanupTimer) window.clearTimeout(cleanupTimer);
        };
    }, [showMobilePromo]);

    useEffect(() => {
        // This effect is only for the promo banner visibility
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Separate effect for GSAP animations that depends on pathname
    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        // Small delay to ensure DOM is ready after route change
        const timer = setTimeout(() => {
            // Kill existing ScrollTrigger instances for this header
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === document.body || st.trigger === header) {
                    st.kill();
                }
            });

            // Reset header visibility for ALL pages (including service pages)
            // Always ensure header is visible on page load/route change
            gsap.set(header, {
                yPercent: 0,
                opacity: 1,
                visibility: 'visible',
            });

            // Refresh ScrollTrigger to recalculate positions
            ScrollTrigger.refresh();

            // Animate background color and blur when scrolling past the top
            gsap.to(header, {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(4px)",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                duration: 0.3,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: "body",
                    start: "top -10px",
                    end: "top -10px",
                    toggleActions: "play none none reverse",
                    refreshPriority: -1, // Lower priority for this trigger
                },
            });

            // Show/hide header based on scroll direction
            const showAnim = gsap.from(header, {
                yPercent: -110,
                paused: true,
                duration: 0.4,
                ease: "power2.inOut"
            }).progress(1);

            // Ensure header is visible when at top of page
            if (window.scrollY <= 80) {
                gsap.set(header, {
                    yPercent: 0,
                    opacity: 1,
                    visibility: 'visible',
                });
            }

            ScrollTrigger.create({
                start: "top top",
                end: 99999,
                refreshPriority: -1, // Lower priority for this trigger
                onUpdate: (self) => {
                    // Always show header when near top of page
                    if (self.scroll() <= 80) {
                        gsap.set(header, {
                            yPercent: 0,
                            opacity: 1,
                            visibility: 'visible',
                        });
                    } else if (self.direction === -1) { // Scrolling up
                        showAnim.play();
                    } else { // Scrolling down
                        showAnim.reverse();
                    }
                },
            });
        }, 100); // 100ms delay

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === document.body || st.trigger === header) {
                    st.kill();
                }
            });
        };
    }, [pathname]); // Re-run when pathname changes

    const handleBrochureDownload = () => {
        const link = document.createElement('a');
        link.href = '/babufamilysalon.pdf';
        link.download = 'babufamilysalon.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const menuItems = [
        { name: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
        { name: "About", href: "/#about", icon: <User className="w-5 h-5" /> },
        {
            name: "Services",
            href: "/services",
            icon: <Briefcase className="w-5 h-5" />,
        },
        {
            name: "Gallery",
            href: "/gallery",
            icon: <ImageIcon className="w-5 h-5" />,
        },
        {
            name: "Contact",
            href: "/#contact",
            icon: <Phone className="w-5 h-5" />,
        },
        {
            name: "Brochure",
            href: "#",
            icon: <FileText className="w-5 h-5" />,
            isDownload: true,
        },
    ];

    const headerTopClass = showPromoBanner && !isScrolled ? "top-10" : "top-0";

    return (
        <>
            {/* Promotional Banner */}
            {showPromoBanner && !isScrolled && (
                <div className="promo-banner fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#77530a] via-[#ffd277] to-[#77530a] text-black py-2 px-4 text-sm tracking-widest">
                    <div className="max-w-7xl mx-auto flex justify-center items-center">
                        {showMobilePromo ? (
                            // Mobile-only sliding promo message
                            <div className="lg:hidden w-full flex justify-center">
                                <span
                                    className={`font-medium text-center transition-all duration-500 ease-out transform ${promoSlideIn ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
                                >
                                    Unlock Extra Benefits with Our Combos
                                </span>
                            </div>
                        ) : (
                        <div className="flex items-center space-x-2 min-w-0">
                            <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span
                                    aria-live="polite"
                                    className="inline-block w-[100px] md:w-[100px] lg:w-[100px] truncate text-center"
                                >
                                    {addresses[currentAddressIndex]}
                                </span>
                            </div>
                            <span className="hidden md:inline flex-shrink-0 mx-1">|</span>
                            <a
                                href={`tel:${siteConfig.contact.phone}`}
                                className="flex items-center space-x-1 hover:text-gray-700 transition-colors flex-shrink-0"
                            >
                                <Phone className="w-4 h-4" />
                                <span className="truncate">{siteConfig.contact.phone}</span>
                            </a>
                            <span className="hidden lg:inline flex-shrink-0 mx-1">|</span>
                            <span className="hidden lg:inline font-medium truncate ml-3">
                            Unlock Extra Benefits with Our Combos
                            </span>
                        </div>
                        )}
                        <button
                            onClick={() => setShowPromoBanner(false)}
                            className="text-black hover:text-gray-700 transition-colors flex-shrink-0 ml-2"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
            {/* Main Header */}
          <header
              ref={headerRef}
              className={`fixed ${headerTopClass} left-0 w-full z-40 bg-transparent tracking-widest text-xl hidden lg:block will-change-transform`}
          >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-24">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/BABU-White.svg"
                                    alt={siteConfig.siteName}
                                    width={200}
                                    height={100}
                                    className="h-auto"
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="flex items-center space-x-8">
                            {menuItems.map((item) => 
                                item.isDownload ? (
                                    <button
                                        key={item.name}
                                        onClick={handleBrochureDownload}
                                        className="text-white hover:text-gray-300 transition-colors text-lg"
                                    >
                                        {item.name}
                                    </button>
                                ) : (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-white hover:text-gray-300 transition-colors text-lg"
                                    >
                                        {item.name}
                                    </Link>
                                )
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Bottom Dock for Mobile */}
            <div className="bottom-dock lg:hidden fixed bottom-0 bg-black bg-opacity-90 backdrop-blur-md shadow-2xl z-50 border-t border-gray-700">
                <div className="flex justify-around items-center h-20 px-4 w-full">
                    {menuItems.map((item) => 
                        item.isDownload ? (
                            <button
                                key={item.name}
                                onClick={handleBrochureDownload}
                                className="flex flex-col items-center text-white hover:text-gray-300 transition-colors p-2 min-w-[60px] flex-1"
                            >
                                {item.icon}
                                <span className="text-xs mt-1 text-center truncate">{item.name}</span>
                            </button>
                        ) : (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex flex-col items-center text-white hover:text-gray-300 transition-colors p-2 min-w-[60px] flex-1"
                            >
                                {item.icon}
                                <span className="text-xs mt-1 text-center truncate">{item.name}</span>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
