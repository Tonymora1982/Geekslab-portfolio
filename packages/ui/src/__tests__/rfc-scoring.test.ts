import { describe, it, expect } from 'vitest';
import {
    scoreApplication,
    generateDecisionLetter,
    exportDecisionLetter,
    ApplicationFormSchema,
    type ApplicationForm,
} from '../lib/rfc-scoring';

/**
 * RFC Scoring System Tests
 * Validates the inverse application scoring logic
 * 
 * @see https://geekslab.tech - Live implementation
 */

// Test fixtures
const createMockApplication = (overrides: Partial<ApplicationForm> = {}): ApplicationForm => ({
    companyName: 'TechCorp',
    website: 'https://techcorp.com',
    contactName: 'John Doe',
    contactEmail: 'john@techcorp.com',
    contactRole: 'CTO',
    projectTitle: 'E-commerce Platform Rebuild',
    projectDescription: 'A complete rebuild of our legacy e-commerce platform using modern technologies. We need performance optimization and better UX.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'],
    timeline: '2-3-months',
    budget: '20k-50k',
    autonomy: 'high',
    meetingFrequency: 'weekly',
    allowsExperimentation: true,
    sharingPermission: 'public',
    requiresCompliance: false,
    ...overrides,
});

describe('ApplicationFormSchema', () => {
    it('should validate a complete valid application', () => {
        const validApp = createMockApplication();
        const result = ApplicationFormSchema.safeParse(validApp);
        expect(result.success).toBe(true);
    });

    it('should reject application with short company name', () => {
        const invalidApp = createMockApplication({ companyName: 'A' });
        const result = ApplicationFormSchema.safeParse(invalidApp);
        expect(result.success).toBe(false);
    });

    it('should reject application with invalid email', () => {
        const invalidApp = createMockApplication({ contactEmail: 'not-an-email' });
        const result = ApplicationFormSchema.safeParse(invalidApp);
        expect(result.success).toBe(false);
    });

    it('should reject application with description too short', () => {
        const invalidApp = createMockApplication({ projectDescription: 'Short desc' });
        const result = ApplicationFormSchema.safeParse(invalidApp);
        expect(result.success).toBe(false);
    });

    it('should reject application with empty stack', () => {
        const invalidApp = createMockApplication({ stack: [] });
        const result = ApplicationFormSchema.safeParse(invalidApp);
        expect(result.success).toBe(false);
    });

    it('should accept application with optional website empty', () => {
        const validApp = createMockApplication({ website: '' });
        const result = ApplicationFormSchema.safeParse(validApp);
        expect(result.success).toBe(true);
    });
});

