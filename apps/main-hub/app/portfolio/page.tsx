"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@geekslab/ui";
import { AnimatedFooter, GridPattern, CornerAccents } from "@geekslab/ui";
import { ArrowUpRight, Calendar, Code, ExternalLink } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: "geekslab",
    slug: "geekslab",
    titleEN: "GeeksLab Development",
    titleES: "Desarrollo GeeksLab",
    descEN: "My Personal R&D Lab & Consultancy. Building High-Performance Next.js Architectures.",
    descES: "Mi Laboratorio de I+D y Consultoría. Construyendo Arquitecturas Next.js de Alto Rendimiento.",
    year: "2024",
    stack: ["Next.js 16", "React 19", "TypeScript", "Framer Motion", "Tailwind v4"],
    image: "/projects/geekslab-hero.png",
    live: "/geekslab",
    isInternal: true,
    featured: true,
  },
  {
    id: "nexastore",
    slug: "nexastore",
    titleEN: "NexaStore E-commerce",
    titleES: "NexaStore E-commerce",
    descEN: "Luxury tech e-commerce with Gucci-inspired design. Full shopping cart, checkout flow & responsive UI.",
    descES: "E-commerce de tecnología luxury con diseño inspirado en Gucci. Carrito completo, checkout y UI responsive.",
    year: "2024",
    stack: ["Next.js 16", "React 19", "Zustand", "Tailwind CSS", "TypeScript"],
    image: "/projects/nexastore-hero.png",
    live: "https://nexastore.geekslab.tech",
    featured: true,
  },
  {
    id: "qms",
    slug: "qms",
    titleEN: "ISO 13485 QMS",
    titleES: "SGC ISO 13485",
    descEN: "Quality Management System for MedTech. Automated auditing and Traceability.",
    descES: "Sistema de Gestión de Calidad para MedTech. Auditoría automatizada y Trazabilidad.",
    year: "2023",
    stack: ["C#", ".NET Core", "SQL Server", "Azure", "Power BI"],
    image: "/projects/qms-hero.png",
    live: null,
    featured: true,
  },
];

export default function PortfolioPage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative overflow-hidden">
      <GridPattern />
      <CornerAccents />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest text-neutral-400">
              Portfolio
            </div>
            <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
              {language === 'en' ? 'Selected Works' : 'Proyectos Destacados'}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl leading-relaxed">
              {language === 'en'
                ? 'Production-grade projects showcasing full-stack development, system architecture, and R&D innovation.'
                : 'Proyectos de producción mostrando desarrollo full-stack, arquitectura de sistemas e innovación R&D.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 pb-32 px-4">
        <div className="max-w-7xl mx-auto space-y-32">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Project Image - Clickable */}
                <Link 
                  href={`/projects/${project.slug}`}
                  className={`relative overflow-hidden bg-neutral-900 border border-white/10 aspect-video block ${index % 2 === 1 ? 'md:order-2' : ''}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-800 group-hover:text-neutral-700 transition-colors text-6xl font-bold tracking-tighter">
                      {project.id.toUpperCase()}
                    </div>
                  </motion.div>
                </Link>

                {/* Project Info */}
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm text-neutral-500 font-mono flex items-center gap-2">
                      <span className="w-2 h-px bg-neutral-500"></span>
                      {project.year}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-0.5 border border-white/20 rounded-full text-[10px] text-white uppercase tracking-widest">
                        Featured
                      </span>
                    )}
                  </div>

                  <Link href={`/projects/${project.slug}`}>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white hover:text-neutral-200 transition-colors tracking-tight cursor-pointer">
                      {language === 'en' ? project.titleEN : project.titleES}
                    </h2>
                  </Link>

                  <p className="text-lg text-neutral-400 mb-8 leading-relaxed font-light">
                    {language === 'en' ? project.descEN : project.descES}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 border border-white/10 bg-white/5 text-xs text-neutral-400 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links - Now separate, no nesting */}
                  <div className="flex gap-6">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-white border-b border-white/20 pb-1 hover:border-white transition-colors"
                    >
                      <span className="font-medium">{language === 'en' ? 'View Case Study' : 'Ver Caso de Estudio'}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform hover:-translate-y-0.5 hover:translate-x-0.5" />
                    </Link>
                    {project.live && (
                      (project as any).isInternal ? (
                        <Link
                          href={project.live}
                          className="inline-flex items-center gap-2 text-emerald-400 border-b border-emerald-400/20 pb-1 hover:border-emerald-400 transition-colors"
                        >
                          <span className="font-medium">Live Demo</span>
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      ) : (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-emerald-400 border-b border-emerald-400/20 pb-1 hover:border-emerald-400 transition-colors"
                        >
                          <span className="font-medium">Live Demo</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {language === 'en' ? 'Interested in collaborating?' : '¿Interesado en colaborar?'}
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              {language === 'en'
                ? 'I\'m currently available for freelance projects and open to full-time opportunities.'
                : 'Actualmente disponible para proyectos freelance y oportunidades de tiempo completo.'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors font-medium text-lg"
            >
              {language === 'en' ? 'Get in Touch' : 'Contáctame'}
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <AnimatedFooter />
    </main>
  );
}
