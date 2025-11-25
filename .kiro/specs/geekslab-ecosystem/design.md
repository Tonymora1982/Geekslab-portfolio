# Design Document - GeeksLab Ecosystem

## Overview

El ecosistema GeeksLab evolucionará de un portfolio monolítico en Next.js hacia una arquitectura de subdominios especializados que demuestre expertise técnico de forma tangible. La arquitectura se basa en un monorepo con workspaces independientes, cada uno desplegado como una aplicación Next.js optimizada para su propósito específico.

### Objetivos Clave

1. **Demostración Tangible de Expertise**: Cada subdominio valida capacidades técnicas específicas con evidencia cuantificable
2. **Experiencia de Usuario Fluida**: Navegación coherente entre subdominios con transiciones rápidas
3. **Performance Excepcional**: Core Web Vitals en verde para todos los subdominios
4. **Mantenibilidad**: Código compartido centralizado, deployments independientes
5. **Escalabilidad**: Arquitectura que permite agregar nuevos subdominios sin refactoring mayor

### Principios de Diseño

- **Evidence-First**: Cada claim técnico debe estar respaldado por métricas o demos funcionales
- **Progressive Enhancement**: Funcionalidad core sin JavaScript, mejoras con JS habilitado
- **Mobile-First**: Diseño responsive desde mobile hacia desktop
- **Accessibility by Default**: WCAG 2.1 AA compliance en todos los componentes
- **Performance Budget**: 200KB gzipped por subdominio, FCP < 1.5s

## Architecture

### High-Level Architecture

```
geekslab-ecosystem/
├── apps/
│   ├── main-hub/          # geekslab.tech
│   ├── portfolio/         # portfolio.geekslab.tech
│   ├── cv/                # cv.geekslab.tech
│   └── lab/               # lab.geekslab.tech
├── packages/
│   ├── ui/                # Shared UI components
│   ├── config/            # Shared configs (ESLint, TS, Tailwind)
│   ├── analytics/         # Analytics utilities
│   ├── sla-metrics/       # SLA monitoring system
│   └── types/             # Shared TypeScript types
└── infrastructure/
    ├── monitoring/        # Observability setup
    └── deployment/        # CI/CD configs
```

### Technology Stack

**Frontend Framework**: Next.js 14+ (App Router)
- Razón: SSR/SSG flexibility, excellent DX, Vercel deployment optimization
- Trade-off: Framework lock-in vs. development velocity

**Styling**: Tailwind CSS v4
- Razón: Zero-runtime CSS, excellent performance, design system consistency
- Trade-off: Utility-first learning curve vs. rapid prototyping

**Animations**: Framer Motion
- Razón: Declarative animations, excellent performance, React integration
- Trade-off: Bundle size (~30KB) vs. animation quality

**Type Safety**: TypeScript 5+
- Razón: Catch errors at compile time, excellent IDE support
- Trade-off: Initial setup complexity vs. long-term maintainability

**Monorepo**: Turborepo
- Razón: Fast builds with caching, excellent DX for monorepos
- Trade-off: Additional tooling vs. build performance

**Deployment**: Vercel
- Razón: Zero-config Next.js deployment, edge network, preview deployments
- Trade-off: Vendor lock-in vs. deployment simplicity

**Monitoring**: Vercel Analytics + Custom SLA System
- Razón: Built-in Core Web Vitals, custom metrics for Evidence Layer
- Trade-off: Cost at scale vs. integrated experience

**Database**: PostgreSQL (Vercel Postgres)
- Razón: Relational data for RFCs, excellent Vercel integration
- Trade-off: Serverless cold starts vs. managed infrastructure

**Email**: Resend
- Razón: Developer-friendly API, excellent deliverability
- Trade-off: Cost per email vs. reliability

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Vercel Edge Network                     │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ geekslab.tech│  │portfolio.    │  │cv.geekslab   │       │
│  │              │  │geekslab.tech │  │.tech         │       │
│  │  Main Hub    │  │              │  │              │       │
│  │  (Next.js)   │  │  Portfolio   │  │  CV          │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                             │
│  ┌──────────────┐                                           │
│  │lab.geekslab  │                                           │
│  │.tech         │                                           │
│  │              │                                           │
│  │  Lab         │                                           │
│  └──────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │  Vercel Postgres        │
              │  (RFCs, Analytics)      │
              └─────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │  External Services      │
              │  - Resend (Email)       │
              │  - PageSpeed Insights   │
              │  - Uptime Monitor       │
              └─────────────────────────┘
