# Implementation Plan - GeeksLab Ecosystem

## Phase 1: Monorepo Setup and Infrastructure

- [x] 1. Set up Turborepo monorepo structure
  - Create monorepo root with Turborepo configuration
  - Set up workspace structure: apps/, packages/, infrastructure/
  - Configure shared TypeScript, ESLint, and Tailwind configs in packages/config
  - Migrate existing app/ code to apps/main-hub workspace
  - _Requirements: 16.1, 16.2_
  - ✅ Evidence: root `package.json`, `turbo.json`, `apps/*`, and `packages/*` are live and wired via npm workspaces.

- [x] 2. Extract shared UI components to packages/ui
  - Move reusable components from app/components/ui to packages/ui/src/components
  - Set up package.json for @geekslab/ui package
  - Configure exports and TypeScript paths
  - Update imports in main-hub to use @geekslab/ui
  - _Requirements: 16.1_
  - ✅ Evidence: `packages/ui` hosts the shared library exported via `src/index.tsx`, imported across apps.

- [x] 3. Create shared types package
  - Create packages/types with shared TypeScript interfaces
  - Define SLAData, Experiment, Project, Technology, RFCFormData types
  - Export all types from index.ts
  - _Requirements: 16.1_
  - ✅ Evidence: `packages/types/src/index.ts` defines and exports the shared interfaces.

- [ ] 4. Set up CI/CD pipeline for main-hub
  - Create .github/workflows/main-hub.yml
  - Configure build, test, lint, and deploy steps
  - Set up Vercel deployment with environment variables
  - Configure Lighthouse CI for performance monitoring
  - _Requirements: 16.3, 16.4, 18.4_


## Phase 2: Database and Backend Infrastructure

- [x] 5. Set up PostgreSQL database
  - Configure Vercel Postgres connection
  - Create database schema for RFCs, SLA metrics, and analytics events
  - Set up connection pooling and environment variables
  - _Requirements: 6.5, 6.6, 20.4_
  - ✅ Evidence: `apps/main-hub/db/schema.ts` + `drizzle.config.ts` target Vercel Postgres tables for RFCs, SLA metrics, analytics.

- [ ] 6. Implement database migrations system
  - Set up migration tool (Prisma or raw SQL migrations)
  - Create initial migration with tables: rfcs, sla_metrics, analytics_events
  - Add indexes for performance optimization
  - Document migration process
  - _Requirements: 16.6, 20.4_

- [x] 7. Create API routes for SLA metrics
  - Implement GET /api/sla-metrics endpoint
  - Implement GET /api/sla-metrics/history endpoint
  - Add caching with stale-while-revalidate strategy
  - Integrate with Vercel Analytics API
  - _Requirements: 5.1, 5.2, 5.4, 12.6_
  - ✅ Evidence: `apps/main-hub/app/api/sla-metrics/(history)/route.ts` fetch data via Drizzle with runtime edge handlers.

- [x] 8. Create API routes for RFC system
  - Implement POST /api/rfc/submit endpoint with validation
  - Implement GET /api/rfc/stats endpoint
  - Add rate limiting (5 submissions per IP per hour)
  - Integrate email notifications with Resend
  - _Requirements: 6.1, 6.5, 6.6, 14.4, 20.1_
  - ✅ Evidence: `app/api/rfc/submit` handles validation + rate limiting, `app/api/rfc/stats` aggregates metrics, and Resend support is coded.

- [x] 9. Create API routes for analytics
  - Implement POST /api/analytics/event endpoint
  - Add GDPR compliance (respect DNT, no PII)
  - Store events in database
  - _Requirements: 9.1, 9.2, 9.4, 14.5_
  - ✅ Evidence: `app/api/analytics/event/route.ts` enforces DNT and filters PII before inserting via Drizzle.


## Phase 3: Main Hub Enhancements

