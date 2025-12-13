"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";

type PreloaderMode = "always" | "session" | "never";

export const Preloader = ({
    mode = "session",
    storageKey = "geekslab_preloader_seen_v1",
    durationMs = 900,
}: {
    mode?: PreloaderMode;
    storageKey?: string;
    durationMs?: number;
}) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(mode !== "never");
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mode === "never") {
            setIsVisible(false);
            return;
        }

        const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
        if (reduceMotion) {
            setIsVisible(false);
            return;
        }

        if (mode === "session") {
            try {
                if (sessionStorage.getItem(storageKey) === "1") {
                    setIsVisible(false);
                    return;
                }
                sessionStorage.setItem(storageKey, "1");
            } catch {
                // If storage is blocked, fall back to showing once.
            }
        }

        setIsVisible(true);

        const counter = { value: 0 };
        let finished = false;

        const triggerExit = () => {
            if (finished) return;
            finished = true;

            setProgress(100);

            if (!rootRef.current) {
                setIsVisible(false);
                return;
            }

            anime({
                targets: rootRef.current,
                opacity: [1, 0],
                translateY: [0, -12],
                duration: 450,
                easing: "easeOutQuad",
                complete: () => setIsVisible(false),
            });
        };

        const progressAnimation = anime({
            targets: counter,
            value: 100,
            duration: durationMs,
            easing: "easeOutCubic",
            round: 1,
            update: () => setProgress(counter.value),
            complete: triggerExit,
        });

        const safetyTimeout = setTimeout(triggerExit, durationMs + 1000);

        return () => {
            clearTimeout(safetyTimeout);
            progressAnimation.pause();
        };
    }, [durationMs, mode, storageKey]);

    if (!isVisible) return null;

    return (
        <div
            ref={rootRef}
            className="fixed inset-0 z-[10000] flex items-end justify-start bg-black px-6 py-8 md:px-12 md:py-12"
            aria-hidden="true"
        >
            <div className="w-full max-w-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.35em] text-neutral-500">
                    <span className="text-neutral-300">GeeksLab</span>
                    <span>Loading</span>
                </div>

                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white/70"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm font-mono text-neutral-300">{progress}%</div>
                    <div className="text-xs text-neutral-500">Initializing UI…</div>
                </div>
            </div>
        </div>
    );
};
