"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

export const MagneticCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cursorRef.current || !followerRef.current) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const moveCursor = (e: MouseEvent) => {
            anime({
                targets: cursor,
                translateX: e.clientX,
                translateY: e.clientY,
                duration: 0,
            });

            anime({
                targets: follower,
                translateX: e.clientX,
                translateY: e.clientY,
                duration: 800,
                easing: "easeOutExpo",
            });
        };

        const handleHover = () => {
            anime({
                targets: follower,
                scale: 3,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderWidth: 0,
                duration: 500,
                easing: "easeOutExpo",
            });
        };

        const handleUnhover = () => {
            anime({
                targets: follower,
                scale: 1,
                backgroundColor: "transparent",
                borderWidth: "1px",
                duration: 500,
                easing: "easeOutExpo",
            });
        };

        window.addEventListener("mousemove", moveCursor);

        const interactiveElements = document.querySelectorAll("a, button");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleHover);
            el.addEventListener("mouseleave", handleUnhover);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleUnhover);
                el.removeEventListener("mouseleave", handleUnhover);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -ml-1 -mt-1 rounded-full bg-white mix-blend-difference hidden md:block"
            />
            <div
                ref={followerRef}
                className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -ml-4 -mt-4 rounded-full border border-white/30 mix-blend-difference hidden md:block"
            />
        </>
    );
};
