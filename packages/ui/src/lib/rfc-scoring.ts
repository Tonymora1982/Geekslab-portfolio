/**
 * RFC Scoring System
 * Inverse application: Companies apply to work with you
 * Calibrated to preferences from manufacturing leadership background
 */

import { z } from 'zod';

/**
 * Application Form Schema
 * Validation for company applications
 */
export const ApplicationFormSchema = z.object({
    // Company Info
    companyName: z.string().min(2, 'Nombre de empresa requerido'),
    website: z.string().url('URL inválida').optional().or(z.literal('')),

    // Contact
    contactName: z.string().min(2, 'Nombre de contacto requerido'),
    contactEmail: z.string().email('Email inválido'),
    contactRole: z.string().min(2, 'Rol requerido'),

    // Project Details
    projectTitle: z.string().min(5, 'Título muy corto (mín. 5 caracteres)'),
    projectDescription: z.string().min(50, 'Descripción muy corta (mín. 50 caracteres)'),

    // Technical Stack
    stack: z.array(z.string()).min(1, 'Especifica al menos una tecnología'),

    // Timeline & Budget
    timeline: z.enum(['1-2-weeks', '1-month', '2-3-months', '3-6-months', '6-months-plus'], {
        message: 'Selecciona una duración',
    }),
    budget: z.enum(['under-5k', '5k-10k', '10k-20k', '20k-50k', '50k-plus'], {
        message: 'Selecciona un rango de presupuesto',
    }),

    // Work Style
    autonomy: z.enum(['low', 'medium', 'high', 'full'], {
        message: 'Indica nivel de autonomía',
    }),
    meetingFrequency: z.enum(['daily', 'weekly', 'biweekly', 'monthly', 'async'], {
        message: 'Indica frecuencia de sincronización',
    }),

    // Experimentation & Learning
    allowsExperimentation: z.boolean({
        message: 'Indica si permites experimentación',
    }),
    sharingPermission: z.enum(['public', 'anonymized', 'private'], {
        message: 'Indica permisos de compartir',
    }),

    // Compliance (manufacturing background consideration)
    requiresCompliance: z.boolean({
        message: 'Indica si requiere cumplimiento normativo',
    }),
    complianceStandards: z.array(z.string()).optional(),
});

export type ApplicationForm = z.infer<typeof ApplicationFormSchema>;

/**
 * Scoring Breakdown
 */
export interface ScoringResult {
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
}

/**
 * Preferred stack (from portfolio tech)
 */
const PREFERRED_STACK = [
    'next.js',
    'nextjs',
    'react',
    'typescript',
    'ts',
    'node.js',
    'nodejs',
    'postgresql',
    'postgres',
    'tailwind',
    'tailwindcss',
    'vercel',
    'python',
    'three.js',
    'threejs',
    'framer-motion',
    'framer',
];

/**
 * Known compliance standards (from manufacturing background)
 */
const KNOWN_COMPLIANCE_STANDARDS = [
    'iso 13485',
    'iso 9001',
    'fda',
    'gdpr',
    'hipaa',
    'sox',
    'iso 27001',
];

/**
 * Score autonomy level
 * Critical: Reflects preference from manufacturing leadership roles
 * Weight: 25 points (highest)
 */
function scoreAutonomy(autonomy: string): { score: number; feedback: string } {
    switch (autonomy) {
        case 'full':
            return {
                score: 25,
                feedback: '✅ Autonomía completa alineada con preferencia de trabajo',
            };
        case 'high':
            return {
                score: 20,
                feedback: '✅ Alta autonomía, buen balance con check-ins estratégicos',
            };
        case 'medium':
            return {
                score: 12,
                feedback: '⚠️ Autonomía media puede requerir más sincronización de la preferida',
            };
        case 'low':
            return {
                score: 5,
                feedback: '❌ Baja autonomía no alineada con estilo de trabajo preferido',
            };
        default:
            return { score: 0, feedback: 'Sin información' };
    }
}

/**
 * Score technical stack alignment
 * Weight: 20 points
 */
function scoreStack(stack: string[]): { score: number; feedback: string } {
    const normalizedStack = stack.map((s) => s.toLowerCase());
    const matches = normalizedStack.filter((tech) =>
        PREFERRED_STACK.some((preferred) => tech.includes(preferred) || preferred.includes(tech))
    );

    const matchRate = stack.length > 0 ? matches.length / stack.length : 0;

    if (matchRate >= 0.7) {
        return {
            score: 20,
            feedback: `✅ Stack altamente alineado (${matches.length}/${stack.length} tecnologías coinciden)`,
        };
    } else if (matchRate >= 0.4) {
        return {
            score: 15,
            feedback: `✅ Stack parcialmente alineado (${matches.length}/${stack.length} coinciden)`,
        };
    } else if (matchRate >= 0.2) {
        return {
            score: 8,
            feedback: `⚠️ Stack poco familiar (${matches.length}/${stack.length} coinciden)`,
        };
    } else {
        return {
            score: 3,
            feedback: '❌ Stack fuera de expertise actual',
        };
    }
}

