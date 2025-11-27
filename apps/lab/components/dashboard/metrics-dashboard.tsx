"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Zap,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Target,
  Gauge,
} from "lucide-react";
import { useFactoryStore } from "@/store/factory";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: number;
  status?: "success" | "warning" | "danger" | "neutral";
  description?: string;
}

function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  trend,
  status = "neutral",
  description,
}: MetricCardProps) {
  const statusColors = {
    success: "text-factory-accent border-factory-accent/30",
    warning: "text-factory-warning border-factory-warning/30",
    danger: "text-factory-danger border-factory-danger/30",
    neutral: "text-gray-400 border-factory-steel",
  };

  const glowColors = {
    success: "shadow-factory-accent/20",
    warning: "shadow-factory-warning/20",
    danger: "shadow-factory-danger/20",
    neutral: "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`metric-card border ${statusColors[status]} ${
        status !== "neutral" ? `shadow-lg ${glowColors[status]}` : ""
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <Icon className={`w-5 h-5 ${statusColors[status].split(" ")[0]}`} />
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-mono ${
              trend >= 0 ? "text-factory-accent" : "text-factory-danger"
            }`}
          >
            {trend >= 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div className="mb-1">
        <span className="font-display text-2xl font-bold text-white">
          {value}
        </span>
        {unit && (
          <span className="text-gray-500 text-sm ml-1 font-mono">{unit}</span>
        )}
      </div>

      <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">
        {label}
      </div>

      {description && (
        <div className="text-xs text-gray-600 mt-2 font-mono">{description}</div>
      )}
    </motion.div>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  color?: string;
}

function ProgressBar({
  value,
  max = 100,
  label,
  color = "#00ff88",
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-400 font-mono uppercase">
          {label}
        </span>
        <span className="text-xs text-white font-mono">{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-factory-steel/30 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export function MetricsDashboard() {
  const { metrics, commits, productionLines } = useFactoryStore();

  const commitsByStatus = useMemo(() => {
    const counts = {
      shipped: 0,
      passed: 0,
      processing: 0,
      failed: 0,
      pending: 0,
    };
    commits.forEach((c) => {
      counts[c.status]++;
    });
    return counts;
  }, [commits]);

  const oeeStatus = useMemo(() => {
    if (metrics.oee >= 85) return "success";
    if (metrics.oee >= 60) return "warning";
    return "danger";
  }, [metrics.oee]);

  return (
    <div className="glass-panel p-4 max-w-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-factory-steel/30">
        <Activity className="w-4 h-4 text-factory-accent" />
        <h3 className="font-display text-sm font-bold tracking-wider">
          PRODUCTION METRICS
        </h3>
      </div>

      {/* OEE Gauge */}
      <div className="mb-6 p-4 bg-factory-dark/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 font-mono uppercase">
            Overall Equipment Effectiveness
          </span>
          <Gauge className={`w-4 h-4 ${
            oeeStatus === "success"
              ? "text-factory-accent"
              : oeeStatus === "warning"
              ? "text-factory-warning"
              : "text-factory-danger"
          }`} />
        </div>
        <div className="text-center">
          <span className={`font-display text-4xl font-bold ${
            oeeStatus === "success"
              ? "text-factory-accent"
              : oeeStatus === "warning"
              ? "text-factory-warning"
              : "text-factory-danger"
          }`}>
            {metrics.oee.toFixed(1)}%
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-display font-bold text-cyan-400">
              {metrics.availability.toFixed(1)}%
            </div>
            <div className="text-[10px] text-gray-500 font-mono">AVAIL</div>
          </div>
          <div>
            <div className="text-lg font-display font-bold text-purple-400">
              {metrics.performance.toFixed(1)}%
            </div>
            <div className="text-[10px] text-gray-500 font-mono">PERF</div>
          </div>
          <div>
            <div className="text-lg font-display font-bold text-factory-accent">
              {metrics.quality.toFixed(1)}%
            </div>
            <div className="text-[10px] text-gray-500 font-mono">QUAL</div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <MetricCard
          label="Throughput"
          value={metrics.commitsPerDay}
          unit="/day"
          icon={Zap}
          trend={12}
          status="success"
        />
        <MetricCard
          label="Cycle Time"
          value={metrics.avgCycleTime}
          unit="min"
          icon={Clock}
          status={metrics.avgCycleTime < 60 ? "success" : "warning"}
        />
        <MetricCard
          label="Pass Rate"
          value={metrics.passRate.toFixed(1)}
          unit="%"
          icon={CheckCircle2}
          status={metrics.passRate >= 90 ? "success" : "warning"}
        />
        <MetricCard
          label="First Pass Yield"
          value={metrics.firstPassYield.toFixed(1)}
          unit="%"
          icon={Target}
          status={metrics.firstPassYield >= 90 ? "success" : "warning"}
        />
      </div>

      {/* Quality Indicators */}
      <div className="p-3 bg-factory-dark/50 rounded-lg mb-4">
        <h4 className="text-xs text-gray-400 font-mono uppercase mb-3">
          Quality Indicators
        </h4>
        <ProgressBar
          value={metrics.passRate}
          label="Pass Rate"
          color="#00ff88"
        />
        <ProgressBar
          value={100 - metrics.defectRate}
          label="Defect Free"
          color="#22d3ee"
        />
        <ProgressBar
          value={100 - metrics.reworkRate}
          label="No Rework"
          color="#8b5cf6"
        />
      </div>

      {/* Pipeline Status */}
      <div className="p-3 bg-factory-dark/50 rounded-lg">
        <h4 className="text-xs text-gray-400 font-mono uppercase mb-3">
          Pipeline Status
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-factory-accent" />
              <span className="text-xs font-mono text-gray-300">Shipped</span>
            </div>
            <span className="text-xs font-mono text-factory-accent">
              {commitsByStatus.shipped}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono text-gray-300">Passed</span>
            </div>
            <span className="text-xs font-mono text-cyan-400">
              {commitsByStatus.passed}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-factory-warning animate-pulse" />
              <span className="text-xs font-mono text-gray-300">Processing</span>
            </div>
            <span className="text-xs font-mono text-factory-warning">
              {commitsByStatus.processing}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <span className="text-xs font-mono text-gray-300">Pending</span>
            </div>
            <span className="text-xs font-mono text-gray-400">
              {commitsByStatus.pending}
            </span>
          </div>
          {commitsByStatus.failed > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-factory-danger" />
                <span className="text-xs font-mono text-gray-300">Failed</span>
              </div>
              <span className="text-xs font-mono text-factory-danger">
                {commitsByStatus.failed}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Production Lines Status */}
      <div className="mt-4 pt-4 border-t border-factory-steel/30">
        <h4 className="text-xs text-gray-400 font-mono uppercase mb-3">
          Production Lines
        </h4>
        <div className="space-y-2">
          {productionLines.map((line) => (
            <div
              key={line.id}
              className="flex items-center justify-between p-2 bg-factory-dark/30 rounded"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    line.status === "active"
                      ? "bg-factory-accent animate-pulse"
                      : line.status === "idle"
                      ? "bg-gray-500"
                      : "bg-factory-danger"
                  }`}
                />
                <span className="text-xs font-mono text-gray-300">
                  {line.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-gray-500">
                  {line.throughput.toFixed(1)}/h
                </span>
                <span className="text-[10px] font-mono text-factory-accent">
                  {line.efficiency.toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
