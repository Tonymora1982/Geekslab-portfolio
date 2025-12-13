"use client";

import { motion } from "framer-motion";
import { AnimatedButton, AnimatedFooter, Navbar, useLanguage } from "@geekslab/ui";
import { ArrowRight, Calendar, MapPin, Briefcase, GraduationCap, Code, Target } from "lucide-react";

/**
 * About Page - Anthony Mora's Personal Journey
 * 
 * This page tells the story of transition from MedTech to Full Stack,
 * providing the narrative that connects the portfolio pieces together.
 */
export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-black text-white">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
                                {t('aboutPage.hero.badge')}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                                {t('aboutPage.hero.title1')}
                                <br />
                                <span className="text-neutral-500">{t('aboutPage.hero.title2')}</span>
                            </h1>
                            <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
                                {t('aboutPage.hero.description')}
                                <strong className="text-white">{t('aboutPage.hero.descriptionStrong')}</strong>
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* The Journey Timeline */}
                <section className="py-20 px-4 border-t border-white/10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-12 uppercase tracking-wider text-neutral-500">
                            {t('aboutPage.journey.title')}
                        </h2>

                        {/* Chapter 1: The Foundation */}
                        <JourneyChapter
                            icon={<Briefcase className="w-5 h-5" />}
                            period={t('aboutPage.journey.chapter1.period')}
                            title={t('aboutPage.journey.chapter1.title')}
                            company={t('aboutPage.journey.chapter1.company')}
                            delay={0}
                        >
                            <p className="text-neutral-400 mb-4">
                                {t('aboutPage.journey.chapter1.p1')}
                            </p>
                            <p className="text-neutral-400 mb-4">
                                {t('aboutPage.journey.chapter1.p2')} <strong className="text-white">{t('aboutPage.journey.chapter1.p2strong')}</strong>{t('aboutPage.journey.chapter1.p2end')}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <Tag>ISO 13485</Tag>
                                <Tag>FDA Compliance</Tag>
                                <Tag>Class III Medical Devices</Tag>
                                <Tag>Design Verification</Tag>
                            </div>
                        </JourneyChapter>

                        {/* Chapter 2: The Transition */}
                        <JourneyChapter
                            icon={<GraduationCap className="w-5 h-5" />}
                            period={t('aboutPage.journey.chapter2.period')}
                            title={t('aboutPage.journey.chapter2.title')}
                            company={t('aboutPage.journey.chapter2.company')}
                            delay={0.2}
                        >
                            <p className="text-neutral-400 mb-4">
                                {t('aboutPage.journey.chapter2.p1')}
                            </p>
                            <p className="text-neutral-400 mb-4">
                                {t('aboutPage.journey.chapter2.p2')}<strong className="text-white">{t('aboutPage.journey.chapter2.p2strong')}</strong>{t('aboutPage.journey.chapter2.p2end')}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <Tag>Computer Engineering (B.S.)</Tag>
                                <Tag>CEH (In Progress)</Tag>
                                <Tag>Linux LFC (In Progress)</Tag>
                            </div>
                        </JourneyChapter>

                        {/* Chapter 3: The Now */}
                        <JourneyChapter
                            icon={<Code className="w-5 h-5" />}
                            period={t('aboutPage.journey.chapter3.period')}
                            title={t('aboutPage.journey.chapter3.title')}
                            company={t('aboutPage.journey.chapter3.company')}
                            delay={0.4}
                            isCurrent
                        >
                            <p className="text-neutral-400 mb-4">
                                {t('aboutPage.journey.chapter3.p1')}<strong className="text-white">{t('aboutPage.journey.chapter3.p1strong')}</strong>{t('aboutPage.journey.chapter3.p1end')}
                            </p>
                            <p className="text-neutral-400 mb-4">
                                {t('aboutPage.journey.chapter3.p2')}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <Tag>Next.js 16</Tag>
                                <Tag>React 19</Tag>
                                <Tag>TypeScript</Tag>
                                <Tag>Turborepo</Tag>
                                <Tag>Vercel</Tag>
                            </div>
                        </JourneyChapter>
                    </div>
                </section>

                {/* What I Bring */}
                <section className="py-20 px-4 bg-neutral-950 border-t border-white/10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-12 uppercase tracking-wider text-neutral-500">
                            {t('aboutPage.whatIBring.title')}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <ValueCard
                                title={t('aboutPage.whatIBring.card1.title')}
                                description={t('aboutPage.whatIBring.card1.description')}
                            />
                            <ValueCard
                                title={t('aboutPage.whatIBring.card2.title')}
                                description={t('aboutPage.whatIBring.card2.description')}
                            />
                            <ValueCard
                                title={t('aboutPage.whatIBring.card3.title')}
                                description={t('aboutPage.whatIBring.card3.description')}
                            />
                        </div>
                    </div>
                </section>

                {/* Current Focus */}
                <section className="py-20 px-4 border-t border-white/10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8 uppercase tracking-wider text-neutral-500">
                            {t('aboutPage.currently.title')}
                        </h2>
                        <div className="space-y-4 text-neutral-400">
                            <p className="flex items-center gap-3">
                                <Target className="w-5 h-5 text-emerald-400" />
                                <span>{t('aboutPage.currently.item1')}</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <GraduationCap className="w-5 h-5 text-blue-400" />
                                <span>{t('aboutPage.currently.item2')}</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-yellow-400" />
                                <span>{t('aboutPage.currently.item3')}</span>
                            </p>
                        </div>

                        <div className="mt-12 flex gap-4">
                            <AnimatedButton href="/cv" variant="primary" className="bg-white text-black hover:bg-neutral-200">
                                {t('aboutPage.currently.viewCV')} <ArrowRight className="w-4 h-4 ml-2" />
                            </AnimatedButton>
                            <AnimatedButton href="/contact" variant="secondary" className="border-white/20">
                                {t('aboutPage.currently.getInTouch')}
                            </AnimatedButton>
                        </div>
                    </div>
                </section>

                <AnimatedFooter />
            </main>
        </>
    );
}

/**
 * Journey Chapter Component
 */
interface JourneyChapterProps {
    icon: React.ReactNode;
    period: string;
    title: string;
    company: string;
    children: React.ReactNode;
    delay?: number;
    isCurrent?: boolean;
}

function JourneyChapter({ icon, period, title, company, children, delay = 0, isCurrent }: JourneyChapterProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            className="relative pl-8 pb-12 border-l border-white/10 last:pb-0"
        >
            {/* Timeline dot */}
            <div className={`absolute left-0 top-0 w-8 h-8 -translate-x-1/2 rounded-full flex items-center justify-center
                ${isCurrent ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/50'}`}>
                {icon}
            </div>

            <div className="mb-4">
                <span className={`font-mono text-sm ${isCurrent ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    {period}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">{title}</h3>
                <p className="text-neutral-500">{company}</p>
            </div>

            {children}
        </motion.div>
    );
}

/**
 * Tag Component
 */
function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-neutral-400">
            {children}
        </span>
    );
}

/**
 * Value Card Component
 */
function ValueCard({ title, description }: { title: string; description: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 bg-black border border-white/10 rounded-lg"
        >
            <h3 className="text-white font-bold mb-3">{title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
        </motion.div>
    );
}