- [ ] 10. Enhance Main Hub landing page
  - Update hero section with ecosystem tagline and navigation
  - Integrate real-time SLA metrics display above the fold
  - Add Featured Projects section with links to portfolio subdomain
  - Add Recent Experiments section with links to lab subdomain
  - Add RFC Application CTA section
  - _Requirements: 1.1, 1.2, 1.4, 1.5_

- [x] 11. Implement SLA Badge component with real data
  - Update SLABadge component to fetch from /api/sla-metrics
  - Add auto-refresh every 30 seconds
  - Implement click-to-expand functionality
  - Add loading and error states
  - _Requirements: 5.1, 5.4_
  - ✅ Evidence: `packages/ui/src/components/sla-badge.tsx` polls `/api/sla-metrics`, handles loading/error states, and expands on click.

- [ ] 12. Create SLA Dashboard page
  - Create /sla-dashboard route in main-hub
  - Implement full dashboard with gauges, charts, and status
  - Show metrics for all subdominios
  - Add historical trends visualization
  - Implement real-time updates
  - _Requirements: 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 13. Enhance RFC form with multi-step UI
  - Refactor InverseApplication component to multi-step form
  - Implement Step 1: Company Info with validation
  - Implement Step 2: Project Details with validation
  - Implement Step 3: Work Style with score preview
  - Add progress indicator
  - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - ✅ Evidence: `packages/ui/src/components/inverse-application.tsx` implements the multi-step flow with validation, progress, and scoring.

- [ ] 14. Integrate RFC form with backend
  - Connect form submission to POST /api/rfc/submit
  - Display calculated score and decision letter
  - Show contact info for high scores (>75)
  - Show recommendations for medium scores (55-74)
  - Show alternatives for low scores (<55)
  - _Requirements: 6.5, 6.7, 6.8, 6.9_


## Phase 4: Portfolio Subdomain

- [x] 15. Create portfolio subdomain workspace
  - Create apps/portfolio with Next.js setup
  - Configure DNS for portfolio.geekslab.tech
  - Set up deployment pipeline
  - Add shared UI components from packages/ui
  - _Requirements: 2.1, 16.2, 16.3_
  - ✅ Evidence: `apps/portfolio` workspace runs Next.js with shared UI imports already wired.

- [ ] 16. Implement portfolio project grid
  - Create projects data structure with all required fields
  - Implement grid layout with project cards
  - Add project preview, title, stack, and status
  - Implement technology filter functionality
  - _Requirements: 2.1, 2.6_

- [ ] 17. Implement project detail pages
  - Create dynamic route for /projects/[id]
  - Display description, architecture, challenges, and results
  - Embed functional demos or link to deployments
  - Show code snippets with syntax highlighting
  - Display Lighthouse scores when available
  - Add Learnings section
  - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.7_

- [ ] 18. Add SLA Badge to portfolio footer
  - Integrate SLABadge component in portfolio layout
  - Configure to show portfolio-specific metrics
  - _Requirements: 5.1_


## Phase 5: CV Subdomain

- [x] 19. Create CV subdomain workspace
  - Create apps/cv with Next.js setup
  - Configure DNS for cv.geekslab.tech
  - Set up deployment pipeline
  - Add shared UI components from packages/ui
  - _Requirements: 3.1, 16.2, 16.3_
  - ✅ Evidence: `apps/cv` workspace mirrors Next.js setup and consumes the shared UI package.

- [x] 20. Implement interactive CV components
  - Create CV layout with sections: Summary, Experience, Skills, Education, Certifications
  - Implement Experience timeline with visual dates, companies, roles, and achievements
  - Implement Skills section with categories and expertise indicators
  - Add certification cards with details and verification links
  - _Requirements: 3.1, 3.2, 3.3, 3.6, 3.7_
  - ✅ Evidence: `apps/cv/app/page.tsx` renders the interactive CV layout pulling shared timeline + badges.

