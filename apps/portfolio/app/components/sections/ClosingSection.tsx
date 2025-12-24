"use client";

import {
    AnimatedButton,
    Meteors,
    SLABadge,
    useLanguage,
} from "@geekslab/ui";
import { copy } from "../../data/content";

export function ClosingSection() {
    const { language } = useLanguage();
    const locale = language as keyof typeof copy;
    const t = copy[locale];

    return (
        <section className="relative border-t border-white/10 bg-black py-24 md:py-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.08),transparent_40%)]" />
            <div className="max-w-6xl mx-auto px-8 relative z-10">
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-14 overflow-hidden">
                    <div className="absolute inset-0 opacity-35 pointer-events-none">
                        <Meteors number={14} />
                    </div>
                    <div className="relative z-10 grid md:grid-cols-[1.25fr_0.75fr] gap-12 items-start">
                        <div className="space-y-6">
                            <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">{t.closing.tag}</p>
                            <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                                {t.closing.title}
                            </h3>
                            <p className="text-neutral-300 text-lg leading-relaxed">
                                {t.closing.copy}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <AnimatedButton
                                    href="mailto:contact@geekslab.tech?subject=Hire%20developer"
                                    variant="primary"
                                    className="bg-white text-black hover:bg-neutral-200"
                                >
                                    {t.closing.ctaPrimary}
                                </AnimatedButton>
                                <AnimatedButton
                                    href="https://cv.geekslab.tech"
                                    variant="secondary"
                                    className="border-white/20 text-white"
                                >
                                    {t.closing.ctaSecondary}
                                </AnimatedButton>
                            </div>
                            <div className="flex flex-wrap gap-3 text-sm text-neutral-300">
                                {t.closing.bullets.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 rounded-full border border-white/10 bg-white/5"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl border border-white/10 bg-black/60 space-y-4 shadow-lg shadow-black/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">{t.closing.highlight}</p>
                                    <p className="text-xl font-semibold"> {t.closing.panelTitle}</p>
                                </div>
                                <SLABadge apiUrl="" />
                            </div>
                            <div className="space-y-4">
                                {t.closing.signal.map((item) => (
                                    <div key={item} className="flex items-start gap-3 text-sm text-neutral-200 leading-relaxed">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
