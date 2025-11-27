"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@geekslab/ui";
import { AnimatedFooter, GridPattern, CornerAccents } from "@geekslab/ui";
import { Calendar, Download, Mail, Linkedin, Github, MapPin, Award, Briefcase, GraduationCap, Phone } from "lucide-react";
import Link from "next/link";

const certifications = [
  { name: "Linux Foundation Certified (LFC)", year: "2024", org: "Linux Foundation" },
  { name: "Certified Ethical Hacker (CEH)", year: "2023", org: "EC-Council" },
  { name: "ISO 13485 Internal Auditor", year: "2022", org: "BSI" },
  { name: "SolidWorks Associate (CSWA)", year: "2018", org: "Dassault Systèmes" },
];

const experience = [
  {
    roleEN: "Production Supervisor",
    roleES: "Supervisor de Producción",
    company: "Establishment Labs",
    period: "2020 - Present",
    descEN: "Leading production operations and compliance with Quality and Safety standards in a regulated medical environment (ISO 13485). Managing cross-functional teams and driving continuous improvement initiatives.",
    descES: "Liderazgo de operaciones de producción y cumplimiento de estándares de Calidad y Seguridad en entorno médico regulado (ISO 13485). Gestión de equipos multifuncionales e iniciativas de mejora continua.",
  },
  {
    roleEN: "R&D Engineer",
    roleES: "Ingeniero R&D",
    company: "Establishment Labs",
    period: "2018 - 2020",
    descEN: "Coordination of experimental tests, design verification, and prototyping for new medical devices. Led multiple product development cycles from concept to validation.",
    descES: "Coordinación de pruebas experimentales, verificación de diseño y prototipado para nuevos dispositivos médicos. Lideré múltiples ciclos de desarrollo de productos desde concepto hasta validación.",
  },
  {
    roleEN: "R&D Technician",
    roleES: "Técnico R&D",
    company: "Establishment Labs",
    period: "2016 - 2018",
    descEN: "Execution of technical studies and experimental tests for projects under development. 3D scanning, prototyping, and equipment maintenance.",
    descES: "Ejecución de estudios técnicos y pruebas experimentales para proyectos en desarrollo. Escaneo 3D, prototipado y mantenimiento de equipos.",
  },
  {
    roleEN: "Process Technician",
    roleES: "Técnico de Procesos",
    company: "Establishment Labs",
    period: "2012 - 2016",
    descEN: "Manufacturing operations for Class III medical devices. Quality control, process documentation, and equipment calibration.",
    descES: "Operaciones de manufactura para dispositivos médicos Clase III. Control de calidad, documentación de procesos y calibración de equipos.",
  },
];

const skills = {
  coreEN: ["C#", "Python", "SQL", "Linux (LFC)"],
  coreES: ["C#", "Python", "SQL", "Linux (LFC)"],
  webEN: ["Next.js", "React", "TypeScript", "Tailwind", "Node.js"],
  webES: ["Next.js", "React", "TypeScript", "Tailwind", "Node.js"],
  opsEN: ["Cybersecurity (CEH)", "Docker", "CI/CD", "Git", "AWS"],
  opsES: ["Ciberseguridad (CEH)", "Docker", "CI/CD", "Git", "AWS"],
  proEN: ["R&D Management", "ISO 13485", "Agile/Scrum", "English B2+", "AR/VR Development"],
  proES: ["Gestión R&D", "ISO 13485", "Agile/Scrum", "Inglés B2+", "Desarrollo AR/VR"],
};

export default function CVPage() {
  const { t, language } = useLanguage();

  const handleDownloadPDF = () => {
    // Open print dialog for PDF generation
    window.print();
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative overflow-hidden print:bg-white print:text-black">
      <GridPattern />
      <CornerAccents />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 print:pt-8 print:pb-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest text-neutral-400 print:border-black/20 print:text-black">
              Curriculum Vitae
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight print:text-4xl print:text-black">
              Anthony Mora Parra
            </h1>
            <p className="text-2xl md:text-3xl text-neutral-300 mb-2 font-medium print:text-xl print:text-black">
              {language === 'en' ? 'R&D Engineer & Full-Stack Developer' : 'Ingeniero R&D y Desarrollador Full-Stack'}
            </p>
            <p className="text-lg text-neutral-400 mb-8 leading-relaxed max-w-3xl print:text-base print:text-gray-600">
              {language === 'en'
                ? '13+ years in manufacturing R&D. Building production-grade web applications with industrial discipline and modern technologies.'
                : '13+ años en R&D de manufactura. Construyendo aplicaciones web de grado producción con disciplina industrial y tecnologías modernas.'}
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 md:gap-6 mb-8 text-sm md:text-base">
              <a href="mailto:tonymora1982@gmail.com" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors print:text-black">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                tonymora1982@gmail.com
              </a>
              <a href="https://wa.me/50670179787" className="flex items-center gap-2 text-neutral-400 hover:text-emerald-400 transition-colors print:text-black">
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                +506 7017-9787
              </a>
              <div className="flex items-center gap-2 text-neutral-400 print:text-black">
                <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                Grecia, Alajuela, Costa Rica
              </div>
              <a href="https://www.linkedin.com/in/anthony-mora-parra-5510b0160/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neutral-400 hover:text-cyan-400 transition-colors print:text-black">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                LinkedIn
              </a>
              <a href="https://github.com/Sobgo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neutral-400 hover:text-cyan-400 transition-colors print:text-black">
                <Github className="w-4 h-4 md:w-5 md:h-5" />
                GitHub
              </a>
            </div>

            {/* Download CV Button */}
            <button 
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors font-medium print:hidden"
            >
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
      <section className="relative z-10 py-32 px-4 border-t border-white/10 print:py-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 print:text-3xl print:text-black">
              {language === 'en' ? 'Let\'s work together' : 'Trabajemos juntos'}
            </h2>
            <p className="text-xl text-neutral-400 mb-8 print:text-base print:text-gray-600">
              {language === 'en'
                ? 'Available for freelance projects and open to full-time opportunities.'
                : 'Disponible para proyectos freelance y oportunidades de tiempo completo.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 print:hidden">
              <a
                href="mailto:tonymora1982@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors font-medium text-lg"
              >
                <Mail className="w-5 h-5" />
                {language === 'en' ? 'Send Email' : 'Enviar Email'}
              </a>
              <a
                href="https://wa.me/50670179787"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors font-medium text-lg"
              >
                <Phone className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatedFooter />
    </main>
  );
}