- [ ] 21. Implement PDF generation
  - Add PDF generation library (react-pdf or similar)
  - Create PDF template with professional formatting
  - Include clickable links to portfolio, GitHub, LinkedIn
  - Optimize for ATS compatibility
  - Add download button
  - _Requirements: 3.4, 3.5_

- [ ] 22. Add SLA Badge to CV footer
  - Integrate SLABadge component in CV layout
  - Configure to show CV-specific metrics
  - _Requirements: 5.1_


## Phase 6: Lab Subdomain

- [ ] 23. Create lab subdomain workspace
  - Create apps/lab with Next.js setup
  - Configure DNS for lab.geekslab.tech
  - Set up deployment pipeline
  - Add shared UI components from packages/ui
  - _Requirements: 4.1, 16.2, 16.3_

- [ ] 24. Implement experiments gallery
  - Migrate experiments data from app/lib/experiments-data.ts
  - Create gallery layout organized by category
  - Implement experiment cards with preview
  - Add category filter functionality
  - _Requirements: 4.1, 4.2_

- [ ] 25. Implement experiment detail pages
  - Create dynamic route for /experiments/[id]
  - Display hypothesis, methodology, results, and learnings
  - Show metrics comparison (before/after)
  - Add links to postmortem PDFs for failures
  - _Requirements: 4.2, 4.7_

- [ ] 26. Implement Code Playground
  - Integrate Monaco Editor or Sandpack
  - Add syntax highlighting for multiple languages
  - Implement code execution with preview panel
  - Add error handling with clear messages
  - Implement share functionality with URL generation
  - Optimize execution to <500ms
  - _Requirements: 4.3, 4.4, 4.5, 4.6_

- [ ] 27. Add SLA Badge to lab footer
  - Integrate SLABadge component in lab layout
  - Configure to show lab-specific metrics
  - _Requirements: 5.1_


## Phase 7: Cross-Subdomain Features

- [x] 28. Implement unified navigation component
  - Create EcosystemNav component in packages/ui
  - Add links to all subdominios with consistent styling
  - Implement active subdomain highlighting
  - Add keyboard navigation support (Tab and Enter)
  - Ensure logo navigation to Main Hub works from all subdominios
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  - ✅ Evidence: `packages/ui/src/components/ecosystem-nav.tsx` powers the hero navigation linking portfolio/cv/lab.

- [ ] 29. Implement asset preloading strategy
  - Configure Next.js to preload critical assets of other subdominios
  - Add prefetch on hover for subdomain links
  - Optimize for fast transitions between subdominios
  - _Requirements: 8.6_

- [ ] 30. Implement Tech Radar component
  - Create TechRadar component with circular visualization
  - Organize technologies in four quadrants: Languages, Frameworks, Tools, Platforms
  - Position technologies in three rings: Expert, Proficient, Familiar
  - Add hover tooltips with years of experience, projects, and last used date
  - Implement click-to-filter functionality
  - Add "Currently Using" indicator
  - Animate with Framer Motion (max 1s duration)
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

- [ ] 31. Add Tech Radar to main-hub and portfolio
  - Integrate TechRadar component in main-hub
  - Add to portfolio subdomain
  - Connect filter to project showcase
  - _Requirements: 7.1, 7.5_


## Phase 8: Performance Optimization

- [ ] 32. Implement code splitting and lazy loading
  - Configure route-based code splitting (automatic with Next.js)
  - Add dynamic imports for heavy components (CodePlayground, TechRadar)
  - Implement lazy loading for below-fold components
  - Verify bundle size <200KB gzipped per subdomain
  - _Requirements: 12.2, 12.5, 12.7_

- [ ] 33. Optimize images and fonts
  - Convert images to WebP/AVIF with JPEG/PNG fallback
  - Implement responsive image sizes
  - Configure font-display: swap for all fonts
  - Add preload for critical fonts
  - _Requirements: 12.3, 12.4_

