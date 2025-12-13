"use client";

import { useEffect, useRef, useState } from "react";

export const MagneticCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [enabled, setEnabled] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const visibleRef = useRef(false);

    const pointerRef = useRef({ x: 0, y: 0 });
    const followerPosRef = useRef({ x: 0, y: 0 });
    const scaleRef = useRef(1);
    const targetScaleRef = useRef(1);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const finePointer = window.matchMedia?.("(pointer: fine)")?.matches ?? false;
        const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
        setEnabled(finePointer && !reduceMotion);
    }, []);

    useEffect(() => {
        if (!enabled) return;
        if (!cursorRef.current || !followerRef.current) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;
        const interactiveSelector = "a, button, [role='button'], input, textarea, select, summary";

        const update = () => {
            rafRef.current = null;

            cursor.style.transform = `translate3d(${pointerRef.current.x}px, ${pointerRef.current.y}px, 0)`;

            const followLerp = 0.18;
            followerPosRef.current.x += (pointerRef.current.x - followerPosRef.current.x) * followLerp;
            followerPosRef.current.y += (pointerRef.current.y - followerPosRef.current.y) * followLerp;

            const scaleLerp = 0.2;
            scaleRef.current += (targetScaleRef.current - scaleRef.current) * scaleLerp;

            follower.style.transform = `translate3d(${followerPosRef.current.x}px, ${followerPosRef.current.y}px, 0) scale(${scaleRef.current})`;
        };

        const scheduleUpdate = () => {
            if (rafRef.current !== null) return;
            rafRef.current = window.requestAnimationFrame(update);
        };

        const handlePointerMove = (event: PointerEvent) => {
            pointerRef.current = { x: event.clientX, y: event.clientY };
            if (!visibleRef.current) {
                visibleRef.current = true;
                followerPosRef.current = { x: event.clientX, y: event.clientY };
                scaleRef.current = 1;
                targetScaleRef.current = 1;
                setIsVisible(true);
            }
            scheduleUpdate();
        };

        const isInteractive = (target: EventTarget | null) => {
            if (!(target instanceof Element)) return false;
            return Boolean(target.closest(interactiveSelector));
        };

        const handlePointerOver = (event: PointerEvent) => {
            if (!isInteractive(event.target)) return;
            setIsHovering(true);
            targetScaleRef.current = 3;
        };

        const handlePointerOut = (event: PointerEvent) => {
            const nextTarget = event.relatedTarget;
            if (isInteractive(nextTarget)) return;
            setIsHovering(false);
            targetScaleRef.current = 1;
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        document.addEventListener("pointerover", handlePointerOver, { passive: true });
        document.addEventListener("pointerout", handlePointerOut, { passive: true });

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("pointerover", handlePointerOver);
            document.removeEventListener("pointerout", handlePointerOut);
            if (rafRef.current !== null) {
                window.cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            <div
                ref={cursorRef}
                className={`pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -ml-1 -mt-1 rounded-full bg-white mix-blend-difference hidden md:block will-change-transform transition-opacity duration-150 ${isVisible ? "opacity-100" : "opacity-0"}`}
                aria-hidden="true"
            />
            <div
                ref={followerRef}
                className={`pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -ml-4 -mt-4 rounded-full mix-blend-difference hidden md:block will-change-transform transition-opacity transition-colors duration-150 ${isHovering ? "bg-white/10 border-0" : "bg-transparent border border-white/30"} ${isVisible ? "opacity-100" : "opacity-0"}`}
                aria-hidden="true"
            />
        </>
    );
};
