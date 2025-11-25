"use client";

import { motion } from "framer-motion";
import { AnimatedButton } from "./animated-button";
import { AnimatedHeroText } from "./animated-hero-text";
import { useLanguage } from "../context/language-context";

export const AnimatedFooter = () => {
    const { t } = useLanguage();

    return (
        <footer className="relative bg-neutral-950 text-white pt-32 pb-12 px-4 border-t border-white/10 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
                    <div>
                        <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-8">{t('footer.getInTouch')}</h3>
                        <div className="space-y-2">
                            <a href="mailto:hello@anthony.dev" className="block text-4xl md:text-6xl font-bold hover:text-neutral-400 transition-colors tracking-tighter">
                                hello@anthony.dev
                            </a>
                            <a href="tel:+1234567890" className="block text-4xl md:text-6xl font-bold hover:text-neutral-400 transition-colors tracking-tighter">
                                +1 (555) 000-0000
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div className="flex gap-4 justify-end">
                            <AnimatedButton href="https://github.com" variant="secondary" className="border-white/20">GitHub</AnimatedButton>
                            <AnimatedButton href="https://linkedin.com" variant="secondary" className="border-white/20">LinkedIn</AnimatedButton>
                            <AnimatedButton href="https://twitter.com" variant="secondary" className="border-white/20">Twitter</AnimatedButton>
                        </div>
                        <div className="text-right mt-12 md:mt-0">
                            <p className="text-xl text-neutral-400 max-w-md ml-auto leading-relaxed">
                                {t('footer.available')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <AnimatedHeroText
                        text="ANTHONY MORA"
                        className="text-[12vw] leading-[0.8] font-bold tracking-tighter text-white/10 select-none pointer-events-none whitespace-nowrap"
                    />
                </div>

                <div className="flex justify-between items-end mt-12 border-t border-white/10 pt-8 text-neutral-500 text-sm font-mono uppercase tracking-widest">
                    <div className="flex items-center gap-4">
                        <div>© {new Date().getFullYear()} Portfolio. {t('footer.rights')}</div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs normal-case">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {t('hero.badge')}
                        </div>
                    </div>
                    <div className="text-right">
                        {t('footer.location')}<br />
                        {t('footer.localTime')}: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Costa_Rica' })}
                    </div>
                </div>
            </div>
        </footer>
    );
};
