"use client";

import { useRef, useEffect } from "react";
import anime from "animejs/lib/anime.es.js";

interface AnimatedHeroTextProps {
    text: string;
    className?: string;
    delay?: number;
}

/**
 * Component that animates text with a staggered character-by-character effect
 * using Anime.js for smooth, professional animations
 */
export const AnimatedHeroText = ({ text, className = "", delay = 0 }: AnimatedHeroTextProps) => {
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        // Split text into individual characters wrapped in spans
        const chars = text.split("");
        textRef.current.innerHTML = chars
            .map((char) => {
                // Preserve spaces but wrap them in spans for stagger effect
                if (char === " ") {
                    return `<span class="inline-block" style="width: 0.25em;">&nbsp;</span>`;
                }
                return `<span class="inline-block opacity-0 translate-y-8" style="transform-style: preserve-3d; backface-visibility: hidden;">${char}</span>`;
            })
            .join("");

        // Animate characters with stagger
        anime({
            targets: textRef.current.querySelectorAll("span"),
            rotateY: [-90, 0],
            rotateX: [90, 0],
            opacity: [0, 1],
            translateZ: [500, 0],
            scale: [0, 1],
            translateY: [50, 0],
            duration: 1200,
            delay: anime.stagger(30, { start: delay }),
            easing: 'easeOutExpo',
        });
    }, [text, delay]);

    return <h1 ref={textRef} className={className} style={{ perspective: "1000px" }} />;
};

interface AnimatedWordProps {
    words: string[];
    className?: string;
    delay?: number;
}

/**
 * Component that animates text word by word with stagger effect
 */
export const AnimatedWords = ({ words, className = "", delay = 0 }: AnimatedWordProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Animate words with stagger
        anime({
            targets: containerRef.current.querySelectorAll(".word"),
            opacity: [0, 1],
            translateY: [30, 0],
            rotateX: [90, 0],
            duration: 1000,
            delay: anime.stagger(100, { start: delay }), // 100ms between words
            easing: "easeOutExpo",
        });
    }, [words, delay]);

    return (
        <div ref={containerRef} className={className}>
            {words.map((word, index) => (
                <span
                    key={index}
                    className="word inline-block opacity-0 mr-2"
                    style={{ perspective: "1000px" }}
                >
                    {word}
                </span>
            ))}
        </div>
    );
};

/**
 * Component that decodes text from random characters to the final text
 */
export const DecoderText = ({ text, className = "", delay = 0 }: AnimatedHeroTextProps) => {
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";
        const duration = Math.max(800, text.length * 60);

        // Reset content before starting
        el.textContent = "";

        const animation = anime({
            targets: { reveal: 0 },
            reveal: text.length,
            round: 1,
            duration,
            delay,
            easing: "easeInOutQuad",
            update: (anim: any) => {
                const revealCount = Math.min(
                    text.length,
                    anim.animatables?.[0]?.target?.reveal ?? text.length
                );
                let nextText = "";
                for (let i = 0; i < text.length; i++) {
                    nextText += i < revealCount
                        ? text[i]
                        : chars[Math.floor(Math.random() * chars.length)];
                }
                el.textContent = nextText;
            },
            complete: () => {
                el.textContent = text;
            },
        });

        // Failsafe to ensure the final text shows even if the animation gets interrupted
        const settleTimeout = setTimeout(() => {
            if (el.textContent !== text) {
                el.textContent = text;
            }
        }, delay + duration + 100);

        return () => {
            animation?.pause();
            clearTimeout(settleTimeout);
            el.textContent = text;
        };
    }, [text, delay]);

    return <span ref={textRef} className={className} aria-label={text} />;
};