```

### Data Flow

1. **Visitor Navigation**: DNS → Vercel Edge → Specific Subdomain App
2. **SLA Metrics Collection**: Each app → Vercel Analytics API → Aggregated Dashboard
3. **RFC Submission**: Form → Validation → Scoring → Database → Email Notification
4. **Content Updates**: Git Push → GitHub Actions → Vercel Build → Deploy

## Components and Interfaces

### Shared UI Components (`packages/ui`)

#### Navigation Components

**`<EcosystemNav />`**
- Props: `currentSubdomain: string`, `theme?: 'light' | 'dark'`
- Renders: Navbar with links to all subdominios, logo, active state
- Behavior: Sticky on scroll, mobile hamburger menu
- Accessibility: Keyboard navigation, ARIA labels

**`<SubdomainLink />`**
- Props: `href: string`, `label: string`, `icon: ReactNode`, `preview?: string`
- Renders: Link with icon, hover preview tooltip
- Behavior: Prefetch on hover, smooth transition
- Accessibility: Focus indicators, descriptive aria-label

#### Evidence Layer Components

**`<SLABadge />`**
- Props: `subdomain?: string`, `compact?: boolean`
- Renders: Badge with uptime, latency, error rate
- Behavior: Auto-refresh every 30s, click to expand details
- Data Source: `/api/sla-metrics?subdomain={subdomain}`

**`<SLADashboard />`**
- Props: `subdomain?: 'all' | string`
- Renders: Full dashboard with gauges, charts, status
- Behavior: Real-time updates, historical trends
- Data Source: `/api/sla-metrics/history`

**`<ExperimentCard />`**
- Props: `experiment: Experiment`, `variant?: 'compact' | 'full'`
- Renders: Card with title, category, results preview
- Behavior: Click to open modal with full details
- Accessibility: Keyboard navigation, screen reader friendly

**`<RFCForm />`**
- Props: `onSubmit: (data: RFCData) => void`
- Renders: Multi-step form with validation
- Behavior: Real-time validation, score preview
- Validation: Zod schema, client + server validation

#### Interactive Components

**`<CodePlayground />`**
- Props: `initialCode?: string`, `language: string`, `readOnly?: boolean`
- Renders: Editor with syntax highlighting, preview panel
- Behavior: Execute code on demand, share via URL
- Libraries: Monaco Editor (VS Code), Sandpack for execution

**`<TechRadar />`**
- Props: `technologies: Technology[]`, `interactive?: boolean`
- Renders: Circular visualization with quadrants and rings
- Behavior: Hover for details, click to filter projects
- Animation: Framer Motion, staggered appearance

### API Routes

#### SLA Metrics API

**`GET /api/sla-metrics`**
- Query Params: `subdomain?: string`
- Response: `{ uptime, latency, errorRate, status, lastUpdated }`
- Caching: 30 seconds stale-while-revalidate
- Data Source: Vercel Analytics API + custom monitoring

**`GET /api/sla-metrics/history`**
- Query Params: `subdomain?: string`, `period?: '24h' | '7d' | '30d'`
- Response: `{ dataPoints: SLAData[] }`
- Caching: 5 minutes
- Data Source: Time-series database (Vercel Postgres)

#### RFC System API

**`POST /api/rfc/submit`**
- Body: `RFCFormData` (validated with Zod)
- Response: `{ score, decision, breakdown, decisionLetter }`
- Side Effects: Store in database, send email if score > 75
- Rate Limiting: 5 submissions per IP per hour

**`GET /api/rfc/stats`**
- Response: `{ totalSubmissions, averageScore, acceptanceRate }`
- Caching: 1 hour
- Access: Public (anonymized data)

#### Analytics API

**`POST /api/analytics/event`**
- Body: `{ event, subdomain, metadata }`
- Response: `{ success: boolean }`
- Privacy: No PII, respects DNT
- Storage: Vercel Analytics + custom events

### Database Schema

```sql
-- RFCs Table
CREATE TABLE rfcs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Company Info
  company_name VARCHAR(255) NOT NULL,
  website VARCHAR(255),
  contact_name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_role VARCHAR(255) NOT NULL,
  
  -- Project Details
  project_title VARCHAR(255) NOT NULL,
  project_description TEXT NOT NULL,
  stack TEXT[] NOT NULL,
  
  -- Work Style
  timeline VARCHAR(50) NOT NULL,
  budget VARCHAR(50) NOT NULL,
  autonomy VARCHAR(50) NOT NULL,
  meeting_frequency VARCHAR(50) NOT NULL,
  
  -- Experimentation
  allows_experimentation BOOLEAN NOT NULL,
  sharing_permission VARCHAR(50) NOT NULL,
  
  -- Compliance
  requires_compliance BOOLEAN NOT NULL,
  compliance_standards TEXT[],
  
  -- Scoring
  total_score INTEGER NOT NULL,
  decision VARCHAR(50) NOT NULL,
  breakdown JSONB NOT NULL,
  
  -- Indexes
  INDEX idx_created_at (created_at DESC),
  INDEX idx_decision (decision),
  INDEX idx_score (total_score DESC)
);

-- SLA Metrics Table
CREATE TABLE sla_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMP DEFAULT NOW(),
  subdomain VARCHAR(50) NOT NULL,
  
  uptime DECIMAL(5,2) NOT NULL,
  latency INTEGER NOT NULL,
  error_rate DECIMAL(5,2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  
  -- Indexes
  INDEX idx_timestamp (timestamp DESC),
  INDEX idx_subdomain_timestamp (subdomain, timestamp DESC)
);

-- Analytics Events Table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMP DEFAULT NOW(),
  
  event_type VARCHAR(100) NOT NULL,
  subdomain VARCHAR(50) NOT NULL,
  page_path VARCHAR(255),
  referrer VARCHAR(255),
  
  -- Session tracking (no PII)
  session_id VARCHAR(255),
  duration_ms INTEGER,
  
  -- Metadata
  metadata JSONB,
  
  -- Indexes
  INDEX idx_timestamp (timestamp DESC),
  INDEX idx_event_subdomain (event_type, subdomain),
  INDEX idx_session (session_id)
);
```

## Data Models

### Core Types

```typescript
// Subdomain identifier
type Subdomain = 'main' | 'portfolio' | 'cv' | 'lab';

