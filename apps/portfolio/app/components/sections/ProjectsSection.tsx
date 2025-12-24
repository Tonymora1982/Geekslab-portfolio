"use client";

import {
    ProjectShowcase,
    useLanguage,
} from "@geekslab/ui";
import { copy } from "../../data/content";

export function ProjectsSection() {
    const { language } = useLanguage();
    const locale = language as keyof typeof copy;
    const t = copy[locale];

    return (
        <section id="projects" className="relative border-t border-white/10 bg-neutral-950 py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">{t.projects.tagline}</p>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{t.projects.title}</h2>
                    </div>
                    <p className="text-neutral-400 max-w-xl leading-relaxed">{t.projects.copy}</p>
                </div>
                <ProjectShowcase />
            </div>
        </section>
    );
}
