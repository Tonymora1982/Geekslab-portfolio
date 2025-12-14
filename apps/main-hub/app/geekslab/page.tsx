"use client";

import { AnimatedHeroText, NeofetchTerminal, useLanguage } from "@geekslab/ui";
import { MagneticCursor } from "@geekslab/ui";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Terminal, Zap, Clock, Code2 } from "lucide-react";
import Link from "next/link";

export default function GeekslabPage() {
    const { t } = useLanguage();

    const repoUrl = "https://github.com/Tonymora1982/Geekslab-portfolio";
    const fileUrl = (path: string) => `${repoUrl}/blob/main/${path}`;

    return (
        <main className="min-h-screen bg-black text-white selection:bg-green-400 selection:text-black relative overflow-hidden font-sans">
            <MagneticCursor />

            {/* Interactive Neofetch Demo Hero */}
            <section className="relative isolate overflow-hidden border-b border-green-500/20">
                <div className="absolute inset-0 bg-gradient-to-b from-green-950/30 via-black to-black" />
                <div
                    className="absolute inset-0 opacity-[0.14] pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(34,197,94,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.14) 1px, transparent 1px)",
                        backgroundSize: "52px 52px",
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Copy */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap items-center gap-3"
                        >
                            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-green-500/10 border border-green-500/30 text-sm font-mono text-green-300">
                                <Terminal className="w-4 h-4" />
                                {t('geekslabPage.demo.badge')}
                            </span>
                            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                                {t('geekslabPage.hero.badge')}
                            </span>
                        </motion.div>

                        <div className="space-y-5">
                            <AnimatedHeroText
                                text="GEEKSLAB"
                                className="text-6xl md:text-[9rem] font-bold tracking-tighter leading-[0.78] text-white"
                                delay={0}
                            />
                            <p className="text-xl md:text-2xl text-neutral-400 max-w-xl leading-relaxed">
                                {t('geekslabPage.hero.subtitle')}
                            </p>
                        </div>

                        <motion.ul
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-3 text-neutral-300"
                        >
                            {[0, 1, 2, 3].map((i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="mt-1 h-5 w-5 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-300 shrink-0">
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                    <span className="leading-relaxed">{t(`geekslabPage.hero.bullets.${i}`)}</span>
                                </li>
                            ))}
                        </motion.ul>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="flex flex-wrap gap-3"
                        >
                            <Link
                                href="/evidence-layer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-black font-semibold hover:bg-green-400 transition-colors"
                            >
                                {t('geekslabPage.hero.ctaEvidence')} <ExternalLink className="w-4 h-4" />
                            </Link>
                            <a
                                href={repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-green-500/40 bg-black/40 text-green-200 hover:bg-green-500/10 hover:border-green-500/60 transition-colors"
                            >
                                <Github className="w-4 h-4" /> {t('geekslabPage.hero.ctaRepo')}
                            </a>
                            <Link
                                href="/#projects"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10 transition-colors"
                            >
                                {t('geekslabPage.hero.ctaPortfolio')}
                            </Link>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-3 pt-6 border-t border-green-500/10">
                            {[
                                {
                                    icon: <Code2 className="w-4 h-4" />,
                                    label: t('geekslabPage.hero.stats.monorepo'),
                                    value: t('geekslabPage.hero.stats.monorepoValue'),
                                },
                                {
                                    icon: <Zap className="w-4 h-4" />,
                                    label: t('geekslabPage.hero.stats.quality'),
                                    value: t('geekslabPage.hero.stats.qualityValue'),
                                },
                                {
                                    icon: <Clock className="w-4 h-4" />,
                                    label: t('geekslabPage.hero.stats.e2e'),
                                    value: t('geekslabPage.hero.stats.e2eValue'),
                                },
                                {
                                    icon: <Terminal className="w-4 h-4" />,
                                    label: t('geekslabPage.hero.stats.ux'),
                                    value: t('geekslabPage.hero.stats.uxValue'),
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-green-500/15 bg-black/40 p-4"
                                >
                                    <div className="flex items-center gap-2 text-neutral-500">
                                        <span className="text-green-300">{item.icon}</span>
                                        <span className="text-[11px] uppercase tracking-wider">{item.label}</span>
                                    </div>
                                    <p className="mt-2 text-sm md:text-base font-mono text-green-200">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Terminal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-green-500/25 via-transparent to-emerald-400/15 blur-xl" />
                        <div className="relative rounded-3xl border border-green-500/20 bg-black/40 backdrop-blur p-4 md:p-5 shadow-2xl shadow-green-500/10">
                            <NeofetchTerminal
                                showMatrixBg={false}
                                autoStart={true}
                                className="shadow-none"
                            />
                        </div>
                    </motion.div>
                </div>

                <div className="relative pb-10 flex justify-center text-xs text-neutral-500 font-mono">
                    {t('geekslabPage.hero.scrollHint')}
                </div>
            </section>

            {/* Separator */}
            <div className="relative z-10 border-t border-green-500/20" />

            {/* Project Details Section */}
            <section className="relative z-10 bg-black py-16 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            {
                                label: t('geekslabPage.projectDetails.role'),
                                value: t('geekslabPage.projectDetails.roleValue'),
                            },
                            {
                                label: t('geekslabPage.projectDetails.timeline'),
                                value: t('geekslabPage.projectDetails.timelineValue'),
                            },
                            {
                                label: t('geekslabPage.projectDetails.coreTech'),
                                value: t('geekslabPage.projectDetails.coreTechValue'),
                            },
                        ].map((item) => (
                            <div key={item.label} className="rounded-2xl border border-green-500/15 bg-white/[0.03] p-6">
                                <h3 className="text-xs text-green-300 uppercase tracking-[0.3em] mb-2 font-mono">
                                    {item.label}
                                </h3>
                                <p className="text-lg font-medium text-white">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-2xl border border-green-500/15 bg-white/[0.03] p-6 md:p-8">
                        <h3 className="text-2xl font-bold tracking-tight mb-2">{t('geekslabPage.proof.title')}</h3>
                        <p className="text-sm text-neutral-400 mb-6">{t('geekslabPage.proof.description')}</p>
                        <ul className="space-y-3 text-sm text-neutral-300">
                            <li>
                                <a
                                    href={fileUrl(".github/workflows/lighthouse.yml")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" /> {t('geekslabPage.proof.links.lighthouse')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={fileUrl(".github/workflows/tests.yml")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" /> {t('geekslabPage.proof.links.tests')}
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/evidence-layer"
                                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" /> {t('geekslabPage.proof.links.evidenceLayer')}
                                </Link>
                            </li>
                            <li>
                                <a
                                    href={fileUrl("apps/main-hub/app/geekslab/page.tsx")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <Github className="w-4 h-4" /> {t('geekslabPage.proof.links.thisPage')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={fileUrl("packages/ui/src/components/project-showcase.tsx")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <Github className="w-4 h-4" /> {t('geekslabPage.proof.links.showcase')}
                                </a>
                            </li>
                        </ul>
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

                    <div className="space-y-6 md:sticky md:top-28 self-start">
                        {/* Repo Map */}
                        <div className="rounded-2xl overflow-hidden border border-green-500/15 bg-neutral-950">
                            <div className="flex items-center gap-2 px-4 py-3 bg-green-950/30 border-b border-green-500/15">
                                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                <span className="ml-2 text-xs text-green-300 font-mono">~/geekslab</span>
                            </div>
                            <div className="p-6 font-mono text-sm">
                                <p className="text-green-300 mb-3">{t('geekslabPage.sidebar.repoMapTitle')}</p>
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
                            </div>
                        </div>

                        {/* Quality Budgets */}
                        <div className="rounded-2xl border border-green-500/15 bg-white/[0.03] p-6">
                            <p className="text-green-300 font-mono text-sm mb-4">{t('geekslabPage.sidebar.qualityTitle')}</p>
                            <ul className="space-y-2 text-sm text-neutral-300">
                                <li className="flex items-start justify-between gap-4">
                                    <span className="text-neutral-400">{t('geekslabPage.sidebar.budgets.lcp')}</span>
                                    <span className="font-mono text-green-200">≤ 2.5s</span>
                                </li>
                                <li className="flex items-start justify-between gap-4">
                                    <span className="text-neutral-400">{t('geekslabPage.sidebar.budgets.cls')}</span>
                                    <span className="font-mono text-green-200">≤ 0.1</span>
                                </li>
                                <li className="flex items-start justify-between gap-4">
                                    <span className="text-neutral-400">{t('geekslabPage.sidebar.budgets.tbt')}</span>
                                    <span className="font-mono text-green-200">≤ 300ms</span>
                                </li>
                                <li className="flex items-start justify-between gap-4">
                                    <span className="text-neutral-400">{t('geekslabPage.sidebar.budgets.a11y')}</span>
                                    <span className="font-mono text-green-200">≥ 0.9</span>
                                </li>
                            </ul>
                            <a
                                href={fileUrl("lighthouserc.json")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 inline-flex items-center gap-2 text-sm text-green-200 hover:text-white transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" /> {t('geekslabPage.sidebar.viewBudget')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Project */}
            <section className="relative z-10 py-20 border-t border-green-500/20 bg-black">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="rounded-3xl border border-green-500/15 bg-gradient-to-br from-green-950/20 via-black to-black p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden">
                        <div>
                            <p className="text-green-300/70 mb-3 font-mono text-sm">cd ../next_project</p>
                            <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                                {t('geekslabPage.nextProject')}
                            </h3>
                            <p className="text-neutral-400 mt-3 max-w-xl">{t('geekslabPage.nextDescription')}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/nexastore"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-black font-semibold hover:bg-green-400 transition-colors"
                            >
                                {t('geekslabPage.nextCta')} <ExternalLink className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/#projects"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10 transition-colors"
                            >
                                {t('geekslabPage.backToProjects')}
                            </Link>
                        </div>
                    </div>
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