- [ ] 34. Implement caching strategies
  - Configure API routes with stale-while-revalidate
  - Set up Redis cache for frequently accessed data
  - Add cache headers for static assets
  - _Requirements: 12.6_

- [ ] 35. Run Lighthouse audits and optimize
  - Run Lighthouse on all subdominios
  - Ensure FCP <1.5s on 4G connection
  - Achieve scores >90 for Performance, Accessibility, Best Practices, SEO
  - Fix any identified issues
  - _Requirements: 12.1, 18.2_


## Phase 9: Accessibility and Responsive Design

- [ ] 36. Implement keyboard navigation
  - Add focus indicators to all interactive elements
  - Implement skip links to main content
  - Add Escape key handler for modals/dropdowns
  - Ensure logical tab order throughout all subdominios
  - _Requirements: 13.1, 13.5_

- [ ] 37. Implement screen reader support
  - Use semantic HTML throughout (header, nav, main, footer, article, section)
  - Add ARIA labels for icon buttons
  - Implement ARIA live regions for dynamic content
  - Add descriptive alt text for all images
  - _Requirements: 13.2, 13.6_

- [ ] 38. Ensure color contrast compliance
  - Audit all text for 4.5:1 contrast ratio (WCAG AA)
  - Ensure large text meets 3:1 ratio
  - Verify UI components meet 3:1 ratio
  - Add non-color indicators where color conveys information
  - _Requirements: 13.3, 13.4_

- [ ] 39. Implement responsive design
  - Adapt layouts for mobile (<768px), tablet, and desktop
  - Implement hamburger menu for mobile navigation
  - Ensure touch targets are minimum 44x44 pixels
  - Implement lazy loading for mobile
  - Handle device rotation without losing state
  - Serve optimized images for slow connections
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [ ] 40. Run accessibility audit
  - Use automated tools to detect WCAG 2.1 AA violations
  - Fix all critical accessibility issues
  - Test with screen readers
  - Verify keyboard navigation works throughout
  - _Requirements: 13.1, 13.2, 18.3_


## Phase 10: SEO and Discoverability

- [ ] 41. Implement SEO meta tags
  - Add complete meta tags (title, description, keywords) to all pages
  - Implement Open Graph tags for social sharing
  - Add Twitter Card tags
  - Ensure unique meta tags per subdomain and page
  - _Requirements: 11.1, 11.4_

- [ ] 42. Implement structured data
  - Add JSON-LD structured data for Person, Organization, WebSite
  - Add CreativeWork schema for projects and experiments
  - Validate structured data with Google's Rich Results Test
  - _Requirements: 11.3_

- [ ] 43. Optimize URLs and sitemap
  - Ensure all URLs are descriptive and SEO-friendly
  - Generate sitemap.xml with all public routes
  - Set up automatic sitemap updates
  - Submit sitemap to Google Search Console
  - _Requirements: 11.5, 11.6_

- [ ] 44. Implement semantic HTML structure
  - Use proper heading hierarchy (h1, h2, h3, etc.)
  - Ensure semantic HTML5 elements throughout
  - Validate HTML structure
  - _Requirements: 11.2_


## Phase 11: Security and Privacy

- [x] 45. Implement input validation
  - Add Zod schemas for all forms (client and server)
  - Implement server-side re-validation for all inputs
  - Add sanitization to prevent XSS and SQL injection
  - _Requirements: 14.2_
  - ✅ Evidence: shared `ApplicationFormSchema` in `packages/ui/src/lib/rfc-scoring.ts` plus server re-validation in `app/api/rfc/submit`.

- [ ] 46. Implement rate limiting
  - Add rate limiting to RFC submissions (5 per IP per hour)
  - Add rate limiting to API calls (100 per IP per minute)
  - Add rate limiting to playground executions (20 per session per minute)
  - _Requirements: 14.4_

- [ ] 47. Implement data encryption
  - Ensure all connections use HTTPS with TLS 1.3
  - Implement AES-256 encryption for sensitive RFC data
  - Store encryption keys securely in environment variables
  - _Requirements: 14.1, 14.3_

