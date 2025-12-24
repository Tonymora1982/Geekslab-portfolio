"use client";

import { Meteors, useLanguage } from "@geekslab/ui";
import { HeroSection } from "./components/sections/HeroSection";
import { FocusSection } from "./components/sections/FocusSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { ClosingSection } from "./components/sections/ClosingSection";
import { copy } from "./data/content";

export default function PortfolioHome() {
    // We only use the hook to ensure this page re-renders on language change,
    // even though the child components also subscribe to it.
    // This top-level subscription ensures the whole structure is responsive.
    useLanguage();

    return (
        <main className="relative min-h-screen bg-black text-white overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.08),transparent_35%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.06),transparent_30%)]" />
            <Meteors number={22} className="opacity-40" />

            <HeroSection />
            <FocusSection />
            <ProjectsSection />
            <ClosingSection />
        </main>
    );
}
