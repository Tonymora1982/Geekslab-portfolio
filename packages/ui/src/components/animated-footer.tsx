"use client";

import { motion } from "framer-motion";
import { AnimatedButton } from "./animated-button";
import { AnimatedHeroText } from "./animated-hero-text";
import { useLanguage } from "../context/language-context";

export const AnimatedFooter = () => {
    const { t } = useLanguage();

    return (
        <footer className="relative bg-neutral-950 text-white pt-16 md:pt-32 pb-8 md:pb-12 px-4 border-t border-white/10 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-32">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-6 md:mb-8">{t('footer.getInTouch')}</h3>
                        <div className="space-y-3 md:space-y-2">
                            <a href="mailto:tonymora1982@gmail.com" className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold hover:text-neutral-400 transition-colors tracking-tighter break-all md:break-normal">
                                tonymora1982@gmail.com
                            </a>
                            <a
                                href="https://wa.me/50670179787"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold hover:text-emerald-400 transition-colors tracking-tighter"
                            >
                                +506 7017-9787
                            </a>
                        </div>
                    </div>

                    {/* Social Links & Availability */}
                    <div className="flex flex-col gap-8 lg:justify-between">
                        {/* Social Buttons - Mobile: Stack, Desktop: Row */}
                        <div className="flex flex-wrap gap-3 md:gap-4 lg:justify-end">
                            <AnimatedButton
                                href="https://github.com/Sobgo"
                                variant="secondary"
                                className="border-white/20 flex-1 sm:flex-none min-w-[100px] justify-center"
                            >
                                GitHub
                            </AnimatedButton>
                            <AnimatedButton
                                href="https://www.linkedin.com/in/anthony-mora-parra-94941282/"
                                variant="secondary"
                                className="border-white/20 flex-1 sm:flex-none min-w-[100px] justify-center"
                            >
                                LinkedIn
                            </AnimatedButton>
                            <AnimatedButton
                                href="https://wa.me/50670179787"
                                variant="secondary"
                                className="border-white/20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 flex-1 sm:flex-none min-w-[100px] justify-center"
                            >
                                WhatsApp
                            </AnimatedButton>
                        </div>

                        {/* Availability Text */}
                        <div className="text-left lg:text-right">
                            <p className="text-lg md:text-xl text-neutral-400 max-w-md lg:ml-auto leading-relaxed">
                                {t('footer.available')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Large Name */}
                <div className="relative overflow-hidden">
                    <AnimatedHeroText
                        text="ANTHONY MORA"
                        className="text-[15vw] md:text-[12vw] leading-[0.8] font-bold tracking-tighter text-white/10 select-none pointer-events-none whitespace-nowrap"
                    />
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-4 mt-8 md:mt-12 border-t border-white/10 pt-6 md:pt-8 text-neutral-500 text-xs md:text-sm font-mono uppercase tracking-widest">
                    {/* Left: Copyright & Badge */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <div>© {new Date().getFullYear()} GeeksLab. {t('footer.rights')}</div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs normal-case">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {t('hero.badge')}
                        </div>
                    </div>

                    {/* Right: Location & Time */}
                    <div className="text-left md:text-right">
                        <span className="text-neutral-400">{t('footer.location')}</span>
                        <br className="hidden md:block" />
                        <span className="md:hidden"> · </span>
                        <span>{t('footer.localTime')}: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Costa_Rica' })}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
