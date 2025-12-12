"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, ArrowDown, ChevronRight } from "lucide-react";
import { AnimatedFooter, AnimatedButton, Navbar } from "@geekslab/ui";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * GeeksLab Portfolio - Single Page Narrative
 * 
 * Design Philosophy:
 * - Clean, minimal, Brittany Chiang-inspired layout
 * - Single cohesive narrative flow
 * - Premium feel without being pretentious
 * - Mobile-first, accessible
 * 
 * Sections:
 * 1. Hero - First impression
 * 2. About - The story
 * 3. Experience - Timeline
 * 4. Projects - Featured work
 * 5. Skills - Quick glance
 * 6. Contact - CTA
 */

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-emerald-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="bg-black text-white min-h-screen">

        {/* ===== HERO SECTION ===== */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Brand */}
              <p className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">
                GeeksLab
              </p>

              {/* Name */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4">
                Anthony Mora
              </h1>

              {/* Title */}
              <p className="text-xl md:text-2xl text-emerald-400 font-medium mb-8">
                Full Stack Developer
              </p>

              {/* Tagline */}
              <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                From medical devices to digital products.{" "}
                <span className="text-white">13 years building systems where failure isn't an option.</span>
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                <AnimatedButton
                  href="#projects"
                  variant="primary"
                  className="bg-white text-black hover:bg-neutral-200 px-6 py-3"
                >
                  View Work
                </AnimatedButton>
                <AnimatedButton
                  href="#contact"
                  variant="secondary"
                  className="border-white/20 px-6 py-3"
                >
                  Get in Touch
                </AnimatedButton>
              </div>

              {/* Social links */}
              <div className="flex justify-center gap-6">
                <SocialLink href="https://github.com/Tonymora1982" icon={<Github className="w-5 h-5" />} label="GitHub" />
                <SocialLink href="https://www.linkedin.com/in/anthony-mora-parra-94941282/" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
                <SocialLink href="mailto:tonymora1982@gmail.com" icon={<Mail className="w-5 h-5" />} label="Email" />
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <ArrowDown className="w-5 h-5 text-neutral-500 animate-bounce" />
          </motion.div>
        </section>

        {/* ===== ABOUT SECTION ===== */}
        <section id="about" className="py-24 md:py-32 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="About" />

            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-6">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  I'm a developer with an unconventional path. Started designing orthodontic solutions at
                  <strong className="text-white"> Align Technology</strong>, then spent 6 years at
                  <strong className="text-white"> Establishment Labs</strong> building medical devices—from
                  R&D technician to Production Supervisor.
                </p>
                <p className="text-lg text-neutral-300 leading-relaxed">
                  That background taught me what <span className="text-emerald-400">regulated environments</span> demand:
                  documentation that survives FDA audits, traceability from concept to production,
                  and processes where "works on my machine" doesn't exist.
                </p>
                <p className="text-lg text-neutral-300 leading-relaxed">
                  Now I bring that same discipline to building web applications with
                  <strong className="text-white"> Next.js, React, and TypeScript</strong>.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <InfoItem icon={<MapPin className="w-4 h-4" />} text="Costa Rica" />
                <InfoItem icon={<Mail className="w-4 h-4" />} text="tonymora1982@gmail.com" />
                <InfoItem icon={<Phone className="w-4 h-4" />} text="+506 7017-9787" />
                <div className="pt-4 border-t border-white/10">
                  <p className="text-neutral-500 mb-2">Education</p>
                  <p className="text-white">B.S. Computer Engineering</p>
                  <p className="text-neutral-400 text-xs">UNED · In Progress</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-neutral-500 mb-2">Languages</p>
                  <p className="text-white">Spanish (Native)</p>
                  <p className="text-white">English (B2+)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== EXPERIENCE SECTION ===== */}
        <section id="experience" className="py-24 md:py-32 px-4 bg-neutral-950 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="Experience" />

            <div className="space-y-8">
              <ExperienceItem
                title="Full Stack Developer"
                company="GeeksLab"
                type="Freelance"
                period="2024 — Present"
                description="Building production web apps with Next.js 15, React 19, TypeScript. Monorepo architecture with Turborepo."
                isCurrent
              />
              <ExperienceItem
                title="Administrative Assistant"
                company="INS (Instituto Nacional de Seguros)"
                period="May 2025 — Present"
                description="Administrative operations and process optimization."
                isCurrent
              />
              <ExperienceItem
                title="Production Supervisor"
                company="Establishment Labs"
                period="Sep 2024 — Apr 2025"
                description="Led production operations ensuring Safety, Quality, and compliance with ISO 13485."
              />
              <ExperienceItem
                title="R&D Jr. Engineer"
                company="Establishment Labs"
                period="Sep 2021 — Oct 2023"
                description="Design verification, prototyping, FDA/ISO compliance documentation for Class III medical devices."
              />
              <ExperienceItem
                title="R&D Technician"
                company="Establishment Labs"
                period="Jan 2020 — Sep 2021"
                description="Experimental testing and technical studies for products under development."
              />
              <ExperienceItem
                title="CAD Designer"
                company="Align Technology"
                period="Mar 2017 — Mar 2018"
                description="Designed patient-specific orthodontic solutions using treatment optimization software."
              />
            </div>

            <div className="mt-12 text-center">
              <AnimatedButton href="/cv" variant="secondary" className="border-white/20">
                View Full Resume <ChevronRight className="w-4 h-4 ml-1" />
              </AnimatedButton>
            </div>
          </div>
        </section>

        {/* ===== PROJECTS SECTION ===== */}
        <section id="projects" className="py-24 md:py-32 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="Projects" />

            <div className="grid md:grid-cols-2 gap-8">
              <ProjectCard
                title="NexaStore"
                description="Full-stack e-commerce platform with Next.js 15, Stripe integration, and real-time inventory."
                tags={["Next.js", "React", "Stripe", "Tailwind"]}
                liveUrl="https://nexastore.geekslab.tech"
                codeUrl="https://github.com/Tonymora1982/Geekslab-portfolio/tree/main/apps/nexastore"
              />
              <ProjectCard
                title="ISO 13485 QMS"
                description="Quality Management System for medical device compliance. Automated traceability matrix and audit trails."
                tags={["Python", "SQL", "Docker", "React"]}
                caseStudyUrl="/qms"
              />
            </div>
          </div>
        </section>

        {/* ===== SKILLS SECTION ===== */}
        <section id="skills" className="py-24 md:py-32 px-4 bg-neutral-950 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="Skills" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <SkillGroup
                title="Frontend"
                skills={["React", "Next.js", "TypeScript", "Tailwind CSS"]}
              />
              <SkillGroup
                title="Backend"
                skills={["Node.js", "Python", "SQL", "C#"]}
              />
              <SkillGroup
                title="DevOps"
                skills={["Docker", "Linux", "Git", "CI/CD"]}
              />
              <SkillGroup
                title="Domain"
                skills={["R&D Processes", "ISO 13485", "FDA Compliance", "Agile"]}
              />
            </div>
          </div>
        </section>

        {/* ===== CONTACT SECTION ===== */}
        <section id="contact" className="py-24 md:py-32 px-4 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                Let's Build Something
              </h2>
              <p className="text-lg text-neutral-400 mb-8">
                Available for freelance projects and full-time opportunities.
                <br />
                <span className="text-neutral-500">Costa Rica · UTC-6</span>
              </p>

              <AnimatedButton
                href="mailto:tonymora1982@gmail.com"
                variant="primary"
                className="bg-emerald-500 text-black hover:bg-emerald-400 px-8 py-4 text-lg"
              >
                tonymora1982@gmail.com
              </AnimatedButton>

              <div className="flex justify-center gap-6 mt-8">
                <SocialLink href="https://github.com/Tonymora1982" icon={<Github className="w-5 h-5" />} label="GitHub" />
                <SocialLink href="https://www.linkedin.com/in/anthony-mora-parra-94941282/" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
                <SocialLink href="https://wa.me/50670179787" icon={<Phone className="w-5 h-5" />} label="WhatsApp" />
              </div>
            </motion.div>
          </div>
        </section>

        <AnimatedFooter />
      </main>
    </>
  );
}

