"use client";

import { AnimatedHeroText, AnimatedButton } from "@geekslab/ui";
import { NoiseOverlay, MagneticCursor } from "@geekslab/ui";
import { Navbar } from "@geekslab/ui";
import { motion } from "framer-motion";

export default function GeekslabPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative overflow-hidden font-sans">
            <NoiseOverlay />
            <MagneticCursor />
            <Navbar />

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
                            geekslab.tech
                        </span>
                    </motion.div>

                    <AnimatedHeroText
                        text="GEEKSLAB"
                        className="text-7xl md:text-[12rem] font-bold tracking-tighter leading-[0.8] text-white mb-8"
                        delay={0}
                    />

                    <div className="flex justify-center gap-6 mt-8">
                        <AnimatedButton href="https://github.com/yourusername/geekslab" variant="secondary" className="text-sm border-white/20 text-white hover:bg-white/10">
                            View Code
                        </AnimatedButton>
                        <AnimatedButton href="https://geekslab.tech" variant="primary" className="text-sm bg-white text-black hover:bg-neutral-200">
                            Live Demo
                        </AnimatedButton>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 border-t border-white/10 pt-12">
                        <div>
                            <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-2">Role</h3>
                            <p className="text-xl font-light">Principal Engineer</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-2">Timeline</h3>
                            <p className="text-xl font-light">2023 — Present</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-2">Core Tech</h3>
                            <p className="text-xl font-light">Next.js 14, WebGL, Turborepo</p>
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
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">The Challenge</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                Modern web development is often constrained by "safe" choices. Geekslab was born from a necessity to break things.
                                I needed a sandbox to test high-performance architectures, experimental UI patterns (like this portfolio),
                                and bleeding-edge libraries before deploying them to production client environments.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">The Architecture</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                                Built on a <strong>Monorepo</strong> structure using Turborepo, allowing shared UI libraries across multiple internal tools.
                                The core is Next.js 14 with Server Actions, heavily utilizing:
                            </p>
                            <ul className="space-y-4 border-l border-white/20 pl-6">
                                <li className="text-neutral-300">
                                    <strong className="text-white block mb-1">Zero-Runtime CSS</strong>
                                    Using Tailwind v4 alpha for maximum performance.
                                </li>
                                <li className="text-neutral-300">
                                    <strong className="text-white block mb-1">WebGL Shaders</strong>
                                    Custom GLSL shaders for non-dom-blocking visual effects.
                                </li>
                                <li className="text-neutral-300">
                                    <strong className="text-white block mb-1">Edge Computing</strong>
                                    Middleware logic running on Vercel Edge Functions for sub-millisecond routing.
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-neutral-900 aspect-square border border-white/10 p-8 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('/images/projects/geekslab.png')] bg-cover bg-center opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                            <div className="relative z-10 bg-black/50 backdrop-blur-md p-6 border border-white/10">
                                <p className="font-mono text-sm text-neutral-300">
                                    &gt; npx create-next-app@latest<br />
                                    &gt; Initializing Turborepo...<br />
                                    &gt; 🚀 Ready in 34ms
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-neutral-900 aspect-video border border-white/10 flex items-center justify-center">
                                <span className="text-neutral-600 font-mono text-xs">Performance Metrics</span>
                            </div>
                            <div className="bg-neutral-900 aspect-video border border-white/10 flex items-center justify-center">
                                <span className="text-neutral-600 font-mono text-xs">System Design</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Project */}
            <section className="py-20 border-t border-white/10 bg-neutral-950">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-neutral-500 mb-4">Next Case Study</p>
                    <AnimatedButton href="/nexastore" variant="primary" className="text-4xl md:text-6xl font-bold hover:text-neutral-400 transition-colors">
                        NexaStore Engine →
                    </AnimatedButton>
                </div>
            </section>
        </main>
    );
}
