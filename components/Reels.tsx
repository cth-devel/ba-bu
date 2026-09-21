'use client';

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import reels from "@/data/reels.json";
import reviews from "@/reviews.json";

/**
 * 2-second GIF-style loops cut from the salon's Instagram reels (source clips in
 * /reel, not shipped). Each file in /public/videos/reels is a silent 540p h264
 * mp4 plus a webp poster; tiles link out to Instagram for the full reel.
 *
 * iOS plays inline without a gesture only when the video is muted + playsInline.
 * React doesn't emit the `muted` attribute in static HTML, so the clips carry no
 * audio track at all (which iOS plays regardless) and `muted` is also set as a
 * property before play(). Low Power Mode blocks it outright — the poster shows.
 */

const DIR = "/videos/reels/";

const ReelLoop = ({ name, label }: { name: string; label: string }) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;

        // Reduced motion or data saver: the poster is the whole tile.
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        if (saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        video.muted = true; // property, not just the attribute React may omit
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) video.play().catch(() => {});
                else video.pause();
            },
            { rootMargin: "200px 0px" },
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        // No autoPlay: it overrides preload and fetches every clip on page load.
        // preload="none" + play() from the observer means nothing downloads until
        // the tile is within 200px of the viewport, and off-screen clips stop decoding.
        <video
            ref={ref}
            src={`${DIR}${name}.mp4`}
            poster={`${DIR}${name}.webp`}
            aria-label={label}
            loop
            muted
            playsInline
            preload="none"
            className="h-full w-full object-cover"
        />
    );
};

// Instagram's app mark: rounded square, lens, flash dot.
const InstagramGlyph = ({ className }: { className: string }) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
);

const handle = siteConfig.social.instagram.split("/").filter(Boolean).pop();

// Real figures only — the review count is the file the Testimonials section reads.
const STATS = [
    { value: `${reviews.length}`, label: "reviews" },
    { value: "5+", label: "years" },
    { value: "3", label: "branches" },
];

/**
 * Instagram's own dark-mode profile, measured off the real thing: 150px avatar
 * (77px on phones), 20px username, 16px stats with 40px gaps, 14px/18px bio,
 * #F5F5F5 primary type, #A8A8A8 secondary, #262626 rules, #0095F6 Follow fill,
 * and the phone layout's full-width button + bordered stats bar. The one
 * departure is the grid: full-bleed with rounded 9:16 tiles instead of
 * Instagram's 935px column of squares.
 */
const Reels = () => (
    <section
        id="reels"
        aria-labelledby="reels-heading"
        className="w-full bg-primary px-2 py-12 sm:px-3 sm:py-16 lg:py-20"
    >
        <header className="flex items-start gap-4 px-3 sm:items-center sm:gap-[30px] sm:px-6 lg:px-10">
            <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`@${handle} on Instagram`}
                className="shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
                <span className="flex h-[77px] w-[77px] items-center justify-center rounded-full bg-ternary sm:h-[150px] sm:w-[150px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/BABU-White.svg" alt="" className="w-[70%]" />
                </span>
            </a>

            <div className="min-w-0 flex-1">
                {/* Instagram's username row: 20px name, then the buttons, 8px apart. */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <h2
                        id="reels-heading"
                        className="truncate text-base tracking-[0.1em] text-[#F5F5F5] sm:text-xl"
                    >
                        <span className="sr-only">BA-BU Family Salon reels on Instagram: </span>
                        {handle}
                    </h2>
                    <a
                        href={siteConfig.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden h-8 items-center justify-center rounded-lg bg-[#0095F6] px-4 text-sm tracking-[0.14em] text-white [text-indent:0.14em] transition-colors hover:bg-[#1877F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0095F6] focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:inline-flex"
                    >
                        Follow
                    </a>
                </div>

                {/* Stats sit in the right column on desktop, in a bordered bar on phones. */}
                <ul className="mt-5 hidden gap-10 text-base tracking-[0.1em] text-[#F5F5F5] sm:flex">
                    {STATS.map((s) => (
                        <li key={s.label}>
                            <span className="font-medium">{s.value}</span> {s.label}
                        </li>
                    ))}
                </ul>

                <div className="mt-5 hidden text-sm leading-[22px] tracking-[0.1em] text-[#F5F5F5] sm:block">
                    <p className="font-medium">{siteConfig.siteName}</p>
                    <p className="text-[#A8A8A8]">{siteConfig.description}</p>
                    <a
                        href={siteConfig.contact.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 underline-offset-4 hover:underline"
                    >
                        {siteConfig.contact.address}
                    </a>
                </div>
            </div>
        </header>

        {/* Phone layout: full-width Follow under the header, then bio, then the stats bar. */}
        <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 mt-4 flex h-8 items-center justify-center rounded-lg bg-[#0095F6] text-sm tracking-[0.14em] text-white [text-indent:0.14em] transition-colors hover:bg-[#1877F2] sm:hidden"
        >
            Follow
        </a>
        <div className="mt-4 px-3 text-sm leading-[22px] tracking-[0.1em] text-[#F5F5F5] sm:hidden">
            <p className="font-medium">{siteConfig.siteName}</p>
            <p className="text-[#A8A8A8]">{siteConfig.description}</p>
            <a
                href={siteConfig.contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70"
            >
                {siteConfig.contact.address}
            </a>
        </div>
        <ul className="mx-3 mt-4 grid grid-cols-3 border-y border-[#262626] py-3 text-center text-sm tracking-[0.1em] text-[#F5F5F5] sm:hidden">
            {STATS.map((s) => (
                <li key={s.label}>
                    <span className="block font-medium">{s.value}</span>
                    <span className="text-[#A8A8A8]">{s.label}</span>
                </li>
            ))}
        </ul>

        <ul className="mt-4 grid grid-cols-3 gap-2 sm:mt-11 sm:gap-3 lg:grid-cols-5">
            {reels.map((reel) => (
                // Three columns until lg, like Instagram; five tiles would leave two orphans there.
                <li key={reel.name} className="[&:nth-child(n+4)]:max-lg:hidden">
                    <a
                        href={siteConfig.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${reel.label} — watch on Instagram`}
                        className="group relative block aspect-[9/16] overflow-hidden rounded-lg bg-ternary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70 sm:rounded-xl"
                    >
                        <ReelLoop {...reel} />
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 transition-colors group-hover:bg-primary/30"
                        />
                        <InstagramGlyph className="absolute right-2 top-2 h-4 w-4 text-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.8))] sm:right-3 sm:top-3 sm:h-5 sm:w-5" />
                    </a>
                </li>
            ))}
        </ul>
    </section>
);

export default Reels;
