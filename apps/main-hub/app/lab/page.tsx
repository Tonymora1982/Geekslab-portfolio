"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@geekslab/ui";
import { AnimatedFooter, GridPattern, CornerAccents } from "@geekslab/ui";
import { FlaskConical, TrendingUp, CheckCircle2, XCircle, Play, GitCommit, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";

const experiments = [
  {
    id: "edge-caching",
    date: "2024-12-05",
    status: "validated",
    titleEN: "Edge caching reduces LCP by 40% for personalized static pages",
    titleES: "Edge caching reduce LCP en 40% para páginas estáticas personalizadas",
    metrics: {
      before: "2.9s",
      after: "1.7s",
      delta: "-41%"
    },
    learningsEN: [
      "Geo-segmented caching yields better P95 than fixed TTL",
      "Silent revalidation avoids cold starts during campaigns"
    ],
    learningsES: [
      "Caching geo-segmentado rinde mejor P95 que TTL fijo",
      "Revalidación silenciosa evita cold starts durante campañas"
    ],
    commits: ["a1c4f2d", "b7e91c3"],
    action: {
      labelEN: "Open in Stackblitz",
      labelES: "Abrir en Stackblitz",
      time: "15MIN",
      link: "#"
    }
  },
  {
    id: "circuit-breakers",
    date: "2025-01-12",
    status: "running",
    titleEN: "Circuit breakers reduce errors in bursts > 2k RPM",
    titleES: "Circuit breakers reducen errores en ráfagas > 2k RPM",
    metrics: {
      before: "0.68% errors",
      after: "0.18% errors",
      delta: "-73%"
    },
    learningsEN: [
      "Fallback to internal queue keeps UX acceptable without impacting billing",
      "A saturation dashboard reduces MTTR more than extra logs"
    ],
    learningsES: [
      "Fallback a cola interna mantiene UX aceptable sin impactar facturación",
      "Dashboard de saturación reduce MTTR más que logs extra"
    ],
    commits: ["c9e3ad4"],
    action: {
      labelEN: "View PoC",
      labelES: "Ver PoC",
      time: "5MIN",
      link: "#"
    }
  },
  {
    id: "glsl-animations",
    date: "2025-02-02",
    status: "validated",
    titleEN: "GLSL underlay animations don't impact CLS or TTI",
    titleES: "Animaciones GLSL underlay no impactan CLS o TTI",
    metrics: {
      before: "0.12CLS",
      after: "0.03CLS",
      delta: "-75%"
    },
    learningsEN: [
      "Keeping the canvas as underlay with pointer-events-none removes jank",
      "A 2 draw-call budget keeps the main thread free"
    ],
    learningsES: [
      "Mantener canvas como underlay con pointer-events-none elimina jank",
      "Presupuesto de 2 draw-calls mantiene libre el main thread"
    ],
    commits: ["d1f2aa9", "e3bcf78", "f42d0af"],
    action: {
      labelEN: "View code",
      labelES: "Ver código",
      time: "30MIN",
      link: "#"
    }
  }
];

const statusConfig = {
  running: {
    icon: TrendingUp,
    color: "text-white",
    bg: "bg-transparent",
    border: "border-white",
    labelEN: "Running",
    labelES: "En Curso",
  },
  validated: {
    icon: CheckCircle2,
    color: "text-white",
    bg: "bg-transparent",
    border: "border-white",
    labelEN: "Validated",
    labelES: "Validado",
  },
  failed: {
    icon: XCircle,
    color: "text-white",
    bg: "bg-transparent",
    border: "border-white",
    labelEN: "Failed",
    labelES: "Fallido",
  },
};

export default function LabPage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative overflow-hidden font-mono">
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
            <div className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-widest text-neutral-500">
              <Sparkles className="w-4 h-4" />
              EXPERIMENT LOG
            </div>
            <h1 className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter text-white">
              {language === 'en' ? 'Open Lab' : 'Laboratorio Abierto'}
            </h1>
            <p className="text-xl text-neutral-400 max-w-3xl leading-relaxed mb-8 font-light">
              {language === 'en'
                ? 'Hypotheses, trials, and results you can replicate. Focus on process, not perfect showcases.'
                : 'Hipótesis, pruebas y resultados que puedes replicar. Enfoque en proceso, no showcases perfectos.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Interactive Demo - BrickWorld */}
      <section className="relative z-10 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.a
            href="/brickworld"
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative block border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-950/50 to-black rounded-2xl overflow-hidden hover:border-emerald-500/60 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              {/* Icon/Emoji */}
              <div className="text-7xl md:text-8xl">🧱</div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-3 text-xs uppercase tracking-widest text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  {language === 'en' ? 'INTERACTIVE DEMO' : 'DEMO INTERACTIVO'}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  BrickWorld
                </h2>
                <p className="text-neutral-400 text-lg mb-4">
                  {language === 'en'
                    ? '3D block building game with seasonal themes. Build, stack, rotate, and share your creations.'
                    : 'Juego de construcción 3D con temas estacionales. Construye, apila, rota y comparte tus creaciones.'}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="text-xs px-2 py-1 bg-white/10 rounded">React Three Fiber</span>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded">Zustand</span>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded">Next.js 15</span>
                  <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">🎄 Christmas Theme</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex-shrink-0">
                <div className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-bold rounded-lg group-hover:bg-emerald-400 transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                  {language === 'en' ? 'Play Now' : 'Jugar Ahora'}
                </div>
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="relative z-10 pb-32 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((exp, index) => {
            const config = statusConfig[exp.status as keyof typeof statusConfig];

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col border border-white/10 bg-black/50 backdrop-blur-sm hover:border-white/20 transition-all duration-300 rounded-xl overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Calendar className="w-3 h-3" />
                    {exp.date}
                  </div>
                  <div className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${config.border} ${config.bg} ${config.color}`}>
                    {language === 'en' ? config.labelEN : config.labelES}
                  </div>
                </div>

                <div className="p-6 grow flex flex-col">
                  {/* Title */}
                  <h3 className="text-lg font-bold mb-6 text-white leading-tight min-h-14">
                    {language === 'en' ? exp.titleEN : exp.titleES}
                  </h3>

                  {/* Metrics Table */}
                  <div className="grid grid-cols-3 gap-4 mb-6 text-xs border-y border-white/5 py-4">
                    <div>
                      <div className="text-neutral-500 mb-1">Before</div>
                      <div className="font-mono text-neutral-300">{exp.metrics.before}</div>
                    </div>
                    <div>
                      <div className="text-neutral-500 mb-1">After</div>
                      <div className="font-mono text-white">{exp.metrics.after}</div>
                    </div>
                    <div>
                      <div className="text-neutral-500 mb-1">Delta</div>
                      <div className="font-mono text-white">{exp.metrics.delta}</div>
                    </div>
                  </div>

                  {/* Learnings */}
                  <div className="mb-8 grow">
                    <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
                      {language === 'en' ? 'LEARNINGS' : 'APRENDIZAJES'}
                    </div>
                    <ul className="space-y-2">
                      {(language === 'en' ? exp.learningsEN : exp.learningsES).map((learning, i) => (
                        <li key={i} className="flex gap-2 text-xs text-neutral-400 leading-relaxed">
                          <span className="text-white mt-0.5">•</span>
                          {learning}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Commits */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-full h-px bg-white/5 relative">
                      {exp.commits.map((commit, i) => (
                        <div
                          key={commit}
                          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-neutral-800 border border-neutral-600 rounded-full"
                          style={{ left: `${(i + 1) * 25}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {exp.commits.map(commit => (
                        <span key={commit} className="text-[10px] font-mono text-neutral-600 border border-white/5 px-1.5 py-0.5 rounded">
                          {commit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <a
                    href={exp.action.link}
                    className="flex items-center justify-between w-full p-3 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors group/btn"
                  >
                    <div className="flex items-center gap-2 font-medium text-sm">
                      <Play className="w-3 h-3 fill-current" />
                      {language === 'en' ? exp.action.labelEN : exp.action.labelES}
                    </div>
                    <span className="text-[10px] font-bold opacity-50 group-hover/btn:opacity-100 transition-opacity">
                      {exp.action.time}
                    </span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <AnimatedFooter />
    </main>
  );
}
