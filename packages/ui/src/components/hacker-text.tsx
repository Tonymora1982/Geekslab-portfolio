"use client";

import { useState, useEffect, useRef } from "react";

interface HackerTextProps {
    text: string;
    className?: string;
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export const HackerText = ({ text, className = "" }: HackerTextProps) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseOver = () => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3; // Speed of decoding
        }, 30);
    };

    return (
        <span
            className={className}
            onMouseEnter={handleMouseOver}
            style={{ cursor: "default" }}
        >
            {displayText}
        </span>
    );
};