// SLA Metrics
interface SLAData {
  uptime: number; // 0-100
  latency: number; // milliseconds (p95)
  errorRate: number; // 0-100
  lastUpdated: Date;
  status: 'healthy' | 'degraded' | 'critical';
}

interface SLAHistory {
  subdomain: Subdomain;
  dataPoints: Array<{
    timestamp: Date;
    uptime: number;
    latency: number;
    errorRate: number;
  }>;
}

// Experiments
interface Experiment {
  id: string;
  title: string;
  subtitle: string;
  date: string; // ISO format
  category: 'optimization' | 'architecture' | 'failure' | 'research';
  tags: string[];
  
  hypothesis: string;
  methodology: string;
  
  results: Array<{
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }>;
  
  demoUrl?: string;
  postmortemUrl?: string;
  
  context: string;
  learnings: string[];
}

// RFC System
interface RFCFormData {
  // Company Info
  companyName: string;
  website?: string;
  contactName: string;
  contactEmail: string;
  contactRole: string;
  
  // Project Details
  projectTitle: string;
  projectDescription: string;
  stack: string[];
  
  // Timeline & Budget
  timeline: '1-2-weeks' | '1-month' | '2-3-months' | '3-6-months' | '6-months-plus';
  budget: 'under-5k' | '5k-10k' | '10k-20k' | '20k-50k' | '50k-plus';
  
  // Work Style
  autonomy: 'low' | 'medium' | 'high' | 'full';
  meetingFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'async';
  
  // Experimentation
  allowsExperimentation: boolean;
  sharingPermission: 'public' | 'anonymized' | 'private';
  
  // Compliance
  requiresCompliance: boolean;
  complianceStandards?: string[];
}

interface RFCScoringResult {
  totalScore: number; // 0-100
  maxScore: number; // 100
  percentage: number; // 0-100
  decision: 'accepted' | 'potential-fit' | 'not-aligned';
  breakdown: {
    autonomy: { score: number; max: number; feedback: string };
    stack: { score: number; max: number; feedback: string };
    timeline: { score: number; max: number; feedback: string };
    budget: { score: number; max: number; feedback: string };
    experimentation: { score: number; max: number; feedback: string };
    compliance: { score: number; max: number; feedback: string };
  };
  recommendations: string[];
  decisionLetter: string;
}

// Tech Radar
interface Technology {
  name: string;
  category: 'languages' | 'frameworks' | 'tools' | 'platforms';
  level: 'expert' | 'proficient' | 'familiar';
  yearsOfExperience: number;
  lastUsed: Date;
  projects: string[]; // Project IDs
  currentlyUsing: boolean;
}

// Projects
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  
  stack: string[];
  category: string;
  
  demoUrl?: string;
  repoUrl?: string;
  
  challenges: string[];
  solutions: string[];
  results: Array<{
    metric: string;
    value: string;
  }>;
  
  learnings: string[];
  
  images: string[];
  
  lighthouse?: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
}

// Analytics
interface AnalyticsEvent {
  eventType: string;
  subdomain: Subdomain;
  pagePath: string;
  referrer?: string;
  sessionId: string;
  durationMs?: number;
  metadata?: Record<string, any>;
}
```

## Error Handling

### Error Categories

1. **Network Errors**: Failed API calls, timeout
2. **Validation Errors**: Invalid form data, schema violations
3. **Authorization Errors**: Unauthorized access attempts
4. **System Errors**: Database failures, external service outages

### Error Handling Strategy

```typescript
// Custom error types
class NetworkError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'NetworkError';
  }
}

class ValidationError extends Error {
  constructor(message: string, public fields: Record<string, string>) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Global error handler
function handleError(error: Error): ErrorResponse {
  if (error instanceof ValidationError) {
    return {
      type: 'validation',
      message: error.message,
      fields: error.fields,
      userMessage: 'Por favor corrige los errores en el formulario',
    };
  }
  
  if (error instanceof NetworkError) {
    return {
      type: 'network',
      message: error.message,
      statusCode: error.statusCode,
      userMessage: 'Error de conexión. Por favor intenta de nuevo.',
    };
  }
  
  // Unknown errors
  console.error('Unexpected error:', error);
  return {
    type: 'system',
    message: 'Internal server error',
    userMessage: 'Algo salió mal. Estamos trabajando en resolverlo.',
  };
}

// Error boundaries for React components
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to monitoring service
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    
    return this.props.children;
  }
}
```

### User-Facing Error Messages

- **Network Errors**: "No pudimos conectar con el servidor. Verifica tu conexión e intenta de nuevo."
- **Validation Errors**: Specific field-level messages (e.g., "Email inválido")
- **System Errors**: "Algo salió mal de nuestro lado. Ya estamos trabajando en resolverlo."
- **Not Found**: "Esta página no existe. ¿Quizás buscabas [sugerencia]?"

## Testing Strategy

### Testing Pyramid

```
        ┌─────────────┐
        │   E2E (5%)  │  Playwright
        ├─────────────┤
        │ Integration │  React Testing Library
        │    (15%)    │
        ├─────────────┤
        │    Unit     │  Vitest
        │    (80%)    │
        └─────────────┘
```

### Unit Testing

**Framework**: Vitest
**Coverage Target**: 80% minimum

**What to Test**:
- Utility functions (scoring logic, validation, formatting)
- React hooks (custom hooks for data fetching, state management)
- Pure components (presentational components without side effects)

**Example**:
```typescript
// rfc-scoring.test.ts
import { describe, it, expect } from 'vitest';
import { scoreApplication } from './rfc-scoring';

