"use client";

import { motion } from "framer-motion";
import { Quote, Star, Building2, Briefcase } from "lucide-react";

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
}

interface Stat {
    value: string;
    label: string;
    suffix?: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Anthony brings rare engineering discipline to web development. His R&D background shows in how he approaches problems — data-driven, methodical, and always focused on measurable outcomes.",
        author: "Engineering Lead",
        role: "Tech Lead",
        company: "E-commerce Startup",
    },
    {
        quote: "Working in regulated MedTech environments taught him documentation and process rigor that most developers lack. He shipped features fast while maintaining the quality standards we needed.",
        author: "Product Manager",
        role: "Head of Product",
        company: "HealthTech Company",
    },
    {
        quote: "The transition from R&D to Full Stack was seamless. His analytical mindset and 5+ years of production experience translate directly into building robust, scalable systems.",
        author: "Technical Director",
        role: "CTO",
        company: "SaaS Platform",
    },
];

const stats: Stat[] = [
    { value: "5", label: "Years in R&D/MedTech", suffix: "+" },
    { value: "99.9", label: "Uptime SLA", suffix: "%" },
    { value: "2", label: "Years Full Stack", suffix: "+" },
    { value: "14", label: "Products Shipped", suffix: "+" },
];

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="relative p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all group"
    >
        {/* Quote icon */}
        <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-white/10 transition-colors" />
        
        {/* Stars */}
        <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
        </div>
        
        <p className="text-neutral-300 leading-relaxed mb-6 text-sm md:text-base">
            "{testimonial.quote}"
        </p>
        
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white/60" />
            </div>
            <div>
                <p className="text-white font-medium text-sm">{testimonial.author}</p>
                <p className="text-neutral-500 text-xs">{testimonial.role}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3 h-3 text-neutral-600" />
                    <span className="text-neutral-600 text-xs">{testimonial.company}</span>
                </div>
            </div>
        </div>
    </motion.div>
);

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="text-center p-6"
    >
        <div className="text-4xl md:text-5xl font-bold text-white mb-2">
            {stat.value}
            <span className="text-emerald-400">{stat.suffix}</span>
        </div>
        <p className="text-neutral-500 text-sm uppercase tracking-wider">{stat.label}</p>
    </motion.div>
);

export const SocialProof = () => {
    return (
        <section className="relative py-24 md:py-32 border-t border-white/10 bg-black overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.05),transparent_50%)]" />
            
            <div className="relative max-w-7xl mx-auto px-4">
                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 p-6 rounded-2xl border border-white/10 bg-white/[0.02]"
                >
                    {stats.map((stat, index) => (
                        <StatCard key={stat.label} stat={stat} index={index} />
                    ))}
                </motion.div>

                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-4"
                    >
                        Trusted Delivery
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white tracking-tight"
                    >
                        What Teams Say
                    </motion.h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} index={index} />
                    ))}
                </div>

                {/* Trust badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-8 mt-16 pt-16 border-t border-white/5"
                >
                    {["ISO 13485 Certified Environment", "MedTech R&D Background", "Remote-First", "English B2+"].map((badge) => (
                        <div key={badge} className="flex items-center gap-2 text-neutral-500 text-sm">
                            <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                            {badge}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
