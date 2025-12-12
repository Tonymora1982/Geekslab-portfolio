"use client";

import { motion } from "framer-motion";
import { AnimatedButton, AnimatedFooter, Navbar } from "@geekslab/ui";
import { ArrowRight, Calendar, MapPin, Briefcase, GraduationCap, Code, Target } from "lucide-react";

/**
 * About Page - Anthony Mora's Personal Journey
 * 
 * This page tells the story of transition from MedTech to Full Stack,
 * providing the narrative that connects the portfolio pieces together.
 */
export default function AboutPage() {
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
                                The Story
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                                From Medical Devices
                                <br />
                                <span className="text-neutral-500">to Digital Products</span>
                            </h1>
                            <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
                                13 years building systems where failure isn't an option taught me one thing:
                                <strong className="text-white"> the discipline of the operating room applies perfectly to shipping software.</strong>
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* The Journey Timeline */}
                <section className="py-20 px-4 border-t border-white/10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-12 uppercase tracking-wider text-neutral-500">
                            The Journey
                        </h2>

                        {/* Chapter 1: The Foundation */}
                        <JourneyChapter
                            icon={<Briefcase className="w-5 h-5" />}
                            period="2017 — 2023"
                            title="The MedTech Years"
                            company="Establishment Labs & Align Technology"
                            delay={0}
                        >
                            <p className="text-neutral-400 mb-4">
                                Started as a CAD Designer at Align Technology, designing orthodontic solutions
                                patient by patient. Moved to Establishment Labs where I grew from R&D Technician
                                to Jr. Engineer to Production Supervisor.
                            </p>
                            <p className="text-neutral-400 mb-4">
                                In those years I learned what <strong className="text-white">regulated environments</strong> demand:
                                documentation that can withstand FDA audits, traceability from concept to
                                production, and processes where "good enough" doesn't exist.
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
                            period="2022 — 2024"
                            title="The Pivot"
                            company="UNED + Self-Study"
                            delay={0.2}
                        >
                            <p className="text-neutral-400 mb-4">
                                While working full-time, I earned a Diploma in Computer Science from UNED
                                and started a Bachelor's in Computer Engineering. But the real learning
                                happened building projects.
                            </p>
                            <p className="text-neutral-400 mb-4">
                                I discovered that my R&D mindset—<strong className="text-white">hypothesis, test, iterate, document</strong>—translated
                                directly to software development. The same discipline that helped me
                                pass ISO audits now helps me write maintainable code.
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
                            period="2024 — Present"
                            title="Building Digital Products"
                            company="GeeksLab (Freelance)"
                            delay={0.4}
                            isCurrent
                        >
                            <p className="text-neutral-400 mb-4">
                                Now I build production-grade web applications with Next.js, React, and TypeScript.
                                I bring the <strong className="text-white">rigor of medical device development</strong> to
                                every project: clear documentation, systematic testing, and code reviews
                                that would make an auditor proud.
                            </p>
                            <p className="text-neutral-400 mb-4">
                                This portfolio itself is a monorepo with 5 apps, shared component libraries,
                                and CI/CD pipelines—because I believe in building things right from the start.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <Tag>Next.js 15</Tag>
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
                            What I Bring
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <ValueCard
                                title="R&D Discipline"
                                description="Years of documenting every decision for FDA auditors translated into clean, self-documenting code and thorough PRs."
                            />
                            <ValueCard
                                title="Systems Thinking"
                                description="Medical devices taught me to see the full picture—from user needs to manufacturing constraints. I apply that to software architecture."
                            />
                            <ValueCard
                                title="Quality Obsession"
                                description="In MedTech, 'it works' isn't enough. I bring that same standard to every feature: it has to be tested, documented, and maintainable."
                            />
                        </div>
                    </div>
                </section>

                {/* Current Focus */}
                <section className="py-20 px-4 border-t border-white/10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8 uppercase tracking-wider text-neutral-500">
                            Currently
                        </h2>
                        <div className="space-y-4 text-neutral-400">
                            <p className="flex items-center gap-3">
                                <Target className="w-5 h-5 text-emerald-400" />
                                <span>Building freelance projects with Next.js and React</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <GraduationCap className="w-5 h-5 text-blue-400" />
                                <span>Finishing B.S. in Computer Engineering (TFG pending)</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-yellow-400" />
                                <span>Based in Costa Rica, available for remote work (EU/LATAM timezone overlap)</span>
                            </p>
                        </div>

                        <div className="mt-12 flex gap-4">
                            <AnimatedButton href="/cv" variant="primary" className="bg-white text-black hover:bg-neutral-200">
                                View Full CV <ArrowRight className="w-4 h-4 ml-2" />
                            </AnimatedButton>
                            <AnimatedButton href="/contact" variant="secondary" className="border-white/20">
                                Get in Touch
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
