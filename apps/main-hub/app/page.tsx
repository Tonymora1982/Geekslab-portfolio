"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, ArrowDown, ChevronRight, Download, Calendar, Clock, FileText } from "lucide-react";
import { AnimatedFooter, AnimatedButton } from "@geekslab/ui";
import Link from "next/link";

/**
 * GeeksLab Portfolio - Recruiter & Client Optimized
 * 
 * Key Improvements:
 * - 5-second value proposition above fold
 * - Availability + timezone visible
 * - Recruiter-friendly CV download
 * - Separated Software vs Operations experience
 * - Evidence-based credibility
 * - Business-oriented CTAs
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

      <main className="bg-black text-white min-h-screen pt-16">

        {/* ===== HERO SECTION ===== */}
        <section id="hero" className="min-h-[90vh] flex items-center justify-center px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Value Proposition - Direct, memorable */}
              <div className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <span className="text-emerald-400 text-sm font-medium">
                  13 years in regulated environments → audit-ready code in production
                </span>
              </div>

              {/* Name */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                Anthony Mora
              </h1>

              {/* Title + Availability */}
              <p className="text-xl md:text-2xl text-neutral-300 mb-4">
                Full Stack Developer · <span className="text-emerald-400">Available Now</span>
              </p>

              {/* Personal voice - Only I could say this */}
              <p className="text-neutral-500 text-sm max-w-xl mx-auto mb-8 italic">
                "I spent years building medical devices where a bug could hurt someone.
                Now I build software with the same paranoia—and it shows in the code."
              </p>

              {/* Production Proof Block - Verifiable metrics */}
              <div className="flex flex-wrap justify-center gap-6 text-sm mb-8 py-4 border-y border-white/10">
                <ProofMetric value="26" label="E2E Tests" />
                <ProofMetric value="0" label="TS Errors" />
                <ProofMetric value="<200ms" label="LCP" />
                <ProofMetric value="ISO 13485" label="Mindset" />
              </div>

              {/* Availability details */}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-400 mb-8">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> GMT-6 (Costa Rica)
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Full-time Remote / Contract
                </span>
              </div>

              {/* CTAs - Working links only */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <AnimatedButton
                  href="https://www.linkedin.com/in/anthony-mora-parra-94941282/"
                  variant="primary"
                  className="bg-white text-black hover:bg-neutral-200 px-6 py-3"
                >
                  <Linkedin className="w-4 h-4 mr-2" /> View LinkedIn
                </AnimatedButton>
                <AnimatedButton
                  href="mailto:tonymora1982@gmail.com?subject=Opportunity%20for%20Anthony%20Mora&body=Hi%20Anthony%2C%0A%0AI%20found%20your%20portfolio%20and%20I'd%20like%20to%20discuss%20a%20potential%20opportunity.%0A%0ARole%3A%20%0ACompany%3A%20%0ATimeline%3A%20%0A%0AThanks!"
                  variant="secondary"
                  className="border-white/20 px-6 py-3"
                >
                  <Mail className="w-4 h-4 mr-2" /> Contact Me
                </AnimatedButton>
              </div>

              {/* Quick links */}
              <div className="flex justify-center gap-6 text-neutral-500">
                <a href="https://github.com/Tonymora1982" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 text-sm">
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a href="#projects" className="hover:text-white transition-colors flex items-center gap-1 text-sm">
                  <FileText className="w-4 h-4" /> Projects
                </a>
                <a href="/evidence-layer" className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-sm text-emerald-500">
                  <ChevronRight className="w-4 h-4" /> Production Proof
                </a>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <ArrowDown className="w-5 h-5 text-neutral-500 animate-bounce" />
          </motion.div>
        </section>

        {/* ===== ABOUT SECTION ===== */}
        <section id="about" className="py-24 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="About" />

            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-6">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  I'm a developer with an unconventional path. Spent <strong className="text-white">6+ years at Establishment Labs</strong> building
                  Class III medical devices—from R&D technician to Production Supervisor. That background taught me what
                  <span className="text-emerald-400"> regulated environments demand</span>: documentation that survives FDA audits,
                  traceability from concept to production, and zero tolerance for "it works on my machine."
                </p>
                <p className="text-lg text-neutral-300 leading-relaxed">
                  Now I build production-grade web applications with <strong className="text-white">Next.js 16, React 19, and TypeScript</strong>.
                  I bring the same rigor: CI/CD pipelines, Playwright E2E testing, observability, and code that's audit-ready.
                </p>

                {/* English proof */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-neutral-400">
                    <strong className="text-white">English (B2+):</strong> Daily async communication, written updates,
                    PR reviews, technical documentation—all in English. EU/US timezone overlap (4-6 hrs daily).
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <InfoItem icon={<MapPin className="w-4 h-4" />} text="Costa Rica (GMT-6)" />
                <InfoItem icon={<Mail className="w-4 h-4" />} text="tonymora1982@gmail.com" />
                <InfoItem icon={<Phone className="w-4 h-4" />} text="+506 7017-9787" />
                <div className="pt-4 border-t border-white/10">
                  <p className="text-neutral-500 mb-2">Education</p>
                  <p className="text-white">B.S. Computer Engineering</p>
                  <p className="text-neutral-400 text-xs">UNED · In Progress (TFG pending)</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-neutral-500 mb-2">Certifications</p>
                  <p className="text-neutral-300 text-xs">CEH · LFC (In Progress)</p>
                  <p className="text-neutral-300 text-xs">Yale Medical Software</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== EXPERIENCE SECTION ===== */}
        <section id="experience" className="py-24 px-4 bg-neutral-950 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="Experience" />

            {/* Software Development */}
            <div className="mb-12">
              <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-6">Software Development</h3>
              <div className="space-y-6">
                <ExperienceItem
                  title="Full Stack Developer"
                  company="GeeksLab (Freelance)"
                  period="2024 — Present"
                  description="Building production web apps with Next.js 16, React 19, TypeScript. Monorepo architecture, CI/CD, Playwright testing."
                  tags={["Next.js", "TypeScript", "React", "Vercel"]}
                  isCurrent
                />
              </div>
            </div>

            {/* Operations / MedTech - Contextualized */}
            <div>
              <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">
                MedTech / Operations <span className="text-neutral-600">(Domain Expertise)</span>
              </h3>
              <div className="space-y-6">
                <ExperienceItem
                  title="Production Supervisor"
                  company="Establishment Labs"
                  period="Sep 2024 — Apr 2025"
                  description="Led cross-functional teams in ISO 13485 environment. Process optimization, quality compliance, SOP development."
                  tags={["ISO 13485", "Team Leadership", "Process Improvement"]}
                />
                <ExperienceItem
                  title="R&D Jr. Engineer"
                  company="Establishment Labs"
                  period="Sep 2021 — Oct 2023"
                  description="Design verification, prototyping, FDA compliance documentation for Class III medical devices. Technical testing coordination."
                  tags={["FDA Compliance", "Design Verification", "Prototyping"]}
                />
                <ExperienceItem
                  title="R&D Technician"
                  company="Establishment Labs"
                  period="Jan 2020 — Sep 2021"
                  description="Experimental testing and technical studies for medical device development."
                  tags={["Lab Testing", "Technical Studies"]}
                />
                <ExperienceItem
                  title="CAD Designer"
                  company="Align Technology"
                  period="Mar 2017 — Mar 2018"
                  description="Patient-specific orthodontic solutions using treatment optimization software."
                  tags={["CAD", "Medical Devices"]}
                />
              </div>
            </div>

            {/* Note about current role */}
            <p className="mt-8 text-xs text-neutral-600 italic">
              * Also currently in a part-time administrative role at INS while pursuing full-time software opportunities.
            </p>
          </div>
        </section>

        {/* ===== PROJECTS SECTION ===== */}
        <section id="projects" className="py-24 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="Selected Work" />

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <ProjectCard
                title="NexaStore"
                subtitle="E-commerce Platform"
                description="Full-stack e-commerce with Next.js 16. Product catalog, cart management, Stripe-ready checkout flow."
                problem="Needed a demo e-commerce that showcases modern React patterns and production practices."
                result="Deployed to Vercel with <200ms LCP, mobile-first responsive design."
                tags={["Next.js 16", "React 19", "TypeScript", "Tailwind"]}
                liveUrl="https://nexastore.geekslab.tech"
                codeUrl="https://github.com/Tonymora1982/Geekslab-portfolio/tree/main/apps/nexastore"
              />
              <ProjectCard
                title="ISO 13485 QMS"
                subtitle="Quality Management System"
                description="Internal tool for medical device compliance. Automated traceability matrix linking requirements to test cases."
                problem="Manual Excel-based traceability was error-prone and audit-risky."
                result="Automated coverage reports, reduced audit prep time by 40%."
                tags={["Python", "SQL", "React", "Docker"]}
                caseStudyUrl="/qms"
              />
            </div>

            {/* Evidence Layer CTA */}
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Production Proof</h3>
              <p className="text-neutral-400 text-sm mb-4">
                See real metrics, documented postmortems, and engineering RFCs. Not just "it works"—evidence that it ships and runs.
              </p>
              <AnimatedButton href="/evidence-layer" variant="secondary" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                View Evidence Layer <ChevronRight className="w-4 h-4 ml-1" />
              </AnimatedButton>
            </div>
          </div>
        </section>

        {/* ===== WHAT I DELIVER ===== */}
        <section id="services" className="py-24 px-4 bg-neutral-950 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="What I Deliver" />

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-white font-medium mb-4">Scope</h3>
                <ul className="space-y-2 text-neutral-400 text-sm">
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-400" /> MVP Development (0 → 1)</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-400" /> Feature Development & Refactoring</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-400" /> Performance Optimization</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-400" /> API Integrations</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-400" /> Testing & QA Automation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">How I Work</h3>
                <ul className="space-y-2 text-neutral-400 text-sm">
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-400" /> Clear planning before code</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-400" /> Weekly async updates</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-400" /> Defined acceptance criteria</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-400" /> CI/CD from day one</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-400" /> Documentation as deliverable</li>
                </ul>
              </div>
            </div>

            {/* Credibility */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-white font-medium mb-2">Engineering Practices</h4>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="px-2 py-1 bg-white/5 rounded text-neutral-400">CI/CD</span>
                <span className="px-2 py-1 bg-white/5 rounded text-neutral-400">Playwright E2E</span>
                <span className="px-2 py-1 bg-white/5 rounded text-neutral-400">TypeScript strict</span>
                <span className="px-2 py-1 bg-white/5 rounded text-neutral-400">Observability</span>
                <span className="px-2 py-1 bg-white/5 rounded text-neutral-400">Security patches</span>
                <span className="px-2 py-1 bg-white/5 rounded text-neutral-400">Audit-ready mindset</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SKILLS SECTION ===== */}
        <section id="skills" className="py-24 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="Tech Stack" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <SkillGroup
                title="Frontend"
                skills={["React 19", "Next.js 16", "TypeScript", "Tailwind CSS"]}
              />
              <SkillGroup
                title="Backend"
                skills={["Node.js", "Python", "SQL", "REST APIs"]}
              />
              <SkillGroup
                title="DevOps"
                skills={["Docker", "Linux", "Git", "Vercel"]}
              />
              <SkillGroup
                title="Testing"
                skills={["Playwright", "Jest", "E2E", "TDD"]}
              />
            </div>
          </div>
        </section>

        {/* ===== CONTACT SECTION ===== */}
        <section id="contact" className="py-24 px-4 bg-neutral-950 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                Let's Talk
              </h2>
              <p className="text-lg text-neutral-400 mb-8">
                Have a project? Need a developer? Tell me your constraints (timeline, budget, stack) and let's see if we're a fit.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <AnimatedButton
                  href="mailto:tonymora1982@gmail.com?subject=Project%20Inquiry%20for%20Anthony%20Mora&body=Hi%20Anthony%2C%0A%0AProject%3A%20%0ATimeline%3A%20%0ABudget%3A%20%0AStack%20preferences%3A%20%0A%0AThanks!"
                  variant="primary"
                  className="bg-emerald-500 text-black hover:bg-emerald-400 px-8 py-4"
                >
                  <Mail className="w-5 h-5 mr-2" /> Start a Conversation
                </AnimatedButton>
              </div>

              <div className="text-neutral-500 text-sm mb-8">
                <p>Or email directly: <a href="mailto:tonymora1982@gmail.com" className="text-white hover:text-emerald-400">tonymora1982@gmail.com</a></p>
                <p className="mt-2">Costa Rica · GMT-6 · 4-6 hrs daily overlap with EU/US</p>
              </div>

              <div className="flex justify-center gap-6">
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

function InfoItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-neutral-400">
      {icon}
      <span>{text}</span>
    </div>
  );
}

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  tags?: string[];
  isCurrent?: boolean;
}

