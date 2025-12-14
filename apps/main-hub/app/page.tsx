"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, ArrowDown, ChevronRight, Download, Calendar, Clock, FileText } from "lucide-react";
import { AnimatedFooter, AnimatedButton, ProjectShowcase, useLanguage, MagneticButton } from "@geekslab/ui";
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
  const { t } = useLanguage();

  return (
    <>
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-emerald-400/70 origin-left z-[100]"
        style={{ scaleX }}
      />

      <main className="bg-black text-white min-h-screen pt-16">

        {/* ===== HERO SECTION - CINEMATIC REDESIGN ===== */}
        <section id="hero" className="min-h-screen flex flex-col justify-center px-4 relative overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/10 via-black to-black pointer-events-none" />

          <div className="max-w-6xl mx-auto w-full relative z-10">
            {/* Staggered headline animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.35em] text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                {t('homepage.hero.availability')}
              </span>
            </motion.div>

            {/* Main headline - distinctive, less generic */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(3.25rem,10vw,7.25rem)] font-semibold tracking-[-0.045em] leading-[0.92]"
              >
                <span className="block text-white">Anthony Mora</span>
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(1.5rem,4.2vw,3.25rem)] font-medium tracking-[-0.02em] leading-[1.05] text-neutral-500"
              >
                Full-stack engineer.
              </motion.h2>
            </div>

            {/* Value proposition - clean and direct */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12 leading-relaxed"
            >
              {t('homepage.hero.valueProposition')}
              <span className="text-white"> — {t('homepage.hero.quote')}</span>
            </motion.p>

            {/* CTA row - prominent and clean */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <MagneticButton>
                <AnimatedButton
                  href="mailto:tonymora1982@gmail.com?subject=Opportunity%20for%20Anthony%20Mora"
                  variant="primary"
                  magnetic={false}
                  className="bg-white text-black hover:bg-neutral-200 px-8 py-4 text-lg font-semibold"
                >
                  {t('homepage.hero.contactMe')}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </AnimatedButton>
              </MagneticButton>

              <MagneticButton>
                <AnimatedButton
                  href="#projects"
                  variant="secondary"
                  magnetic={false}
                  className="border-white/20 hover:border-white/40 px-8 py-4 text-lg"
                >
                  {t('homepage.hero.projects')}
                </AnimatedButton>
              </MagneticButton>
            </motion.div>

            {/* Metrics strip - subtle proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-x-12 gap-y-4 text-sm border-t border-white/10 pt-8"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-white">39</span>
                <span className="text-neutral-500">{t('homepage.metrics.e2eTests')}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-white">0</span>
                <span className="text-neutral-500">{t('homepage.metrics.tsErrors')}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-emerald-300">ISO</span>
                <span className="text-neutral-500">{t('homepage.metrics.auditReady')}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-white">5+</span>
                <span className="text-neutral-500">{t('homepage.metrics.years')}</span>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <ArrowDown className="w-5 h-5 text-neutral-600/80" />
          </motion.div>
        </section>

        {/* ===== ABOUT SECTION ===== */}
        <section id="about" className="py-24 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title={t('homepage.about.title')} />

            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-6">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  {t('homepage.about.intro')} <strong className="text-white">{t('homepage.about.companyHighlight')}</strong> {t('homepage.about.introEnd')}
                  <span className="text-emerald-300"> {t('homepage.about.requirementsHighlight')}</span>{t('homepage.about.requirementsDesc')}
                </p>
                <p className="text-lg text-neutral-300 leading-relaxed">
                  {t('homepage.about.currentWork')} <strong className="text-white">{t('homepage.about.techHighlight')}</strong>{t('homepage.about.currentWorkEnd')}
                </p>

                {/* English proof */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-neutral-400">
                    <strong className="text-white">{t('homepage.about.englishProof')}</strong> {t('homepage.about.englishDesc')}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <InfoItem icon={<MapPin className="w-4 h-4" />} text="Costa Rica (GMT-6)" />
                <InfoItem icon={<Mail className="w-4 h-4" />} text="tonymora1982@gmail.com" />
                <InfoItem icon={<Phone className="w-4 h-4" />} text="+506 7017-9787" />
                <div className="pt-4 border-t border-white/10">
                  <p className="text-neutral-500 mb-2">{t('homepage.about.education')}</p>
                  <p className="text-white">{t('homepage.about.degree')}</p>
                  <p className="text-neutral-400 text-xs">{t('homepage.about.university')}</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-neutral-500 mb-2">{t('homepage.about.certifications')}</p>
                  <p className="text-neutral-300 text-xs">Yale Medical Software (2022)</p>
                  <p className="text-neutral-300 text-xs">CEH · LFC (In Progress - 2025)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== EXPERIENCE SECTION ===== */}
        <section id="experience" className="py-24 px-4 bg-neutral-950 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title={t('homepage.experience.title')} />

            {/* Software Development */}
            <div className="mb-12">
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-[0.35em] mb-6">{t('homepage.experience.software')}</h3>
              <div className="space-y-6">
                <ExperienceItem
                  title="Full Stack Developer"
                  company="GeeksLab (Freelance)"
                  period="2024 — Present"
                  description="Architecting production web apps with Next.js 16, React 19, TypeScript. Monorepo architecture, CI/CD, Playwright testing."
                  tags={["Next.js", "TypeScript", "React", "Vercel"]}
                  isCurrent
                />
                <ExperienceItem
                  title="Administrative Assistant"
                  company="INS (Instituto Nacional de Seguros)"
                  period="May 2025 — Present"
                  description="Administrative operations, process optimization, ETL, automation, and digital transformation initiatives."
                  tags={["Process Optimization", "ETL", "Automation", "Documentation"]}
                  isCurrent
                />
              </div>
            </div>

            {/* Operations / MedTech - Contextualized */}
            <div>
              <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">
                {t('homepage.experience.medtech')} <span className="text-neutral-600">{t('homepage.experience.domainExpertise')}</span>
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
              {t('homepage.experience.currentNote')}
            </p>
          </div>
        </section>

        {/* ===== PROJECTS SECTION ===== */}
        <section id="projects" className="border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 pt-24 pb-10">
            <SectionHeader title={t('homepage.projects.title')} />
            <p className="text-neutral-400 text-sm max-w-2xl">
              {t('homepage.projects.productionProofDesc')}
            </p>
          </div>

          <ProjectShowcase />

          <div className="max-w-5xl mx-auto px-4 pb-24">
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">{t('homepage.projects.productionProofTitle')}</h3>
              <p className="text-neutral-400 text-sm mb-4">
                {t('homepage.projects.productionProofDesc')}
              </p>
              <AnimatedButton
                href="/evidence-layer"
                variant="secondary"
                className="border-white/20 text-white hover:border-emerald-400/40 hover:bg-white/10"
              >
                {t('homepage.projects.viewEvidenceLayer')} <ChevronRight className="w-4 h-4 ml-1" />
              </AnimatedButton>
            </div>
          </div>
        </section>

        {/* ===== WHAT I DELIVER ===== */}
        <section id="services" className="py-24 px-4 bg-neutral-950 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title={t('homepage.services.title')} />

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-white font-medium mb-4">{t('homepage.services.scope')}</h3>
                <ul className="space-y-2 text-neutral-400 text-sm">
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-300/80" /> {t('homepage.services.scopeItems.0')}</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-300/80" /> {t('homepage.services.scopeItems.1')}</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-300/80" /> {t('homepage.services.scopeItems.2')}</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-300/80" /> {t('homepage.services.scopeItems.3')}</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-300/80" /> {t('homepage.services.scopeItems.4')}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-4">{t('homepage.services.howIWork')}</h3>
                <ul className="space-y-2 text-neutral-400 text-sm">
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-300/80" /> {t('homepage.services.howItems.0')}</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-300/80" /> {t('homepage.services.howItems.1')}</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-300/80" /> {t('homepage.services.howItems.2')}</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-300/80" /> {t('homepage.services.howItems.3')}</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-300/80" /> {t('homepage.services.howItems.4')}</li>
                </ul>
              </div>
            </div>

            {/* Credibility */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-white font-medium mb-2">{t('homepage.services.practices')}</h4>
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
            <SectionHeader title={t('homepage.skills.title')} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <SkillGroup
                title={t('homepage.skills.frontend')}
                skills={["React 19", "Next.js 16", "TypeScript", "Tailwind CSS"]}
              />
              <SkillGroup
                title={t('homepage.skills.backend')}
                skills={["Node.js", "Python", "SQL", "REST APIs"]}
              />
              <SkillGroup
                title={t('homepage.skills.devops')}
                skills={["Docker", "Linux", "Git", "Vercel"]}
              />
              <SkillGroup
                title={t('homepage.skills.testing')}
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
                {t('homepage.contact.title')}
              </h2>
              <p className="text-lg text-neutral-400 mb-8">
                {t('homepage.contact.description')}
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <AnimatedButton
                  href="mailto:tonymora1982@gmail.com?subject=Project%20Inquiry%20for%20Anthony%20Mora&body=Hi%20Anthony%2C%0A%0AProject%3A%20%0ATimeline%3A%20%0ABudget%3A%20%0AStack%20preferences%3A%20%0A%0AThanks!"
                  variant="primary"
                  className="bg-white text-black hover:bg-neutral-200 px-8 py-4"
                >
                  <Mail className="w-5 h-5 mr-2" /> {t('homepage.contact.startConversation')}
                </AnimatedButton>
              </div>

              <div className="text-neutral-500 text-sm mb-8">
                <p>{t('homepage.contact.emailDirectly')} <a href="mailto:tonymora1982@gmail.com" className="text-white hover:text-emerald-300">tonymora1982@gmail.com</a></p>
                <p className="mt-2">{t('homepage.contact.overlapInfo')}</p>
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
      className="text-xs font-mono uppercase tracking-[0.35em] text-neutral-400 mb-10 before:content-[''] before:inline-block before:h-px before:w-8 before:bg-emerald-400/40 before:mr-3 before:align-middle"
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
      <div className={`font-mono text-sm ${isCurrent ? 'text-emerald-300' : 'text-neutral-500'}`}>
        {period}
      </div>
      <div>
        <h3 className="font-display text-lg font-medium text-white transition-colors">
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
