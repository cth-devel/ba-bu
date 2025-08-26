"use client";

import Image from "next/image";

const brands = [
    "/images/brands/img1.png",
    "/images/brands/img2.png",
    "/images/brands/img3.png",
    "/images/brands/img4.png",
    "/images/brands/img5.png",
    "/images/brands/img6.png",
];

const BrandMarquee = () => {
    const duplicatedBrands = [...brands, ...brands];

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

                <div className="relative w-full overflow-hidden">
                    {/* Top Marquee - Moving Right */}
                    <div className="flex mb-16">
                        <div className="flex animate-marquee-right">
                            {duplicatedBrands.map((logo, index) => (
                                <div
                                    key={`top-marquee-${index}`}
                                    className="flex items-center justify-center mx-8 min-w-[200px]"
                                >
                                    <Image
                                        src={logo}
                                        alt={`Brand logo ${
                                            (index % brands.length) + 1
                                        }`}
                                        width={200}
                                        height={100}
                                        className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex animate-marquee-right">
                            {duplicatedBrands.map((logo, index) => (
                                <div
                                    key={`top-marquee-duplicate-${index}`}
                                    className="flex items-center justify-center mx-8 min-w-[200px]"
                                >
                                    <Image
                                        src={logo}
                                        alt={`Brand logo ${
                                            (index % brands.length) + 1
                                        }`}
                                        width={200}
                                        height={100}
                                        className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Marquee - Moving Left */}
                    <div className="flex">
                        <div className="flex animate-marquee-left">
                            {duplicatedBrands.map((logo, index) => (
                                <div
                                    key={`bottom-marquee-${index}`}
                                    className="flex items-center justify-center mx-8 min-w-[200px]"
                                >
                                    <Image
                                        src={logo}
                                        alt={`Brand logo ${
                                            (index % brands.length) + 1
                                        }`}
                                        width={200}
                                        height={100}
                                        className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex animate-marquee-left">
                            {duplicatedBrands.map((logo, index) => (
                                <div
                                    key={`bottom-marquee-duplicate-${index}`}
                                    className="flex items-center justify-center mx-8 min-w-[200px]"
                                >
                                    <Image
                                        src={logo}
                                        alt={`Brand logo ${
                                            (index % brands.length) + 1
                                        }`}
                                        width={200}
                                        height={100}
                                        className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandMarquee;
