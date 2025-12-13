"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import anime from "animejs/lib/anime.es.js";

interface AnimatedButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary";
    className?: string;
}

/**
 * Button with micro-animations on hover and click
 * Features magnetic effect and smooth transitions
 */
export const AnimatedButton = ({
    children,
    href,
    onClick,
    variant = "primary",
    className = "",
}: AnimatedButtonProps) => {
    const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const magneticStrength = 0.3;
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        setReduceMotion(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false);
    }, []);

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        if (reduceMotion) return;
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Magnetic effect - button follows cursor slightly
        anime({
            targets: buttonRef.current,
            translateX: x * magneticStrength,
            translateY: y * magneticStrength,
            duration: 300,
            easing: "easeOutQuad",
        });
    };

    const handleMouseEnter = () => {
        if (reduceMotion) return;
        if (!buttonRef.current) return;

        anime({
            targets: buttonRef.current,
            scale: 1.05,
            duration: 300,
            easing: "easeOutElastic(1, .6)",
        });
    };

    const handleMouseLeave = () => {
        if (reduceMotion) return;
        if (!buttonRef.current) return;

        anime({
            targets: buttonRef.current,
            translateX: 0,
            translateY: 0,
            scale: 1,
            duration: 500,
            easing: "easeOutElastic(1, .6)",
        });
    };

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        if (!buttonRef.current) return;

        if (!reduceMotion) {
            anime({
                targets: buttonRef.current,
                scale: [1.05, 0.95, 1],
                duration: 400,
                easing: "easeOutElastic(1, .8)",
            });
        }

        if (onClick) {
            onClick();
        }
    };

    const baseClasses = "px-8 py-4 rounded-full font-bold transition-all inline-block cursor-pointer";
    const variantClasses = {
        primary: "bg-white text-black hover:shadow-xl hover:shadow-white/20",
        secondary: "bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-sm",
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

    if (href) {
        return (
            <a
                ref={buttonRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                className={combinedClasses}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            className={combinedClasses}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};
