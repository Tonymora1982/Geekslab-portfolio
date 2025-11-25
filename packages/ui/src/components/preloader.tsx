"use client";

import { useEffect, useState } from "react";
import anime from "animejs/lib/anime.es.js";

export const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Animate the counter
        const counter = { value: 0 };

        anime({
            targets: counter,
            value: 100,
            duration: 2000,
            easing: "cubicBezier(0.25, 1, 0.5, 1)",
            round: 1, // No decimals
            update: () => setProgress(counter.value),
            complete: () => {
                // Exit animation
                anime({
                    targets: "#preloader",
                    translateY: "-100%",
                    duration: 1000,
                    easing: "easeOutExpo",
                    complete: () => setIsVisible(false),
                });
            },
        });
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
