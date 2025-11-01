import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: string | ((t: number) => number);
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    threshold?: number;
    rootMargin?: string;
    textAlign?: React.CSSProperties["textAlign"];
    onAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
    text,
    className = "",
    delay = 100,
    duration = 1.2,
    ease = "power3.out",
    from = { opacity: 0, y: 20 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = "-50px",
    textAlign = "center",
    onAnimationComplete,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current || !text) return;

        const container = containerRef.current;
        const textEl = textRef.current;

        // Create multiple copies of the text for staggered reveal
        const words = text.split(' ');
        const wordElements: HTMLSpanElement[] = [];

        // Clear existing content
        textEl.innerHTML = '';

        // Create individual word elements
        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word;
            wordSpan.style.opacity = '0';
            wordSpan.style.transform = 'translateY(20px)';
            wordSpan.style.display = 'inline-block';

            textEl.appendChild(wordSpan);
            wordElements.push(wordSpan);

            // Add space after each word except the last
            if (index < words.length - 1) {
                const space = document.createTextNode(' ');
                textEl.appendChild(space);
            }
        });

        const st = ScrollTrigger.create({
            trigger: container,
            start: `top bottom-=${rootMargin}`,
            once: true,
            onEnter: () => {
                gsap.to(wordElements, {
                    opacity: 1,
                    y: 0,
                    duration,
                    ease,
                    stagger: delay / 1000,
                    onComplete: () => {
                        onAnimationComplete?.();
                        st.kill();
                    },
                });
            },
        });

        return () => {
            st.kill();
        };
    }, [
        text,
        delay,
        duration,
        ease,
        threshold,
        rootMargin,
        onAnimationComplete,
    ]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ textAlign }}
        >
            <div ref={textRef} />
        </div>
    );
};

export default SplitText;

