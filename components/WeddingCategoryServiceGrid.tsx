"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CategoryItem {
  title: string;
  price: string;
}

interface CategoryTier {
  name: string;
  items: CategoryItem[];
}

interface WeddingCategoryServiceGridProps {
  tiers: CategoryTier[];
}

const CYCLE_MS = 5000;

const WeddingCategoryServiceGrid = ({ tiers }: WeddingCategoryServiceGridProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) {
      return;
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      setIsVisible(Boolean(entry?.isIntersecting));
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.2,
    });
    observer.observe(gridElement);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (tiers.length < 2 || !isVisible || isPaused) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const handleInterval = () => {
      setActiveIndex((prev) => (prev + 1) % tiers.length);
    };

    const intervalId = window.setInterval(handleInterval, CYCLE_MS);
    return () => window.clearInterval(intervalId);
  }, [tiers.length, isVisible, isPaused]);

  const handleSelectCategory = (categoryIndex: number) => {
    setActiveIndex(categoryIndex);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const activeTier = tiers[activeIndex];

  if (!activeTier) {
    return null;
  }

  return (
    <div
      ref={gridRef}
      className="mb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleResume}
    >
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2 px-1" role="tablist" aria-label="Package categories">
        {tiers.map((tier, tierIndex) => {
          const isActive = tierIndex === activeIndex;
          return (
            <button
              key={tier.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => handleSelectCategory(tierIndex)}
              className={`min-h-11 min-w-[5.5rem] rounded-full px-3 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-[#77530a] to-[#ffd277] text-black"
                  : "border border-[#ffd277]/40 text-[#ffd277] bg-transparent"
              }`}
              aria-label={`Show ${tier.name} package`}
            >
              {tier.name === "Premium Plus" ? (
                <span className="sm:hidden">Plus</span>
              ) : null}
              <span className={tier.name === "Premium Plus" ? "hidden sm:inline" : ""}>
                {tier.name}
              </span>
            </button>
          );
        })}
      </div>
      <div className="service-grid" aria-live="polite">
        {activeTier.items.map((item, itemIndex) => (
          <div
            key={`wedding-card-${itemIndex}`}
            className="service-card"
            style={{
              ["--glow-x" as string]: "50%",
              ["--glow-y" as string]: "50%",
              ["--glow-intensity" as string]: "0",
              ["--glow-radius" as string]: "200px",
            } as React.CSSProperties}
          >
            <div className="service-card__content">
              {hasMounted ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTier.name}-${item.title}-${item.price}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex w-full min-w-0 flex-col items-center justify-center px-0.5 text-center"
                  >
                    <h3
                      className={`service-card__title !font-sans ${
                        item.title.length > 16 ? "service-card__title--compact" : ""
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="service-card__price !font-sans">{item.price}</p>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex w-full min-w-0 flex-col items-center justify-center px-0.5 text-center">
                  <h3
                    className={`service-card__title !font-sans ${
                      item.title.length > 16 ? "service-card__title--compact" : ""
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="service-card__price !font-sans">{item.price}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeddingCategoryServiceGrid;
