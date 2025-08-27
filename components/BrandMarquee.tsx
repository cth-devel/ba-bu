"use client";

// import Image from "next/image";
// import { Marquee } from "@/components/magicui/marquee"
import LogoLoop from "@/components/LogoLoop";

const brands = [
    { src: "/images/brands/img1.png", alt: "Brand logo 1" },
    { src: "/images/brands/img2.png", alt: "Brand logo 2" },
    { src: "/images/brands/img3.png", alt: "Brand logo 3" },
    { src: "/images/brands/img4.png", alt: "Brand logo 4" },
    { src: "/images/brands/img5.png", alt: "Brand logo 5" },
    { src: "/images/brands/img6.png", alt: "Brand logo 6" },
];

const BrandMarquee = () => {
    return (
        <section
            id="brand-marquee-section"
            className="py-12 bg-black my-12 lg:my-24"
            aria-label="Our trusted brands"
        >
            <div className="w-full flex flex-col items-center justify-center gap-12">
                <h2
                    id="brand-marquee-heading"
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-8"
                >
                    Our Trusted Brands
                </h2>

                <div className="relative w-full flex flex-col items-center justify-center gap-32">
                    <LogoLoop
                        logos={brands}
                        speed={40}
                        direction="right"
                        logoHeight={60}
                        gap={100}
                        fadeOut={true}
                        fadeOutColor="#000"
                        pauseOnHover={false}
                        scaleOnHover={false}
                    />
                    <LogoLoop
                        logos={brands}
                        speed={40}
                        direction="left"
                        logoHeight={60}
                        gap={100}
                        fadeOut={true}
                        fadeOutColor="#000"
                        pauseOnHover={false}
                        scaleOnHover={false}
                    />
                </div>
            </div>
        </section>
    );
};

export default BrandMarquee;
