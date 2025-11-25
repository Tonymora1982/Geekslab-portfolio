"use client";

import {
    AnimatedBadge,
    AnimatedButton,
    AnimatedHeroText,
    AnimatedSkillBadge,
    BentoGrid,
    BentoGridItem,
    DecoderText,
    Meteors,
    ProjectShowcase,
    SLABadge,
    SLAPanel,
    useLanguage,
} from "@geekslab/ui";

const copy = {
    en: {
        hero: {
            badge: "Portfolio built to hire",
            title: "Developer for ambitious teams",
            highlight: "shipping production-grade web",
            copy: "I design and build full-stack products with the discipline of regulated environments and the pace of product teams.",
            availability: "Remote | CET / CST overlap",
            ctaPrimary: "See case studies",
            ctaSecondary: "Book a call",
            signalTag: "Delivery signal",
            signalTitle: "Reliability over flash",
            signalCopy: "R&D background + production practice: I ship outcomes, not prototypes.",
            signalBullets: [
                "Sprints with clear outcomes and risk logs.",
                "Bilingual documentation (EN/ES) and async updates.",
                "SLA mindset: performance budgets, error budgets, uptime owned.",
            ],
        },
        metrics: [
            { label: "Products shipped", value: "14", detail: "Next.js, GraphQL, .NET" },
            { label: "Team impact", value: "+32%", detail: "Cycle time reduction" },
            { label: "Industries", value: "MedTech + SaaS", detail: "Compliance & growth" },
            { label: "Lead time", value: "1-2 w", detail: "From brief to release" },
            { label: "Quality", value: "QA built-in", detail: "Unit + E2E coverage" },
            { label: "Ops", value: "CI/CD", detail: "Docker, Cloudflare" },
        ],
        focus: {
            title: "How I deliver high-signal work",
            kicker: "High-signal approach",
            lead: "From lab-grade rigor to product speed, everything is intentional to reassure hiring managers and users.",
            cards: [
                {
                    id: "outcomes",
                    label: "Case studies",
                    title: "Outcome-first engineering",
                    description: "Each build is tied to a measurable KPI.",
                    className: "md:col-span-2",
                    lines: [
                        "E-commerce: +18% checkout conversion with a headless rebuild.",
                        "QMS: automated ISO13485 evidence layer, zero audit findings.",
                        "Monorepo: developer experience that cut onboarding from days to hours.",
                    ],
                },
                {
                    id: "architecture",
                    label: "Architecture",
                    title: "Pragmatic systems",
                    description: "Balance experimentation with operational safety.",
                    className: "",
                    lines: [
                        "Patterns: monorepos, modular design systems, typed APIs.",
                        "Security: authZ/authN, logging, incident drills.",
                        "Data: Postgres discipline, caching, observability hooks.",
                    ],
                },
                {
                    id: "stack",
                    label: "Stack",
                    title: "Stack that ships",
                    description: "Tools I reach for when shipping fast without breaking trust.",
                    className: "",
                    stack: ["Next.js", "TypeScript", "Node/Express", ".NET", "GraphQL/REST", "Postgres", "Prisma", "SQL", "Redis", "Docker", "CI/CD", "Cloudflare"],
                },
                {
                    id: "delivery",
                    label: "Delivery",
                    title: "Repeatable execution",
                    description: "SLA habits applied to product teams.",
                    className: "md:col-span-2",
                    lines: [
                        "Sprint 0 to de-risk architecture and QA.",
                        "Instrumentation by default: vitals, tracing, budgets.",
                        "Stakeholders get Loom updates and concise changelogs.",
                    ],
                },
            ],
        },
        projects: {
            tagline: "Case studies",
            title: "Projects with measurable impact",
            copy: "Selected work across SaaS, commerce, and regulated products. Each shipped with clear acceptance criteria and instrumentation.",
        },
        closing: {
            tag: "Availability",
            title: "Ready to join as a developer who owns outcomes",
            highlight: "Hire-ready signal",
            copy: "I can lead greenfield builds, untangle refactors, or unlock delivery speed for existing teams.",
            ctaPrimary: "Contact",
            ctaSecondary: "Open CV",
            bullets: [
                "Remote-first, async by design.",
                "Comfortable with compliance-heavy contexts.",
                "Hands-on coding with product sense.",
            ],
            panelTitle: "Signal snapshot",
            signal: [
                "Architected production-ready Next.js platforms.",
                "Bridged R&D and engineering for MedTech compliance.",
                "Mentors teams on delivery rituals and observability.",
            ],
        },
    },
    es: {
        hero: {
            badge: "Portfolio listo para contratar",
            title: "Developer para equipos ambiciosos",
            highlight: "entregando web de nivel productivo",
            copy: "Diseno y construyo productos full-stack con disciplina de industria regulada y el ritmo de un equipo product.",
            availability: "Remoto | solape CET / CST",
            ctaPrimary: "Ver casos",
            ctaSecondary: "Agenda una llamada",
            signalTag: "Senal de entrega",
            signalTitle: "Fiabilidad antes que humo",
            signalCopy: "Background en I+D + experiencia en produccion: entrego resultados, no prototipos.",
            signalBullets: [
                "Sprints con outcomes claros y registro de riesgos.",
                "Documentacion bilingue (EN/ES) y updates async.",
                "Mentalidad SLA: budgets de performance y uptime bajo control.",
            ],
        },
        metrics: [
            { label: "Productos entregados", value: "14", detail: "Next.js, GraphQL, .NET" },
            { label: "Impacto en equipos", value: "+32%", detail: "Menos tiempo de ciclo" },
            { label: "Industrias", value: "MedTech + SaaS", detail: "Compliance y growth" },
            { label: "Lead time", value: "1-2 sem", detail: "De brief a release" },
            { label: "Calidad", value: "QA integrado", detail: "Unit + E2E coverage" },
            { label: "Ops", value: "CI/CD", detail: "Docker, Cloudflare" },
        ],
        focus: {
            title: "Como entrego trabajo de alto impacto",
            kicker: "Enfoque de alto impacto",
            lead: "Rigor de laboratorio con velocidad de producto. Todo intencional para dar confianza a hiring managers y usuarios.",
            cards: [
                {
                    id: "outcomes",
                    label: "Casos",
                    title: "Ingenieria orientada a resultados",
                    description: "Cada entrega amarrada a un KPI medible.",
                    className: "md:col-span-2",
                    lines: [
                        "E-commerce: +18% conversion en checkout con rebuild headless.",
                        "QMS: capa de evidencia ISO13485 automatizada, cero hallazgos.",
                        "Monorepo: DX que bajo onboarding de dias a horas.",
                    ],
                },
                {
                    id: "architecture",
                    label: "Arquitectura",
                    title: "Sistemas pragmaticos",
                    description: "Equilibrio entre explorar y no romper operaciones.",
                    className: "",
                    lines: [
                        "Patrones: monorepos, design systems modulares, APIs tipadas.",
                        "Seguridad: authZ/authN, logging, drills de incidentes.",
                        "Datos: disciplina Postgres, caching y ganchos de observabilidad.",
                    ],
                },
                {
                    id: "stack",
                    label: "Stack",
                    title: "Stack que entrega",
                    description: "Herramientas para mover rapido sin perder confianza.",
                    className: "",
                    stack: ["Next.js", "TypeScript", "Node/Express", ".NET", "GraphQL/REST", "Postgres", "Prisma", "SQL", "Redis", "Docker", "CI/CD", "Cloudflare"],
                },
                {
                    id: "delivery",
                    label: "Delivery",
                    title: "Ejecucion repetible",
                    description: "Habitos de SLA aplicados a producto.",
                    className: "md:col-span-2",
                    lines: [
                        "Sprint 0 para des-riesgar arquitectura y QA.",
                        "Instrumentacion por defecto: vitals, tracing, budgets.",
                        "Stakeholders reciben updates en Loom y changelog conciso.",
                    ],
                },
            ],
        },
        projects: {
            tagline: "Case studies",
            title: "Proyectos con impacto medible",
            copy: "Trabajo seleccionado en SaaS, e-commerce y productos regulados. Cada uno con criterios de aceptacion claros e instrumentacion.",
        },
        closing: {
            tag: "Disponibilidad",
            title: "Listo para entrar como developer dueno de outcomes",
            highlight: "Senal de contratacion",
            copy: "Puedo liderar greenfields, destrabar refactors o acelerar equipos existentes.",
            ctaPrimary: "Contactar",
            ctaSecondary: "Abrir CV",
            bullets: [
                "Remote-first, async por diseno.",
                "Comodo en contextos con compliance.",
                "Hands-on en codigo con criterio de producto.",
            ],
            panelTitle: "Senal en corto",
            signal: [
                "Arquitectura plataformas Next.js listas para produccion.",
                "Puente entre I+D y ingenieria para cumplimiento MedTech.",
                "Mentoria en rituales de delivery y observabilidad.",
            ],
        },
    },
} as const;

