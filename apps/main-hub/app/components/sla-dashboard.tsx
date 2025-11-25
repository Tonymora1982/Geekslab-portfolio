'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSLAMetrics, type SLAData } from '@/lib/sla-metrics';

export function SLADashboard() {
  const [metrics, setMetrics] = useState<SLAData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const data = await getSLAMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch SLA metrics:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
    // Refresh every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 animate-pulse"
          >
            <div className="h-4 bg-zinc-800 rounded w-1/2 mb-4" />
            <div className="h-8 bg-zinc-800 rounded w-3/4 mb-2" />
            <div className="h-3 bg-zinc-800 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center text-zinc-500 py-8">
        No se pudieron cargar las métricas SLA
      </div>
    );
  }

  const statusConfig = {
    healthy: {
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      borderColor: 'border-emerald-400/20',
      label: 'Saludable',
    },
    degraded: {
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/20',
      label: 'Degradado',
    },
    critical: {
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/20',
      label: 'Crítico',
    },
  };

  const config = statusConfig[metrics.status];

  return (
    <div className="w-full space-y-4">
      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} ${config.borderColor} border`}>
          <div className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')} animate-pulse`} />
          <span className={`text-sm font-medium ${config.color}`}>
            {config.label}
          </span>
        </div>
        <span className="text-xs text-zinc-500">
          Actualizado: {new Date(metrics.lastUpdated).toLocaleTimeString('es-ES')}
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Uptime */}
        <MetricCard
          title="Uptime"
          value={`${metrics.uptime}%`}
          unit=""
          status={metrics.uptime >= 99.9 ? 'healthy' : metrics.uptime >= 99.5 ? 'degraded' : 'critical'}
          target="≥99.9%"
        />

        {/* Latency */}
        <MetricCard
          title="Latencia (p95)"
          value={metrics.latency.toString()}
          unit="ms"
          status={metrics.latency <= 300 ? 'healthy' : metrics.latency <= 500 ? 'degraded' : 'critical'}
          target="≤300ms"
        />

        {/* Error Rate */}
        <MetricCard
          title="Tasa de error"
          value={metrics.errorRate.toString()}
          unit="%"
          status={metrics.errorRate <= 0.2 ? 'healthy' : metrics.errorRate <= 1.0 ? 'degraded' : 'critical'}
          target="≤0.2%"
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  status: 'healthy' | 'degraded' | 'critical';
  target: string;
}

function MetricCard({ title, value, unit, status, target }: MetricCardProps) {
  const statusColors = {
    healthy: 'text-emerald-400',
    degraded: 'text-yellow-400',
    critical: 'text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
        <div className={`w-2 h-2 rounded-full ${statusColors[status].replace('text-', 'bg-')}`} />
      </div>
      
      <div className="flex items-baseline gap-1 mb-1">
        <span className={`text-3xl font-bold ${statusColors[status]}`}>
          {value}
        </span>
        {unit && (
          <span className="text-lg text-zinc-500">{unit}</span>
        )}
      </div>
      
      <p className="text-xs text-zinc-600">
        Target: {target}
      </p>
    </motion.div>
  );
}
