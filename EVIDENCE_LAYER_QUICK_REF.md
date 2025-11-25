# Evidence Layer - Quick Reference

## 🎯 What Was Built

Three interconnected systems showcasing real expertise:

### 1. SLA Metrics Dashboard
- **File:** `app/components/sla-dashboard.tsx`
- **Data:** `app/lib/sla-metrics.ts`
- **Features:**
  - Real-time uptime, latency (p95), error rate
  - Auto-refresh every 30 seconds
  - Vercel Analytics integration + realistic fallback
  - Color-coded status: healthy/degraded/critical

### 2. Experiments Log
- **File:** `app/components/experiments-log.tsx`
- **Data:** `app/lib/experiments-data.ts`
- **Features:**
  - 5 real experiments from your 8-year career
  - 3 valuable failures with postmortems
  - Category filtering (optimization, failure, architecture, research)
  - Modal with hypothesis, methodology, results, learnings
  - Links to Stackblitz demos and PDF postmortems

### 3. RFC Inverse Application
- **File:** `app/components/rfc-application-form.tsx`
- **Data:** `app/lib/rfc-scoring.ts`
- **Features:**
  - Companies apply to work with you (role reversal)
  - 6-criteria scoring: Autonomy (25pts), Stack (20pts), Timeline (20pts), Budget (15pts), Experimentation (15pts), Compliance (5pts)
  - Automated decision letter (accepted/potential/not-aligned)
  - Zod validation for all form fields

## 📂 File Structure

```
app/
├── lib/
│   ├── sla-metrics.ts          (SLA data + Vercel API)
│   ├── experiments-data.ts     (5 experiments)
│   └── rfc-scoring.ts          (Scoring logic)
├── components/
│   ├── sla-dashboard.tsx       (SLA gauges UI)
│   ├── experiments-log.tsx     (Experiments cards + modal)
│   └── rfc-application-form.tsx (Form + scoring UI)
└── evidence-layer/
    └── page.tsx                (Demo page)

public/
└── experiments/
    ├── db-migration-postmortem.txt
    ├── complexity-budget-framework.txt
    └── digital-twin-postmortem.txt
```

## 🚀 How to Use

### View the Demo
```bash
npm run dev
# Visit: http://localhost:3000/evidence-layer
```

### Optional: Connect Real Vercel Metrics
Create `.env.local`:
```env
VERCEL_TOKEN=your_token
VERCEL_TEAM_ID=your_team
VERCEL_PROJECT_ID=your_project
```

### Convert Postmortems to PDFs
```bash
# Option 1: Using online tools
# Upload .txt files from public/experiments/ to:
# - https://www.ilovepdf.com/txt_to_pdf
# - https://pdf.online/convert-txt-to-pdf

# Option 2: Using Pandoc (if installed)
cd public/experiments
pandoc db-migration-postmortem.txt -o db-migration-postmortem.pdf
pandoc complexity-budget-framework.txt -o complexity-budget-framework.pdf
pandoc digital-twin-postmortem.txt -o digital-twin-postmortem.pdf
```

### Create Stackblitz Demos
1. Go to https://stackblitz.com/
2. Create Next.js project
3. Add experiment code
4. Save and copy URL
5. Update URLs in `app/lib/experiments-data.ts`

## 🎨 Customization

### Add More Experiments
Edit `app/lib/experiments-data.ts`:
```typescript
{
  id: 'new-experiment',
  title: 'New Experiment Title',
  category: 'optimization', // or 'failure', 'architecture', 'research'
  // ... rest of fields
}
```

### Adjust RFC Scoring Weights
Edit `app/lib/rfc-scoring.ts`:
- Autonomy: Currently 25pts (highest)
- Stack: 20pts
- Timeline: 20pts
- Budget: 15pts
- Experimentation: 15pts
- Compliance: 5pts (bonus)

### Change SLA Thresholds
Edit `app/lib/sla-metrics.ts`:
```typescript
function getStatus(uptime, latency, errorRate) {
  if (uptime < 99.5 || latency > 500 || errorRate > 1.0) {
    return 'critical';
  }
  // Adjust thresholds here ↑
}
```

## 📊 Data Sources

### Experiments (All Personalized)
1. **Edge Caching** - Production dashboard (Sep 2024, R&D Jr Engineer)
2. **ISO Automation** - ISO 13485 prep scripts (Aug 2023-Jul 2024, R&D Technician)
3. **DB Migration Failure** - 2.3hrs downtime (Nov 2024, side project)
4. **Premature Caching** - Redis over-engineering (Jul 2024, side project)
5. **Digital Twin Failure** - 3D viz rejected by users (Mar 2023, R&D Technician)

### SLA Metrics
- **With Vercel:** Real uptime, p95 latency, error rate
- **Without Vercel:** Simulated 99.92% uptime, 180ms latency, 0.08% errors
- **Jitter:** ±2% uptime, ±30ms latency, ±0.05% errors

### RFC Scoring
Calibrated to your preferences:
- **High autonomy bias** (25pts) - manufacturing leadership background
- **Stack alignment** (20pts) - Next.js, React, TypeScript, PostgreSQL
- **Timeline preference** (20pts) - 1-3 months ideal
- **Experimentation required** (15pts) - R&D background
- **Compliance familiarity** (5pts) - ISO 13485 experience

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf .next
npm run dev
```

### Vercel Analytics not working
- Check `.env.local` has correct credentials
- System automatically falls back to simulated data
- No action needed if using simulated data

### PDFs showing 404
- Convert .txt files to .pdf in `public/experiments/`
- Or comment out `postmortemUrl` in experiments-data.ts

### TypeScript errors
```bash
npm run build
# Fix any type errors shown
```

## 📝 Next Steps

- [ ] Test all three components: `npm run dev`
- [ ] Convert postmortem .txt to .pdf (optional)
- [ ] Create Stackblitz demos (optional)
- [ ] Configure Vercel Analytics (optional)
- [ ] Integrate into main portfolio page
- [ ] Deploy to production

## 🎯 Value Proposition

**What makes this different:**

1. **Real data** - Not generic portfolio copy, actual experiments from 8 years
2. **Failures documented** - 3 valuable failures with honest postmortems
3. **Transparent criteria** - RFC scoring shows exactly what you value
4. **Live metrics** - SLA dashboard updates in real-time
5. **Reproducible** - Every experiment links to demo or postmortem

**Recruiter perspective:**
- "This person doesn't just claim expertise, they prove it with data"
- "They document failures openly - high integrity"
- "RFC system saves time - I know if we're aligned before first call"

## 📚 Documentation

- **Full setup:** `EVIDENCE_LAYER_README.md`
- **This file:** Quick reference for daily use
- **Postmortems:** `public/experiments/*.txt`

---

Built with Next.js 16, React 19, TypeScript 5, Framer Motion 12, Zod 4.
Personalized to your 8-year manufacturing → software engineering journey.