describe('scoreApplication', () => {
    describe('overall scoring', () => {
        it('should return a score between 0 and 100', () => {
            const app = createMockApplication();
            const result = scoreApplication(app);
            
            expect(result.totalScore).toBeGreaterThanOrEqual(0);
            expect(result.totalScore).toBeLessThanOrEqual(100);
            expect(result.maxScore).toBe(100);
        });

        it('should calculate percentage correctly', () => {
            const app = createMockApplication();
            const result = scoreApplication(app);
            
            expect(result.percentage).toBe(Math.round((result.totalScore / 100) * 100));
        });

        it('should return all breakdown categories', () => {
            const app = createMockApplication();
            const result = scoreApplication(app);
            
            expect(result.breakdown).toHaveProperty('autonomy');
            expect(result.breakdown).toHaveProperty('stack');
            expect(result.breakdown).toHaveProperty('timeline');
            expect(result.breakdown).toHaveProperty('budget');
            expect(result.breakdown).toHaveProperty('experimentation');
            expect(result.breakdown).toHaveProperty('compliance');
        });
    });

    describe('decision thresholds', () => {
        it('should return "accepted" for high-scoring applications (>=75%)', () => {
            // Ideal application: full autonomy, perfect stack, good timeline, high budget
            const idealApp = createMockApplication({
                autonomy: 'full',
                stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
                timeline: '2-3-months',
                budget: '50k-plus',
                allowsExperimentation: true,
                sharingPermission: 'public',
                meetingFrequency: 'async',
            });
            
            const result = scoreApplication(idealApp);
            expect(result.decision).toBe('accepted');
            expect(result.percentage).toBeGreaterThanOrEqual(75);
        });

        it('should return "potential-fit" for medium-scoring applications (55-74%)', () => {
            const mediumApp = createMockApplication({
                autonomy: 'high',        // 20 pts
                stack: ['React', 'TypeScript'], // Good stack match ~15 pts
                timeline: '1-2-weeks',   // 12 pts
                budget: '5k-10k',        // 8 pts
                allowsExperimentation: false, // ~3 pts
                sharingPermission: 'private',
                meetingFrequency: 'daily',
            });
            
            const result = scoreApplication(mediumApp);
            // This combination should land in 55-74% range
            expect(result.percentage).toBeGreaterThanOrEqual(55);
            expect(result.percentage).toBeLessThan(75);
            expect(result.decision).toBe('potential-fit');
        });

        it('should return "not-aligned" for low-scoring applications (<55%)', () => {
            const poorApp = createMockApplication({
                autonomy: 'low',
                stack: ['Cobol', 'Fortran'], // Completely different stack
                timeline: '1-2-weeks',
                budget: 'under-5k',
                allowsExperimentation: false,
                sharingPermission: 'private',
            });
            
            const result = scoreApplication(poorApp);
            expect(result.decision).toBe('not-aligned');
            expect(result.percentage).toBeLessThan(55);
        });
    });

    describe('autonomy scoring', () => {
        it('should give maximum score (25) for full autonomy', () => {
            const app = createMockApplication({ autonomy: 'full' });
            const result = scoreApplication(app);
            expect(result.breakdown.autonomy.score).toBe(25);
        });

        it('should give 20 points for high autonomy', () => {
            const app = createMockApplication({ autonomy: 'high' });
            const result = scoreApplication(app);
            expect(result.breakdown.autonomy.score).toBe(20);
        });

        it('should give 12 points for medium autonomy', () => {
            const app = createMockApplication({ autonomy: 'medium' });
            const result = scoreApplication(app);
            expect(result.breakdown.autonomy.score).toBe(12);
        });

        it('should give 5 points for low autonomy', () => {
            const app = createMockApplication({ autonomy: 'low' });
            const result = scoreApplication(app);
            expect(result.breakdown.autonomy.score).toBe(5);
        });
    });

    describe('stack scoring', () => {
        it('should give maximum score (20) for highly aligned stack', () => {
            const app = createMockApplication({
                stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'PostgreSQL'],
            });
            const result = scoreApplication(app);
            expect(result.breakdown.stack.score).toBe(20);
        });

        it('should give lower score for unfamiliar stack', () => {
            const app = createMockApplication({
                stack: ['Angular', 'Java', 'Oracle'],
            });
            const result = scoreApplication(app);
            expect(result.breakdown.stack.score).toBeLessThan(15);
        });

        it('should handle case-insensitive stack matching', () => {
            const app = createMockApplication({
                stack: ['NEXTJS', 'REACT', 'typescript'],
            });
            const result = scoreApplication(app);
            expect(result.breakdown.stack.score).toBeGreaterThanOrEqual(15);
        });
    });

    describe('timeline scoring', () => {
        it('should prefer 1-3 month timelines', () => {
            const app1Month = createMockApplication({ timeline: '1-month' });
            const app2_3Months = createMockApplication({ timeline: '2-3-months' });
            
            const result1 = scoreApplication(app1Month);
            const result2 = scoreApplication(app2_3Months);
            
            expect(result1.breakdown.timeline.score).toBe(20);
            expect(result2.breakdown.timeline.score).toBe(20);
        });

        it('should give lower score for very short timelines', () => {
            const app = createMockApplication({ timeline: '1-2-weeks' });
            const result = scoreApplication(app);
            expect(result.breakdown.timeline.score).toBe(12);
        });

        it('should give moderate score for very long timelines', () => {
            const app = createMockApplication({ timeline: '6-months-plus' });
            const result = scoreApplication(app);
            expect(result.breakdown.timeline.score).toBe(10);
        });
    });

    describe('budget scoring', () => {
        it('should give maximum score for high budgets', () => {
            const app = createMockApplication({ budget: '50k-plus' });
            const result = scoreApplication(app);
            expect(result.breakdown.budget.score).toBe(15);
        });

        it('should give minimum score for very low budgets', () => {
            const app = createMockApplication({ budget: 'under-5k' });
            const result = scoreApplication(app);
            expect(result.breakdown.budget.score).toBe(3);
        });
    });

    describe('experimentation scoring', () => {
        it('should give high score when experimentation is allowed', () => {
            const app = createMockApplication({
                allowsExperimentation: true,
                sharingPermission: 'public',
                meetingFrequency: 'async',
            });
            const result = scoreApplication(app);
            expect(result.breakdown.experimentation.score).toBe(15);
        });

        it('should give lower score when experimentation is not allowed', () => {
            const app = createMockApplication({
                allowsExperimentation: false,
                sharingPermission: 'private',
                meetingFrequency: 'daily',
            });
            const result = scoreApplication(app);
            expect(result.breakdown.experimentation.score).toBeLessThan(10);
        });
    });

    describe('compliance scoring', () => {
        it('should give max score when no compliance is required', () => {
            const app = createMockApplication({ requiresCompliance: false });
            const result = scoreApplication(app);
            expect(result.breakdown.compliance.score).toBe(5);
        });

        it('should give max score for familiar compliance standards', () => {
            const app = createMockApplication({
                requiresCompliance: true,
                complianceStandards: ['ISO 13485', 'FDA'],
            });
            const result = scoreApplication(app);
            expect(result.breakdown.compliance.score).toBe(5);
        });

        it('should give lower score for unfamiliar compliance standards', () => {
            const app = createMockApplication({
                requiresCompliance: true,
                complianceStandards: ['PCI-DSS', 'FEDRAMP'],
            });
            const result = scoreApplication(app);
            expect(result.breakdown.compliance.score).toBe(2);
        });
    });

    describe('recommendations', () => {
        it('should generate recommendations for low autonomy', () => {
            const app = createMockApplication({ autonomy: 'low' });
            const result = scoreApplication(app);
            expect(result.recommendations).toContain('Considera aumentar autonomía del colaborador');
        });

        it('should generate recommendations for low experimentation', () => {
            const app = createMockApplication({
                allowsExperimentation: false,
                sharingPermission: 'private',
            });
            const result = scoreApplication(app);
            expect(result.recommendations).toContain('Permitir experimentación aumentaría valor del engagement');
        });

        it('should generate no recommendations for ideal applications', () => {
            const idealApp = createMockApplication({
                autonomy: 'full',
                stack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL'],
                timeline: '2-3-months',
                budget: '20k-50k',
                allowsExperimentation: true,
            });
            const result = scoreApplication(idealApp);
            expect(result.recommendations.length).toBe(0);
        });
    });
});

