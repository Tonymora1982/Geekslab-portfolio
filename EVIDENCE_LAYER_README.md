# Recruiter Evidence Layer - Setup Instructions

## 🎯 Overview
Three systems implemented to showcase expertise with real data:
1. **SLA Metrics** - Real-time performance monitoring
2. **Experiments Log** - 5 real experiments (3 successes + 2 valuable failures)
3. **RFC Inverse Application** - Companies apply to work with you

## 📁 Files Created

### TypeScript Modules (`app/lib/`)
- `sla-metrics.ts` - Vercel Analytics integration + realistic fallback
- `experiments-data.ts` - 5 experiments from your 8-year career
- `rfc-scoring.ts` - Scoring system (autonomy 25pts, stack 20pts, etc.)

### React Components (`app/components/`)
- `sla-dashboard.tsx` - Real-time SLA gauges (updates every 30s)
- `experiments-log.tsx` - Filterable experiment cards with modal details
- `rfc-application-form.tsx` - Multi-step form with Zod validation

### Pages
- `app/evidence-layer/page.tsx` - Demo page showcasing all three systems

## 🚀 Quick Start

### 1. Install Dependencies (already installed)
```bash
npm install
# All dependencies already present in package.json
```

### 2. Optional: Configure Real Vercel Metrics
Create `.env.local` in project root:
```env
VERCEL_TOKEN=your_token_here
VERCEL_TEAM_ID=your_team_id
VERCEL_PROJECT_ID=your_project_id
```

**How to get Vercel credentials:**
1. Go to https://vercel.com/account/tokens
2. Create new token with "Read" scope
3. Get Team ID from team settings URL
4. Get Project ID from project settings

**Without these vars:** System uses realistic simulated data with jitter.

### 3. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000/evidence-layer

### 4. Create Postmortem PDFs (Optional)
The experiments link to three postmortem PDFs. Create them at:
- `public/experiments/db-migration-postmortem.pdf`
- `public/experiments/complexity-budget-framework.pdf`
- `public/experiments/digital-twin-postmortem.pdf`

**Quick mockup template:**
```
Title: [Experiment Title]
Date: [Date]
Duration: [Timeline]

## What Happened
[Describe the failure]

## Root Cause
[Technical explanation]

## Impact
- Metric 1: [Value]
- Metric 2: [Value]

## Learnings
1. [Learning 1]
2. [Learning 2]

## Action Items
- [Action 1]
- [Action 2]
```

### 5. Create Real Stackblitz Demos (Optional)
Replace placeholder URLs in `experiments-data.ts`:
- `nextjs-edge-caching-experiment` - Demo of edge caching implementation
- `db-migration-rollback-demo` - Interactive migration failure demo
- `caching-complexity-comparison` - Before/after comparison

**Quick Stackblitz setup:**
1. Go to https://stackblitz.com/
2. Create Next.js project
3. Add relevant experiment code
4. Save and get share URL
5. Update URLs in `experiments-data.ts`

## 🎨 Customization

### Adjust SLA Thresholds
Edit `app/lib/sla-metrics.ts`:
```typescript
function getStatus(uptime, latency, errorRate) {
  // Critical thresholds
  if (uptime < 99.5 || latency > 500 || errorRate > 1.0) {
    return 'critical';
  }
  // Adjust these values ↑
}
```

### Add More Experiments
Edit `app/lib/experiments-data.ts`:
```typescript
export const experiments: Experiment[] = [
  {
    id: 'new-experiment',
    title: 'Your New Experiment',
    category: 'optimization', // or 'failure', 'architecture', 'research'
    // ... rest of fields
  },
  // ... existing experiments
];
```

### Modify RFC Scoring Weights
Edit `app/lib/rfc-scoring.ts`:
```typescript
// Current weights:
// Autonomy: 25pts (highest priority)
// Stack: 20pts
// Timeline: 20pts
// Budget: 15pts
// Experimentation: 15pts
// Compliance: 5pts

// Adjust in respective scoring functions
```

## 🔗 Integration with Portfolio

### Option 1: Dedicated Route (Current)
Already accessible at `/evidence-layer`

### Option 2: Integrate into Main Page
Add to `app/page.tsx`:
```typescript
import { SLADashboard } from '@/app/components/sla-dashboard';
import { ExperimentsLog } from '@/app/components/experiments-log';

export default function Home() {
  return (
    <>
      {/* Your existing hero */}
      
      {/* Add systems */}
      <section id="sla">
        <SLADashboard />
      </section>
      
      <section id="experiments">
        <ExperimentsLog />
      </section>
    </>
  );
}
```

### Option 3: Add Navigation Link
Edit your navigation component:
```typescript
<Link href="/evidence-layer">
  Evidence Layer
</Link>
```

## 📊 Data Sources

### Real Data (Vercel Analytics)
- Uptime: Calculated from deployment success rate
- Latency: p95 from Vercel Analytics API
- Error Rate: From Vercel Analytics

### Simulated Data (Fallback)
- Uptime: 99.92% ± 2% jitter
- Latency: 180ms ± 30ms jitter
- Error Rate: 0.08% ± 0.05% jitter

All values calibrated to realistic Next.js static export performance.

## 🧪 Testing

### Test SLA Dashboard
1. Check auto-refresh (every 30s)
2. Verify status badges (healthy/degraded/critical)
3. Test with/without Vercel credentials

### Test Experiments Log
1. Filter by category (all, optimization, failure, etc.)
2. Click experiment cards to open modal
3. Test "Reproducir" and "Postmortem" links

### Test RFC Application
1. Fill form with invalid data → check validation errors
2. Submit valid application → check scoring breakdown
3. Test different autonomy levels → verify scoring weights
4. View decision letter → check personalization

## 🚢 Production Build
```bash
npm run build
npm run start
```

For static export (Hostinger deployment):
```bash
npm run build
# Deploy 'out' folder to Hostinger
```

## 📝 Notes

### Performance
- SLA Dashboard: Client component, auto-refresh every 30s
- Experiments Log: Client component, animations with Framer Motion
- RFC Form: Client component, Zod validation (no server required)

### Type Safety
All modules fully typed with TypeScript. No `any` types used.

### Accessibility
- Form labels with required indicators
- Error messages for all validations
- Keyboard navigation support

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled (client components)

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Vercel Analytics not working
- Check environment variables are set
- Verify token has "Read" scope
- Check project ID matches deployed project
- System automatically falls back to simulated data

### PDF links show 404
- Create PDF files in `public/experiments/`
- Or comment out `postmortemUrl` in experiments-data.ts

### Stackblitz embeds not loading
- Replace placeholder URLs with real Stackblitz projects
- Or remove `demoUrl` to hide "Reproducir" button

## 📚 Resources

- [Vercel Analytics API Docs](https://vercel.com/docs/analytics/api)
- [Zod Validation](https://zod.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## 🎯 Next Steps

1. ✅ Systems implemented
2. ⏳ Create postmortem PDFs
3. ⏳ Create Stackblitz demos
4. ⏳ Configure Vercel Analytics (optional)
5. ⏳ Integrate into main portfolio page
6. ⏳ Deploy to production

---

Built with Next.js 16, React 19, TypeScript 5, and Framer Motion.
Personalized to 8 years manufacturing → software engineering journey.
