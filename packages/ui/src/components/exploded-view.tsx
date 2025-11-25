"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/language-context";

type Layer = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  tags: string[];
  accent: string;
  wins: string[];
  metric: { label: string; value: string };
  cta?: { label: string; href: string };
};

const layers: Layer[] = [
  {
    id: "frontend",
    label: "Layer 1",
    title: "Frontend",
    subtitle: "Interfaces that convert on first impression.",
    tags: ["React 19", "Next.js 16", "Tailwind 4", "Motion"],
    accent: "from-sky-400/30 via-sky-300/10 to-transparent",
    wins: [
      "Async-first UX patterns (links, tooltips, skeletons) for remote buyers.",
      "CLS-safe motion + strong type safety for quick iteration.",
    ],
    metric: { label: "Bounce drop", value: "-22%" },
    cta: { label: "View UI walk-through", href: "/portfolio" },
  },
  {
    id: "backend",
    label: "Layer 2",
    title: "Backend",
    subtitle: "Predictable business logic for async pipelines.",
    tags: ["Node.js", "PostgreSQL", "Prisma", "API REST"],
    accent: "from-emerald-400/30 via-emerald-300/10 to-transparent",
    wins: [
      "Contracts-first APIs with zod + OpenAPI for distributed teams.",
      "Circuit breakers & queues to handle bursty traffic without paging.",
    ],
    metric: { label: "MTTR drop", value: "-32%" },
    cta: { label: "See API design notes", href: "/nexastore" },
  },
  {
    id: "infrastructure",
    label: "Layer 3",
    title: "Infrastructure",
    subtitle: "Deploy, observe, and recover without on-site help.",
    tags: ["Docker", "CI/CD", "Vercel", "Security"],
    accent: "from-amber-400/30 via-amber-300/10 to-transparent",
    wins: [
      "Pipelines with preview-per-PR, checks, and feature flags.",
      "Runtime telemetry + synthetic checks to protect SLAs remotely.",
    ],
    metric: { label: "Uptime target", value: "99.9%" },
    cta: { label: "Open SLA dashboard", href: "/sla-dashboard" },
  },
];

export const ExplodedView = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-neutral-950 via-black to-neutral-950 border-t border-white/5 py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05), transparent 35%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.04), transparent 35%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.04), transparent 40%)",
        }}
      />
      <div className="absolute left-1/2 top-24 bottom-16 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 flex flex-col items-center gap-12">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">{t('deconstructed.title')}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Understanding every layer of the stack, from pixel to packet.
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base md:text-lg">
            Built for remote delivery: interfaces that convert, APIs that don’t page you, and infra you can trust from any time zone.
          </p>
        </div>

        <div className="w-full flex flex-col items-center gap-10">
          {layers.map((layer, idx) => (
            <div key={layer.id} className="w-full flex flex-col items-center gap-5">
              {idx > 0 && <div className="h-8 w-px bg-white/12" />}

              <motion.article
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="relative w-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.35)] overflow-hidden"
              >
                <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${layer.accent} pointer-events-none`} />
                <div className="relative flex flex-col gap-6 px-6 py-7 md:px-8 md:py-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-neutral-300">
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white font-semibold">
                      {layer.label}
                    </span>
                    <span className="text-neutral-500">—</span>
                    <span className="text-neutral-400">Remote-ready delivery</span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{layer.title}</h3>
                      <p className="text-lg text-neutral-400">{layer.subtitle}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {layer.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full border border-white/10 bg-black/30 text-sm text-neutral-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      {layer.wins.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-neutral-200">
                          <span className="text-emerald-400 mt-1">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col justify-between border border-white/10 rounded-2xl bg-white/[0.03] px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">{layer.metric.label}</p>
                      <p className="text-2xl font-bold text-white">{layer.metric.value}</p>
                      <p className="text-xs text-neutral-500">Last remote rollout</p>
                    </div>
                  </div>

                  {layer.cta && (
                    <a
                      href={layer.cta.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-neutral-200 transition"
                    >
                      {layer.cta.label}
                      <span className="text-neutral-400">↗</span>
                    </a>
                  )}
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
