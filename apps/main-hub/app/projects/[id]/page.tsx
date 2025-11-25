import { Navbar, Meteors } from "@geekslab/ui";
import Link from "next/link";
import { ArrowLeft, Github, Globe } from "lucide-react";

// This would typically come from a CMS or database
const projects = [
    {
        id: "geekslab",
        title: "GeeksLab",
        subtitle: "R&D Innovation Platform",
        description: "A comprehensive platform for managing Research & Development projects, tracking ISO compliance, and fostering innovation within industrial environments.",
        challenge: "The client needed a way to bridge the gap between rigid industrial standards (ISO) and agile R&D processes. Existing tools were either too complex or too simple.",
        solution: "I built a custom dashboard using Next.js that integrates real-time project tracking with automated compliance reporting. The system uses a microservices architecture to ensure scalability.",
        tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
        image: "/projects/geekslab-hero.jpg", // Placeholder
    },
    {
        id: "dashboard",
        title: "R&D Dashboard",
        subtitle: "Data Visualization Suite",
        description: "An interactive analytics dashboard for visualizing complex R&D metrics, resource allocation, and project velocity.",
        challenge: "Data was scattered across multiple Excel sheets and legacy systems, making it impossible to get a real-time view of R&D health.",
        solution: "Developed a centralized data warehouse and a React-based frontend using D3.js for custom visualizations. Reduced reporting time from days to seconds.",
        tech: ["React", "D3.js", "Python", "FastAPI"],
        image: "/projects/dashboard-hero.jpg", // Placeholder
    },
    {
        id: "ecommerce",
        title: "E-commerce Starter",
        subtitle: "High-Performance Template",
        description: "A production-ready e-commerce template optimized for Core Web Vitals and conversion rates.",
        challenge: "Most e-commerce templates are bloated and slow. The goal was to create a lightweight, SEO-first alternative.",
        solution: "Utilized Next.js App Router and Server Components to minimize client-side JavaScript. Achieved a perfect 100 Lighthouse score.",
        tech: ["Next.js", "Stripe", "Tailwind CSS", "Zustand"],
        image: "/projects/ecommerce-hero.jpg", // Placeholder
    },
];

export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
    const project = projects.find((p) => p.id === params.id);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link href="/" className="text-blue-400 hover:underline">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-12 relative overflow-hidden">
            <Meteors number={20} />

            <div className="container px-4 mx-auto relative z-10">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>

                <div className="max-w-4xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-5xl md:text-7xl font-bold mb-4">{project.title}</h1>
                        <p className="text-2xl text-blue-400 mb-8">{project.subtitle}</p>
                        <div className="flex flex-wrap gap-4 mb-8">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                            >
                                <Globe className="w-5 h-5" />
                                Live Demo
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <Github className="w-5 h-5" />
                                View Code
                            </a>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <h3 className="text-2xl font-bold mb-4 text-white">The Challenge</h3>
                                <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <h3 className="text-2xl font-bold mb-4 text-white">The Solution</h3>
                                <p className="text-gray-300 leading-relaxed">{project.solution}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold mb-4 text-white">Key Features</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Real-time data synchronization</li>
                            <li>Role-based access control (RBAC)</li>
                            <li>Automated reporting and analytics</li>
                            <li>Responsive mobile-first design</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