function ExperienceItem({ title, company, period, description, tags, isCurrent }: ExperienceItemProps) {
  return (
    <motion.div
      className="group grid md:grid-cols-[180px_1fr] gap-4"
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
        </h3>
        <p className="text-neutral-400">{company}</p>
        <p className="text-neutral-500 text-sm mt-2">{description}</p>
        {tags && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 text-xs bg-white/5 rounded text-neutral-400">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  problem?: string;
  result?: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  caseStudyUrl?: string;
}

function ProjectCard({ title, subtitle, description, problem, result, tags, liveUrl, codeUrl, caseStudyUrl }: ProjectCardProps) {
  return (
    <motion.div
      className="group p-6 bg-neutral-900/50 border border-white/10 rounded-lg hover:border-emerald-500/50 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">{subtitle}</p>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
        {title}
      </h3>
      <p className="text-neutral-400 text-sm mb-4">{description}</p>

      {(problem || result) && (
        <div className="space-y-2 mb-4 text-xs">
          {problem && <p className="text-neutral-500"><strong className="text-neutral-400">Problem:</strong> {problem}</p>}
          {result && <p className="text-neutral-500"><strong className="text-emerald-400">Result:</strong> {result}</p>}
        </div>
      )}

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
            <ChevronRight className="w-4 h-4" /> Details
          </Link>
        )}
      </div>
    </motion.div>
  );
}

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

/**
 * Proof Metric Component - Shows verifiable metrics in hero
 */
function ProofMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <span className="text-xl font-bold text-white">{value}</span>
      <span className="block text-xs text-neutral-500">{label}</span>
    </div>
  );
}
