"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Activity, Gauge, ShieldCheck, Timer, Wifi, WifiOff } from "lucide-react";

type MetricKey = "ttfb" | "lcp" | "uptime" | "errorBudget";

type Metric = {
  label: string;
  unit: string;
  threshold: number;
  icon: React.ReactNode;
  formatter?: (v: number) => string;
};

const METADATA: Record<MetricKey, Metric> = {
  ttfb: {
    label: "TTFB",
    unit: "ms",
    threshold: 200,
    icon: <Timer className="w-4 h-4" />,
  },
  lcp: {
    label: "LCP",
    unit: "s",
    threshold: 2.5,
    icon: <Gauge className="w-4 h-4" />,
    formatter: (v) => v.toFixed(2),
  },
  uptime: {
    label: "Uptime",
    unit: "%",
    threshold: 99.5,
    icon: <ShieldCheck className="w-4 h-4" />,
    formatter: (v) => v.toFixed(2),
  },
  errorBudget: {
    label: "Error Budget",
    unit: "%",
    threshold: 0.5,
    icon: <Activity className="w-4 h-4" />,
    formatter: (v) => v.toFixed(2),
  },
};

type SLAValues = Record<MetricKey, number>;

const BASELINE: SLAValues = {
  ttfb: 120,
  lcp: 1.8,
  uptime: 99.7,
  errorBudget: 0.12,
};

function jitter(value: number, spread: number) {
  const delta = (Math.random() * 2 - 1) * spread;
  return value + delta;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export const SLAPanel = () => {
  const [values, setValues] = useState<SLAValues>(BASELINE);
  const [isLive, setIsLive] = useState(false);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const metricsList = useMemo(() => Object.entries(METADATA) as [MetricKey, Metric][], []);

  const fetchSLAData = useCallback(async () => {
    try {
      const response = await fetch('/api/sla-metrics', { 
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.uptime && data.latency) {
          setValues({
            ttfb: data.latency || BASELINE.ttfb,
            lcp: (data.latency / 100) || BASELINE.lcp,
            uptime: data.uptime || BASELINE.uptime,
            errorBudget: data.errorRate || BASELINE.errorBudget,
          });
          setIsLive(true);
          setLastFetch(new Date());
          return;
        }
      }
    } catch (error) {
      // Silently fall back to simulated data
    }
    setIsLive(false);
  }, []);

  // Try to fetch real data on mount
  useEffect(() => {
    fetchSLAData();
    
    // Refresh every 30 seconds
    const fetchInterval = setInterval(fetchSLAData, 30_000);
    return () => clearInterval(fetchInterval);
  }, [fetchSLAData]);

  // Jitter effect for visual feedback (smaller when live)
  useEffect(() => {
    const id = setInterval(() => {
      setValues((prev) => ({
        ttfb: clamp(jitter(prev.ttfb, isLive ? 3 : 8), 90, 180),
        lcp: clamp(jitter(prev.lcp, isLive ? 0.02 : 0.08), 1.5, 2.3),
        uptime: clamp(jitter(prev.uptime, isLive ? 0.01 : 0.05), 99.5, 99.99),
        errorBudget: clamp(jitter(prev.errorBudget, isLive ? 0.01 : 0.05), 0.05, 0.45),
      }));
    }, 10_000);

    return () => clearInterval(id);
  }, [isLive]);

  return (
    <div className="space-y-2 w-full max-w-3xl">
      {/* Status indicator */}
      <div className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-wider">
        {isLive ? (
          <>
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-400">Live API</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3 h-3 text-neutral-500" />
            <span className="text-neutral-500">Simulated</span>
          </>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metricsList.map(([key, meta]) => {
          const value = values[key];
          const formatted = meta.formatter ? meta.formatter(value) : Math.round(value).toString();
          const good = key === "uptime" ? value >= meta.threshold : value <= meta.threshold;
          const badgeColor = good ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40" : "bg-amber-500/15 text-amber-200 border-amber-500/40";

          return (
            <div
              key={key}
              className="border border-white/10 bg-white/5 backdrop-blur-md rounded-xl p-4 flex flex-col gap-2 shadow-lg shadow-black/30"
            >
              <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-[0.18em]">
                {meta.icon}
                {meta.label}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-white">{formatted}</span>
                <span className="text-sm text-neutral-400">{meta.unit}</span>
              </div>
              <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border ${badgeColor}`}>
                SLA {meta.threshold}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
