"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, TrendingUp, Clock, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../context/language-context";

interface ProjectMetric {
    label: string;
    value: string;
    icon: React.ReactNode;
}

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    year: string;
    image: string;
    link: string;
    metrics?: ProjectMetric[];
    gradient: string;
    status: "live" | "development" | "completed";
}

const StatusBadge = ({ status }: { status: Project["status"] }) => {
    const config = {
        live: { label: "Live", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
        development: { label: "In Development", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
        completed: { label: "Completed", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
    };
    return (
        <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full border ${config[status].color}`}>
            {config[status].label}
        </span>
    );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.25, once: false });

    const isEven = index % 2 === 0;

    return (
        <section
            ref={containerRef}
            className="relative min-h-[85vh] flex items-center justify-center py-20 md:py-28"
        >
            {/* Background gradient accent */}
            <div className={`absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-br ${project.gradient}`} />
            
            <div className="relative container px-4 mx-auto">
                <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${!isEven ? "md:grid-flow-dense" : ""}`}>
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: isEven ? -40 : 40 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className={`space-y-6 ${!isEven ? "md:col-start-2" : ""}`}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-5xl md:text-7xl font-bold text-white/10">0{index + 1}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-neutral-500 font-mono text-sm">{project.year}</span>
                                    <StatusBadge status={project.status} />
                                </div>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                                {project.title}
                            </h2>
                            <p className="text-lg text-neutral-400 max-w-lg leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Metrics Grid */}
                        {project.metrics && (
                            <div className="grid grid-cols-2 gap-3">
                                {project.metrics.map((metric, i) => (
                                    <motion.div
                                        key={metric.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                        className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                                    >
                                        <div className="flex items-center gap-2 text-neutral-500 mb-1">
                                            {metric.icon}
                                            <span className="text-xs uppercase tracking-wider">{metric.label}</span>
                                        </div>
                                        <span className="text-2xl font-bold text-white">{metric.value}</span>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-300 hover:bg-white/10 hover:border-white/20 transition-all"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <Link
                            href={project.link}
                            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-all group"
                        >
                            <span>View Case Study</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </motion.div>

                    {/* Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 60 }}
                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0.2, scale: 0.9, y: 60 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${!isEven ? "md:col-start-1" : ""}`}
                    >
                        {/* Glowing border effect */}
                        <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${project.gradient} opacity-50`} />
                        
                        <div className="absolute inset-[1px] rounded-2xl bg-neutral-900 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent z-10" />
                            
                            {/* Animated grid overlay */}
                            <div className="absolute inset-0 opacity-20 z-10"
                                style={{
                                    backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                                    backgroundSize: "32px 32px"
                                }}
                            />
                            
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.6 }}
                            />
                            
                            {/* Hover overlay */}
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 z-20"
                            >
                                <span className="text-white font-medium flex items-center gap-2">
                                    Explore Project <ArrowUpRight className="w-4 h-4" />
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export const ProjectShowcase = () => {
    const { t } = useLanguage();

    const projects: Project[] = [
        {
            id: "geekslab",
            title: "GeeksLab Portfolio",
            description: t('bento.item1.description'),
            tags: ["Next.js 16", "TypeScript", "Turborepo", "Tailwind v4", "Vitest"],
            year: "2024",
            image: "/images/projects/geekslab.svg",
            link: "/geekslab",
            gradient: "from-violet-600/20 via-transparent to-fuchsia-600/20",
            status: "live",
            metrics: [
                { label: "Lighthouse", value: "98/100", icon: <Zap className="w-3 h-3" /> },
                { label: "Test Coverage", value: "37 tests", icon: <Clock className="w-3 h-3" /> },
            ],
        },
        {
            id: "nexastore",
            title: "NexaStore",
            description: t('bento.item2.description'),
            tags: ["E-commerce", "Stripe", "Headless CMS", "GraphQL"],
            year: "2023",
            image: "/images/projects/nexastore.svg",
            link: "/nexastore",
            gradient: "from-emerald-600/20 via-transparent to-cyan-600/20",
            status: "completed",
            metrics: [
                { label: "Tech Demo", value: "Full Stack", icon: <TrendingUp className="w-3 h-3" /> },
                { label: "Features", value: "Cart + Pay", icon: <Users className="w-3 h-3" /> },
            ],
        },
        {
            id: "qms",
            title: "ISO 13485 QMS",
            description: t('bento.item3.description'),
            tags: ["MedTech", "Compliance", "Python", "Automation"],
            year: "2018-2023",
            image: "/images/projects/qms.svg",
            link: "/qms",
            gradient: "from-amber-600/20 via-transparent to-orange-600/20",
            status: "completed",
            metrics: [
                { label: "Background", value: "5+ yrs", icon: <Zap className="w-3 h-3" /> },
                { label: "Standard", value: "ISO 13485", icon: <Clock className="w-3 h-3" /> },
            ],
        },
        {
            id: "monorepo",
            title: "Monorepo Architecture",
            description: t('bento.item4.description'),
            tags: ["Turborepo", "CI/CD", "Shared Packages", "pnpm"],
            year: "2024",
            image: "/images/projects/monorepo.svg",
            link: "https://github.com/Tonymora1982/Geekslab-portfolio",
            gradient: "from-sky-600/20 via-transparent to-indigo-600/20",
            status: "live",
            metrics: [
                { label: "Apps", value: "3", icon: <Zap className="w-3 h-3" /> },
                { label: "Packages", value: "4", icon: <Clock className="w-3 h-3" /> },
            ],
        },
    ];

    return (
        <div className="relative w-full">
            {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
    );
};
