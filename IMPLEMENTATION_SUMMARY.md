# Engineering Impact & Evidence Layer

> **TL;DR (Remote-first):** Full Stack Engineer with **8 years in Manufacturing R&D/Ops**. I ship product with metrics, observability, and async practices suited to distributed teams. This portfolio is a **production-grade ecosystem** that shows how I design, monitor, and learn from failures.

---

## The "Evidence Layer" Strategy
Unlike typical portfolios that only show happy paths, this ecosystem includes a dedicated **Evidence Layer** to prove seniority and production readiness through data.

### 1) SLA Metrics Dashboard (Observability)
- Real-time view of uptime, latency (p95), and error rate.
- Shows DevOps mindset: performance after deployment matters.
- Tech: Vercel Analytics API with simulated fallback for dev/demo.

### 2) Experiments Log (Transparency)
- A log of real experiments, including failures with postmortems.
- Example: DB migration rollback (2.3h downtime) documented with recovery steps.

### 3) RFC Inverse Application (Alignment)
- Companies “apply” to work with me; scored by autonomy, stack, timeline.
- Filters for cultural fit early; clarifies working conditions for impact.

### 4) Experience Timeline (Remote Delivery)
- Roles + impact bullets, metrics, and stack pills focused on async delivery.
- Highlights practices: ADRs, OpenAPI, feature flags, CI/CD, telemetry.

---

## Technical Ecosystem (Monorepo, Turbo)

| Component               | Tech Stack                       | Role                                                     |
|-------------------------|----------------------------------|----------------------------------------------------------|
| **@geekslab/main-hub**  | Next.js 16, React 19, Tailwind 4 | Core app, interactive experiences, Evidence Layer        |
| **@geekslab/ui**        | React 19, Framer Motion, Lucide  | Shared Design System & Component Library                 |
| **Infrastructure**      | Vercel / Hostinger               | Hybrid deployment with edge capabilities                 |

---

## Business Value (Background)
- **Risk Management:** ISO 13485 experience → auditable, reliable code.
- **Process Optimization:** Optimize before automating (e.g., -88% prep time).
- **Cost Awareness:** Understand “complexity budget” (see premature Redis caching postmortem).

---

## Quick Links
- Live Demo: `/evidence-layer`
- Experience/Resume: `/cv`
- Contact: `/evidence-layer#rfc`

---

## Next Engineering Priorities
- **Database migrations:** Move Drizzle migrations into source control (`apps/main-hub/drizzle/`) with a documented workflow for reproducible schema changes.
- **Portfolio/Lab depth:** Typed data sources for projects/experiments, filters, and dedicated routes (portfolio cards, lab gallery, code playground).
- **Pipelines & performance:** CI tests + Lighthouse checks; code splitting/lazy loading; a11y tooling to support remote QA.
- **Observability hardening:** Use real SLA data when env vars exist; keep simulated fallback for demos.

---
*Status: Production Ready | Stack: Next.js 16, React 19, TypeScript 5**** End Patch
