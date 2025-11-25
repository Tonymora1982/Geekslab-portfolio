"use client";

import { useRef, useEffect } from "react";
import anime from "animejs";

interface AnimatedBadgeProps {
    text: string;
    className?: string;
    showDot?: boolean;
}

/**
 * Animated badge with pulsing indicator and smooth entrance
 */
export const AnimatedBadge = ({
    text,
    className = "",
    showDot = true
}: AnimatedBadgeProps) => {
    const badgeRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!badgeRef.current) return;

        // Entrance animation
        const tl = anime.timeline();

        tl.add({
            targets: badgeRef.current,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 800,
            delay: 300,
        });

        // Continuous pulse animation for dot
        if (showDot && dotRef.current) {
            anime({
                targets: dotRef.current,
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
                duration: 2000,
                loop: true,
                easing: "easeInOutQuad",
            });
        }

        // Gentle floating animation
        anime({
            targets: badgeRef.current,
            translateY: [0, -4, 0],
            duration: 3000,
            loop: true,
            easing: "easeInOutSine",
            delay: 1000,
        });
    }, [showDot]);

    return (
        <div
            ref={badgeRef}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm opacity-0 ${className}`}
        >
            {showDot && (
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span
                        ref={dotRef}
                        className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"
                    />
                </span>
            )}
            <span className="text-xs text-gray-300 font-medium tracking-wide leading-none">{text}</span>
        </div>
    );
};
