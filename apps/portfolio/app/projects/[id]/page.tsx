import { SLABadge, AnimatedButton } from "@geekslab/ui";
import { ArrowLeft, Github, Globe, Code2, Cpu, Layers } from "lucide-react";
import Link from "next/link";

// Required for static export with dynamic routes
export function generateStaticParams() {
    return [
        { id: 'geekslab' },
        { id: 'dashboard' },
        { id: 'ecommerce' },
    ];
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
    // In a real app, fetch data based on params.id
    // For now, we mock it
    const project = {
        id: params.id,
        title: `Project ${params.id}`,
        description: "A revolutionary platform that solves complex problems using advanced algorithms and a sleek user interface.",
        stack: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
        architecture: "Microservices architecture with event-driven communication.",
        challenges: "Handling real-time data synchronization at scale.",
        learnings: "Deepened understanding of distributed systems and state management.",
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-24">
                <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Projects
                </Link>

                <header className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-neutral-300">
                            CASE STUDY
                        </div>
                        <SLABadge />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                        {project.title}
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-3xl leading-relaxed">
                        {project.description}
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Layers className="w-6 h-6 text-blue-400" /> Architecture
                            </h2>
                            <p className="text-neutral-300 leading-relaxed">
                                {project.architecture}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Cpu className="w-6 h-6 text-purple-400" /> Technical Challenges
                            </h2>
                            <p className="text-neutral-300 leading-relaxed">
                                {project.challenges}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Code2 className="w-6 h-6 text-emerald-400" /> Key Learnings
                            </h2>
                            <p className="text-neutral-300 leading-relaxed">
                                {project.learnings}
                            </p>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10">
                            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-neutral-500">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech) => (
                                    <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <AnimatedButton href="https://github.com" variant="secondary" className="w-full justify-center border-white/20">
                                <Github className="w-4 h-4 mr-2" /> View Source
                            </AnimatedButton>
                            <AnimatedButton href="https://example.com" variant="primary" className="w-full justify-center bg-white text-black hover:bg-neutral-200">
                                <Globe className="w-4 h-4 mr-2" /> Live Demo
                            </AnimatedButton>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