describe('generateDecisionLetter', () => {
    it('should generate acceptance letter for accepted applications', () => {
        const app = createMockApplication({
            autonomy: 'full',
            stack: ['Next.js', 'React', 'TypeScript'],
            budget: '50k-plus',
        });
        const result = scoreApplication(app);
        const letter = generateDecisionLetter(app, result);
        
        expect(letter).toContain(app.contactName);
        expect(letter).toContain(app.projectTitle);
        expect(letter).toContain('entusiasmado');
    });

    it('should generate potential-fit letter for medium applications', () => {
        const app = createMockApplication({
            autonomy: 'medium',
            stack: ['Vue.js'],
            budget: '5k-10k',
        });
        const result = scoreApplication(app);
        const letter = generateDecisionLetter(app, result);
        
        expect(letter).toContain('potencial');
    });

    it('should generate rejection letter for not-aligned applications', () => {
        const app = createMockApplication({
            autonomy: 'low',
            stack: ['Cobol'],
            budget: 'under-5k',
            allowsExperimentation: false,
        });
        const result = scoreApplication(app);
        const letter = generateDecisionLetter(app, result);
        
        expect(letter).toContain('desalineamiento');
    });
});

describe('exportDecisionLetter', () => {
    it('should generate filename with company name and date', () => {
        const app = createMockApplication({ companyName: 'Tech Corp' });
        const result = scoreApplication(app);
        const { filename, content } = exportDecisionLetter(app, result);
        
        expect(filename).toMatch(/^decision-tech-corp-\d{4}-\d{2}-\d{2}\.txt$/);
        expect(content.length).toBeGreaterThan(0);
    });

    it('should handle company names with special characters', () => {
        const app = createMockApplication({ companyName: 'Tech & Corp Inc.' });
        const result = scoreApplication(app);
        const { filename } = exportDecisionLetter(app, result);
        
        // Filename uses simple replace, just verify it's valid
        expect(filename).toMatch(/^decision-.*\.txt$/);
        expect(filename).toContain('tech');
    });
});
