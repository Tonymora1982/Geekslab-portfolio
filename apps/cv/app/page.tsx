"use client";

import { motion } from "framer-motion";
import { AnimatedButton, SLABadge } from "@geekslab/ui";
import { Download, Mail, Linkedin, Github, MapPin, Phone, ExternalLink } from "lucide-react";

/**
 * CV Page - Anthony Mora Parra
 * 
 * Objetivo: Posicionar como Full Stack Developer con background diferenciador
 * en industria regulada (MedTech). Enfoque en transición de R&D a Software.
 */
export default function CVPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <header className="mb-12 border-b border-white/10 pb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-2">
                                Anthony <span className="text-neutral-500">Mora Parra</span>
                            </h1>
                            <p className="text-xl text-emerald-400 font-medium mb-3">
                                Full Stack Developer · R&D Background
                            </p>
                            {/* Contact Info Row */}
                            <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" /> Grecia, Costa Rica
                                </span>
                                <a href="mailto:tonymora1982@gmail.com" className="flex items-center gap-1 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4" /> tonymora1982@gmail.com
                                </a>
                                <a href="tel:+50670179787" className="flex items-center gap-1 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4" /> +506 7017-9787
                                </a>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <AnimatedButton href="https://github.com/Tonymora1982" variant="secondary" className="p-2 border-white/20">
                                <Github className="w-5 h-5" />
                            </AnimatedButton>
                            <AnimatedButton href="https://www.linkedin.com/in/anthony-mora-parra-94941282/" variant="secondary" className="p-2 border-white/20">
                                <Linkedin className="w-5 h-5" />
                            </AnimatedButton>
                            <AnimatedButton href="https://geekslab.tech" variant="secondary" className="p-2 border-white/20">
                                <ExternalLink className="w-5 h-5" />
                            </AnimatedButton>
                        </div>
                    </div>

                    {/* Download Button */}
                    <AnimatedButton href="/anthony-mora-cv.pdf" variant="primary" className="bg-white text-black hover:bg-neutral-200">
                        <Download className="w-4 h-4 mr-2" /> Download PDF
                    </AnimatedButton>
                </header>

                {/* Summary - Developer-focused */}
                <section className="mb-12">
                    <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-neutral-500">Profile</h2>
                    <p className="text-lg text-neutral-300 leading-relaxed">
                        Full Stack Developer with <strong className="text-white">13+ years in regulated industries</strong> (MedTech, Medical Devices).
                        Currently completing a B.S. in Computer Engineering while building production-grade web applications with
                        Next.js, React, and TypeScript. I bring <strong className="text-white">R&D discipline</strong>—documentation,
                        traceability, and systematic problem-solving—to modern software development. Transitioning from supervising
                        production teams to shipping code that scales.
                    </p>
                </section>

                {/* Technical Skills - Lead with this */}
                <section className="mb-12">
                    <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-neutral-500">Technical Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-white font-medium mb-3 text-sm">Languages & Frameworks</h3>
                            <div className="flex flex-wrap gap-2">
                                {["TypeScript", "JavaScript", "Python", "C#", "SQL", "React", "Next.js", "Node.js"].map(skill => (
                                    <span key={skill} className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-medium mb-3 text-sm">Tools & Platforms</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Git", "Docker", "Linux", "Vercel", "PostgreSQL", "Tailwind CSS"].map(skill => (
                                    <span key={skill} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-neutral-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-medium mb-3 text-sm">Domain Expertise</h3>
                            <div className="flex flex-wrap gap-2">
                                {["R&D Processes", "ISO 13485", "Quality Systems", "FDA Compliance", "Agile"].map(skill => (
                                    <span key={skill} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-neutral-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience - With real dates */}
                <section className="mb-12">
                    <h2 className="text-lg font-bold mb-6 uppercase tracking-wider text-neutral-500">Experience</h2>
                    <div className="space-y-6">
                        {/* Freelance - Current */}
                        <ExperienceItem
                            title="Full Stack Developer (Freelance)"
                            company="GeeksLab"
                            location="Remote"
                            dates="2024 — Present"
                            highlights={[
                                "Building production web applications with Next.js 15, React 19, TypeScript",
                                "Designed monorepo architecture with Turborepo and shared component libraries",
                                "Implementing e-commerce solutions with Stripe integration and real-time features"
                            ]}
                            isCurrent
                        />

                        {/* INS */}
                        <ExperienceItem
                            title="Administrative Assistant"
                            company="INS (Instituto Nacional de Seguros)"
                            location="Costa Rica"
                            dates="May 2025 — Present"
                            highlights={[
                                "Administrative operations and process optimization",
                                "Documentation systems improvement"
                            ]}
                            isCurrent
                        />

                        {/* Production Supervisor */}
                        <ExperienceItem
                            title="Production Supervisor"
                            company="Establishment Labs"
                            location="Alajuela, Costa Rica"
                            dates="Sep 2024 — Apr 2025"
                            highlights={[
                                "Supervised daily production operations ensuring Safety, Quality, Quantity, and Timeliness objectives",
                                "Implemented continuous improvements in production processes",
                                "Led cross-functional team coordination for medical device manufacturing"
                            ]}
                        />

                        {/* R&D Jr Engineer */}
                        <ExperienceItem
                            title="R&D Jr. Engineer"
                            company="Establishment Labs"
                            location="Alajuela, Costa Rica"
                            dates="Sep 2021 — Oct 2023"
                            highlights={[
                                "Coordinated experimental and technical testing for medical device development",
                                "Created and reviewed documentation, prototyping, and design verification",
                                "Participated in formative & summative evaluations for FDA/ISO compliance"
                            ]}
                        />

                        {/* R&D Technician */}
                        <ExperienceItem
                            title="R&D Technician"
                            company="Establishment Labs"
                            location="Alajuela, Costa Rica"
                            dates="Jan 2020 — Sep 2021"
                            highlights={[
                                "Executed experimental tests for R&D projects under development",
                                "Supported laboratory testing and technical studies"
                            ]}
                        />

                        {/* Team Leader */}
                        <ExperienceItem
                            title="Production Team Leader"
                            company="Establishment Labs"
                            location="Alajuela, Costa Rica"
                            dates="Mar 2018 — Aug 2019"
                            highlights={[
                                "Led production team to meet objectives in safety, quality, and output",
                                "Coordinated with cross-functional support areas"
                            ]}
                        />

                        {/* CAD Designer */}
                        <ExperienceItem
                            title="CAD Designer"
                            company="Align Technology"
                            location="Heredia, Costa Rica"
                            dates="Mar 2017 — Mar 2018"
                            highlights={[
                                "Specialized tasks per patient medical requirements using treatment optimization software"
                            ]}
                        />
                    </div>
                </section>

                {/* Education */}
                <section className="mb-12">
                    <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-neutral-500">Education</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-white font-medium">B.S. Computer Engineering</h3>
                                <p className="text-neutral-400 text-sm">UNED (Universidad Estatal a Distancia)</p>
                            </div>
                            <span className="text-neutral-500 font-mono text-sm">In Progress (TFG pending)</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-white font-medium">Diploma in Computer Science</h3>
                                <p className="text-neutral-400 text-sm">UNED (Universidad Estatal a Distancia)</p>
                            </div>
                            <span className="text-neutral-500 font-mono text-sm">2024</span>
                        </div>
                    </div>
                </section>

                {/* Certifications */}
                <section className="mb-12">
                    <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-neutral-500">Certifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CertItem name="Linux Foundation Certified (LFC)" status="In Progress" expected="2025" />
                        <CertItem name="Certified Ethical Hacker (CEH)" status="In Progress" expected="2025" />
                        <CertItem name="Introduction to Medical Software" org="Yale University" year="2022" />
                        <CertItem name="OSCP (Offensive Security)" status="Planned" expected="2026" />
                    </div>
                </section>

                {/* Languages */}
                <section className="mb-12">
                    <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-neutral-500">Languages</h2>
                    <div className="flex gap-6">
                        <div>
                            <span className="text-white font-medium">Spanish</span>
                            <span className="text-neutral-500 ml-2">Native</span>
                        </div>
                        <div>
                            <span className="text-white font-medium">English</span>
                            <span className="text-neutral-500 ml-2">B2+ (Professional)</span>
                        </div>
                    </div>
                </section>

                {/* References */}
                <section>
                    <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-neutral-500">References</h2>
                    <p className="text-neutral-400 text-sm mb-4">Available upon request</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="p-3 bg-white/5 rounded border border-white/10">
                            <p className="text-white font-medium">Solange Vindas</p>
                            <p className="text-neutral-400">SME Medical Devices Development</p>
                            <p className="text-neutral-500">Establishment Labs</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded border border-white/10">
                            <p className="text-white font-medium">Fernando Valerio</p>
                            <p className="text-neutral-400">Senior R&D Engineer</p>
                            <p className="text-neutral-500">Boston Scientific</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded border border-white/10">
                            <p className="text-white font-medium">Rosa Elena Rojas</p>
                            <p className="text-neutral-400">Manufacturing Supervisor</p>
                            <p className="text-neutral-500">Boston Scientific</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

/**
 * Experience Item Component
 * Displays a single work experience entry with highlights
 */
interface ExperienceItemProps {
    title: string;
    company: string;
    location: string;
    dates: string;
    highlights: string[];
    isCurrent?: boolean;
}

function ExperienceItem({ title, company, location, dates, highlights, isCurrent }: ExperienceItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-6 border-l border-white/10"
        >
            {/* Timeline dot */}
            <div className={`absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-1 ${isCurrent ? 'bg-emerald-400 animate-pulse' : 'bg-white/30'}`} />

            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-2">
                <div>
                    <h3 className="text-white font-medium">{title}</h3>
                    <p className="text-neutral-400 text-sm">{company} · {location}</p>
                </div>
                <span className={`font-mono text-sm ${isCurrent ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    {dates}
                </span>
            </div>
            <ul className="space-y-1">
                {highlights.map((item, idx) => (
                    <li key={idx} className="text-neutral-400 text-sm flex items-start gap-2">
                        <span className="text-neutral-600 mt-1">→</span>
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

/**
 * Certification Item Component
 */
interface CertItemProps {
    name: string;
    org?: string;
    year?: string;
    status?: string;
    expected?: string;
}

function CertItem({ name, org, year, status, expected }: CertItemProps) {
    return (
        <div className="p-3 bg-white/5 rounded border border-white/10">
            <p className="text-white font-medium text-sm">{name}</p>
            {org && <p className="text-neutral-400 text-xs">{org}</p>}
            {year && <span className="text-neutral-500 text-xs">{year}</span>}
            {status && (
                <span className={`text-xs ${status === 'In Progress' ? 'text-yellow-400' : 'text-neutral-500'}`}>
                    {status} {expected && `(${expected})`}
                </span>
            )}
        </div>
    );
}
