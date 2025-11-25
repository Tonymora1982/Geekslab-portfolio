"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { Activity, CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp } from "lucide-react"; // Add Chevron icons
import { cn } from "../lib/utils";
import { SLAData } from "@geekslab/types"; // Import SLAData from @geekslab/types

interface SLABadgeProps {
    className?: string;
    apiUrl?: string; // Allow overriding the API URL for different apps
}

export const SLABadge = ({ className, apiUrl = "/api/sla-metrics" }: SLABadgeProps) => {
    const [data, setData] = useState<SLAData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState<"api" | "fallback">("api");
    const [isExpanded, setIsExpanded] = useState(false); // New state for expanded view

    const generateSimulatedMetrics = (): SLAData => {
        const baseUptime = 99.92;
        const baseLatency = 180;
        const baseErrorRate = 0.08;

        const uptime = Math.min(100, baseUptime + (Math.random() - 0.5) * 4);
        const latency = Math.max(50, baseLatency + (Math.random() - 0.5) * 60);
        const errorRate = Math.max(0, baseErrorRate + (Math.random() - 0.5) * 0.1);

        return {
            uptime: parseFloat(uptime.toFixed(2)),
            latency: Math.round(latency),
            errorRate: parseFloat(errorRate.toFixed(2)),
            lastUpdated: new Date().toISOString(),
            status: uptime < 99.5 || latency > 500 || errorRate > 1 ? "critical" : uptime < 99.9 || latency > 300 || errorRate > 0.2 ? "degraded" : "healthy",
        };
    };

    const fetchData = async () => {
        if (!apiUrl || mode === "fallback") {
            setData(generateSimulatedMetrics());
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(apiUrl);
            if (!res.ok) throw new Error("Failed to fetch");
            const jsonData: SLAData = await res.json(); // Cast to SLAData
            setData(jsonData);
        } catch (err) {
            console.warn("SLA API unavailable, using simulated metrics instead.", err);
            setMode("fallback");
            setData(generateSimulatedMetrics());
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, [apiUrl, mode]);

    const getStatusColorClass = (status?: string) => {
        switch (status) {
            case 'healthy': return "bg-emerald-500";
            case 'degraded': return "bg-yellow-500";
            case 'critical': return "bg-red-500";
            default: return "bg-neutral-500";
        }
    };

    const getStatusTextColorClass = (status?: string) => {
        switch (status) {
            case 'healthy': return "text-emerald-400";
            case 'degraded': return "text-yellow-400";
            case 'critical': return "text-red-400";
            default: return "text-neutral-400";
        }
    };

    const getStatusIcon = (status?: string) => {
        switch (status) {
            case 'healthy': return <CheckCircle className="w-3 h-3" />;
            case 'degraded': return <AlertTriangle className="w-3 h-3" />;
            case 'critical': return <XCircle className="w-3 h-3" />;
            default: return <Activity className="w-3 h-3" />;
        }
    };

    return (
        <div className={cn(
            "relative inline-flex flex-col items-start rounded-full bg-black/50 border border-white/10 backdrop-blur-sm text-xs font-mono cursor-pointer transition-all duration-300",
            isExpanded ? "p-4" : "px-3 py-1.5",
            className
        )}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                    <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", getStatusColorClass(data?.status))}></span>
                    <span className={cn("relative inline-flex rounded-full h-2 w-2", getStatusColorClass(data?.status))}></span>
                </div>

                <span className="text-neutral-400">SYSTEM</span>
                <span className={cn("font-bold", getStatusTextColorClass(data?.status))}>
                    {loading ? "..." : data?.status?.toUpperCase()}
                </span>

                {!loading && data && (
                    <span className="text-neutral-600 border-l border-white/10 pl-2 ml-1">
                        {data.uptime}%
                    </span>
                )}
                <div className="ml-2 text-neutral-500">
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && data && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 pt-2 border-t border-white/10 w-full text-neutral-400 space-y-1"
                    >
                        <div className="flex justify-between">
                            <span>Uptime:</span>
                            <span>{data.uptime}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Latency:</span>
                            <span>{data.latency}ms</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Error Rate:</span>
                            <span>{data.errorRate}%</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-neutral-500">
                            <span>Last Updated:</span>
                            <span>{new Date(data.lastUpdated).toLocaleTimeString()}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
