"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { cn } from "../lib/utils";

export const BackgroundGrid = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const [columns, setColumns] = useState(0);
    const [rows, setRows] = useState(0);
    const [toggled, setToggled] = useState(false);

    // Configuration
    const ITEM_SIZE = 50; // Size of each grid item in pixels

    useEffect(() => {
        const calculateGrid = () => {
            if (!gridRef.current) return;
            const width = window.innerWidth;
            const height = window.innerHeight;

            const cols = Math.floor(width / ITEM_SIZE);
            const rows = Math.floor(height / ITEM_SIZE);

            setColumns(cols);
            setRows(rows);
        };

        calculateGrid();
        window.addEventListener("resize", calculateGrid);
        return () => window.removeEventListener("resize", calculateGrid);
    }, []);

    const handleClick = (index: number) => {
        setToggled(!toggled);

        anime({
            targets: gridRef.current?.children || [],
            scale: [
                { value: .1, easing: 'easeOutSine', duration: 500 },
                { value: 1, easing: 'easeInOutQuad', duration: 1200 }
            ],
            delay: anime.stagger(200, { grid: [columns, rows], from: index }),
        });
    };

    const handleMouseEnter = (index: number) => {
        // Subtle ripple on hover
        anime({
            targets: gridRef.current?.children || [],
            backgroundColor: [
                { value: '#3b82f6', easing: 'easeOutSine', duration: 500 }, // blue-500
                { value: '#171717', easing: 'easeInOutQuad', duration: 1200 } // neutral-900
            ],
            delay: anime.stagger(50, { grid: [columns, rows], from: index }),
        });
    };

    return (
        <div
            ref={gridRef}
            className="fixed inset-0 z-0 grid pointer-events-none"
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {Array.from({ length: columns * rows }).map((_, i) => (
                <div
                    key={i}
                    className="w-full h-full border-[0.5px] border-white/5 bg-neutral-900/50 pointer-events-auto transition-colors"
                    onClick={() => handleClick(i)}
                    onMouseEnter={() => handleMouseEnter(i)}
                />
            ))}
        </div>
    );
};
