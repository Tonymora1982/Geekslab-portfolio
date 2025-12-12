"use client";

import { SLADashboard } from '@/components/sla-dashboard';
import { ExperimentsLog } from '@/components/experiments-log';
import { RFCApplicationForm } from '@/components/rfc-application-form';
import { useLanguage } from '@geekslab/ui';

/**
 * Evidence Layer Page
 * 
 * Displays three key systems for recruiters to evaluate expertise:
 * 1. SLA Metrics - Real-time uptime, latency, and error rate metrics
 * 2. Experiments Log - Documented experiments with methodology and learnings
 * 3. RFC Application - Inverse application system with automatic scoring
 * 
 * Supports bilingual (EN/ES) content through the translation system.
 */
export default function EvidenceLayerPage() {
  // Hook for accessing translations based on current language setting
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        {/* Hero Section - Page introduction */}
        <section id="hero" className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {t('evidenceLayer.hero.title')}
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            {t('evidenceLayer.hero.description')}
          </p>
        </section>

        {/* SLA Metrics Section - Real-time performance dashboard */}
        <section id="sla" className="space-y-6 scroll-mt-24">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl">📊</span>
              <h2 className="text-3xl font-bold text-zinc-100">{t('evidenceLayer.sla.title')}</h2>
            </div>
            <p className="text-zinc-400 max-w-3xl">
              {t('evidenceLayer.sla.description')}
            </p>
          </div>

          <SLADashboard />
        </section>

        {/* Experiments Log Section - Documented experiments with methodology */}
        <section id="experiments" className="space-y-6 scroll-mt-24">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🧪</span>
              <h2 className="text-3xl font-bold text-zinc-100">{t('evidenceLayer.experiments.title')}</h2>
            </div>
            <p className="text-zinc-400 max-w-3xl">
              {t('evidenceLayer.experiments.description')}
            </p>
          </div>

          <ExperimentsLog />
        </section>

        {/* RFC Application Section - Inverse application with automatic scoring */}
        <section id="rfc" className="space-y-6 scroll-mt-24">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl">📝</span>
              <h2 className="text-3xl font-bold text-zinc-100">{t('evidenceLayer.rfcApplication.title')}</h2>
            </div>
            <p className="text-zinc-400 max-w-3xl">
              {t('evidenceLayer.rfcApplication.description')}
            </p>
            {/* Calibration note highlighting experience context */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <span className="text-yellow-400">⚠️</span>
              <span className="text-sm text-yellow-300">
                {t('evidenceLayer.rfcApplication.calibrationNote')}
              </span>
            </div>
          </div>

          <RFCApplicationForm />
        </section>

        {/* Footer with transparency statement and GitHub link */}
        <footer className="pt-16 border-t border-zinc-800 text-center text-zinc-500 text-sm">
          <p>
            {t('evidenceLayer.footer.note')}{' '}
            <a
              href="https://github.com/Tonymora1982/Geekslab-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