/* ===== COMPONENTS ===== */

/**
 * Section Header Component
 */
function SectionHeader({ title }: { title: string }) {
  return (
    <motion.h2
      className="text-sm font-mono uppercase tracking-widest text-emerald-400 mb-12"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      {title}
    </motion.h2>
  );
}

/**
 * Social Link Component
 */
function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-neutral-400 hover:text-white transition-colors"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

/**
 * Info Item Component
 */
function InfoItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-neutral-400">
      {icon}
      <span>{text}</span>
    </div>
  );
}

/**
 * Experience Item Component
 */
interface ExperienceItemProps {
  title: string;
  company: string;
  type?: string;
  period: string;
  description: string;
  isCurrent?: boolean;
}

function ExperienceItem({ title, company, type, period, description, isCurrent }: ExperienceItemProps) {
  return (
    <motion.div
      className="group grid md:grid-cols-[200px_1fr] gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={`font-mono text-sm ${isCurrent ? 'text-emerald-400' : 'text-neutral-500'}`}>
        {period}
      </div>
      <div>
        <h3 className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">
          {title}
          {type && <span className="text-neutral-500 font-normal"> · {type}</span>}
        </h3>
        <p className="text-neutral-400">{company}</p>
        <p className="text-neutral-500 text-sm mt-2">{description}</p>
      </div>
    </motion.div>
  );
}

/**
 * Project Card Component
 */
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  caseStudyUrl?: string;
}

function ProjectCard({ title, description, tags, liveUrl, codeUrl, caseStudyUrl }: ProjectCardProps) {
  return (
    <motion.div
      className="group p-6 bg-neutral-900/50 border border-white/10 rounded-lg hover:border-emerald-500/50 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
        {title}
      </h3>
      <p className="text-neutral-400 text-sm mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={tag} className="px-2 py-1 text-xs bg-white/5 rounded text-neutral-400">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4 text-sm">
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            <ExternalLink className="w-4 h-4" /> Live
          </a>
        )}
        {codeUrl && (
          <a href={codeUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white flex items-center gap-1">
            <Github className="w-4 h-4" /> Code
          </a>
        )}
        {caseStudyUrl && (
          <Link href={caseStudyUrl} className="text-neutral-400 hover:text-white flex items-center gap-1">
            <ChevronRight className="w-4 h-4" /> Case Study
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Skill Group Component
 */
function SkillGroup({ title, skills }: { title: string; skills: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-sm font-medium text-white mb-4">{title}</h3>
      <ul className="space-y-2">
        {skills.map(skill => (
          <li key={skill} className="text-neutral-400 text-sm hover:text-white transition-colors">
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
