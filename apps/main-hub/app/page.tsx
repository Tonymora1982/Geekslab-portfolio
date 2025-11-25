"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Terminal, Code2, Cpu, Globe } from "lucide-react";
import {
  AnimatedButton,
  AnimatedFooter,
  AnimatedHeroText,
  AnimatedSkillBadge,
  AnimatedWords,
  BentoGrid,
  BentoGridItem,
  DecoderText,
  EcosystemNav,
  ExperimentLog,
  ExperimentsSection,
  ExplodedView,
  FloatingShapes,
  GridPattern,
  HackerText,
  InverseApplication,
  ProjectShowcase,
  Scene3D,
  SLABadge,
  SLAPanel,
  SpotlightHero,
  useLanguage,
  CornerAccents,
  ExperienceTimeline
} from "@geekslab/ui";

export default function Home() {
  const { t } = useLanguage();
  const skills = [
    { category: "Core Engineering", skills: ["C#", "Python", "SQL", "Linux (LFC)"] },
    { category: "Modern Web", skills: ["Next.js", "React", "TypeScript", "Tailwind"] },
    { category: "Security & Ops", skills: ["Cybersecurity (CEH)", "Docker", "CI/CD", "Git"] },
    { category: "Professional", skills: ["R&D Management", "ISO 13485", "Agile", "English B2+"] },
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative overflow-hidden font-sans">
      <GridPattern />
      <FloatingShapes />
      <CornerAccents />
      {/* Hero Section */}
      <section className="h-screen w-full relative">
        <SpotlightHero className="h-full">
          <Scene3D />
          <div className="container px-4 mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto flex flex-col items-center"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-neutral-300">
                  v2.0.0-beta
                </div>
                <SLABadge />
              </div>
              <div className="mb-8 leading-tight">
                <AnimatedHeroText
                  text={t('hero.title')}
                  className="text-5xl md:text-8xl font-bold tracking-tight block mb-2"
                  delay={0}
                />
                <div className="text-5xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-neutral-200 to-neutral-500 block">
                  <DecoderText text={t('hero.highlight')} delay={200} />
                </div>
              </div>

              <div className="text-xl md:text-2xl text-neutral-400 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
                <AnimatedWords
                  words={t('hero.description').split(' ')}
                  delay={2500}
                />
              </div>

              <div className="w-full flex flex-col items-center gap-6 mb-10">
                <SLAPanel />
              </div>

              {/* Ecosystem Navigation */}
              <EcosystemNav t={t} />

              <div className="flex flex-wrap items-center justify-center gap-6">
                <AnimatedButton href="#experiments-lab" variant="primary" className="bg-white text-black hover:bg-neutral-200">
                  {t('hero.cta_experiments')}
                </AnimatedButton>
                <AnimatedButton href="#rfc-apply" variant="secondary" className="border-white/20 text-white hover:bg-white/10">
                  {t('hero.cta_apply')}
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </SpotlightHero>
      </section>

      {/* Exploded View Section */}
      <section className="relative bg-black py-20 md:py-32 border-t border-white/10">
        <div className="container px-4 mx-auto pt-10 md:pt-20 text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight">{t('deconstructed.title')}</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg md:text-xl">
            {t('deconstructed.description')}
          </p>
        </div>
        <ExplodedView />
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 md:py-32 border-t border-white/10 bg-black">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center"
          >
            <h2 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight">{t('experience.title')}</h2>
            <p className="text-neutral-500 max-w-xl mx-auto text-lg md:text-xl">
              {t('experience.subtitle')}
            </p>
          </motion.div>
          <ExperienceTimeline />
        </div>
      </section>

      {/* Experiment Log */}
      <ExperimentLog />

      {/* Skills Section */}
      <section className="w-full relative z-10 bg-black py-32 md:py-48 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-24 tracking-tighter">
            {t('skills.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {skills.map((group, index) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-none border-l border-white/20 hover:border-white/60 transition-colors pl-8"
              >
                <h3 className="text-xl font-bold mb-8 text-white tracking-tight uppercase">
                  <HackerText text={
                    index === 0 ? t('skills.categories.core') :
                      index === 1 ? t('skills.categories.web') :
                        index === 2 ? t('skills.categories.ops') :
                          t('skills.categories.pro')
                  } />
                </h3>
                <ul className="space-y-4">
                  {group.skills.map((skill, i) => (
                    <li key={skill} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                      <HackerText text={skill} className="font-mono text-lg tracking-tight" />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen w-full relative z-10 bg-neutral-950 py-32 md:py-48 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-24 tracking-tighter">
            {t('bento.title')}
          </h2>
          <ProjectShowcase />
        </div>
      </section>

      {/* Experiments Section */}
      <ExperimentsSection />

      {/* Inverse Application Form */}
      <InverseApplication />

      {/* Footer */}
      < AnimatedFooter />
    </main >
  );
}