- [ ] 48. Implement GDPR compliance
  - Add cookie consent banner for analytics
  - Implement data export API endpoint
  - Implement data deletion API endpoint
  - Respect Do Not Track signals
  - Ensure no PII collection without consent
  - _Requirements: 14.5_


## Phase 12: Monitoring and Observability

- [ ] 49. Set up monitoring infrastructure
  - Configure Vercel Analytics for all subdominios
  - Set up custom SLA metrics collection
  - Implement error tracking with stack traces
  - Configure log aggregation
  - _Requirements: 17.1, 17.2, 17.5_

- [ ] 50. Implement alerting system
  - Set up critical alerts (SMS + Email) for downtime and high error rates
  - Set up warning alerts (Email) for performance degradation
  - Configure info alerts for dashboard
  - _Requirements: 17.3_

- [ ] 51. Create monitoring dashboard
  - Build admin dashboard showing real-time metrics
  - Display metrics for all subdominios
  - Show error logs with context
  - Add incident management interface
  - _Requirements: 17.4, 17.6_


## Phase 13: Content Management

- [ ] 52. Implement markdown-based content system
  - Set up content directory structure for projects and experiments
  - Create markdown parser for project and experiment content
  - Implement validation for required fields
  - Add hot-reload for content changes in development
  - _Requirements: 15.1, 15.2_

- [ ] 53. Implement Tech Radar data management
  - Create JSON file for technologies and expertise levels
  - Add validation schema for Tech Radar data
  - Implement update mechanism
  - _Requirements: 15.3_

- [ ] 54. Implement image optimization pipeline
  - Set up automatic image optimization on upload
  - Generate responsive image variants
  - Add blur placeholders
  - _Requirements: 15.4_

- [ ] 55. Set up CI/CD for content updates
  - Configure GitHub Actions to validate content on commit
  - Set up automatic deployment on content changes
  - Add content validation checks
  - Implement error notifications for invalid content
  - _Requirements: 15.5, 15.6_


## Phase 14: Testing and Quality Assurance

- [ ] 56. Set up testing infrastructure
  - Configure Vitest for unit testing
  - Set up React Testing Library for integration tests
  - Configure Playwright for E2E tests
  - Set up test coverage reporting
  - _Requirements: 18.1_

- [ ]* 57. Write unit tests for utility functions
  - Test RFC scoring logic with various inputs
  - Test SLA metrics calculations
  - Test validation functions
  - Test data formatting utilities
  - Achieve 80% coverage for utility functions
  - _Requirements: 18.1_

- [ ]* 58. Write integration tests for components
  - Test RFC form submission flow
  - Test SLA Badge data fetching and display
  - Test navigation between pages
  - Test Tech Radar interactions
  - _Requirements: 18.1_

- [ ]* 59. Write E2E tests for critical flows
  - Test complete RFC submission flow
  - Test navigation between subdominios
  - Test SLA dashboard updates
  - Test Code Playground execution
  - _Requirements: 18.1_

- [ ]* 60. Write property-based tests
  - **Property 29: Score Component Summation** - For any RFC score calculation, total should equal sum of components with max 100
  - **Property 43: FCP Performance Target** - For any subdomain, FCP should be <1.5s on 4G
  - **Property 49: Bundle Size Limit** - For any subdomain, initial bundle should be <200KB gzipped
  - **Validates: Requirements 6.6, 12.1, 12.7**
  - _Requirements: 6.6, 12.1, 12.7_

- [ ] 61. Run performance tests
  - Run Lighthouse on all subdominios
  - Validate Core Web Vitals thresholds
  - Test bundle sizes
  - _Requirements: 18.2_

- [ ] 62. Run accessibility tests
  - Run automated WCAG 2.1 AA checks
  - Test with screen readers
  - Verify keyboard navigation
  - _Requirements: 18.3_

