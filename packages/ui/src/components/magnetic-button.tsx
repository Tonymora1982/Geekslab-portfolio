"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "../lib/utils";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    radiusPx?: number;
    maxDisplacementPx?: number;
}

export function MagneticButton({
    children,
    className,
    radiusPx = 100,
    maxDisplacementPx = 8,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const latestPointerRef = useRef({ x: 0, y: 0 });
    const [enabled, setEnabled] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.2 });
    const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.2 });

    useEffect(() => {
        const finePointer = window.matchMedia?.("(pointer: fine)")?.matches ?? false;
        const hoverCapable = window.matchMedia?.("(hover: hover)")?.matches ?? false;
        const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
        setEnabled(finePointer && hoverCapable && !reduceMotion);
    }, []);

    useEffect(() => {
        if (!enabled) {
            x.set(0);
            y.set(0);
            return;
        }

        const safeRadius = Math.max(1, radiusPx);

        const update = () => {
            rafRef.current = null;
            const element = ref.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const pointerX = latestPointerRef.current.x;
            const pointerY = latestPointerRef.current.y;

            const isWithinAttraction =
                pointerX >= rect.left - safeRadius &&
                pointerX <= rect.right + safeRadius &&
                pointerY >= rect.top - safeRadius &&
                pointerY <= rect.bottom + safeRadius;

            if (!isWithinAttraction) {
                x.set(0);
                y.set(0);
                return;
            }

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = Math.max(-safeRadius, Math.min(safeRadius, pointerX - centerX));
            const dy = Math.max(-safeRadius, Math.min(safeRadius, pointerY - centerY));

            x.set((dx / safeRadius) * maxDisplacementPx);
            y.set((dy / safeRadius) * maxDisplacementPx);
        };

        const handlePointerMove = (event: PointerEvent) => {
            latestPointerRef.current = { x: event.clientX, y: event.clientY };
            if (rafRef.current !== null) return;
            rafRef.current = window.requestAnimationFrame(update);
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            if (rafRef.current !== null) {
                window.cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [enabled, maxDisplacementPx, radiusPx, x, y]);

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            className={cn("inline-block", className)}
        >
            {children}
        </motion.div>
    );
}
