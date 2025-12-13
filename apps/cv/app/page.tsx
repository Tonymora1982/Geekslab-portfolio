"use client";

import { Download, Mail, Phone, MapPin, Linkedin, Github, Globe, Printer } from "lucide-react";

/**
 * Professional CV Page - Anthony Mora Parra
 * 
 * Print-optimized design for PDF export.
 * Uses CSS @media print to ensure clean PDF output.
 * 
 * To generate PDF:
 * 1. Click "Print to PDF" button
 * 2. Browser will open print dialog
 * 3. Select "Save as PDF" as destination
 */
export default function CVPage() {

    // Handle print/PDF generation
    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body { background: white !important; }
                    .no-print { display: none !important; }
                    .print-page { 
                        padding: 0 !important;
                        margin: 0 !important;
                        background: white !important;
                        color: black !important;
                    }
                    .print-section { break-inside: avoid; }
                    @page { 
                        margin: 0.5in; 
                        size: letter;
                    }
                }
            `}</style>

            {/* Print Button - Floating */}
            <div className="no-print fixed bottom-8 right-8 z-50 flex gap-3">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-medium rounded-lg hover:bg-emerald-400 transition-colors shadow-lg"
                >
                    <Download className="w-5 h-5" />
                    Download PDF
                </button>
            </div>

            {/* CV Content */}
            <main className="print-page min-h-screen bg-white text-gray-900 py-8 px-4 md:px-8">
                <div className="max-w-[8.5in] mx-auto">

                    {/* Header */}
                    <header className="print-section border-b-2 border-gray-900 pb-4 mb-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">
                            Anthony Mora Parra
                        </h1>
                        <p className="text-xl text-emerald-600 font-semibold mb-4">
                            Full Stack Developer | 13+ Years in Regulated Industries
                        </p>

                        {/* Contact Row */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" /> Costa Rica (GMT-6)
                            </span>
                            <a href="mailto:tonymora1982@gmail.com" className="flex items-center gap-1 hover:text-emerald-600">
                                <Mail className="w-4 h-4" /> tonymora1982@gmail.com
                            </a>
                            <a href="tel:+50670179787" className="flex items-center gap-1 hover:text-emerald-600">
                                <Phone className="w-4 h-4" /> +506 7017-9787
                            </a>
                            <a href="https://linkedin.com/in/anthony-mora-parra-94941282" className="flex items-center gap-1 hover:text-emerald-600">
                                <Linkedin className="w-4 h-4" /> LinkedIn
                            </a>
                            <a href="https://github.com/Tonymora1982" className="flex items-center gap-1 hover:text-emerald-600">
                                <Github className="w-4 h-4" /> GitHub
                            </a>
                            <a href="https://geekslab.tech" className="flex items-center gap-1 hover:text-emerald-600">
                                <Globe className="w-4 h-4" /> geekslab.tech
                            </a>
                        </div>
                    </header>

                    {/* Summary */}
                    <section className="print-section mb-6">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                            Professional Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Full Stack Developer with <strong>13+ years of engineering background</strong>, including 7+ years at Establishment Labs 
                            building Class III medical devices. I combine the rigor of ISO 13485 regulated environments with modern web 
                            architectures (Next.js/React). Focused on delivering production-grade applications with CI/CD, automated testing, 
                            and quality-driven development practices.
                        </p>
                    </section>

                    {/* Technical Skills */}
                    <section className="print-section mb-6">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                            Technical Skills
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Languages & Frameworks</h3>
                                <p className="text-gray-600">TypeScript, JavaScript, Python, C#, SQL, React, Next.js 16, Node.js</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Tools & Platforms</h3>
                                <p className="text-gray-600">Git, Docker, Linux, Vercel, PostgreSQL, Tailwind CSS, Playwright</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Domain Expertise</h3>
                                <p className="text-gray-600">ISO 13485, FDA Compliance, R&D Processes, Quality Systems, Agile</p>
                            </div>
                        </div>
                    </section>

                    {/* Experience */}
                    <section className="print-section mb-6">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                            Professional Experience
                        </h2>

                        <ExperienceItem
                            title="Full Stack Developer"
                            company="GeeksLab (Freelance)"
                            period="2024 — Present"
                            location="Costa Rica (Remote)"
                            highlights={[
                                "Architecting production web applications with Next.js 16, React 19, TypeScript",
                                "Implemented Monorepo architecture with Turborepo, CI/CD pipelines, Playwright E2E testing",
                                "Deployed e-commerce platform (NexaStore) achieving <200ms LCP on Vercel"
                            ]}
                        />

                        <ExperienceItem
                            title="Administrative Assistant"
                            company="INS (Instituto Nacional de Seguros)"
                            period="May 2025 — Present"
                            location="San José"
                            highlights={[
                                "Administrative operations and process optimization",
                                "ETL processes, automation, and digital transformation initiatives",
                                "Improving documentation systems and workflows"
                            ]}
                        />

                        <ExperienceItem
                            title="Production Supervisor"
                            company="Establishment Labs"
                            period="Sep 2024 — Apr 2025"
                            location="Coyol, Alajuela"
                            highlights={[
                                "Led cross-functional production teams in ISO 13485 certified environment",
                                "Process optimization and SOP development for medical device manufacturing",
                                "Ensured compliance with FDA and international quality standards"
                            ]}
                        />

                        <ExperienceItem
                            title="Quality Inspector (Temporary)"
                            company="ACESA (Third-Party for FLEX)"
                            period="Jan 2024 — May 2024"
                            location="Heredia"
                            highlights={[
                                "Quality inspection for automotive components manufactured by FLEX",
                                "Ensuring adherence to quality standards for Controlled Shipping (CS2)"
                            ]}
                        />

                        <ExperienceItem
                            title="R&D Jr. Engineer"
                            company="Establishment Labs"
                            period="Sep 2021 — Oct 2023"
                            location="Coyol, Alajuela"
                            highlights={[
                                "Design verification and prototyping for Class III medical devices",
                                "FDA compliance documentation and technical testing coordination",
                                "Collaborated with international teams on product development"
                            ]}
                        />

                        <ExperienceItem
                            title="R&D Technician"
                            company="Establishment Labs"
                            period="Jan 2020 — Sep 2021"
                            location="Coyol, Alajuela"
                            highlights={[
                                "Experimental testing and technical studies for devices under development",
                                "Laboratory equipment operation and maintenance"
                            ]}
                        />

                        <ExperienceItem
                            title="3D Digital-Lab MIC Technician"
                            company="Establishment Labs"
                            period="Aug 2019 — Jan 2020"
                            location="Coyol, Alajuela"
                            highlights={[
                                "3D scanning tests and regression testing of device functionality",
                                "Device hardware maintenance and global upgrades"
                            ]}
                        />

                        <ExperienceItem
                            title="Production Team Leader"
                            company="Establishment Labs"
                            period="Mar 2018 — Aug 2019"
                            location="Coyol, Alajuela"
                            highlights={[
                                "Led team to meet objectives ensuring safety and production goals",
                                "Quality monitoring and compliance procedures coordination"
                            ]}
                        />

                        <ExperienceItem
                            title="CAD Designer"
                            company="Align Technology"
                            period="Mar 2017 — Mar 2018"
                            location="Heredia"
                            highlights={[
                                "Designed patient-specific orthodontic solutions (Invisalign)",
                                "Treatment optimization using specialized software"
                            ]}
                        />
                    </section>

                    {/* Education */}
                    <section className="print-section mb-6">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                            Education
                        </h2>
                        <div className="mb-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">Bachelor of Science in Computer Engineering</h3>
                                    <p className="text-gray-600 text-sm">Universidad Estatal a Distancia (UNED) — Costa Rica</p>
                                </div>
                                <span className="text-sm text-gray-500">In Progress (TFG pending)</span>
                            </div>
                        </div>
                    </section>

                    {/* Certifications */}
                    <section className="print-section mb-6">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                            Certifications
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <h3 className="font-semibold text-gray-900">Yale Medical Software</h3>
                                <p className="text-gray-600">Introduction to Medical Software (2022)</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">LFC</h3>
                                <p className="text-gray-600">Linux Foundation (In Progress - 2025)</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">CEH</h3>
                                <p className="text-gray-600">Certified Ethical Hacker (In Progress - 2025)</p>
                            </div>
                        </div>
                    </section>

                    {/* Languages */}
                    <section className="print-section mb-6">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                            Languages
                        </h2>
                        <div className="flex gap-8 text-sm">
                            <div>
                                <span className="font-semibold text-gray-900">Spanish:</span>
                                <span className="text-gray-600 ml-2">Native</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-900">English:</span>
                                <span className="text-gray-600 ml-2">B2+ (Daily async communication, PR reviews, technical docs)</span>
                            </div>
                        </div>
                    </section>

                    {/* Projects */}
                    <section className="print-section">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                            Featured Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <h3 className="font-semibold text-gray-900">NexaStore</h3>
                                <p className="text-gray-600 mb-1">Full-stack e-commerce with Next.js 16, Stripe-ready checkout</p>
                                <p className="text-emerald-600 text-xs">Result: &lt;200ms LCP, mobile-first design</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">ISO 13485 QMS</h3>
                                <p className="text-gray-600 mb-1">Quality Management System for medical device compliance</p>
                                <p className="text-emerald-600 text-xs">Result: 40% reduction in audit prep time</p>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </>
    );
}

/**
 * Experience Item Component
 */
function ExperienceItem({
    title,
    company,
    period,
    location,
    highlights
}: {
    title: string;
    company: string;
    period: string;
    location: string;
    highlights: string[];
}) {
    return (
        <div className="mb-4">
            <div className="flex justify-between items-start mb-1">
                <div>
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                    <p className="text-gray-600 text-sm">{company} — {location}</p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">{period}</span>
            </div>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-0.5 ml-2">
                {highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                ))}
            </ul>
        </div>
    );
}
