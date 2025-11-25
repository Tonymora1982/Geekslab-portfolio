"use client";

import { useMemo } from "react";
import { Beaker, Play, GitCommit, Sparkles } from "lucide-react";
import { useLanguage } from "../context/language-context"; // Updated import path

type ExperimentStatus = "running" | "validated" | "failed";

type Experiment = {
  id: string;
  hypothesis: { en: string; es: string };
  date: string;
  status: ExperimentStatus;
  metrics: { before: number; after: number; delta: string; unit: string };
  reproduction: { label: { en: string; es: string }; url: string; difficulty: "5min" | "15min" | "30min" };
  learnings: { en: string[]; es: string[] };
  commits: string[];
};

const experiments: Experiment[] = [
  {
    id: "edge-lcp",
    hypothesis: {
      en: "Edge caching reduces LCP by 40% for personalized static pages",
      es: "Edge caching reduce LCP en 40% para páginas estáticas personalizadas",
    },
    date: "2024-12-05",
    status: "validated",
    metrics: { before: 2.9, after: 1.7, delta: "-41%", unit: "s" },
    reproduction: {
      label: { en: "Open in Stackblitz", es: "Reproducir en Stackblitz" },
      url: "https://stackblitz.com",
      difficulty: "15min",
    },
    learnings: {
      en: [
        "Geo-segmented caching yields better P95 than fixed TTL",
        "Silent revalidation avoids cold starts during campaigns",
      ],
      es: [
        "El cacheo por geosegmentación entrega mejores P95 que TTL fijo",
        "Revalidación silenciosa evita cold starts en campañas",
      ],
    },
    commits: ["a1c4f2d", "b7e91c3"],
  },
  {
    id: "qos-api",
    hypothesis: {
      en: "Circuit breakers reduce errors in bursts > 2k RPM",
      es: "Circuit breakers reducen errores en ráfagas > 2k RPM",
    },
    date: "2025-01-12",
    status: "running",
    metrics: { before: 0.68, after: 0.18, delta: "-73%", unit: "% errors" },
    reproduction: {
      label: { en: "View PoC", es: "Ver PoC" },
      url: "https://stackblitz.com",
      difficulty: "5min",
    },
    learnings: {
      en: [
        "Fallback to internal queue keeps UX acceptable without impacting billing",
        "A saturation dashboard reduces MTTR more than extra logs",
      ],
      es: [
        "El fallback a cola interna mantiene UX aceptable sin afectar billing",
        "Un dashboard de saturación reduce MTTR más que logs adicionales",
      ],
    },
    commits: ["c9e3ad4"],
  },
  {
    id: "glsl-hero",
    hypothesis: {
      en: "GLSL underlay animations don’t impact CLS or TTI",
      es: "Animaciones GLSL con underlay no afectan CLS ni TTI",
    },
    date: "2025-02-02",
    status: "validated",
    metrics: { before: 0.12, after: 0.03, delta: "-75%", unit: "CLS" },
    reproduction: {
      label: { en: "View code", es: "Ver código" },
      url: "https://stackblitz.com",
      difficulty: "30min",
    },
    learnings: {
      en: [
        "Keeping the canvas as underlay with pointer-events-none removes jank",
        "A 2 draw-call budget keeps the main thread free",
      ],
      es: [
        "Separar el canvas en underlay con pointer-events-none elimina jank",
        "Un budget de 2 draw calls mantiene el main thread libre",
      ],
    },
    commits: ["d1f2aa9", "e3bcf78", "f42d0af"],
  },
];

export const ExperimentLog = () => {
  const { t, language } = useLanguage();
  const list = useMemo(() => experiments, []);

  const statusCopy: Record<ExperimentStatus, { label: string; color: string }> = {
    running: { label: t('lab.status.running'), color: "bg-amber-500/15 text-amber-200 border-amber-500/40" },
    validated: { label: t('lab.status.validated'), color: "bg-emerald-500/15 text-emerald-200 border-emerald-500/40" },
    failed: { label: t('lab.status.failed'), color: "bg-rose-500/15 text-rose-200 border-rose-500/40" },
  };

  return (
    <section
      id="experiments-lab"
      className="relative w-full overflow-hidden border-t border-white/10 bg-gradient-to-b from-black via-black to-neutral-950 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(transparent 19px, rgba(255,255,255,0.08) 20px), linear-gradient(90deg, transparent 19px, rgba(255,255,255,0.08) 20px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, rgba(0,0,0,0.75), transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,0.75), transparent 70%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 space-y-10">
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-300">
            <Sparkles className="w-4 h-4" />
            {t('lab.badge')}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">{t('lab.title')}</h2>
          <p className="text-neutral-400 max-w-2xl text-lg md:text-xl leading-relaxed">
            {t('lab.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((exp) => {
            const status = statusCopy[exp.status];
            return (
              <div
                key={exp.id}
                className="border border-white/10 bg-white/[0.03] backdrop-blur-xl rounded-3xl p-6 flex flex-col gap-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <Beaker className="w-4 h-4" />
                    <span className="font-mono">{exp.date}</span>
                  </div>
                  <span className={`text-[11px] px-3 py-1 rounded-full border ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white leading-tight">{exp.hypothesis[language]}</h3>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm text-neutral-300">
                    <span>{t('lab.before')}</span>
                    <span className="font-mono text-white">
                      {exp.metrics.before}
                      {exp.metrics.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-neutral-300">
                    <span>{t('lab.after')}</span>
                    <span className="font-mono text-white">
                      {exp.metrics.after}
                      {exp.metrics.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-emerald-300">
                    <span>{t('lab.delta')}</span>
                    <span className="font-mono">{exp.metrics.delta}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">{t('lab.learnings')}</p>
                  <ul className="space-y-1 text-sm text-neutral-200">
                    {exp.learnings[language].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-emerald-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.commits.map((commit) => (
                    <span key={commit} className="text-xs font-mono px-2 py-1 rounded border border-white/10 text-neutral-300">
                      <GitCommit className="inline w-3 h-3 mr-1" />
                      {commit}
                    </span>
                  ))}
                </div>

                <a
                  href={exp.reproduction.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition"
                >
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    {exp.reproduction.label[language] || t('lab.reproduce')}
                  </div>
                  <span className="text-xs uppercase tracking-[0.18em] text-neutral-600">
                    {exp.reproduction.difficulty}
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
