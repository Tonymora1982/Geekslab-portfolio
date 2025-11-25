"use client";

import { DraggableShapes } from "./draggable-shapes"; // Updated import path
import { useLanguage } from "../context/language-context"; // Updated import path

export const ExperimentsSection = () => {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-neutral-950 border-t border-white/10 py-24 md:py-32">
            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    maskImage: "radial-gradient(circle at center, rgba(0,0,0,0.85), transparent 65%)",
                    WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,0.85), transparent 65%)",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black pointer-events-none" />

            {/* Draggable Elements Layer */}
            <DraggableShapes />

            {/* Content Layer */}
            <div className="container px-4 mx-auto relative z-10 pointer-events-none">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">{t('lab.badge')}</p>
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white">
                        {t('lab.title')}
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl">
                        {t('lab.description')}
                    </p>
                </div>
            </div>
        </section>
    );
};
