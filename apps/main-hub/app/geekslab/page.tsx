"use client";

import { AnimatedHeroText, AnimatedButton, NeofetchTerminal, useLanguage } from "@geekslab/ui";
import { NoiseOverlay, MagneticCursor } from "@geekslab/ui";
import { Navbar } from "@geekslab/ui";
import { motion } from "framer-motion";
import { Github, ExternalLink, Terminal, Code2, Cpu, Zap } from "lucide-react";

export default function GeekslabPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-black text-white selection:bg-green-400 selection:text-black relative overflow-hidden font-sans">
            <NoiseOverlay />
            <MagneticCursor />
            <Navbar />

            {/* Interactive Neofetch Demo Hero */}
            <section className="min-h-screen w-full flex flex-col justify-center relative px-4 pt-20">
                <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 via-black/80 to-black z-[1]" />

                <div className="max-w-5xl mx-auto w-full z-10">
                    {/* Header Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-center gap-4 mb-8"
                    >
                        <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-green-500/10 border border-green-500/30 text-sm font-mono text-green-400">
                            <Terminal className="w-4 h-4" />
                            {t('geekslabPage.demo.badge')}
                        </span>
                    </motion.div>

                    {/* Neofetch Terminal - Main Attraction */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <NeofetchTerminal
                            showMatrixBg={false}
                            autoStart={true}
                            className="shadow-2xl shadow-green-500/20"
                        />
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
                    >
                        {[
                            { icon: Code2, label: "Stack", value: "Next.js 16" },
                            { icon: Cpu, label: "React", value: "v19" },
                            { icon: Zap, label: "Performance", value: "99/100" },
                            { icon: Terminal, label: "CLI", value: "Interactive" },
                        ].map((stat, i) => (
                            <div
                                key={stat.label}
                                className="bg-black/50 backdrop-blur border border-green-500/20 rounded p-4 text-center"
                            >
                                <stat.icon className="w-5 h-5 text-green-400 mx-auto mb-2" />
                                <p className="text-xs text-neutral-500 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-lg font-mono text-green-400">{stat.value}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex flex-wrap justify-center gap-4 mt-8"
                    >
                        <a
                            href="https://github.com/Tonymora1982/Geekslab-portfolio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-green-500/50 text-green-400 font-mono rounded hover:bg-green-500/10 transition-all hover:border-green-400"
                        >
                            <Github className="w-4 h-4" />
                            <span>{t('geekslabPage.demo.git')}</span>
                        </a>
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-mono font-bold rounded hover:bg-green-400 transition-colors"
                        >
                            <span>{t('geekslabPage.demo.explore')}</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Separator */}
            <div className="relative z-10 border-t border-green-500/20" />

            {/* Project Details Section */}
            <section className="relative z-10 bg-black/90 py-20 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Project Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                        <div className="border-l-2 border-green-500/50 pl-6">
                            <h3 className="text-sm text-green-400 uppercase tracking-widest mb-2 font-mono">{t('geekslabPage.projectDetails.role')}</h3>
                            <p className="text-xl font-light text-white">{t('geekslabPage.projectDetails.roleValue')}</p>
                        </div>
                        <div className="border-l-2 border-green-500/50 pl-6">
                            <h3 className="text-sm text-green-400 uppercase tracking-widest mb-2 font-mono">{t('geekslabPage.projectDetails.timeline')}</h3>
                            <p className="text-xl font-light text-white">{t('geekslabPage.projectDetails.timelineValue')}</p>
                        </div>
                        <div className="border-l-2 border-green-500/50 pl-6">
                            <h3 className="text-sm text-green-400 uppercase tracking-widest mb-2 font-mono">{t('geekslabPage.projectDetails.coreTech')}</h3>
                            <p className="text-xl font-light text-white">{t('geekslabPage.projectDetails.coreTechValue')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Engineering Narrative */}
            <section className="relative z-10 py-20 md:py-32 bg-black">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                                <span className="text-green-400">#</span> {t('geekslabPage.engineering.challengeTitle').replace('# ', '')}
                            </h2>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                {t('geekslabPage.engineering.challengeDesc')}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                                <span className="text-green-400">#</span> {t('geekslabPage.engineering.architectureTitle').replace('# ', '')}
                            </h2>
                            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                                {t('geekslabPage.engineering.architectureDesc')}
                            </p>
                            <ul className="space-y-4 border-l-2 border-green-500/30 pl-6">
                                <li className="text-neutral-300">
                                    <strong className="text-green-400 block mb-1 font-mono">{t('geekslabPage.engineering.zeroRuntime')}</strong>
                                    {t('geekslabPage.engineering.zeroRuntimeDesc')}
                                </li>
                                <li className="text-neutral-300">
                                    <strong className="text-green-400 block mb-1 font-mono">{t('geekslabPage.engineering.rsc')}</strong>
                                    {t('geekslabPage.engineering.rscDesc')}
                                </li>
                                <li className="text-neutral-300">
                                    <strong className="text-green-400 block mb-1 font-mono">{t('geekslabPage.engineering.edge')}</strong>
                                    {t('geekslabPage.engineering.edgeDesc')}
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    <div className="space-y-8">
                        {/* Terminal Preview Box */}
                        <div className="bg-neutral-950 border border-green-500/20 rounded-lg overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-950/30 border-b border-green-500/20">
                                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                <span className="ml-2 text-xs text-green-400 font-mono">~/geekslab</span>
                            </div>
                            <div className="p-6 font-mono text-sm">
                                <p className="text-green-400 mb-2">$ tree -L 2</p>
                                <pre className="text-neutral-400 text-xs leading-relaxed">{`
├── apps/
│   ├── main-hub/     # Main portfolio
│   ├── lab/          # R&D experiments
│   └── nexastore/    # E-commerce demo
├── packages/
│   ├── ui/           # Shared components
│   ├── config/       # ESLint, TS configs
│   └── types/        # Shared types
└── turbo.json        # Pipeline config
                                `.trim()}</pre>
                                <p className="text-green-400 mt-4">$ npm run build</p>
                                <p className="text-neutral-500">✓ Compiled in 2.3s</p>
                                <p className="text-green-500">✓ 5 packages built successfully</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-neutral-950 border border-green-500/20 p-4 rounded">
                                <p className="text-3xl font-bold text-green-400 font-mono">99</p>
                                <p className="text-xs text-neutral-500 uppercase tracking-wider">Lighthouse Score</p>
                            </div>
                            <div className="bg-neutral-950 border border-green-500/20 p-4 rounded">
                                <p className="text-3xl font-bold text-green-400 font-mono">&lt;50ms</p>
                                <p className="text-xs text-neutral-500 uppercase tracking-wider">TTI</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Project */}
            <section className="relative z-10 py-20 border-t border-green-500/20 bg-black">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-green-400/60 mb-4 font-mono text-sm">cd ../next_project</p>
                    <AnimatedButton href="/nexastore" variant="primary" className="text-4xl md:text-6xl font-bold text-white hover:text-green-400 transition-colors bg-transparent">
                        {t('geekslabPage.nextProject')}
                    </AnimatedButton>
                </div>
            </section>

            {/* Console Easter Egg */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        console.log('%c🚀 GeeksLab.tech', 'font-size: 24px; font-weight: bold; color: #22c55e;');
                        console.log('%c═══════════════════════════════════════════', 'color: #22c55e;');
                        console.log('%c👋 Hey there, fellow developer!', 'font-size: 14px; color: #a3e635;');
                        console.log('%c   You found the easter egg. Nice work!', 'color: #86efac;');
                        console.log('%c', 'padding: 4px;');
                        console.log('%c📧 Contact: tonymora1982@gmail.com', 'color: #4ade80;');
                        console.log('%c💼 Open for freelance opportunities', 'color: #4ade80;');
                        console.log('%c', 'padding: 4px;');
                        console.log('%c═══════════════════════════════════════════', 'color: #22c55e;');
                    `,
                }}
            />
        </main>
    );
}
