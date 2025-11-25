"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "../lib/utils";

export const Spotlight = ({
    className,
    fill = "white",
}: {
    className?: string;
    fill?: string;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn(
                "pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100",
                className
            )}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${fill} 0%,
              transparent 80%
            )
          `,
                }}
            />
        </div>
    );
};

export const SpotlightHero = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn(
                "group relative flex items-center justify-center w-full h-full overflow-hidden bg-background",
                className
            )}
            onMouseMove={handleMouseMove}
        >
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 40%
            )
          `,
                }}
            />

            <div className="relative z-10">{children}</div>
        </div>
    );
};
