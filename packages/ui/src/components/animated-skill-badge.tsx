"use client";

import { useRef } from "react";
import anime from "animejs";

interface AnimatedSkillBadgeProps {
    skill: string;
    index: number;
}

export const AnimatedSkillBadge = ({ skill, index }: AnimatedSkillBadgeProps) => {
    const badgeRef = useRef<HTMLLIElement>(null);

    const handleMouseEnter = () => {
        if (!badgeRef.current) return;

        // Wave/Pulse effect on hover
        anime({
            targets: badgeRef.current,
            scale: 1.1,
            translateX: 5,
            color: "#3b82f6", // blue-500
            duration: 400,
            easing: "easeOutElastic(1, .6)",
        });

        // Animate the dot
        const dot = badgeRef.current.querySelector(".skill-dot");
        if (dot) {
            anime({
                targets: dot,
                scale: [1, 1.5, 1],
                backgroundColor: "#60a5fa", // blue-400
                duration: 600,
                easing: "easeInOutQuad",
            });
        }
    };

    const handleMouseLeave = () => {
        if (!badgeRef.current) return;

        anime({
            targets: badgeRef.current,
            scale: 1,
            translateX: 0,
            color: "#9ca3af", // gray-400
            duration: 400,
            easing: "easeOutElastic(1, .6)",
        });

        const dot = badgeRef.current.querySelector(".skill-dot");
        if (dot) {
            anime({
                targets: dot,
                scale: 1,
                backgroundColor: "#3b82f6", // blue-500
                duration: 400,
                easing: "easeInOutQuad",
            });
        }
    };

    return (
        <li
            ref={badgeRef}
            className="text-gray-400 flex items-center gap-2 cursor-default transition-colors"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="skill-dot w-1.5 h-1.5 rounded-full bg-blue-500 block" />
            {skill}
        </li>
    );
};
