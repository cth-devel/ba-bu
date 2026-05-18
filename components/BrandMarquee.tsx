"use client";

// import Image from "next/image";
// import { Marquee } from "@/components/magicui/marquee"
import LogoLoop from "@/components/LogoLoop";
import ShinyText from "./ShinyText";

const brands = [
    { src: "/images/brands/img1.webp", alt: "Brand logo 1", width: 530, height: 96 },
    { src: "/images/brands/img2.webp", alt: "Brand logo 2", width: 552, height: 235 },
    { src: "/images/brands/img3.webp", alt: "Brand logo 3", width: 384, height: 247 },
    { src: "/images/brands/img4.webp", alt: "Brand logo 4", width: 541, height: 79 },
    { src: "/images/brands/img5.webp", alt: "Brand logo 5", width: 395, height: 87 },
    { src: "/images/brands/img6.png", alt: "Brand logo 6", width: 441, height: 80 },
    { src: "/images/brands/img7.png", alt: "Brand logo 7", width: 96, height: 80 },
    { src: "/images/brands/img8.webp", alt: "Brand logo 8", width: 851, height: 315 },
    { src: "/images/brands/img9.png", alt: "Brand logo 9", width: 302, height: 80 },
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
                    className="text-4xl md:text-6xl lg:text-8xl font-bold text-center text-white mb-8"
                >
                    <ShinyText
                        text="Our Trusted Brands"
                        disabled={false}
                        speed={3}
                        className="text-4xl md:text-6xl lg:text-8xl font-bold text-center text-white mb-8"
                    />
                </h2>

                <div className="relative w-full flex flex-col items-center justify-center gap-32">
                    <LogoLoop
                        logos={brands}
                        speed={40}
                        direction="right"
                        logoHeight={80}
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
                        logoHeight={80}
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
