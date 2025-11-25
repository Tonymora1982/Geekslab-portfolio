"use client";

import { motion } from "framer-motion";
import { ExperienceTimeline, AnimatedSkillBadge, SLABadge, AnimatedButton } from "@geekslab/ui";
import { Download, Mail, Linkedin, Github } from "lucide-react";

export default function CVPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <header className="mb-16 border-b border-white/10 pb-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                                Tony <span className="text-neutral-500">Stark</span>
                            </h1>
                            <p className="text-xl text-neutral-400 font-light">
                                Full Stack Engineer & R&D Specialist
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-4">
                            <SLABadge apiUrl="" />
                            <div className="flex gap-3">
                                <AnimatedButton href="https://github.com" variant="secondary" className="p-2 border-white/20">
                                    <Github className="w-5 h-5" />
                                </AnimatedButton>
                                <AnimatedButton href="https://linkedin.com" variant="secondary" className="p-2 border-white/20">
                                    <Linkedin className="w-5 h-5" />
                                </AnimatedButton>
                                <AnimatedButton href="mailto:tony@geekslab.tech" variant="secondary" className="p-2 border-white/20">
                                    <Mail className="w-5 h-5" />
                                </AnimatedButton>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <AnimatedButton href="/pdf" variant="primary" className="bg-white text-black hover:bg-neutral-200">
                            <Download className="w-4 h-4 mr-2" /> Download PDF
                        </AnimatedButton>
                    </div>
                </header>

                {/* Summary */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider text-neutral-500">Summary</h2>
                    <p className="text-lg text-neutral-300 leading-relaxed">
                        Passionate Full Stack Developer with a background in R&D management.
                        Specialized in building high-performance web applications using modern technologies like Next.js, React, and TypeScript.
                        Proven track record of delivering complex projects on time and within budget.
                        Adept at bridging the gap between technical engineering and strategic product development.
                    </p>
                </section>

                {/* Experience */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 uppercase tracking-wider text-neutral-500">Experience</h2>
                    <ExperienceTimeline />
                </section>

                {/* Skills */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 uppercase tracking-wider text-neutral-500">Technical Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-white font-medium mb-4 border-b border-white/10 pb-2">Languages & Frameworks</h3>
                            <div className="flex flex-wrap gap-2">
                                {["TypeScript", "JavaScript", "Python", "C#", "React", "Next.js", "Node.js", "Tailwind CSS"].map(skill => (
                                    <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-medium mb-4 border-b border-white/10 pb-2">Tools & Platforms</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Git", "Docker", "AWS", "Vercel", "Linux", "PostgreSQL", "Figma"].map(skill => (
                                    <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Education */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 uppercase tracking-wider text-neutral-500">Education</h2>
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="text-xl font-bold text-white">Master of Science in Computer Science</h3>
                                <span className="text-neutral-500 font-mono text-sm">2018 - 2020</span>
                            </div>
                            <div className="text-neutral-400">MIT (Massachusetts Institute of Technology)</div>
                        </div>
                        <div>
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="text-xl font-bold text-white">Bachelor of Science in Engineering</h3>
                                <span className="text-neutral-500 font-mono text-sm">2014 - 2018</span>
                            </div>
                            <div className="text-neutral-400">Stanford University</div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
