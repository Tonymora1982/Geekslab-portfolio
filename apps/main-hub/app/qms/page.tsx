"use client";

import { AnimatedHeroText, AnimatedButton, useLanguage } from "@geekslab/ui";
import { MagneticCursor } from "@geekslab/ui";
import { motion } from "framer-motion";

export default function QMSPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative overflow-hidden font-sans">
            <MagneticCursor />

            {/* Project Hero */}
            <section className="min-h-[80vh] w-full flex flex-col justify-center relative px-4 pt-20 border-b border-white/10">
                <div className="max-w-7xl mx-auto w-full z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-sm font-mono mb-6 text-neutral-300">
                            {t('qmsPage.hero.badge')}
                        </span>
                    </motion.div>

                    <AnimatedHeroText
                        text="ISO 13485"
                        className="text-6xl md:text-[12rem] font-bold tracking-tighter leading-[0.8] text-white mb-8"
                        delay={0}
                    />

                    <div className="flex justify-center gap-6 mt-8">
                        <AnimatedButton href="https://github.com/Tonymora1982/Geekslab-portfolio" variant="secondary" className="text-sm border-white/20 text-white hover:bg-white/10">
                            {t('qmsPage.hero.viewDocs')}
                        </AnimatedButton>
                        <AnimatedButton href="#" variant="primary" className="text-sm bg-white text-black hover:bg-neutral-200 cursor-not-allowed opacity-80">
                            Private Repo (Demo Only)
                        </AnimatedButton>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 border-t border-white/10 pt-12">
                        <div>
                            <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-2">{t('qmsPage.hero.role')}</h3>
                            <p className="text-xl font-light">{t('qmsPage.hero.roleValue')}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-2">{t('qmsPage.hero.timeline')}</h3>
                            <p className="text-xl font-light">{t('qmsPage.hero.timelineValue')}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-2">{t('qmsPage.hero.coreTech')}</h3>
                            <p className="text-xl font-light">{t('qmsPage.hero.coreTechValue')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Engineering Narrative */}
            <section className="py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t('qmsPage.problem.title')}</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                {t('qmsPage.problem.description')}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t('qmsPage.solution.title')}</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                                {t('qmsPage.solution.description')}
                            </p>
                            <ul className="space-y-4 border-l border-white/20 pl-6">
                                <li className="text-neutral-300">
                                    <strong className="text-white block mb-1">{t('qmsPage.solution.autoLink')}</strong>
                                    {t('qmsPage.solution.autoLinkDesc')}
                                </li>
                                <li className="text-neutral-300">
                                    <strong className="text-white block mb-1">{t('qmsPage.solution.auditTrail')}</strong>
                                    {t('qmsPage.solution.auditTrailDesc')}
                                </li>
                                <li className="text-neutral-300">
                                    <strong className="text-white block mb-1">{t('qmsPage.solution.realtime')}</strong>
                                    {t('qmsPage.solution.realtimeDesc')}
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-neutral-900 aspect-video border border-white/10 p-8 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('/images/projects/qms.png')] bg-cover bg-center opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-green-500/20 border border-green-500/50 px-4 py-2 backdrop-blur-sm">
                                    <span className="text-green-400 font-mono">✓ COMPLIANCE VERIFIED</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-neutral-900 h-24 border border-white/10 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-white">100%</span>
                                <span className="text-xs text-neutral-500">Traceability</span>
                            </div>
                            <div className="bg-neutral-900 h-24 border border-white/10 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-white">-40%</span>
                                <span className="text-xs text-neutral-500">{t('qmsPage.impact.stat1')}</span>
                            </div>
                            <div className="bg-neutral-900 h-24 border border-white/10 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-white">0</span>
                                <span className="text-xs text-neutral-500">Non-Conformities</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Project */}
            <section className="py-20 border-t border-white/10 bg-neutral-950">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-neutral-500 mb-4">{t('qmsPage.nextCaseStudy')}</p>
                    <AnimatedButton href="/" variant="primary" className="text-4xl md:text-6xl font-bold hover:text-neutral-400 transition-colors">
                        Portfolio Main →
                    </AnimatedButton>
                </div>
            </section>
        </main>
    );
}
