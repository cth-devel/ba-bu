"use client";

import Link from "next/link";
import Image from "next/image";
import RotatingWord from "./RotatingWord";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { siteConfig } from "@/config/site";

const Footer = () => {
    return (
        <footer className="bg-babu-primary text-whit min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex w-full items-center justify-center">
                    <Image
                        src="/BABU-White.svg"
                        alt={siteConfig.siteName}
                        width={540}
                        height={432}
                        // className="h-14 w-auto sm:h-16 lg:h-40"
                    />
                </div>

                {/* Headline */}
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-8xl font-[900] tracking-widest uppercase -translate-y-24 flex flex-col items-center justify-center">
                        <span className="text-white">Step In Beautiful</span>
                        <span className="text-white">
                            Step  Out
                              <RotatingWord
                                 words={["Radiant", "Elegant"]}
                                 intervalMs={2200}
                                 className="text-white inline-block ml-4"
                             />
                        </span>
                    </h2>
                </div>

                {/* Address + Email */}
                <div className="grid grid-cols-1 gap-6 text-center text-sm sm:grid-cols-2 sm:text-base">
                    <div>
                        <p className="font-medium tracking-wide">
                            {siteConfig.siteName}
                        </p>
                        <p className="text-white/80">
                            {siteConfig.contact.address}
                        </p>
                    </div>
                    <div>
                        <Link
                            href={`mailto:${siteConfig.contact.email}`}
                            className="text-white/90 underline-offset-4 hover:underline"
                            aria-label={`Email: ${siteConfig.contact.email}`}
                        >
                            {siteConfig.contact.email}
                        </Link>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-center">
                    <Link
                        href={siteConfig.contact.whatsapp}
                        className="rounded-md bg-babu-accent-2 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-black transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-babu-accent-2/60"
                        aria-label="Book Now on WhatsApp"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Book Now
                    </Link>
                </div>

                {/* Social icons */}
                <div className="mt-8 flex items-center justify-center gap-6">
                    <Link
                        href={siteConfig.social.instagram}
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
                    >
                        <Instagram className="h-5 w-5" />
                    </Link>
                    <Link
                        href={siteConfig.social.facebook}
                        aria-label="Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
                    >
                        <Facebook className="h-5 w-5" />
                    </Link>
                    <Link
                        href={siteConfig.social.youtube}
                        aria-label="YouTube"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
                    >
                        <Youtube className="h-5 w-5" />
                    </Link>
                </div>

                {/* Links */}
                <nav className="mt-8" aria-label="Footer links">
                    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/80">
                        <li>
                            <Link href="/privacy" className="hover:text-white">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms" className="hover:text-white">
                                Terms &amp; Conditions
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className="hover:text-white">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className="hover:text-white">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/#about" className="hover:text-white">
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Copyright */}
                <div className="mt-6 text-center text-xs text-white/70">
                    {siteConfig.siteName} © 2025
                </div>
            </div>
        </footer>
    );
};

export default Footer;