/**
 * Score timeline
 * Preference: 1-3 months (sweet spot for experiments + delivery)
 * Weight: 20 points
 */
function scoreTimeline(timeline: string): { score: number; feedback: string } {
    switch (timeline) {
        case '1-month':
        case '2-3-months':
            return {
                score: 20,
                feedback: '✅ Timeline ideal para iteración + entrega con calidad',
            };
        case '1-2-weeks':
            return {
                score: 12,
                feedback: '⚠️ Timeline muy corto, riesgo de sacrificar experimentación',
            };
        case '3-6-months':
            return {
                score: 15,
                feedback: '✅ Timeline largo permite investigación profunda',
            };
        case '6-months-plus':
            return {
                score: 10,
                feedback: '⚠️ Proyectos muy largos pueden requerir estructura de equipo',
            };
        default:
            return { score: 0, feedback: 'Sin información' };
    }
}

/**
 * Score budget
 * Preference: Suficiente para experimentación sin presión extrema
 * Weight: 15 points
 */
function scoreBudget(budget: string): { score: number; feedback: string } {
    switch (budget) {
        case '20k-50k':
        case '50k-plus':
            return {
                score: 15,
                feedback: '✅ Presupuesto permite experimentación + infraestructura robusta',
            };
        case '10k-20k':
            return {
                score: 12,
                feedback: '✅ Presupuesto adecuado para proyectos scope-controlled',
            };
        case '5k-10k':
            return {
                score: 8,
                feedback: '⚠️ Presupuesto ajustado, scope debe ser muy definido',
            };
        case 'under-5k':
            return {
                score: 3,
                feedback: '❌ Presupuesto muy bajo para proyectos con experimentación',
            };
        default:
            return { score: 0, feedback: 'Sin información' };
    }
}

/**
 * Score experimentation & sharing permissions
 * Critical: Reflects R&D background and learning-focused approach
 * Weight: 15 points
 */
function scoreExperimentation(
    allowsExperimentation: boolean,
    sharingPermission: string,
    meetingFrequency: string
): { score: number; feedback: string } {
    let score = 0;
    const feedback: string[] = [];

    // Experimentation allowance (10 pts)
    if (allowsExperimentation) {
        score += 10;
        feedback.push('✅ Permite experimentación (clave para R&D)');
    } else {
        score += 3;
        feedback.push('⚠️ Sin experimentación limita aprendizaje');
    }

    // Sharing permission (3 pts)
    if (sharingPermission === 'public') {
        score += 3;
        feedback.push('✅ Permite compartir aprendizajes públicamente');
    } else if (sharingPermission === 'anonymized') {
        score += 2;
        feedback.push('✅ Permite compartir de forma anónima');
    } else {
        score += 0;
        feedback.push('⚠️ Resultados privados (menos aprendizaje público)');
    }

    // Meeting frequency bonus (2 pts)
    if (meetingFrequency === 'async' || meetingFrequency === 'weekly') {
        score += 2;
        feedback.push('✅ Frecuencia de reuniones balanceada');
    }

    return { score, feedback: feedback.join(' • ') };
}

/**
 * Score compliance requirements
 * Bonus: Experience from ISO 13485 manufacturing background
 * Weight: 5 points (bonus category)
 */
function scoreCompliance(
    requiresCompliance: boolean,
    complianceStandards?: string[]
): { score: number; feedback: string } {
    if (!requiresCompliance) {
        return {
            score: 5,
            feedback: '✅ Sin requisitos de compliance (agilidad máxima)',
        };
    }

    // Check if standards are familiar
    const normalizedStandards = (complianceStandards || []).map((s) => s.toLowerCase());
    const knownStandards = normalizedStandards.filter((std) =>
        KNOWN_COMPLIANCE_STANDARDS.some((known) => std.includes(known) || known.includes(std))
    );

    if (knownStandards.length > 0) {
        return {
            score: 5,
            feedback: `✅ Compliance familiar: ${knownStandards.join(', ')} (experiencia ISO 13485)`,
        };
    }

    return {
        score: 2,
        feedback: '⚠️ Compliance requerido pero estándares no familiares',
    };
}

/**
 * Main scoring function
 * Returns detailed breakdown + final decision
 */
