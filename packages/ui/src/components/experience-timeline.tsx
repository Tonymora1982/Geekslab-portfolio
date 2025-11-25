"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/language-context";

type Experience = {
  dates: string;
  role: string;
  company: string;
  location: string;
  type: string;
  bullets: string[];
  tech: string[];
};

const experiences: Experience[] = [
  {
    dates: "Jan 2024 — Present",
    role: "Freelance Full Stack Developer",
    company: "GeeksLab",
    location: "Grecia, Costa Rica · Remote (EU/LATAM)",
    type: "Independent",
    bullets: [
      "Architected and shipped production apps with Next.js 16, React 19, Node.js and PostgreSQL — maintaining 99.9% uptime SLA.",
      "Reduced CLS by ~30% and boosted conversion ~12% through A/B testing, UX optimizations, and edge caching strategies.",
      "Established async-first delivery workflow: ADRs, OpenAPI contracts, feature flags, automated testing, and weekly increments.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    dates: "Jun 2025 — Present",
    role: "Technical Administrative Support",
    company: "Grupo INS",
    location: "Costa Rica",
    type: "Full-time",
    bullets: [
      "Automated reporting and validation pipelines using Python/SQL, reducing monthly close time by ~25%.",
      "Built operational dashboards with proactive alerting for distributed teams.",
    ],
    tech: ["Python", "SQL", "Power BI", "Automation"],
  },
  {
    dates: "Sep 2024 — Mar 2025",
    role: "Production Supervisor",
    company: "Establishment Labs",
    location: "Alajuela, Costa Rica",
    type: "Full-time",
    bullets: [
      "Led process standardization with real-time data monitoring; reduced MTTR by ~20% on critical production lines.",
      "Authored digital SOPs and checklists laying groundwork for future automation initiatives.",
    ],
    tech: ["Operations", "Lean", "Data Analysis", "SOPs"],
  },
  {
    dates: "Mar 2018 — Oct 2023",
    role: "R&D Jr. Engineer",
    company: "Establishment Labs",
    location: "Alajuela, Costa Rica",
    type: "Full-time",
    bullets: [
      "Analyzed complex production data to identify bottlenecks using engineering methodologies; improved throughput without CAPEX.",
      "Designed and executed experiments under ISO 13485 compliance, collaborating with QA and production teams.",
      "Developed documentation standards and technical analysis frameworks adopted across R&D department.",
    ],
    tech: ["ISO 13485", "Data Analysis", "Python", "Technical Documentation"],
  },
  {
    dates: "Jun 2017 — Mar 2018",
    role: "CAD Designer",
    company: "Align Technology",
    location: "Heredia, Costa Rica",
    type: "Full-time",
    bullets: [
      "Created 3D/2D models and technical documentation supporting rapid product iterations.",
      "Collaborated with cross-functional engineering teams to optimize design workflows.",
    ],
    tech: ["CAD", "3D Modeling", "Technical Drawing"],
  },
];

export const ExperienceTimeline = () => {
  useLanguage(); // placeholder for future i18n

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-white/8 pointer-events-none" />
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.article
            key={exp.role + exp.dates}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: index * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white/[0.02] border border-white/8 rounded-xl p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
          >
            <div className="absolute left-2 md:left-3 top-6 w-2 h-2 rounded-full bg-white/80" />
            <div className="flex flex-col gap-3 pl-4">
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/90">
                  {exp.type}
                </span>
                <span className="text-neutral-500">—</span>
                <span>{exp.dates}</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl font-semibold text-white">{exp.role}</h3>
                <p className="text-neutral-300 text-sm">{exp.company}</p>
                <p className="text-neutral-500 text-xs">
                  {exp.location}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {exp.tech.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full border border-white/10 bg-black/30 text-neutral-200">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                {exp.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2 text-sm text-neutral-200 leading-relaxed">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};
