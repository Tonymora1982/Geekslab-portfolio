"use client";

import { AnimatedHeroText, AnimatedButton } from "@geekslab/ui";
import { NoiseOverlay, MagneticCursor } from "@geekslab/ui";
import { Navbar } from "@geekslab/ui";
import { motion } from "framer-motion";

export default function NexaStorePage() {
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
                            nexastore.geekslab.tech
                        </span>
                    </motion.div>

                    <AnimatedHeroText
                        text="NEXASTORE"
                        className="text-6xl md:text-[11rem] font-bold tracking-tighter leading-[0.8] text-white mb-8"
                        delay={0}
                    />

                    <div className="flex justify-center gap-6 mt-8">
                        <AnimatedButton href="https://github.com/yourusername/nexastore" variant="secondary" className="text-sm border-white/20 text-white hover:bg-white/10">
                            View Code
                        </AnimatedButton>
                        <AnimatedButton href="https://nexastore.geekslab.tech" variant="primary" className="text-sm bg-white text-black hover:bg-neutral-200">
                            Live Demo
                        </AnimatedButton>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 border-t border-white/10 pt-12">
                        <div>
                            <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-2">Role</h3>
                            <p className="text-xl font-light">Full Stack Architect</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-2">Timeline</h3>
                            <p className="text-xl font-light">2024</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-2">Core Tech</h3>
                            <p className="text-xl font-light">Stripe Connect, Sanity, Zustand</p>
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
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">The Problem</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                Traditional e-commerce platforms (Shopify, WooCommerce) are often bloated and hard to customize.
                                The goal was to build a <strong>Headless Commerce Engine</strong> that separates the frontend experience from the backend logic,
                                allowing for sub-second page loads and complete design freedom.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">The Solution</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                                A decoupled architecture where content lives in Sanity.io and payments are handled by Stripe,
                                orchestrated by a Next.js middleware layer.
                            </p>
                            <ul className="space-y-4 border-l border-white/20 pl-6">
                                <li className="text-neutral-300">
                                    <strong className="text-white block mb-1">Global State Management</strong>
                                    Implemented with Zustand to handle complex cart logic without React Context re-render issues.
                                </li>
                                <li className="text-neutral-300">
                                    <strong className="text-white block mb-1">Real-time Inventory</strong>
                                    Webhooks sync Stripe inventory levels with the frontend instantly.
                                </li>
                                <li className="text-neutral-300">
                                    <strong className="text-white block mb-1">Conversion Optimization</strong>
                                    Optimized checkout flow reducing friction by 40% compared to standard templates.
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-neutral-900 aspect-[4/5] border border-white/10 p-8 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('/images/projects/nexastore.png')] bg-cover bg-center opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-white/10 text-xs border border-white/20">Stripe</span>
                                    <span className="px-2 py-1 bg-white/10 text-xs border border-white/20">Sanity</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Project */}
            <section className="py-20 border-t border-white/10 bg-neutral-950">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-neutral-500 mb-4">Next Case Study</p>
                    <AnimatedButton href="/qms" variant="primary" className="text-4xl md:text-6xl font-bold hover:text-neutral-400 transition-colors">
                        ISO 13485 QMS →
                    </AnimatedButton>
                </div>
            </section>
        </main>
    );
}
