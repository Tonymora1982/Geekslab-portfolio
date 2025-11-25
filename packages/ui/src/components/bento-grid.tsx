"use client";

import { cn } from "../lib/utils";
import { useRef, useEffect } from "react";
import anime from "animejs";
import Link from "next/link";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gridRef.current) return;

        // Staggered entrance animation
        anime({
            targets: gridRef.current.children,
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            delay: anime.stagger(100),
            easing: "easeOutExpo",
        });
    }, []);

    return (
        <div
            ref={gridRef}
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    id,
    href,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    id?: string;
    href?: string;
}) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!itemRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Reduced tilt for elegance
        const rotateY = ((x - centerX) / centerX) * 5;

        // Tilt animation
        anime({
            targets: itemRef.current,
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.02,
            duration: 800,
            easing: 'easeOutExpo'
        });

        // Spotlight gradient update
        const spotlight = itemRef.current.querySelector('.spotlight') as HTMLElement;
        if (spotlight) {
            spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 40%)`;
        }
    };

    const handleMouseEnter = () => {
        if (!contentRef.current) return;
        anime({
            targets: contentRef.current.children,
            translateY: [0, -2],
            opacity: [0.7, 1],
            duration: 600,
            delay: anime.stagger(50),
            easing: 'easeOutExpo'
        });

        // Fade in spotlight
        const spotlight = itemRef.current?.querySelector('.spotlight') as HTMLElement;
        if (spotlight) {
            anime({
                targets: spotlight,
                opacity: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    };

    const handleMouseLeave = () => {
        if (!itemRef.current || !contentRef.current) return;

        anime({
            targets: itemRef.current,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: contentRef.current.children,
            translateY: 0,
            opacity: 1,
            duration: 600,
            easing: 'easeOutExpo'
        });

        // Fade out spotlight
        const spotlight = itemRef.current.querySelector('.spotlight') as HTMLElement;
        if (spotlight) {
            anime({
                targets: spotlight,
                opacity: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    };

    const Content = () => (
        <div
            ref={itemRef}
            className={cn(
                "row-span-1 rounded-none group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/10 bg-white border border-transparent justify-between flex flex-col space-y-4 h-full relative overflow-hidden",
                className
            )}
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            id={id}
        >
            {/* Spotlight Element */}
            <div className="spotlight absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300" />

            <div className="transition duration-500 group-hover/bento:-translate-y-2 h-full relative z-10">
                {header}
            </div>
            <div ref={contentRef} className="transition duration-500 group-hover/bento:translate-x-2 relative z-10">
                {icon}
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} className="block h-full">
                <Content />
            </Link>
        );
    }

    return <Content />;
};
