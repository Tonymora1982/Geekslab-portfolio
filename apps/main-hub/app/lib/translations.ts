export const translations = {
    en: {
        nav: {
            home: "Home",
            about: "About",
            projects: "Projects",
            contact: "Contact",
        },
        hero: {
            badge: "Available for new opportunities",
            title: "R&D Engineer",
            highlight: "turned Web Dev",
            description: "Industrial discipline, artisanal code. I build web experiences that work as well as they look.",
            ecosystem_tagline: "Welcome to the GeeksLab Ecosystem",
            ecosystem_description: "Your hub for R&D innovation, portfolio projects, and experimental prototypes. Explore curated subdomains showcasing production work, interactive CV, and live experiments.",
            cta_primary: "View Journey",
            cta_secondary: "Contact Me",
            cta_experiments: "View Experiment Log",
            cta_portfolio: "Explore Portfolio",
            cta_cv: "View CV",
            cta_lab: "R&D Lab",
            cta_apply: "Apply (RFC Evaluation)",
        },
        exploded: {
            layer1: {
                label: "LAYER 1",
                title: "Frontend",
                subtitle: "The User Interface",
            },
            layer2: {
                label: "LAYER 2",
                title: "Backend",
                subtitle: "The Business Logic",
            },
            layer3: {
                label: "LAYER 3",
                title: "Infrastructure",
                subtitle: "The System Foundation",
            },
        },
        bento: {
            title: "Selected Works",
            description: "A selection of my recent work. Visit portfolio.geekslab.tech for full case studies.",
            item1: {
                title: "Geekslab Development",
                description: "My Personal R&D Lab & Consultancy. Building High-Performance Next.js Architectures.",
            },
            item2: {
                title: "NexaStore Engine",
                description: "Headless E-commerce Solution. Stripe, CMS Integration & Real-time Inventory.",
            },
            item3: {
                title: "ISO 13485 QMS",
                description: "Quality Management System for MedTech. Automated auditing and Traceability.",
            },
            item4: {
                title: "TurboRepo Monorepo",
                description: "Micro-frontend architecture for large-scale enterprise applications.",
            },
        },
        experience: {
            title: "Professional Journey",
            subtitle: "Over a decade leading teams and processes in the medical industry.",
            jobs: [
                {
                    role: "Production Supervisor",
                    description: "Leading production operations and compliance with Quality and Safety standards in a regulated medical environment (ISO 13485).",
                },
                {
                    role: "R&D Jr. Engineer",
                    description: "Coordination of experimental tests, design verification, and prototyping for new medical devices.",
                },
                {
                    role: "R&D Technician",
                    description: "Execution of technical studies and experimental tests for projects under development.",
                },
                {
                    role: "3D Digital-Lab Technician",
                    description: "3D scanning tests and device hardware maintenance.",
                },
            ]
        },
        skills: {
            title: "TECHNICAL ARSENAL",
            categories: {
                core: "Core Engineering",
                web: "Modern Web",
                ops: "Security & Ops",
                pro: "Professional",
            }
        },
        footer: {
            getInTouch: "Get in touch",
            available: "Available for freelance projects and open to full-time opportunities.",
            rights: "All rights reserved.",
            location: "Grecia, Alajuela, CR",
            localTime: "Local Time",
        },
        deconstructed: {
            title: "The Deconstructed Dev",
            description: "Understanding every layer of the stack, from pixel to packet.",
        },
        contactPage: {
            title: "Let's Build Something",
            titleHighlight: "Amazing",
            description: "Have a project in mind or want to discuss a potential collaboration? I'm currently available for freelance work and full-time opportunities.",
            detailsTitle: "Contact Details",
            emailLabel: "Email",
            locationLabel: "Location",
            locationValue: "Remote / Worldwide",
            availabilityLabel: "Availability",
            availabilityValue: "Open to new projects",
            form: {
                nameLabel: "Name",
                namePlaceholder: "John Doe",
                emailLabel: "Email",
                emailPlaceholder: "john@example.com",
                messageLabel: "Message",
                messagePlaceholder: "Tell me about your project...",
                submitButton: "Send Message",
                sendingButton: "Sending...",
                successTitle: "Message Sent! 🚀",
                successMessage: "Thanks for reaching out. I'll get back to you as soon as possible.",
                sendAnother: "Send another message",
                errorGeneric: "Something went wrong. Please try again.",
                errorNetwork: "Failed to send message. Please check your connection.",
                validation: {
                    name: "Name must be at least 2 characters",
                    email: "Invalid email address",
                    message: "Message must be at least 10 characters",
                }
            }
        },
        experiments: {
            description: "Ideating, prototyping and building things I would like to see in this world is how I spend my nights and weekends.",
            subtitle: "Interactive Playground / R&D Lab",
        },
        lab: {
            badge: "Experiment Log",
            title: "Open Lab",
            description: "Hypotheses, trials, and results you can replicate. Focus on process, not perfect showcases.",
            before: "Before",
            after: "After",
            delta: "Delta",
            learnings: "Learnings",
            status: {
                running: "Running",
                validated: "Validated",
                failed: "Failed",
            },
            reproduce: "Open",
        },
        rfc: {
            badge: "RFC Evaluation",
            title: "Inverse Application",
            description: "Answer 6 prompts. I respond with an automatic letter: accept, adjust, or technical rejection.",
            scoreLabel: "score",
            thresholdsNote: "Thresholds: ≥70 accept. 40-69 needs adjustments. <40 technical rejection.",
            stackLabel: "Current stack",
            stackPlaceholder: "e.g. Next.js, Node, Postgres...",
            budgetLabel: "Estimated budget",
            budgetPlaceholder: "e.g. 15k USD or range",
            deadlineLabel: "Realistic deadline",
            deadlinePlaceholder: "e.g. 8 weeks, Q2 2025",
            toleranceLabel: "Tolerance to experiments",
            tolerance: {
                high: "High (prefer innovation)",
                medium: "Medium (balance)",
                low: "Low (only proven)",
            },
            autonomyLabel: "Expected autonomy",
            autonomy: {
                high: "High (I lead end-to-end)",
                medium: "Medium (shared ownership)",
                low: "Low (close guidance)",
            },
            complianceLabel: "Compliance",
            compliance: {
                iso: "ISO / Quality",
                hipaa: "HIPAA / Sensitive data",
                gdpr: "GDPR / Privacy",
                none: "No formal requirements",
            },
            generateButton: "Generate letter",
            generateNote: "Local generation, no data sent.",
            letter: {
                acceptTitle: "Acceptance letter (RFC approved)",
                adjustTitle: "Letter with suggested adjustments",
                rejectTitle: "Technical rejection letter",
                acceptBody: "Fits my delivery playbook. Proposal: 1-week Sprint 0 for architecture and risks, followed by two delivery sprints.",
                acceptClosing: "I confirm availability to start in 7 days. Will attach a detailed technical plan after a 20-minute call.",
                adjustBody: "Partial fit. I would adjust scope and risk before moving forward. Recommendation: reduce surface or increase tolerance to experiments.",
                adjustClosing: "If these adjustments work, we can re-evaluate. Happy to suggest alternatives or refer another profile.",
                rejectBody: "Not the best fit. You need a different profile or more internal operational capacity.",
                rejectClosing: "I prefer not to promise a result I cannot guarantee. I can suggest alternatives and references if needed.",
            },
            decisionScaleTitle: "Decision scale",
            decisionScale: {
                accept: "≥70: I accept and propose immediate Sprint 0.",
                adjust: "40-69: Scope/risk adjustment required.",
                reject: "<40: Technical rejection, I suggest alternatives.",
            },
        }
    },
    es: {
        nav: {
            home: "Inicio",
            about: "Sobre Mí",
            projects: "Proyectos",
            contact: "Contacto",
        },
        hero: {
            badge: "Disponible para nuevas oportunidades",
            title: "Ingeniero R&D",
            highlight: "Web Dev",
            description: "Disciplina industrial, código artesanal. Construyo experiencias web que funcionan tan bien como se ven.",
            ecosystem_tagline: "Bienvenido al Ecosistema GeeksLab",
            ecosystem_description: "Tu hub para innovación R&D, proyectos de portfolio y prototipos experimentales. Explora subdominios curados mostrando trabajo en producción, CV interactivo y experimentos en vivo.",
            cta_primary: "Ver Trayectoria",
            cta_secondary: "Contactar",
            cta_experiments: "Ver Bitácora de Experimentos",
            cta_portfolio: "Explorar Portfolio",
            cta_cv: "Ver CV",
            cta_lab: "Laboratorio R&D",
            cta_apply: "Aplicar (Evaluación RFC)",
        },
        exploded: {
            layer1: {
                label: "CAPA 1",
                title: "Frontend",
                subtitle: "La Interfaz de Usuario",
            },
            layer2: {
                label: "CAPA 2",
                title: "Backend",
                subtitle: "La Lógica del Negocio",
            },
            layer3: {
                label: "CAPA 3",
                title: "Infraestructura",
                subtitle: "La Fundación del Sistema",
            },
        },
        bento: {
            title: "Proyectos Destacados",
            description: "Una selección de mi trabajo reciente. Visita portfolio.geekslab.tech para estudios de caso completos.",
            item1: {
                title: "Desarrollo Geekslab",
                description: "Mi Laboratorio de I+D y Consultoría. Construyendo Arquitecturas Next.js de Alto Rendimiento.",
            },
            item2: {
                title: "Motor NexaStore",
                description: "Solución E-commerce Headless. Integración Stripe, CMS e Inventario en tiempo real.",
            },
            item3: {
                title: "SGC ISO 13485",
                description: "Sistema de Gestión de Calidad para MedTech. Auditoría automatizada y Trazabilidad.",
            },
            item4: {
                title: "Monorepo TurboRepo",
                description: "Arquitectura de micro-frontends para aplicaciones empresariales a gran escala.",
            },
        },
        experience: {
            title: "Trayectoria Profesional",
            subtitle: "Más de una década liderando equipos y procesos en la industria médica.",
            jobs: [
                {
                    role: "Supervisor de Producción",
                    description: "Liderazgo de operaciones de producción y cumplimiento de estándares de Calidad y Seguridad en entorno médico regulado (ISO 13485).",
                },
                {
                    role: "Ingeniero Jr. R&D",
                    description: "Coordinación de pruebas experimentales, verificación de diseño y prototipado para nuevos dispositivos médicos.",
                },
                {
                    role: "Técnico R&D",
                    description: "Ejecución de estudios técnicos y pruebas experimentales para proyectos en desarrollo.",
                },
                {
                    role: "Técnico Laboratorio Digital 3D",
                    description: "Pruebas de escaneo 3D y mantenimiento de hardware de dispositivos.",
                },
            ]
        },
        skills: {
            title: "ARSENAL TÉCNICO",
            categories: {
                core: "Ingeniería Core",
                web: "Web Moderna",
                ops: "Seguridad y Ops",
                pro: "Profesional",
            }
        },
        footer: {
            getInTouch: "Contáctame",
            available: "Disponible para proyectos freelance y oportunidades de tiempo completo.",
            rights: "Todos los derechos reservados.",
            location: "Grecia, Alajuela, CR",
            localTime: "Hora Local",
        },
        deconstructed: {
            title: "El Desarrollador Deconstruido",
            description: "Entendiendo cada capa del stack, desde el píxel hasta el paquete.",
        },
        contactPage: {
            title: "Construyamos Algo",
            titleHighlight: "Increíble",
            description: "¿Tienes un proyecto en mente o quieres discutir una posible colaboración? Actualmente estoy disponible para trabajo freelance y oportunidades de tiempo completo.",
            detailsTitle: "Detalles de Contacto",
            emailLabel: "Correo",
            locationLabel: "Ubicación",
            locationValue: "Remoto / Mundial",
            availabilityLabel: "Disponibilidad",
            availabilityValue: "Abierto a nuevos proyectos",
            form: {
                nameLabel: "Nombre",
                namePlaceholder: "Juan Pérez",
                emailLabel: "Correo",
                emailPlaceholder: "juan@ejemplo.com",
                messageLabel: "Mensaje",
                messagePlaceholder: "Cuéntame sobre tu proyecto...",
                submitButton: "Enviar Mensaje",
                sendingButton: "Enviando...",
                successTitle: "¡Mensaje Enviado! 🚀",
                successMessage: "Gracias por contactarme. Te responderé lo antes posible.",
                sendAnother: "Enviar otro mensaje",
                errorGeneric: "Algo salió mal. Por favor intenta de nuevo.",
                errorNetwork: "Error al enviar mensaje. Revisa tu conexión.",
                validation: {
                    name: "El nombre debe tener al menos 2 caracteres",
                    email: "Dirección de correo inválida",
                    message: "El mensaje debe tener al menos 10 caracteres",
                }
            }
        },
        experiments: {
            description: "Idear, prototipar y construir cosas que me gustaría ver en este mundo es como paso mis noches y fines de semana.",
            subtitle: "Laboratorio Interactivo / I+D",
        },
        lab: {
            badge: "Bitácora de Experimentos",
            title: "Laboratorio Abierto",
            description: "Hipótesis, pruebas y resultados que puedes replicar. El foco es mostrar proceso, no vitrinas perfectas.",
            before: "Antes",
            after: "Después",
            delta: "Delta",
            learnings: "Aprendizajes",
            status: {
                running: "En curso",
                validated: "Validado",
                failed: "Fallido",
            },
            reproduce: "Abrir",
        },
        rfc: {
            badge: "Evaluación RFC",
            title: "Solicitud inversa",
            description: "Responde 6 prompts. Devuelvo una carta automática: aceptar, ajustar o rechazo técnico.",
            scoreLabel: "score",
            thresholdsNote: "Umbrales: ≥70 acepto. 40-69 requiere ajustes. <40 rechazo técnico.",
            stackLabel: "Stack actual",
            stackPlaceholder: "Ej. Next.js, Node, Postgres...",
            budgetLabel: "Presupuesto estimado",
            budgetPlaceholder: "Ej. 15k USD o rango",
            deadlineLabel: "Deadline realista",
            deadlinePlaceholder: "Ej. 8 semanas, Q2 2025",
            toleranceLabel: "Tolerancia a experimentos",
            tolerance: {
                high: "Alta (prefiero innovación)",
                medium: "Media (balance)",
                low: "Baja (solo probado)",
            },
            autonomyLabel: "Autonomía esperada",
            autonomy: {
                high: "Alta (lidero end-to-end)",
                medium: "Media (ownership compartido)",
                low: "Baja (guidance estrecha)",
            },
            complianceLabel: "Compliance",
            compliance: {
                iso: "ISO / Calidad",
                hipaa: "HIPAA / Datos sensibles",
                gdpr: "GDPR / Privacidad",
                none: "Sin requisitos formales",
            },
            generateButton: "Generar carta",
            generateNote: "Generación local, sin enviar datos.",
            letter: {
                acceptTitle: "Carta de aceptación (RFC Aprobada)",
                adjustTitle: "Carta con ajustes sugeridos",
                rejectTitle: "Carta de rechazo técnico",
                acceptBody: "Encaja con mi playbook de delivery. Propuesta: Sprint 0 de 1 semana para arquitectura y riesgos, seguido de dos sprints de entrega.",
                acceptClosing: "Confirmo disponibilidad para arrancar en 7 días. Adjuntaré un plan técnico detallado después de una llamada de 20 minutos.",
                adjustBody: "Hay encaje parcial. Ajustaría scope y riesgo antes de avanzar. Recomendación: reducir superficie o aumentar tolerancia a experimentos.",
                adjustClosing: "Si estos ajustes son aceptables, podemos re-evaluar. Feliz de sugerir alternativas o referir a otro perfil.",
                rejectBody: "No es el mejor fit. Requieres un perfil distinto o más capacidad operativa interna.",
                rejectClosing: "Prefiero no comprometer un resultado que no pueda garantizar. Te dejo con sugerencias y referencias si las necesitas.",
            },
            decisionScaleTitle: "Escala de decisión",
            decisionScale: {
                accept: "≥70: Acepto y propongo Sprint 0 inmediato.",
                adjust: "40-69: Requiere ajustes de scope/riesgo.",
                reject: "<40: Rechazo técnico, sugiero alternativas.",
            },
        }
    }
};