describe('RFC Scoring System', () => {
  it('should give maximum score for ideal application', () => {
    const application = {
      autonomy: 'full',
      stack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL'],
      timeline: '2-3-months',
      budget: '20k-50k',
      allowsExperimentation: true,
      sharingPermission: 'public',
      // ... other fields
    };
    
    const result = scoreApplication(application);
    
    expect(result.totalScore).toBeGreaterThanOrEqual(90);
    expect(result.decision).toBe('accepted');
  });
  
  it('should reject applications with low autonomy and unfamiliar stack', () => {
    const application = {
      autonomy: 'low',
      stack: ['Java', 'Spring', 'Oracle'],
      // ... other fields
    };
    
    const result = scoreApplication(application);
    
    expect(result.totalScore).toBeLessThan(55);
    expect(result.decision).toBe('not-aligned');
  });
});
```

### Integration Testing

**Framework**: React Testing Library
**Focus**: Component interactions, data flow

**What to Test**:
- Form submissions with validation
- API route handlers with database
- Component state management
- Navigation between pages

**Example**:
```typescript
// rfc-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RFCForm } from './rfc-form';

describe('RFC Form', () => {
  it('should show validation errors for invalid inputs', async () => {
    render(<RFCForm />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/nombre de empresa requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    });
  });
  
  it('should calculate score and show decision letter', async () => {
    render(<RFCForm />);
    
    // Fill form with valid data
    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: 'Acme Corp' },
    });
    // ... fill other fields
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/score: \d+/i)).toBeInTheDocument();
      expect(screen.getByText(/decision/i)).toBeInTheDocument();
    });
  });
});
```

### End-to-End Testing

**Framework**: Playwright
**Focus**: Critical user journeys

**What to Test**:
- Complete RFC submission flow
- Navigation between subdominios
- SLA dashboard updates
- Code playground execution

**Example**:
```typescript
// rfc-flow.spec.ts
import { test, expect } from '@playwright/test';

test('complete RFC submission flow', async ({ page }) => {
  await page.goto('https://geekslab.tech');
  
  // Navigate to RFC form
  await page.text=Apply RFC' await expect(page).toHa(/.*rfc/);
  
  // Fill form
  await page.fill('[name="companyName"]', 'Acme Corp');
  await page.fill('[name="contactEmail"]', 'recruiter@acme.com');
  // ... fill other fields
  
  // Submit
  await page.click('button:has-text("Submit")');
  
  // Verify decision letter appears
  await expect(page.locator('text=Score:')).toBeVisible();
  await expect(page.locator('text=Decision')).toBeVisible();
});
```

### Performance Testing

**Tool**: Lighthouseresholds**:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

**Automated Checks**:
- Run Lighthouse on every PR
- Block merge if scores below threshold
- Track performance trends over time

### Property-Based Testing

**Framework**: fast-check (JavaScript property testing library)
**Use Cases**: Scoring logic, validation functions, data transformations

**Example**:
```typescript
// rfc-scoriny.test.ts
import { test } from 'vitest';
import * as fc from 'fast-check';
import { scoreApplication } from './rfc-scoring';

