"use client";

import { useEffect, useState } from "react";
import anime from "animejs/lib/anime.es.js";

export const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Animate the counter
        const counter = { value: 0 };
        let animationCompleted = false;

        /**
         * Triggers the exit animation to slide the preloader out of view.
         * Sets animationCompleted flag to prevent duplicate triggers.
         */
        const triggerExit = () => {
            if (animationCompleted) return;
            animationCompleted = true;

            // Force progress to 100% for visual consistency
            setProgress(100);

            // Exit animation - slide up and hide
            anime({
                targets: "#preloader",
                translateY: "-100%",
                duration: 1000,
                easing: "easeOutExpo",
                complete: () => setIsVisible(false),
            });
        };

        // Start the counter animation from 0 to 100
        anime({
            targets: counter,
            value: 100,
            duration: 2000,
            easing: "cubicBezier(0.25, 1, 0.5, 1)",
            round: 1, // No decimals
            update: () => setProgress(counter.value),
            complete: triggerExit,
        });

        // Safety timeout: force completion after 3 seconds if animation gets stuck
        // This fixes the bug where anime.js round:1 can cause the counter to stop at 99.34%
        const safetyTimeout = setTimeout(() => {
            if (!animationCompleted) {
                console.warn("[Preloader] Animation timeout - forcing completion");
                triggerExit();
            }
        }, 3000);

        // Cleanup on unmount
        return () => {
            clearTimeout(safetyTimeout);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            id="preloader"
            className="fixed inset-0 z-10000 flex items-end justify-end bg-black p-8 md:p-16"
        >
            <div className="flex flex-col items-end">
                <div className="text-[12rem] md:text-[20rem] font-bold leading-none text-white tracking-tighter">
                    {progress}%
                </div>
                <div className="text-neutral-500 font-mono text-sm uppercase tracking-widest mt-4">
                    System Initializing...
                </div>
            </div>
        </div>
    );
};
