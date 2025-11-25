"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const GridPattern = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <svg
                className="absolute w-full h-full opacity-[0.015]"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    maskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.85), transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.85), transparent 80%)',
                }}
            >
                <defs>
                    <pattern
                        id="grid-pattern"
                        width="80"
                        height="80"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 80 0 L 0 0 0 80"
                            fill="none"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="0.5"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
        </div>
    );
};

export const CircuitLines = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <svg
                className="absolute w-full h-full opacity-10"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    d="M0 100 Q 250 50 500 100 T 1000 100"
                    fill="none"
                    stroke="url(#gradient-line)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
                />
                <defs>
                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export const CornerAccents = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Top Left */}
            <svg
                className="absolute top-10 left-10 w-24 h-24 opacity-20"
                viewBox="0 0 100 100"
            >
                <path d="M0 0 L40 0 L40 2 L2 2 L2 40 L0 40 Z" fill="white" />
            </svg>
            {/* Bottom Right */}
            <svg
                className="absolute bottom-10 right-10 w-24 h-24 opacity-20 rotate-180"
                viewBox="0 0 100 100"
            >
                <path d="M0 0 L40 0 L40 2 L2 2 L2 40 L0 40 Z" fill="white" />
            </svg>
        </div>
    );
};

export const DecorativeFloatingShapes = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <motion.div
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"
                animate={{
                    x: [0, -30, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </motion.div>
    );
};