export default function PortfolioHome() {
    const { language } = useLanguage();
    const locale = language as keyof typeof copy;
    const t = copy[locale];

    return (
        <main className="relative min-h-screen bg-black text-white overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.08),transparent_35%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.06),transparent_30%)]" />
            <Meteors number={22} className="opacity-40" />

            {/* Hero */}
            <section className="relative max-w-7xl mx-auto px-8 pt-28 pb-24">
                <div className="absolute inset-0 -z-10 blur-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_30%)]" />
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
                    <div className="space-y-8">
                        <div className="flex flex-wrap items-center gap-3">
                            <AnimatedBadge text={t.hero.badge} />
                            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                                {t.hero.availability}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <AnimatedHeroText
                                text={t.hero.title}
                                className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
                            />
                            <div className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-neutral-300 to-neutral-500">
                                <DecoderText text={t.hero.highlight} />
                            </div>
                        </div>

                        <p className="text-neutral-300 text-lg md:text-xl leading-relaxed max-w-3xl">
                            {t.hero.copy}
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <AnimatedButton href="#projects" variant="primary" className="bg-white text-black hover:bg-neutral-200">
                                {t.hero.ctaPrimary}
                            </AnimatedButton>
                            <AnimatedButton
                                href="mailto:contact@geekslab.tech?subject=Portfolio%20intro"
                                variant="secondary"
                                className="border-white/20 text-white"
                            >
                                {t.hero.ctaSecondary}
                            </AnimatedButton>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {t.metrics.map((metric) => (
                                <div
                                    key={metric.label}
                                    className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-4 space-y-2 hover:border-white/30 transition"
                                >
                                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">{metric.label}</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-semibold">{metric.value}</span>
                                    </div>
                                    <p className="text-sm text-neutral-400 leading-relaxed">{metric.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-8 bg-gradient-to-br from-white/10 via-white/5 to-transparent blur-3xl" />
                        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 overflow-hidden">
                            <div className="absolute inset-0 opacity-50">
                                <Meteors number={12} />
                            </div>
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                                            {t.hero.signalTag}
                                        </p>
                                        <h3 className="text-2xl font-semibold">{t.hero.signalTitle}</h3>
                                    </div>
                                    <SLABadge apiUrl="" />
                                </div>
                                <p className="text-neutral-300 text-sm leading-relaxed">{t.hero.signalCopy}</p>
                                <SLAPanel />
                                <div className="grid gap-3">
                                    {t.hero.signalBullets.map((item) => (
                                        <div key={item} className="flex items-start gap-3 text-sm text-neutral-200">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                                            <span className="leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capability / Focus */}
            <section className="relative border-t border-white/10 bg-neutral-950/60 py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="max-w-7xl mx-auto px-8 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div className="space-y-3">
                            <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">{t.focus.kicker}</p>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                                {t.focus.title}
                            </h2>
                        </div>
                        <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">{t.focus.lead}</p>
                    </div>

                    <BentoGrid className="mt-6">
                        {t.focus.cards.map((card) => (
                            <BentoGridItem
                                key={card.id}
                                className={`${card.className ?? ""} bg-neutral-900/80`}
                                title={<span className="text-white text-lg font-semibold">{card.title}</span>}
                                description={<span className="text-neutral-400 text-sm">{card.description}</span>}
                                header={
                                    <div className="h-full w-full border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/5 p-6 flex flex-col gap-4">
                                        <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">{card.label}</p>
                                        {"lines" in card && card.lines && (
                                            <ul className="space-y-3">
                                                {card.lines.map((line: string) => (
                                                    <li key={line} className="flex items-start gap-3 text-sm text-neutral-200 leading-relaxed">
                                                        <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                                                        <span>{line}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {"stack" in card && card.stack && (
                                            <ul className="grid grid-cols-2 gap-3">
                                                {card.stack.map((skill: string, index: number) => (
                                                    <AnimatedSkillBadge key={skill} skill={skill} index={index} />
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                }
                            />
                        ))}
                    </BentoGrid>
                </div>
            </section>

            {/* Projects */}
            <section id="projects" className="relative border-t border-white/10 bg-neutral-950 py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                        <div className="space-y-3">
                            <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">{t.projects.tagline}</p>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{t.projects.title}</h2>
                        </div>
                        <p className="text-neutral-400 max-w-xl leading-relaxed">{t.projects.copy}</p>
                    </div>
                    <ProjectShowcase />
                </div>
            </section>

            {/* Closing CTA */}
            <section className="relative border-t border-white/10 bg-black py-24 md:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.08),transparent_40%)]" />
                <div className="max-w-6xl mx-auto px-8 relative z-10">
                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-14 overflow-hidden">
                        <div className="absolute inset-0 opacity-35 pointer-events-none">
                            <Meteors number={14} />
                        </div>
                        <div className="relative z-10 grid md:grid-cols-[1.25fr_0.75fr] gap-12 items-start">
                            <div className="space-y-6">
                                <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">{t.closing.tag}</p>
                                <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                                    {t.closing.title}
                                </h3>
                                <p className="text-neutral-300 text-lg leading-relaxed">
                                    {t.closing.copy}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <AnimatedButton
                                        href="mailto:contact@geekslab.tech?subject=Hire%20developer"
                                        variant="primary"
                                        className="bg-white text-black hover:bg-neutral-200"
                                    >
                                        {t.closing.ctaPrimary}
                                    </AnimatedButton>
                                    <AnimatedButton
                                        href="https://cv.geekslab.tech"
                                        variant="secondary"
                                        className="border-white/20 text-white"
                                    >
                                        {t.closing.ctaSecondary}
                                    </AnimatedButton>
                                </div>
                                <div className="flex flex-wrap gap-3 text-sm text-neutral-300">
                                    {t.closing.bullets.map((item) => (
                                        <span
                                            key={item}
                                            className="px-3 py-1 rounded-full border border-white/10 bg-white/5"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl border border-white/10 bg-black/60 space-y-4 shadow-lg shadow-black/30">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">{t.closing.highlight}</p>
                                        <p className="text-xl font-semibold"> {t.closing.panelTitle}</p>
                                    </div>
                                    <SLABadge apiUrl="" />
                                </div>
                                <div className="space-y-4">
                                    {t.closing.signal.map((item) => (
                                        <div key={item} className="flex items-start gap-3 text-sm text-neutral-200 leading-relaxed">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
