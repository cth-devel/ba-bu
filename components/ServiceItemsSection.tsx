"use client";

import React from "react";
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
    // No auto-load or scrolling - use load more buttons for all screen sizes
    const getContainerClasses = () => {
        // Let items stack naturally without scrolling
        return 'overflow-visible max-h-none';
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
                                    <div className={getContainerClasses()}>
                                        <ExpandableHairCutCards
                                            cards={ladiesCards.slice(0, ladiesVisible)}
                                            gender="female"
                                            onBookNow={onBookNow}
                                            showLoadMore={ladiesVisible < ladiesCards.length}
                                        />
                                        {/* Load More Button - All Screen Sizes */}
                                        {ladiesVisible < ladiesCards.length && (
                                            <div className="mt-6 text-center">
                                                <button
                                                    onClick={onLadiesLoadMore}
                                                    className="px-8 py-4 golden-gradient-button text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wider"
                                                    aria-label="Load more hair cut services for ladies"
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
                                    <div className={getContainerClasses()}>
                                        <ExpandableHairCutCards
                                            cards={gentsCards.slice(0, gentsVisible)}
                                            gender="male"
                                            onBookNow={onBookNow}
                                            showLoadMore={gentsVisible < gentsCards.length}
                                        />
                                        {/* Load More Button - All Screen Sizes */}
                                        {gentsVisible < gentsCards.length && (
                                            <div className="mt-6 text-center">
                                                <button
                                                    onClick={onGentsLoadMore}
                                                    className="px-8 py-4 golden-gradient-button text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wider"
                                                    aria-label="Load more hair cut services for gents"
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