test('score should always be between 0 and 100', () => {
  fc.assert(
    fc.property(
      fc.record({
        autonomy: fc.constantFrom('low', 'medium', 'high', 'full'),
        stack: fc.array(fc.string(), { minLength: 1, maxLength: 10 }),
        timeline: fc.constantFrom('1'1-month', '2-3-months', '3-6-months', '6-months-plus'),
        budget: fc.constantFrom('under-5k', '5k-10k', '10k-20k', '20k-50k', '50k-plus'),
        allowsExperimentation: fc.boolean(),
        sharingPermission: fc.constantFrom('public', 'anonymized', 'private'),
        // ... other fields
      }),
      (application) => {
        const result = scoreApplication(application);
        return result.totalScore >= 0 && result.totalScore <= 100;
      }
    )
  );
});
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable ons and machine-verifiable correctness guarantees.*


### Navigation and UI Properties

**Property 1: Subdomain Navigation Consistency**
*For any* subdomain in the ecosystem, the navigation bar should contain links to all other subdominios with consistent styling and structure.
**Validates: Requirements 1.2, 8.1**

**Property 2: Hover Tooltip Display**
*For any* subdomain link in navigation, hovering should display a tooltip with a description of that subdomain's content.
**Validates: Requirements 1.3**

**Property 3: Project Detail Completeness**
*For any* project selected from the portfolio grid, the detail page should include description, architecture, technical challenges, and quantifiable results.
**Validates: Requirements 2.2**

**Property 4: Conditional Demo Embedding**
*For any* project that has a demoUrl field, the project detail page should embed or link to a functional demo.
**Validates: Requirements 2.3**

**Property 5: Code Snippet Highlighting**
*For any* project that includes code snippets, the system should apply syntax highlighting and provide repository links.
**Validates: Requirements 2.4**

**Property 6: Performance Metrics Display**
*For any* project that has Lighthouse scores, the system should display performance, accessibility, best practices, and SEO scores.
**Validates: Requirements 2.5**

**Property 7: Technology Filtering Accuracy**
*For any* technology filter applied to projects, all returned projects should include that technology in their stack array.
**Validates: Requirements 2.6**

**Property 8: Project Learnings Inclusion**
*For any* project displayed, the system should include a "Learnings" section with at least one learning item.
**Validates: Requirements 2.7**

### CV and PDF Generation Properties

**Property 9: PDF Generation Success**
*For any* click on the "Download PDF" button, the system should generate a valid PDF file with CV content.
**Validates: Requirements 3.4**

**Property 10: PDF Link Inclusion**
*For any* generated CV PDF, the document should contain clickeable links to portfolio, GitHub, and LinkedIn.
**Validates: Requirements 3.5**

**Property 11: Certification Detail Display**
*For any* certification clicked, the system should display certification details and verification link when available.
**Validates: Requirements 3.6**

**Property 12: Quantifiable Achievement Format**
*For any* achievement displayed in the CV, the text should include quantifiable metrics (numbers, percentages, or time measurements).
**Validates: Requirements 3.7**

### Lab and Experiments Properties

**Property 13: Experiment Completeness**
*For any* experiment selected, the detail view should include hypothesis, methodology, results, and learnings sections.
**Validates: Requirements 4.2**

**Property 14: Playground Execution Performance**
*For any* code executed in the playground, the system should complete execution and display results in less than 500ms.
**Validates: Requirements 4.4**

**Property 15: Error Message Clarity**
*For any* code that generates errors in the playground, the error message should include line number and description.
**Validates: Requirements 4.5**

**Property 16: Playground State Preservation**
*For any* playground shared via URL, loading that URL should restore the exact code and configuration that was shared.
**Validates: Requirements 4.6**

**Property 17: Failed Experiment Postmortem**
*For any* experiment with category "failure", the system should include a link to a postmortem PDF.
**Validates: Requirements 4.7**

### SLA and Monitoring Properties

**Property 18: Universal SLA Badge Display**
*For any* subdomain in the ecosystem, the footer should display an SLA badge with current uptime, latency, and error rate.
**Validates: Requirements 5.1**

**Property 19: Metrics Aggregation Completeness**
*For any* time period, the centralized dashboard should include metrics from all active subdominios.
**Validates: Requirements 5.2**

**Property 20: Alert Propagation**
*For any* metric that falls outside acceptable range on any subdomain, an alert indicator should appear on the Main Hub.
**Validates: Requirements 5.3**

**Property 21: SLA Detail Navigation**
*For any* click on an SLA badge, the system should navigate to a detail page showing historical metrics and status for each subdomain.
**Validates: Requirements 5.4**

**Property 22: Uptime Calculation Consistency**
*For any* uptime calculation, the system should use exactly 30 days of data with measurements every 5 minutes.
**Validates: Requirements 5.5**

**Property 23: Performance Score Aggregation**
*For any* performance score displayed, the system should use the average of Lighthouse scores from the last 24 hours for that subdomain.
**Validates: Requirements 5.6**

### RFC System Properties

**Property 24: RFC Form Accessibility**
*For any* subdomain, accessing the RFC form should present a multi-step form with real-time validation.
**Validates: Requirements 6.1**

**Property 25: Step 1 Validation Enforcement**
*For any* attempt to proceed from Step 1 with invalid company info, the system should prevent progression and show validation errors.
**Validates: Requirements 6.2**

**Property 26: Step 2 Validation Enforcement**
*For any* attempt to proceed from Step 2 with description < 50 characters or empty stack, the system should prevent progression.
**Validates: Requirements 6.3**

**Property 27: Score Preview Display**
*For any* completion of Step 3, the system should display a preview of the estimated score based on current answers.
**Validates: Requirements 6.4**

**Property 28: RFC Submission Completeness**
*For any* valid RFC submission, the system should calculate a score and generate a personalized decision letter.
**Validates: Requirements 6.5**

**Property 29: Score Component Summation**
*For any* RFC score calculation, the total score should equal the sum of: autonomy + stack + timeline + budget + experimentation + compliance, with maximum of 100.
**Validates: Requirements 6.6**

**Property 30: High Score Contact Display**
*For any* RFC with score > 75, the system should display contact information and calendar availability link.
**Validates: Requirements 6.7**

**Property 31: Medium Score Recommendations**
*For any* RFC with score between 55-74, the system should display specific recommendations for improvement.
**Validates: Requirements 6.8**

**Property 32: Low Score Alternatives**
*For any* RFC with score < 55, the system should offer to connect the recruiter with alternative profiles.
**Validates: Requirements 6.9**

### Tech Radar Properties

**Property 33: Technology Categorization**
*For any* technology in the Tech Radar, it should be assigned to exactly one of four categories: Languages, Frameworks, Tools, or Platforms.
**Validates: Requirements 7.2**

**Property 34: Technology Level Assignment**
*For any* technology in the Tech Radar, it should be positioned in exactly one of three rings: Expert, Proficient, or Familiar.
**Validates: Requirements 7.3**

**Property 35: Technology Tooltip Completeness**
*For any* technology tooltip, it should include years of experience, relevant projects, and last used date.
**Validates: Requirements 7.4**

**Property 36: Technology Filter Accuracy**
*For any* technology selected in the Tech Radar, all filtered projects and experiments should include that technology in their stack.
**Validates: Requirements 7.5**

**Property 37: Animation Duration Limit**
*For any* animation in the Tech Radar, the duration should not exceed 1 second.
**Validates: Requirements 7.6**

**Property 38: Active Technology Indication**
*For any* technology marked as currently using, the system should display a "Currently Using" indicator.
**Validates: Requirements 7.7**

### Cross-Subdomain Properties

**Property 39: Logo Navigation Consistency**
*For any* subdomain, clicking the ecosystem logo should navigate to the Main Hub (geekslab.tech).
**Validates: Requirements 8.3**

**Property 40: Active Subdomain Highlighting**
*For any* subdomain being viewed, that subdomain's link in the navbar should be visually highlighted.
**Validates: Requirements 8.4**

**Property 41: Keyboard Navigation Support**
*For any* navigation element, users should be able to navigate using Tab and activate using Enter.
**Validates: Requirements 8.5**

**Property 42: Asset Preloading**
*For any* subdomain loaded, the system should preload critical assets of other subdominios for fast transitions.
**Validates: Requirements 8.6**

### Performance Properties

**Property 43: FCP Performance Target**
*For any* subdomain, First Contentful Paint should be less than 1.5 seconds on a simulated 4G connection.
**Validates: Requirements 1.6, 12.1**

**Property 44: Code Splitting Implementation**
*For any* route, the system should load only the JavaScript bundles required for that specific route.
**Validates: Requirements 12.2**

**Property 45: Modern Image Format Usage**
*For any* image served, the system should use WebP or AVIF format with JPEG/PNG fallback.
**Validates: Requirements 12.3**

**Property 46: Font Loading Strategy**
*For any* font loaded, the system should use font-display: swap and preload critical fonts.
**Validates: Requirements 12.4**

**Property 47: Below-Fold Lazy Loading**
*For any* component positioned below the fold, the system should lazy load that component.
**Validates: Requirements 12.5**

**Property 48: API Caching Strategy**
*For any* API request, the system should implement stale-while-revalidate caching strategy.
**Validates: Requirements 12.6**

**Property 49: Bundle Size Limit**
*For any* subdomain, the initial JavaScript bundle should be less than 200KB gzipped.
**Validates: Requirements 12.7**

## Deployment Strategy

### Monorepo Structure

```
geekslab-ecosystem/
├── .github/
│   └── workflows/
│       ├── main-hub.yml
│       ├── portfolio.yml
│       ├── cv.yml
│       └── lab.yml
├── apps/
│   ├── main-hub/
│   │   ├── app/
│   │   ├── public/
│   │   ├── package.json
│   │   └── next.config.js
│   ├── portfolio/
│   ├── cv/
│   └── lab/
├── packages/
│   ├── ui/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   └── package.json
│   ├── config/
│   │   ├── eslint/
│   │   ├── typescript/
│   │   └── tailwind/
│   ├── analytics/
│   ├── sla-metrics/
│   └── types/
├── turbo.json
└── package.json
```

### CI/CD Pipeline

**Trigger**: Push to main branch or pull request

**Steps**:
1. **Install Dependencies**: `npm install` with caching
2. **Lint**: Run ESLint on changed files
3. **Type Check**: Run TypeScript compiler
4. **Test**: Run unit and integration tests
5. **Build**: Build affected apps (Turborepo determines which apps changed)
6. **Lighthouse**: Run Lighthouse CI on built apps
7. **Deploy**: Deploy to Vercel (preview for PRs, production for main)

**Example GitHub Action**:
```yaml
name: Main Hub CI/CD

on:
  push:
    branches: [main]
    paths:
      - 'apps/main-hub/**'
      - 'packages/**'
  pull_request:
    paths:
      - 'apps/main-hub/**'
      - 'packages/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint -- --filter=main-hub
      
      - name: Type check
        run: npm run type-check -- --filter=main-hub
      
      - name: Test
        run: npm run test -- --filter=main-hub
      
      - name: Build
        run: npm run build -- --filter=main-hub
      
      - name: Lighthouse CI
        run: npm run lighthouse -- --filter=main-hub
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_MAIN }}
          working-directory: apps/main-hub
```

### DNS Configuration

```
# Main Hub
geekslab.tech → Vercel (main-hub deployment)

# Subdominios
portfolio.geekslab.tech → Vercel (portfolio deployment)
cv.geekslab.tech → Vercel (cv deployment)
lab.geekslab.tech → Vercel (lab deployment)

# CNAME records
portfolio CNAME cname.vercel-dns.com
cv CNAME cname.vercel-dns.com
lab CNAME cname.vercel-dns.com
```

### Environment Variables

**Shared across all apps**:
- `DATABASE_URL`: PostgreSQL connection string
- `RESEND_API_KEY`: Email service API key
- `VERCEL_TOKEN`: For analytics API access
- `NEXT_PUBLIC_ANALYTICS_ID`: Analytics tracking ID

**App-specific**:
- `NEXT_PUBLIC_SUBDOMAIN`: Identifies which subdomain (for analytics)
- `NEXT_PUBLIC_API_URL`: API base URL (for cross-subdomain calls)

## Monitoring and Observability

### Metrics Collection

**Client-Side Metrics** (Vercel Analytics):
- Core Web Vitals (LCP, FID, CLS)
- Page load times
- Route transitions
- Custom events (RFC submissions, playground executions)

**Server-Side Metrics**:
- API response times
- Database query performance
- Error rates
- Request volumes

**Custom SLA Metrics**:
- Uptime per subdomain (5-minute checks)
- Latency p95 per subdomain
- Error rate per subdomain
- Aggregated ecosystem health

### Alerting

**Critical Alerts** (SMS + Email):
- Any subdomain down for > 5 minutes
- Error rate > 5% for > 10 minutes
- Database connection failures

**Warning Alerts** (Email only):
- Latency p95 > 500ms for > 30 minutes
- Error rate > 1% for > 30 minutes
- Lighthouse score drop > 10 points

**Info Alerts** (Dashboard only):
- New RFC submission with score > 75
- Unusual traffic patterns
- Performance degradation < 10%

### Logging Strategy

**Log Levels**:
- `ERROR`: System errors, exceptions, failed requests
- `WARN`: Degraded performance, validation failures
- `INFO`: RFC submissions, significant user actions
- `DEBUG`: Detailed execution flow (dev only)

**Log Structure**:
```typescript
interface LogEntry {
  timestamp: string; // ISO 8601
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
  subdomain: Subdomain;
  message: string;
  context: {
    userId?: string; // Anonymous session ID
    requestId?: string;
    path?: string;
    duration?: number;
    error?: {
      name: string;
      message: string;
      stack?: string;
    };
  };
}
```

**Log Retention**:
- ERROR logs: 90 days
- WARN logs: 30 days
- INFO logs: 7 days
- DEBUG logs: 1 day (dev only)

## Security Considerations

### Input Validation

**Client-Side**: Zod schemas for all forms
**Server-Side**: Re-validate all inputs (never trust client)

**Example**:
```typescript
// Shared schema (packages/types)
export const RFCFormSchema = z.object({
  companyName: z.string().min(2).max(255),
  contactEmail: z.string().email(),
  // ... other fields
});

// Client-side (apps/*/components)
const form = useForm({
  resolver: zodResolver(RFCFormSchema),
});

// Server-side (apps/*/app/api)
export async function POST(request: Request) {
  const body = await request.json();
  const validated = RFCFormSchema.parse(body); // Throws if invalid
  // ... process validated data
}
```

### Rate Limiting

**RFC Submissions**: 5 per IP per hour
**API Calls**: 100 per IP per minute
**Playground Executions**: 20 per session per minute

**Implementation**:
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response('Too many requests', { status: 429 });
  }
  
  // ... process request
}
```

### Data Encryption

**In Transit**: TLS 1.3 for all connections
**At Rest**: AES-256 for sensitive data (RFC contact info)

**Example**:
```typescript
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');

