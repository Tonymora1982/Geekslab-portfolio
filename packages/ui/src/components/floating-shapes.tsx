"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

export const FloatingShapes = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Create shapes dynamically or select existing ones
        // Here we assume we will render some SVGs

        // Animate circles
        anime({
            targets: containerRef.current.querySelectorAll(".shape-circle"),
            translateY: () => Math.random() * 200 - 100,
            translateX: () => Math.random() * 200 - 100,
            scale: [0.5, 1.5],
            opacity: [0.2, 0.5],
            duration: () => 3000 + Math.random() * 2000,
            direction: "alternate",
            loop: true,
            easing: "easeInOutSine",
            delay: () => Math.random() * 1000,
        });

        // Animate triangles (rotation)
        anime({
            targets: containerRef.current.querySelectorAll(".shape-triangle"),
            rotate: 360,
            duration: () => 5000 + Math.random() * 3000,
            loop: true,
            easing: "linear",
        });

    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Random Shapes */}
            <svg className="absolute top-1/4 left-1/4 w-24 h-24 text-blue-500/10 shape-circle" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="currentColor" />
            </svg>
            <svg className="absolute top-3/4 left-1/3 w-32 h-32 text-purple-500/10 shape-triangle" viewBox="0 0 100 100">
                <polygon points="50,15 90,85 10,85" fill="currentColor" />
            </svg>
            <svg className="absolute top-1/2 right-1/4 w-16 h-16 text-green-500/10 shape-circle" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="currentColor" />
            </svg>
            <svg className="absolute bottom-1/4 right-1/3 w-20 h-20 text-pink-500/10 shape-triangle" viewBox="0 0 100 100">
                <polygon points="50,15 90,85 10,85" fill="currentColor" />
            </svg>
        </div>
    );
};
