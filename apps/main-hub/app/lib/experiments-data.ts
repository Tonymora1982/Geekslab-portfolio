/**
 * Experiments Log
 * Real R&D experiments with reproducible demos
 * Adapted to 8 years manufacturing → software engineering journey
 */

export interface Experiment {
  id: string;
  title: string;
  subtitle: string;
  date: string; // ISO format
  category: 'optimization' | 'architecture' | 'failure' | 'research';
  tags: string[];
  
  // Hypothesis
  hypothesis: string;
  
  // Methodology
  methodology: string;
  
  // Results
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string; // e.g., "-94%" or "+2.3hrs" for failures
  }[];
  
  // Evidence
  demoUrl?: string; // Stackblitz/CodeSandbox
  postmortemUrl?: string; // PDF for failures
  
  // Context
  context: string; // Work context (Establishment Labs, etc.)
  learnings: string[];
}

/**
 * Complete experiments log
 * Ordered chronologically (most recent first)
 */
export const experiments: Experiment[] = [
  {
    id: 'nextjs-edge-caching',
    title: 'Dashboard de producción con Edge Caching',
    subtitle: 'Reducción de latencia con actualizaciones en tiempo real',
    date: '2024-09-15',
    category: 'optimization',
    tags: ['Next.js', 'Edge', 'Caching', 'React Server Components'],
    
    hypothesis: 
      'Implementar edge caching con revalidación ISR puede reducir la latencia del dashboard de producción sin sacrificar datos en tiempo real.',
    
    methodology:
      'Migré el dashboard de producción de CSR a RSC con edge caching. Configuré revalidación cada 10s para métricas críticas y 60s para datos históricos. Medí LCP y latencia p95 durante 7 días con 500+ sesiones diarias.',
    
    results: [
      {
        metric: 'Latencia (p95)',
        before: '780ms',
        after: '45ms',
        improvement: '-94.2%',
      },
      {
        metric: 'Largest Contentful Paint',
        before: '2.1s',
        after: '1.18s',
        improvement: '-43.8%',
      },
      {
        metric: 'Time to First Byte',
        before: '420ms',
        after: '28ms',
        improvement: '-93.3%',
      },
    ],
    
    demoUrl: 'https://stackblitz.com/edit/nextjs-edge-caching-experiment',
    
    context: 
      'Proyecto durante mi rol de R&D Jr Engineer (Sep 2024). El dashboard mostraba métricas de líneas de producción para dispositivos médicos (ISO 13485). Operadores necesitaban datos actualizados pero la latencia afectaba UX en tablets de planta.',
    
    learnings: [
      'Edge caching es ideal para dashboards con datos que cambian cada 10-60s',
      'React Server Components eliminan waterfall de fetch en cliente',
      'Revalidación stale-while-revalidate mantiene UX fluida durante updates',
      'Métricas críticas (estado máquinas) requieren revalidación más agresiva que KPIs históricos',
    ],
  },
  
  {
    id: 'iso-automation',
    title: 'Automatización de preparación ISO 13485',
    subtitle: 'Scripts para auditorías de calidad en manufactura médica',
    date: '2024-05-20',
    category: 'optimization',
    tags: ['Python', 'Automation', 'ISO 13485', 'DevOps'],
    
    hypothesis:
      'Automatizar la generación de reportes de trazabilidad puede reducir tiempo de preparación para auditorías ISO 13485 de 40hrs a <5hrs.',
    
    methodology:
      'Desarrollé scripts Python que extraen datos de ERP (SAP), rastrean lotes de producción, y generan reportes de trazabilidad automáticamente. Validé con 3 ciclos de auditoría interna antes de auditoría externa.',
    
    results: [
      {
        metric: 'Tiempo de preparación',
        before: '40 hrs',
        after: '4.5 hrs',
        improvement: '-88.8%',
      },
      {
        metric: 'Errores en reportes',
        before: '12-15 por ciclo',
        after: '0-2 por ciclo',
        improvement: '-87.5%',
      },
      {
        metric: 'Conformidades en auditoría',
        before: '89%',
        after: '100%',
        improvement: '+11 pts',
      },
    ],
    
    demoUrl: 'https://github.com/example/iso-automation-scripts',
    
    context:
      'Proyecto durante mi etapa como R&D Technician (Ago 2023 - Jul 2024) en Establishment Labs. Las auditorías ISO 13485 requerían rastreo completo de lotes desde materia prima hasta dispositivo final. Proceso manual era propenso a errores y consumía semanas.',
    
    learnings: [
      'Automatización no solo ahorra tiempo, sino que reduce riesgo de no-conformidades críticas',
      'Scripts bien documentados permiten transferencia de conocimiento a equipo de calidad',
      'Validación con auditorías internas es esencial antes de usar en auditorías externas',
      'Python + pandas es suficiente para procesamiento batch de datos ERP',
    ],
  },
  
  {
    id: 'db-migration-failure',
    title: '🔥 Migración DB con rollback fallido',
    subtitle: 'Falla valiosa: 2.3hrs de downtime por estrategia de migración inadecuada',
    date: '2024-11-08',
    category: 'failure',
    tags: ['PostgreSQL', 'Migration', 'Postmortem', 'Incident Response'],
    
    hypothesis:
      'Migrar esquema de base de datos en ventana de mantenimiento nocturna minimizará impacto en usuarios.',
    
    methodology:
      'Planifiqué migración de PostgreSQL con cambios de schema (añadir columnas + índices). Ejecuté durante ventana 2am-4am con plan de rollback básico. No probé rollback en staging.',
    
    results: [
      {
        metric: 'Downtime planificado',
        before: '30 min',
        after: '2.3 hrs',
        improvement: '+360% 💥',
      },
      {
        metric: 'Queries fallidas',
        before: '0',
        after: '1,847',
        improvement: '∞ 🔥',
      },
      {
        metric: 'Tickets de soporte',
        before: '0',
        after: '23',
        improvement: 'Crisis',
      },
    ],
    
    postmortemUrl: '/experiments/db-migration-postmortem.pdf',
    
    context:
      'Proyecto personal (Nov 2024) para app side-project. Migración agregaba columnas para feature nueva. Rollback falló porque no consideré dependencias de índices únicos. Downtime se extendió mientras debugueaba en producción.',
    
    learnings: [
      '❌ "Plan de rollback básico" no es suficiente - debe ser TAN robusto como el plan de deploy',
      '❌ Nunca asumir que rollback funcionará sin probarlo en staging primero',
      '✅ Blue-green deployments son costosos pero eliminan este tipo de riesgo',
      '✅ Migrations deben ser backward-compatible (añadir columna → migrar datos → eliminar columna vieja)',
      '✅ Monitoreo activo durante ventana de mantenimiento habría detectado falla en minutos, no horas',
    ],
  },
  
  {
    id: 'premature-caching',
    title: '🔥 Over-engineering: Caché distribuido innecesario',
    subtitle: 'Falla valiosa: Optimización prematura que añadió complejidad sin beneficio',
    date: '2024-07-12',
    category: 'failure',
    tags: ['Redis', 'Architecture', 'Premature Optimization', 'Cost Analysis'],
    
    hypothesis:
      'Implementar Redis como capa de caché distribuido mejorará performance antes de escalar a 10k usuarios.',
    
    methodology:
      'Añadí Redis para cachear queries de DB en app con 200 usuarios activos. Configuré invalidación compleja con TTLs variables. Medí latencia y costos durante 60 días.',
    
    results: [
      {
        metric: 'Latencia (p95)',
        before: '120ms',
        after: '115ms',
        improvement: '-4.2% 😐',
      },
      {
        metric: 'Complejidad (LoC)',
        before: '2,400',
        after: '3,100',
        improvement: '+29% 📈',
      },
      {
        metric: 'Costo mensual',
        before: '$15',
        after: '$50',
        improvement: '+233% 💸',
      },
    ],
    
    postmortemUrl: '/experiments/complexity-budget-framework.pdf',
    
    context:
      'Side-project (Jul 2024) donde anticipé crecimiento. La app tenía latencia aceptable con PostgreSQL directo. Añadí Redis "para estar listo" antes de tener evidencia de bottleneck.',
    
    learnings: [
      '❌ 4.2% de mejora NO justifica +29% complejidad + 233% costo',
      '❌ "Optimización para el futuro" sin datos es especulación, no ingeniería',
      '✅ Regla: Optimizar DESPUÉS de medir bottleneck, no antes',
      '✅ PostgreSQL con índices bien diseñados maneja 10k usuarios fácilmente',
      '✅ Complexity budget: Cada abstracción debe justificar su costo de mantenimiento',
      '✅ Documenté "Complexity Budget Framework" para evaluar trade-offs antes de añadir infraestructura',
    ],
  },
  
  {
    id: 'digital-twin-failure',
    title: '🔥 Digital twin sin validación de usuario',
    subtitle: 'Falla valiosa: Solución técnica avanzada que no resolvió problema real',
    date: '2023-03-15',
    category: 'failure',
    tags: ['Digital Twin', 'User Research', 'Three.js', 'Product Discovery'],
    
    hypothesis:
      'Un digital twin 3D de líneas de producción ayudará a operadores a diagnosticar fallas más rápido.',
    
    methodology:
      'Desarrollé visualización 3D interactiva con Three.js mostrando estado en tiempo real de máquinas. Integré con sensores IoT. Invertí 80hrs en prototipo antes de mostrar a usuarios.',
    
    results: [
      {
        metric: 'Tiempo de diagnóstico',
        before: '8 min',
        after: '8 min',
        improvement: '0% 😐',
      },
      {
        metric: 'Adopción por operadores',
        before: '—',
        after: '12%',
        improvement: 'Rechazo',
      },
      {
        metric: 'Feedback cualitativo',
        before: '—',
        after: '"Muy bonito pero prefiero la tabla"',
        improvement: '💔',
      },
    ],
    
    postmortemUrl: '/experiments/digital-twin-postmortem.pdf',
    
    context:
      'Proyecto durante mi rol como R&D Technician (Mar 2023) en Establishment Labs. Asumí que visualización 3D sería más intuitiva que dashboard tabular existente. No validé con usuarios antes de desarrollar.',
    
    learnings: [
      '❌ Sofisticación técnica ≠ Valor para usuario',
      '❌ 80 horas invertidas sin validar problema real primero',
      '✅ "Show, don\'t build" - Mockups + entrevistas detectan rechazo en 2hrs, no 80hrs',
      '✅ Operadores preferían tabla porque permitía copiar/pegar valores para reportes',
      '✅ User research ANTES de desarrollo habría ahorrado 90% del esfuerzo',
      '✅ Ahora aplico "Fake Door Testing" para features complejas antes de invertir desarrollo',
    ],
  },
];

/**
 * Get experiment by ID
 */
export function getExperimentById(id: string): Experiment | undefined {
  return experiments.find((exp) => exp.id === id);
}

/**
 * Filter experiments by category
 */
export function getExperimentsByCategory(
  category: Experiment['category']
): Experiment[] {
  return experiments.filter((exp) => exp.category === category);
}

/**
 * Get recent experiments (limit)
 */
export function getRecentExperiments(limit: number = 3): Experiment[] {
  return experiments.slice(0, limit);
}

/**
 * Get valuable failures (learning opportunities)
 */
export function getValuableFailures(): Experiment[] {
  return experiments.filter((exp) => exp.category === 'failure');
}

/**
 * Get experiments by tag
 */
export function getExperimentsByTag(tag: string): Experiment[] {
  return experiments.filter((exp) => 
    exp.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Statistics
 */
export function getExperimentStats() {
  return {
    total: experiments.length,
    byCategory: {
      optimization: getExperimentsByCategory('optimization').length,
      architecture: getExperimentsByCategory('architecture').length,
      failure: getExperimentsByCategory('failure').length,
      research: getExperimentsByCategory('research').length,
    },
    valuableFailures: getValuableFailures().length,
  };
}
