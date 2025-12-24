"use client";

import {
    AnimatedBadge,
    AnimatedButton,
    AnimatedHeroText,
    DecoderText,
    Meteors,
    SLABadge,
    SLAPanel,
    useLanguage,
} from "@geekslab/ui";
import { copy } from "../../data/content";

export function HeroSection() {
    const { language } = useLanguage();
    const locale = language as keyof typeof copy;
    const t = copy[locale];

    return (
        <section className="relative max-w-7xl mx-auto px-8 pt-28 pb-24">
            <div className="absolute inset-0 -z-10 blur-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_30%)]" />
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
                <div className="space-y-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <AnimatedBadge text={t.hero.badge} />
                        <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                            {t.hero.availability}
                        </span>
                    </div>

                    <div className="space-y-3">
                        <AnimatedHeroText
                            text={t.hero.title}
                            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
                        />
                        <div className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-neutral-300 to-neutral-500">
                            <DecoderText text={t.hero.highlight} />
                        </div>
                    </div>

                    <p className="text-neutral-300 text-lg md:text-xl leading-relaxed max-w-3xl">
                        {t.hero.copy}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <AnimatedButton href="#projects" variant="primary" className="bg-white text-black hover:bg-neutral-200">
                            {t.hero.ctaPrimary}
                        </AnimatedButton>
                        <AnimatedButton
                            href="mailto:contact@geekslab.tech?subject=Portfolio%20intro"
                            variant="secondary"
                            className="border-white/20 text-white"
                        >
                            {t.hero.ctaSecondary}
                        </AnimatedButton>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {t.metrics.map((metric) => (
                            <div
                                key={metric.label}
                                className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-4 space-y-2 hover:border-white/30 transition"
                            >
                                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">{metric.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-semibold">{metric.value}</span>
                                </div>
                                <p className="text-sm text-neutral-400 leading-relaxed">{metric.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-8 bg-gradient-to-br from-white/10 via-white/5 to-transparent blur-3xl" />
                    <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 overflow-hidden">
                        <div className="absolute inset-0 opacity-50">
                            <Meteors number={12} />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                                        {t.hero.signalTag}
                                    </p>
                                    <h3 className="text-2xl font-semibold">{t.hero.signalTitle}</h3>
                                </div>
                                <SLABadge apiUrl="" />
                            </div>
                            <p className="text-neutral-300 text-sm leading-relaxed">{t.hero.signalCopy}</p>
                            <SLAPanel />
                            <div className="grid gap-3">
                                {t.hero.signalBullets.map((item) => (
                                    <div key={item} className="flex items-start gap-3 text-sm text-neutral-200">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                                        <span className="leading-relaxed">{item}</span>
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
