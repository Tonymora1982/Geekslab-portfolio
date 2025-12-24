"use client";

import {
    AnimatedSkillBadge,
    BentoGrid,
    BentoGridItem,
    useLanguage,
} from "@geekslab/ui";
import { copy } from "../../data/content";

export function FocusSection() {
    const { language } = useLanguage();
    const locale = language as keyof typeof copy;
    const t = copy[locale];

    return (
        <section className="relative border-t border-white/10 bg-neutral-950/60 py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="max-w-7xl mx-auto px-8 space-y-12">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">{t.focus.kicker}</p>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                            {t.focus.title}
                        </h2>
                    </div>
                    <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">{t.focus.lead}</p>
                </div>

                <BentoGrid className="mt-6">
                    {t.focus.cards.map((card) => (
                        <BentoGridItem
                            key={card.id}
                            className={`${card.className ?? ""} bg-neutral-900/80`}
                            title={<span className="text-white text-lg font-semibold">{card.title}</span>}
                            description={<span className="text-neutral-400 text-sm">{card.description}</span>}
                            header={
                                <div className="h-full w-full border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/5 p-6 flex flex-col gap-4">
                                    <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">{card.label}</p>
                                    {"lines" in card && card.lines && (
                                        <ul className="space-y-3">
                                            {card.lines.map((line: string) => (
                                                <li key={line} className="flex items-start gap-3 text-sm text-neutral-200 leading-relaxed">
                                                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                                                    <span>{line}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {"stack" in card && card.stack && (
                                        <ul className="grid grid-cols-2 gap-3">
                                            {card.stack.map((skill: string, index: number) => (
                                                <AnimatedSkillBadge key={skill} skill={skill} index={index} />
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            }
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