- [ ] 63. Set up quality metrics dashboard
  - Display test coverage badges
  - Show build status
  - Display security audit results
  - Add Lighthouse scores
  - _Requirements: 18.6_


## Phase 15: Documentation

- [ ] 64. Create architecture documentation
  - Document monorepo structure and organization
  - Create system architecture diagrams
  - Document design decisions and trade-offs
  - Add deployment architecture documentation
  - _Requirements: 19.1, 19.2_

- [ ] 65. Create API documentation
  - Generate OpenAPI specifications for all API routes
  - Add request/response examples
  - Document authentication and rate limiting
  - _Requirements: 19.3_

- [ ] 66. Create component documentation
  - Document all shared UI components
  - Add props documentation
  - Include usage examples
  - Add style guide
  - _Requirements: 19.4_

- [ ] 67. Add code examples and search
  - Add syntax highlighting to code examples
  - Implement copy-to-clipboard functionality
  - Add full-text search to documentation
  - _Requirements: 19.5, 19.6_

- [ ] 68. Create README files
  - Add comprehensive README to monorepo root
  - Add README to each workspace
  - Document setup and development process
  - Add contribution guidelines
  - _Requirements: 19.1_


## Phase 16: Integration and External Services

- [ ] 69. Integrate email service
  - Set up Resend account and API key
  - Implement email templates for RFC notifications
  - Add rate limiting for email sending
  - Test email deliverability
  - _Requirements: 20.1_

- [ ] 70. Integrate uptime monitoring
  - Set up external uptime monitoring service
  - Configure checks every 5 minutes for all subdominios
  - Integrate with SLA metrics system
  - _Requirements: 20.2_

- [ ] 71. Integrate PageSpeed Insights API
  - Set up PageSpeed Insights API access
  - Implement automated performance score collection
  - Add 1-hour cache for results
  - Display scores in SLA dashboard
  - _Requirements: 20.3_

- [ ] 72. Set up database backups
  - Configure automatic daily backups
  - Test backup restoration process
  - Document backup and recovery procedures
  - _Requirements: 20.4_

- [ ] 73. Create public API with documentation
  - Implement REST API for public data
  - Generate OpenAPI documentation
  - Add authentication for protected endpoints
  - _Requirements: 20.5_

- [ ] 74. Implement retry logic for external APIs
  - Add exponential backoff for failed API calls
  - Implement circuit breaker pattern
  - Add fallback mechanisms
  - _Requirements: 20.6_


## Phase 17: Final Polish and Launch

- [ ] 75. Conduct final testing
  - Run full test suite across all subdominios
  - Perform manual testing of critical flows
  - Test on multiple devices and browsers
  - Verify all links and navigation work correctly
  - _Requirements: 18.1_

- [ ] 76. Optimize for production
  - Review and optimize bundle sizes
  - Verify all environment variables are set
  - Check security configurations
  - Review error handling and logging
  - _Requirements: 12.7, 14.1_

- [ ] 77. Set up DNS and SSL
  - Configure DNS records for all subdominios
  - Verify SSL certificates are active
  - Test subdomain routing
  - _Requirements: 16.2_

- [ ] 78. Deploy to production
  - Deploy main-hub to geekslab.tech
  - Deploy portfolio to portfolio.geekslab.tech
  - Deploy cv to cv.geekslab.tech
  - Deploy lab to lab.geekslab.tech
  - Verify all deployments are successful
  - _Requirements: 16.2, 16.3_

- [ ] 79. Set up monitoring and alerts
  - Verify monitoring is active for all subdominios
  - Test alert notifications
  - Set up status page
  - _Requirements: 17.1, 17.3_

- [ ] 80. Final checkpoint - Verify ecosystem is live
  - Ensure all subdominios are accessible
  - Verify SLA metrics are being collected
  - Test RFC submission end-to-end
  - Confirm all critical features are working
  - Celebrate launch! 🚀

