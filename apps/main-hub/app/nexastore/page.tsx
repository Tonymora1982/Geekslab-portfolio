"use client";

import { AnimatedHeroText, AnimatedButton, useLanguage } from "@geekslab/ui";
import { MagneticCursor } from "@geekslab/ui";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export default function NexaStorePage() {
    const { t } = useLanguage();

    const repoUrl = "https://github.com/Tonymora1982/Geekslab-portfolio";
    const fileUrl = (path: string) => `${repoUrl}/blob/main/${path}`;

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
                            nexastore.geekslab.tech
                        </span>
                    </motion.div>

                    <AnimatedHeroText
                        text="NEXASTORE"
                        className="text-6xl md:text-[11rem] font-bold tracking-tighter leading-[0.8] text-white mb-8"
                        delay={0}
                    />

                    <div className="flex justify-center gap-6 mt-8">
                        <AnimatedButton href="https://github.com/Tonymora1982/Geekslab-portfolio/tree/main/apps/nexastore" variant="secondary" className="text-sm border-white/20 text-white hover:bg-white/10">
                            {t('nexastorePage.hero.viewCode')}
                        </AnimatedButton>
                        <AnimatedButton href="https://nexastore.geekslab.tech" variant="primary" className="text-sm bg-white text-black hover:bg-neutral-200">
                            {t('nexastorePage.hero.liveDemo')}
                        </AnimatedButton>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 border-t border-white/10 pt-12">
                        <div>
                            <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-2">{t('nexastorePage.hero.role')}</h3>
                            <p className="text-xl font-light">{t('nexastorePage.hero.roleValue')}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-2">{t('nexastorePage.hero.timeline')}</h3>
                            <p className="text-xl font-light">2024</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-2">{t('nexastorePage.hero.coreTech')}</h3>
                            <p className="text-xl font-light">{t('nexastorePage.hero.coreTechValue')}</p>
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
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t('nexastorePage.problem.title')}</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                {t('nexastorePage.problem.description')}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t('nexastorePage.solution.title')}</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                                {t('nexastorePage.solution.description')}
                            </p>
                            <ul className="space-y-4 border-l border-white/20 pl-6">
                                <li className="text-neutral-300">
                                    <strong className="text-white block mb-1">{t('nexastorePage.solution.globalState')}</strong>
                                    {t('nexastorePage.solution.globalStateDesc')}
                                </li>
                                <li className="text-neutral-300">
                                    <strong className="text-white block mb-1">{t('nexastorePage.solution.realtime')}</strong>
                                    {t('nexastorePage.solution.realtimeDesc')}
                                </li>
                                <li className="text-neutral-300">
                                    <strong className="text-white block mb-1">{t('nexastorePage.solution.conversion')}</strong>
                                    {t('nexastorePage.solution.conversionDesc')}
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-neutral-900 aspect-[4/5] border border-white/10 p-8 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('/images/projects/nexastore.png')] bg-cover bg-center opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-white/10 text-xs border border-white/20">Zustand</span>
                                    <span className="px-2 py-1 bg-white/10 text-xs border border-white/20">App Router</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Evidence */}
            <section className="py-20 border-t border-white/10 bg-neutral-950">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="p-8 border border-white/10 bg-white/[0.03] rounded-2xl">
                        <h3 className="text-2xl font-bold tracking-tight mb-4">Evidence</h3>
                        <ul className="space-y-3 text-sm text-neutral-300">
                            <li>
                                <a
                                    href={`${repoUrl}/blob/main/.github/workflows/lighthouse.yml`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" /> Lighthouse CI budget (GitHub Actions)
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`${repoUrl}/blob/main/.github/workflows/tests.yml`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" /> Playwright E2E workflow
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/evidence-layer"
                                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" /> Evidence Layer (live)
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="p-8 border border-white/10 bg-white/[0.03] rounded-2xl">
                        <h3 className="text-2xl font-bold tracking-tight mb-4">Key Code Links</h3>
                        <ul className="space-y-3 text-sm text-neutral-300">
                            <li>
                                <a
                                    href={fileUrl("apps/nexastore/store/cart.ts")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <Github className="w-4 h-4" /> Zustand cart store (persisted)
                                </a>
                            </li>
                            <li>
                                <a
                                    href={fileUrl("apps/nexastore/components/cart-drawer.tsx")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <Github className="w-4 h-4" /> Cart drawer UI
                                </a>
                            </li>
                            <li>
                                <a
                                    href={fileUrl("apps/nexastore/app/products/page.tsx")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <Github className="w-4 h-4" /> Server-rendered filtering (products page)
                                </a>
                            </li>
                            <li>
                                <a
                                    href={fileUrl("apps/nexastore/app/checkout/page.tsx")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <Github className="w-4 h-4" /> Checkout confirmation flow
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Next Project */}
            <section className="py-20 border-t border-white/10 bg-neutral-950">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-neutral-500 mb-4">{t('nexastorePage.nextCaseStudy')}</p>
                    <AnimatedButton href="/qms" variant="primary" className="text-4xl md:text-6xl font-bold hover:text-neutral-400 transition-colors">
                        {t('nexastorePage.nextProject')}
                    </AnimatedButton>
                </div>
            </section>
        </main>
    );
}