export function encrypt(text: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

export function decrypt(encrypted: string): string {
  const [ivHex, authTagHex, encryptedText] = encrypted.split(':');
  
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const decipher = createDecipheriv(ALGORITHM, KEY, iv);
  
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
```

### GDPR Compliance

**Data Collection**: Only essential data, no PII without consent
**Right to Access**: API endpoint to export user data
**Right to Deletion**: API endpoint to delete user data
**Cookie Consent**: Banner for analytics cookies

**Example**:
```typescript
// API route: /api/gdpr/export
export async function GET(request: Request) {
  const email = request.headers.get('x-user-email');
  
  if (!email) {
    return new Response('Email required', { status: 400 });
  }
  
  const rfcs = await db.rfc.findMany({
    where: { contactEmail: email },
  });
  
  return new Response(JSON.stringify(rfcs, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="data-export-${Date.now()}.json"`,
    },
  });
}

// API route: /api/gdpr/delete
export async function DELETE(request: Request) {
  const email = request.headers.get('x-user-email');
  
  if (!email) {
    return new Response('Email required', { status: 400 });
  }
  
  await db.rfc.deleteMany({
    where: { contactEmail: email },
  });
  
  return new Response('Data deleted', { status: 200 });
}
```

## Performance Optimization Strategies

### Image Optimization

**Strategy**: Next.js Image component with automatic optimization

**Implementation**:
```typescript
import Image from 'next/image';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div>
      <Image
        src={project.image}
        alt={project.title}
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false} // Lazy load by default
        placeholder="blur"
        blurDataURL={project.blurDataUrl}
      />
    </div>
  );
}
```

### Code Splitting

**Strategy**: Route-based splitting + dynamic imports for heavy components

**Implementation**:
```typescript
// Route-based (automatic with Next.js App Router)
// Each page in app/ directory is automatically code-split

// Component-based (manual with dynamic import)
import dynamic from 'next/dynamic';

const CodePlayground = dynamic(() => import('@/components/code-playground'), {
  loading: () => <PlaygroundSkeleton />,
  ssr: false, // Don't render on server (Monaco Editor is client-only)
});

export function ExperimentDetail({ experiment }: Props) {
  return (
    <div>
      {/* ... other content ... */}
      {experiment.hasPlayground && <CodePlayground code={experiment.code} />}
    </div>
  );
}
```

### Caching Strategy

**Static Assets**: Cache-Control: public, max-age=31536000, immutable
**API Responses**: stale-while-revalidate with appropriate TTLs
**Database Queries**: Redis cache for frequently accessed data

**Implementation**:
```typescript
// API route with caching
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subdomain = searchParams.get('subdomain');
  
  const cacheKey = `sla-metrics:${subdomain}`;
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return new Response(JSON.stringify(cached), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  }
  
  // Fetch fresh data
  const metrics = await fetchSLAMetrics(subdomain);
  
  // Cache for 30 seconds
  await redis.set(cacheKey, JSON.stringify(metrics), { ex: 30 });
  
  return new Response(JSON.stringify(metrics), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
    },
  });
}
```

### Database Optimization

**Indexes**: Create indexes on frequently queried columns
**Connection Pooling**: Use Vercel Postgres connection pooling
**Query Optimization**: Use `select` to fetch only needed columns

**Example**:
```typescript
// Bad: Fetches all columns
const rfcs = await db.rfc.findMany();

// Good: Fetches only needed columns
const rfcs = await db.rfc.findMany({
  select: {
    id: true,
    companyName: true,
    totalScore: true,
    decision: true,
    createdAt: true,
  },
  where: {
    decision: 'accepted',
  },
  orderBy: {
    createdAt: 'desc',
  },
  take: 10,
});
```

## Accessibility Implementation

### Keyboard Navigation

**Requirements**:
- All interactive elements focusable with Tab
- Logical tab order (top to bottom, left to right)
- Skip links to main content
- Escape key closes modals/dropdowns

**Implementation**:
```typescript
export function Modal({ isOpen, onClose, children }: Props) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Trap focus within modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      // ... focus trap logic
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      {children}
    </div>
  );
}
```

### Screen Reader Support

**Requirements**:
- Semantic HTML (header, nav, main, footer, article, section)
- ARIA labels for icon buttons
- ARIA live regions for dynamic content
- Alt text for all images

**Implementation**:
```typescript
export function SLABadge({ metrics }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`SLA Status: ${metrics.status}. Uptime: ${metrics.uptime}%. Latency: ${metrics.latency} milliseconds.`}
    >
      <div className="flex items-center gap-2">
        <StatusIcon status={metrics.status} aria-hidden="true" />
        <span className="sr-only">{metrics.status}</span>
        <span aria-label="Uptime">{metrics.uptime}%</span>
        <span aria-label="Latency">{metrics.latency}ms</span>
      </div>
    </div>
  );
}
```

### Color Contrast

**Requirements**:
- Text: 4.5:1 minimum (WCAG AA)
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum

**Implementation**:
```css
/* Tailwind config with accessible colors */
module.exports = {
  theme: {
    extend: {
      colors: {
        // All colors tested for WCAG AA compliance
        primary: {
          DEFAULT: '#0066CC', // 4.54:1 on white
          dark: '#004C99', // 7.04:1 on white
        },
        success: {
          DEFAULT: '#00AA00', // 3.08:1 on white (for large text)
          dark: '#008800', // 4.54:1 on white
        },
        error: {
          DEFAULT: '#CC0000', // 5.39:1 on white
        },
      },
    },
  },
};
```

## Migration Strategy

### Phase 1: Monorepo Setup (Week 1)
- Initialize Turborepo
- Move existing code to `apps/main-hub`
- Extract shared components to `packages/ui`
- Set up CI/CD for main-hub

### Phase 2: Portfolio Subdomain (Week 2-3)
- Create `apps/portfolio` workspace
- Migrate project showcase components
- Implement project detail pages
- Deploy to portfolio.geekslab.tech
- Update navigation in main-hub

### Phase 3: CV Subdomain (Week 4)
- Create `apps/cv` workspace
- Build CV components (timeline, skills, etc.)
- Implement PDF generation
- Deploy to cv.geekslab.tech

### Phase 4: Lab Subdomain (Week 5-6)
- Create `apps/lab` workspace
- Migrate experiments log
- Build Code Playground
- Deploy to lab.geekslab.tech

### Phase 5: Evidence Layer Integration (Week 7)
- Implement SLA badge in all subdominios
- Build centralized SLA dashboard
- Set up monitoring and alerting
- Integrate analytics across subdominios

### Phase 6: RFC System Enhancement (Week 8)
- Enhance RFC form with multi-step UI
- Implement score preview
- Add decision letter generation
- Set up email notifications

### Phase 7: Polish and Optimization (Week 9-10)
- Performance optimization (bundle size, lazy loading)
- Accessibility audit and fixes
- SEO optimization
- Documentation
- Final testing

## Success Metrics

### Technical Metrics
- **Performance**: All subdominios achieve Lighthouse score > 90
- **Uptime**: 99.9% uptime across all subdominios
- **Latency**: p95 < 300ms for all API calls
- **Bundle Size**: < 200KB gzipped per subdomain
- **Test Coverage**: > 80% code coverage

### Business Metrics
- **RFC Submissions**: Track number and quality (average score)
- **Conversion Rate**: % of visitors who submit RFC
- **Engagement**: Time spent on site, pages per session
- **Traffic**: Unique visitors per subdomain
- **Referrals**: Traffic sources (organic search, LinkedIn, etc.)

### User Experience Metrics
- **Core Web Vitals**: All in "Good" range
- **Accessibility**: Zero critical WCAG violations
- **Error Rate**: < 0.2% of requests
- **User Feedback**: Collect via optional feedback form

## Future Enhancements

### Phase 2 Features (Post-MVP)
- **Blog Subdomain**: Technical writing and tutorials
- **API Documentation**: Interactive API docs with try-it-out
- **Community Features**: Comments on experiments, discussions
- **Internationalization**: Spanish and English versions
- **Dark Mode**: System-aware theme switching
- **Advanced Analytics**: Heatmaps, session recordings
- **A/B Testing**: Experiment with different layouts/copy
- **RSS Feed**: Subscribe to new experiments/projects
- **Newsletter**: Email updates for new content
- **Social Proof**: Testimonials, recommendations

### Long-Term Vision
- **Open Source Components**: Extract and publish reusable components
- **Template Marketplace**: Sell portfolio templates based on this design
- **Consulting Services**: Offer portfolio/ecosystem building services
- **Educational Content**: Course on building evidence-based portfolios
- **Community Platform**: Help other developers build similar ecosystems
