"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../context/language-context"; // Updated import path

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    year: string;
    image: string;
    link: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.35, once: false });

    const isEven = index % 2 === 0;

    return (
        <section
            ref={containerRef}
            className="relative min-h-[90vh] flex items-center justify-center py-28 md:py-36"
        >
            <div className="relative container px-4 mx-auto">
                <div className={`grid md:grid-cols-2 gap-12 md:gap-24 items-center ${!isEven ? "md:grid-flow-dense" : ""}`}>
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 40 }}
                        transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                        className={`space-y-8 ${!isEven ? "md:col-start-2" : ""}`}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-neutral-500 font-mono text-sm">
                                <span>0{index + 1}</span>
                                <span className="h-px w-12 bg-neutral-800" />
                                <span>{project.year}</span>
                            </div>
                            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">
                                {project.title}
                            </h2>
                            <p className="text-xl text-neutral-400 max-w-md leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <Link
                            href={project.link}
                            className="inline-flex items-center gap-2 text-white border-b border-white/20 pb-1 hover:border-white transition-colors group"
                        >
                            <span className="font-medium">View Project</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </motion.div>

                    {/* Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 80, scale: 0.96 }}
                        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.35, y: 80, scale: 0.96 }}
                        transition={{ duration: 0.9, delay: 0.2 * index, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ scale: 1.02 }}
                        className={`relative aspect-[4/3] md:aspect-square rounded-none overflow-hidden bg-neutral-900 border border-white/10 ${!isEven ? "md:col-start-1" : ""}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent z-10" />
                        <div className="absolute inset-0 border border-white/10 rounded-none" />
                        <div className="absolute -inset-6 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none" />
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-700"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export const ProjectShowcase = () => {
    const { t } = useLanguage();

    // TODO: Move data to translations or a separate data file if needed dynamic
    const projects: Project[] = [
        {
            id: "geekslab",
            title: "Geekslab",
            description: t('bento.item1.description'),
            tags: ["Next.js", "TypeScript", "R&D"],
            year: "2024",
            image: "/images/projects/geekslab.svg",
            link: "/geekslab",
        },
        {
            id: "nexastore",
            title: "NexaStore",
            description: t('bento.item2.description'),
            tags: ["E-commerce", "Stripe", "Headless"],
            year: "2023",
            image: "/images/projects/nexastore.svg",
            link: "/nexastore",
        },
        {
            id: "qms",
            title: "ISO 13485 QMS",
            description: t('bento.item3.description'),
            tags: ["MedTech", "Automation", "Compliance"],
            year: "2022",
            image: "/images/projects/qms.svg",
            link: "/qms",
        },
        {
            id: "monorepo",
            title: "TurboRepo",
            description: t('bento.item4.description'),
            tags: ["Micro-frontends", "Architecture", "Scale"],
            year: "2023",
            image: "/images/projects/monorepo.svg",
            link: "/monorepo",
        },
    ];

    return (
        <div className="relative w-full space-y-24 md:space-y-36">
            {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
    );
};
