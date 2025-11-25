import { SLADashboard } from '@/components/sla-dashboard';
import { ExperimentsLog } from '@/components/experiments-log';
import { RFCApplicationForm } from '@/components/rfc-application-form';

export default function EvidenceLayerPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Recruiter Evidence Layer
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Tres sistemas para demostrar expertise, experimentación y transparencia.
            No solo palabras — datos reales, fallas documentadas, criterios explícitos.
          </p>
        </section>

        {/* SLA Metrics */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl">📊</span>
              <h2 className="text-3xl font-bold text-zinc-100">SLA Metrics</h2>
            </div>
            <p className="text-zinc-400 max-w-3xl">
              Métricas en tiempo real de uptime, latencia y error rate. Conectado a Vercel Analytics 
              con fallback a datos simulados realistas. Actualización cada 30 segundos.
            </p>
          </div>
          
          <SLADashboard />
        </section>

        {/* Experiments Log */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🧪</span>
              <h2 className="text-3xl font-bold text-zinc-100">Bitácora de experimentos</h2>
            </div>
            <p className="text-zinc-400 max-w-3xl">
              Registro de experimentos reales con metodología, resultados y aprendizajes. 
              Incluye 3 fallas valiosas con postmortems completos. Cada experimento es reproducible.
            </p>
          </div>
          
          <ExperimentsLog />
        </section>

        {/* RFC Application */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl">📝</span>
              <h2 className="text-3xl font-bold text-zinc-100">Solicitud RFC Inversa</h2>
            </div>
            <p className="text-zinc-400 max-w-3xl">
              Sistema de aplicación inversa: las empresas aplican para trabajar contigo. 
              Scoring automático basado en autonomía (25pts), stack (20pts), timeline (20pts), 
              presupuesto (15pts), experimentación (15pts) y compliance (5pts).
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <span className="text-yellow-400">⚠️</span>
              <span className="text-sm text-yellow-300">
                Criterios calibrados según 8 años en manufactura + transición a software
              </span>
            </div>
          </div>
          
          <RFCApplicationForm />
        </section>

        {/* Footer */}
        <footer className="pt-16 border-t border-zinc-800 text-center text-zinc-500 text-sm">
          <p>
            Sistemas diseñados para transparencia radical. Ver código fuente en{' '}
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