export function scoreApplication(application: ApplicationForm): ScoringResult {
    const autonomyResult = scoreAutonomy(application.autonomy);
    const stackResult = scoreStack(application.stack);
    const timelineResult = scoreTimeline(application.timeline);
    const budgetResult = scoreBudget(application.budget);
    const experimentationResult = scoreExperimentation(
        application.allowsExperimentation,
        application.sharingPermission,
        application.meetingFrequency
    );
    const complianceResult = scoreCompliance(
        application.requiresCompliance,
        application.complianceStandards
    );

    const totalScore =
        autonomyResult.score +
        stackResult.score +
        timelineResult.score +
        budgetResult.score +
        experimentationResult.score +
        complianceResult.score;

    const maxScore = 100;
    const percentage = Math.round((totalScore / maxScore) * 100);

    // Decision thresholds
    let decision: 'accepted' | 'potential-fit' | 'not-aligned';
    if (percentage >= 75) {
        decision = 'accepted';
    } else if (percentage >= 55) {
        decision = 'potential-fit';
    } else {
        decision = 'not-aligned';
    }

    // Generate recommendations
    const recommendations: string[] = [];
    if (autonomyResult.score < 15) {
        recommendations.push('Considera aumentar autonomía del colaborador');
    }
    if (stackResult.score < 12) {
        recommendations.push('Alineación de stack puede requerir tiempo de ramp-up');
    }
    if (experimentationResult.score < 10) {
        recommendations.push('Permitir experimentación aumentaría valor del engagement');
    }
    if (timelineResult.score < 12) {
        recommendations.push('Ajustar timeline para balance entre velocidad y calidad');
    }
    if (budgetResult.score < 8) {
        recommendations.push('Presupuesto puede limitar scope o experimentación');
    }

    return {
        totalScore,
        maxScore,
        percentage,
        decision,
        breakdown: {
            autonomy: { score: autonomyResult.score, max: 25, feedback: autonomyResult.feedback },
            stack: { score: stackResult.score, max: 20, feedback: stackResult.feedback },
            timeline: { score: timelineResult.score, max: 20, feedback: timelineResult.feedback },
            budget: { score: budgetResult.score, max: 15, feedback: budgetResult.feedback },
            experimentation: { score: experimentationResult.score, max: 15, feedback: experimentationResult.feedback },
            compliance: { score: complianceResult.score, max: 5, feedback: complianceResult.feedback },
        },
        recommendations,
    };
}

/**
 * Generate acceptance/rejection letter
 */
export function generateDecisionLetter(
    application: ApplicationForm,
    result: ScoringResult
): string {
    const { companyName, contactName, projectTitle } = application;
    const { decision, percentage } = result;

    if (decision === 'accepted') {
        return `Hola ${contactName},

¡Gracias por tu interés en colaborar en "${projectTitle}"!

Después de revisar los detalles del proyecto, estoy entusiasmado de confirmar que hay un excelente fit (${percentage}% de alineación). El proyecto se alinea muy bien con mi estilo de trabajo, stack técnico y preferencias de colaboración.

Lo que más me entusiasma:
${result.breakdown.autonomy.score >= 20 ? '• Alta autonomía que permitirá explorar soluciones creativas' : ''}
${result.breakdown.stack.score >= 15 ? '• Stack técnico completamente alineado con mi expertise' : ''}
${result.breakdown.experimentation.score >= 10 ? '• Oportunidad de experimentación y aprendizaje' : ''}
${result.breakdown.timeline.score >= 15 ? '• Timeline que permite iteración con calidad' : ''}

Me encantaría agendar una llamada para discutir detalles y comenzar a planear el kickoff.

¡Hablemos pronto!
Saludos`;
    }

    if (decision === 'potential-fit') {
        return `Hola ${contactName},

Gracias por compartir los detalles de "${projectTitle}".

El proyecto tiene potencial interesante (${percentage}% de alineación), pero hay algunos aspectos que valdría la pena alinear mejor antes de comprometernos:

${result.recommendations.map((r) => `• ${r}`).join('\n')}

Si hay flexibilidad en estos aspectos, me encantaría explorar cómo podemos hacer que el engagement funcione para ambos. De lo contrario, puedo recomendarte colegas cuyo perfil se ajuste mejor.

¿Te parece agendar una llamada exploratoria?

Saludos`;
    }

    // not-aligned
    return `Hola ${contactName},

Gracias por considerar colaborar en "${projectTitle}".

Después de revisar los detalles, creo que hay un desalineamiento significativo (${percentage}% de alineación) en aspectos clave como:

${result.recommendations.map((r) => `• ${r}`).join('\n')}

Quiero ser transparente: no sería el mejor fit para este proyecto específico. Sin embargo, tengo colegas excelentes cuyo perfil se alinea mejor con tus necesidades.

¿Te gustaría que te conecte con alguien más adecuado?

Saludos`;
}

/**
 * Export decision letter as plain text
 */
export function exportDecisionLetter(
    application: ApplicationForm,
    result: ScoringResult
): { filename: string; content: string } {
    const letter = generateDecisionLetter(application, result);
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `decision-${application.companyName.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.txt`;

    return { filename, content: letter };
}
