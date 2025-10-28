"use client";

import React, { useEffect } from "react";
import ExpandableHairCutCards from "@/components/ExpandableHairCutCards";

interface ServiceItemsSectionProps {
    ladiesCards: any[];
    gentsCards: any[];
    ladiesVisible: number;
    gentsVisible: number;
    onLadiesLoadMore: () => void;
    onGentsLoadMore: () => void;
    onBookNow: (title: string, price: string, gender: string) => void;
    itemsPerLoad: number;
    className?: string;
}

const ServiceItemsSection: React.FC<ServiceItemsSectionProps> = ({
    ladiesCards,
    gentsCards,
    ladiesVisible,
    gentsVisible,
    onLadiesLoadMore,
    onGentsLoadMore,
    onBookNow,
    itemsPerLoad,
    className = "",
}) => {
    // Auto-load all items on desktop screens (>= 1024px)
    useEffect(() => {
        const loadAllItemsOnDesktop = () => {
            if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                // Trigger load more for ladies if needed
                if (ladiesVisible < ladiesCards.length) {
                    onLadiesLoadMore();
                }
                // Trigger load more for gents if needed
                if (gentsVisible < gentsCards.length) {
                    onGentsLoadMore();
                }
            }
        };

        // Run on mount and when visibility changes
        loadAllItemsOnDesktop();
    }, [ladiesCards.length, gentsCards.length, ladiesVisible, gentsVisible, onLadiesLoadMore, onGentsLoadMore]);

    const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;

        // Calculate scroll position with small tolerance for floating point errors
        const isAtBottom = Math.abs(
            container.scrollHeight - container.scrollTop - container.clientHeight
        ) < 1;
        const isAtTop = container.scrollTop < 1;

        // Only prevent page scroll if container can still scroll in that direction
        if (
            (isScrollingDown && !isAtBottom) ||
            (isScrollingUp && !isAtTop)
        ) {
            // Prevent page scroll and let container scroll naturally
            e.stopPropagation();
        }
        // If at top/bottom, allow event to bubble up and scroll the page
    };

    const getContainerClasses = (visibleCount: number, totalCount: number) => {
        // Apply scrolling only when all items are loaded (visible >= total)
        // On mobile/tablet, use load more button; on larger screens (lg+), use scrolling
        if (visibleCount >= totalCount) {
            // All items loaded - enable scrolling on large screens (1024px+)
            return 'overflow-visible max-h-none lg:max-h-[70vh] lg:overflow-y-auto xl:max-h-[75vh] lg:overscroll-contain lg:touch-pan-y lg:pr-2 lg:scroll-smooth';
        } else {
            // Not all items loaded - let them stack naturally, show load more button
            return 'overflow-visible max-h-none';
        }
    };

    // Determine if sections should be shown
    const showLadiesSection = ladiesCards.length > 0;
    const showGentsSection = gentsCards.length > 0;

    // Determine grid layout based on which sections are available
    const getGridLayout = () => {
        if (showLadiesSection && showGentsSection) {
            return "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8";
        } else {
            return "grid grid-cols-1";
        }
    };

    // Get section classes based on whether both sections are shown
    const getSectionClasses = (isLadies: boolean) => {
        if (showLadiesSection && showGentsSection) {
            return isLadies ? "lg:pr-2" : "lg:pl-2";
        } else {
            return ""; // Full width when only one section
        }
    };

    return (
        <div className={`service-items-section ${className}`}>
            <div className="bg-black">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        {/* Dynamic Layout based on available sections */}
                        <div className={getGridLayout()}>
                            {/* Ladies Section */}
                            {showLadiesSection && (
                                <section
                                    role="region"
                                    aria-labelledby="ladies-heading"
                                    className={getSectionClasses(true)}
                                >
                                    <div className="mb-6">
                                        <h5
                                            id="ladies-heading"
                                            className="text-lg font-gunteerz font-semibold text-white text-left"
                                        >
                                            For Ladies
                                        </h5>
                                    </div>
                                    <div
                                        className={getContainerClasses(ladiesVisible, ladiesCards.length)}
                                        onWheel={ladiesVisible >= ladiesCards.length ? handleWheelScroll : undefined}
                                    >
                                        <ExpandableHairCutCards
                                            cards={ladiesCards.slice(0, ladiesVisible)}
                                            gender="female"
                                            onBookNow={onBookNow}
                                            showLoadMore={ladiesVisible < ladiesCards.length}
                                        />
                                        {/* Mobile Load More Button */}
                                        {ladiesVisible < ladiesCards.length && (
                                            <div className="lg:hidden mt-4 text-center">
                                                <button
                                                    onClick={onLadiesLoadMore}
                                                    className="px-8 py-4 golden-gradient-button text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wider"
                                                >
                                                    Load More
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Gents Section */}
                            {showGentsSection && (
                                <section
                                    role="region"
                                    aria-labelledby="gents-heading"
                                    className={getSectionClasses(false)}
                                >
                                    <div className="mb-6">
                                        <h5
                                            id="gents-heading"
                                            className="text-lg font-gunteerz font-semibold text-white text-left"
                                        >
                                            For Gents
                                        </h5>
                                    </div>
                                    <div
                                        className={getContainerClasses(gentsVisible, gentsCards.length)}
                                        onWheel={gentsVisible >= gentsCards.length ? handleWheelScroll : undefined}
                                    >
                                        <ExpandableHairCutCards
                                            cards={gentsCards.slice(0, gentsVisible)}
                                            gender="male"
                                            onBookNow={onBookNow}
                                            showLoadMore={gentsVisible < gentsCards.length}
                                        />
                                        {/* Mobile Load More Button */}
                                        {gentsVisible < gentsCards.length && (
                                            <div className="lg:hidden mt-4 text-center">
                                                <button
                                                    onClick={onGentsLoadMore}
                                                    className="px-8 py-4 golden-gradient-button text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wider"
                                                >
                                                    Load More
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceItemsSection;
