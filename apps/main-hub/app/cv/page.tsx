"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@geekslab/ui";
import { AnimatedFooter, GridPattern, CornerAccents } from "@geekslab/ui";
import { Calendar, Download, Mail, Linkedin, Github, MapPin, Award, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";

const certifications = [
  { name: "Linux Foundation Certified", year: "2024", org: "Linux Foundation" },
  { name: "Certified Ethical Hacker (CEH)", year: "2023", org: "EC-Council" },
  { name: "ISO 13485 Lead Auditor", year: "2022", org: "BSI" },
];

const experience = [
  {
    roleEN: "Production Supervisor",
    roleES: "Supervisor de Producción",
    company: "MedTech Corp",
    period: "2020 - Present",
    descEN: "Leading production operations and compliance with Quality and Safety standards in a regulated medical environment (ISO 13485).",
    descES: "Liderazgo de operaciones de producción y cumplimiento de estándares de Calidad y Seguridad en entorno médico regulado (ISO 13485).",
  },
  {
    roleEN: "R&D Jr. Engineer",
    roleES: "Ingeniero Jr. R&D",
    company: "MedTech Corp",
    period: "2018 - 2020",
    descEN: "Coordination of experimental tests, design verification, and prototyping for new medical devices.",
    descES: "Coordinación de pruebas experimentales, verificación de diseño y prototipado para nuevos dispositivos médicos.",
  },
  {
    roleEN: "R&D Technician",
    roleES: "Técnico R&D",
    company: "MedTech Corp",
    period: "2016 - 2018",
    descEN: "Execution of technical studies and experimental tests for projects under development.",
    descES: "Ejecución de estudios técnicos y pruebas experimentales para proyectos en desarrollo.",
  },
  {
    roleEN: "3D Digital-Lab Technician",
    roleES: "Técnico Laboratorio Digital 3D",
    company: "MedTech Corp",
    period: "2014 - 2016",
    descEN: "3D scanning tests and device hardware maintenance.",
    descES: "Pruebas de escaneo 3D y mantenimiento de hardware de dispositivos.",
  },
];

const skills = {
  coreEN: ["C#", "Python", "SQL", "Linux (LFC)"],
  coreES: ["C#", "Python", "SQL", "Linux (LFC)"],
  webEN: ["Next.js", "React", "TypeScript", "Tailwind"],
  webES: ["Next.js", "React", "TypeScript", "Tailwind"],
  opsEN: ["Cybersecurity (CEH)", "Docker", "CI/CD", "Git"],
  opsES: ["Ciberseguridad (CEH)", "Docker", "CI/CD", "Git"],
  proEN: ["R&D Management", "ISO 13485", "Agile", "English B2+"],
  proES: ["Gestión R&D", "ISO 13485", "Agile", "Inglés B2+"],
};

export default function CVPage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative overflow-hidden">
      <GridPattern />
      <CornerAccents />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest text-neutral-400">
              Curriculum Vitae
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {language === 'en' ? 'Professional Profile' : 'Perfil Profesional'}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 mb-8 leading-relaxed">
              {language === 'en'
                ? 'R&D Engineer turned Web Developer. Industrial discipline meets artisanal code.'
                : 'Ingeniero R&D convertido en Web Developer. Disciplina industrial encuentra código artesanal.'}
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 mb-8">
              <a href="mailto:your@email.com" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                your@email.com
              </a>
              <div className="flex items-center gap-2 text-neutral-400">
                <MapPin className="w-5 h-5" />
                Grecia, Alajuela, CR
              </div>
              <a href="https://linkedin.com" target="_blank" rel="noopener" className="flex items-center gap-2 text-neutral-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener" className="flex items-center gap-2 text-neutral-400 hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>

            {/* Download CV Button */}
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors font-medium">
              <Download className="w-5 h-5" />
              {language === 'en' ? 'Download PDF' : 'Descargar PDF'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="relative z-10 py-20 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-white" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {language === 'en' ? 'Experience' : 'Experiencia'}
              </h2>
            </div>
          </motion.div>

          <div className="space-y-0">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 py-12 border-b border-white/10 last:border-none group"
              >
                <div className="md:col-span-1">
                  <span className="text-neutral-500 font-mono text-sm tracking-wider group-hover:text-white transition-colors duration-300">
                    {job.period}
                  </span>
                </div>
                <div className="md:col-span-3 space-y-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:translate-x-2 transition-transform duration-300 ease-out-expo">
                    {language === 'en' ? job.roleEN : job.roleES}
                  </h3>
                  <p className="text-neutral-400 font-medium">
                    {job.company}
                  </p>
                  <p className="text-neutral-500 leading-relaxed max-w-2xl">
                    {language === 'en' ? job.descEN : job.descES}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="relative z-10 py-20 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              {language === 'en' ? 'Technical Arsenal' : 'Arsenal Técnico'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { titleEN: 'Core Engineering', titleES: 'Ingeniería Core', skills: skills.coreEN, skillsES: skills.coreES },
              { titleEN: 'Modern Web', titleES: 'Web Moderna', skills: skills.webEN, skillsES: skills.webES },
              { titleEN: 'Security & Ops', titleES: 'Seguridad y Ops', skills: skills.opsEN, skillsES: skills.opsES },
              { titleEN: 'Professional', titleES: 'Profesional', skills: skills.proEN, skillsES: skills.proES },
            ].map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-white/10 bg-white/5 rounded-none hover:border-white/30 transition-colors"
              >
                <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm">
                  {language === 'en' ? category.titleEN : category.titleES}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(language === 'en' ? category.skills : category.skillsES).map((skill) => (
                    <span key={skill} className="px-3 py-1.5 border border-white/10 bg-black/20 text-neutral-400 text-sm font-mono hover:text-white hover:border-white/30 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative z-10 py-20 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-white" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {language === 'en' ? 'Certifications' : 'Certificaciones'}
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <GraduationCap className="w-8 h-8 text-neutral-500 group-hover:text-white mb-4 transition-colors" />
                <h3 className="font-bold mb-2 text-white">{cert.name}</h3>
                <p className="text-sm text-neutral-400">{cert.org}</p>
                <p className="text-sm text-neutral-500 mt-2 font-mono">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {language === 'en' ? 'Let\'s work together' : 'Trabajemos juntos'}
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              {language === 'en'
                ? 'Available for freelance projects and open to full-time opportunities.'
                : 'Disponible para proyectos freelance y oportunidades de tiempo completo.'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors font-medium text-lg"
            >
              <Mail className="w-5 h-5" />
              {language === 'en' ? 'Get in Touch' : 'Contáctame'}
            </Link>
          </motion.div>
        </div>
      </section>

      <AnimatedFooter />
    </main>
  );
}
