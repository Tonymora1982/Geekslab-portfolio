"use client";

import { useEffect, useState } from "react";
import { Navbar, useLanguage } from "@geekslab/ui";
import { AnimatedFooter } from "@geekslab/ui";
import { SLABadge } from "@geekslab/ui";
import { motion } from "framer-motion";
import { Activity, Server, Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface SLAData {
    uptime: number;
    latency: number;
    errorRate: number;
    status: 'healthy' | 'degraded' | 'critical';
    lastUpdated: string;
}

export default function SLADashboard() {
    const [data, setData] = useState<SLAData | null>(null);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/sla-metrics");
                const json = await res.json();
                setData(json);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />

            <div className="container mx-auto px-4 pt-32 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                            {t('slaDashboard.title')}
                        </h1>
                        <p className="text-neutral-400 max-w-xl">
                            {t('slaDashboard.description')}
                        </p>
                    </div>
                    <SLABadge className="text-sm px-4 py-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Uptime Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-neutral-400 font-mono text-sm">{t('slaDashboard.uptime').toUpperCase()}</h3>
                            <Activity className="text-emerald-500 w-5 h-5" />
                        </div>
                        <div className="text-4xl font-bold tracking-tight mb-2">
                            {data?.uptime ?? "..."}%
                        </div>
                        <div className="text-xs text-neutral-500">Target: 99.9%</div>
                    </motion.div>

                    {/* Latency Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-neutral-400 font-mono text-sm">{t('slaDashboard.latency').toUpperCase()}</h3>
                            <Clock className="text-blue-500 w-5 h-5" />
                        </div>
                        <div className="text-4xl font-bold tracking-tight mb-2">
                            {data?.latency ?? "..."}ms
                        </div>
                        <div className="text-xs text-neutral-500">Global Average</div>
                    </motion.div>

                    {/* Error Rate Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-neutral-400 font-mono text-sm">{t('slaDashboard.errorRate').toUpperCase()}</h3>
                            <AlertTriangle className="text-yellow-500 w-5 h-5" />
                        </div>
                        <div className="text-4xl font-bold tracking-tight mb-2">
                            {data?.errorRate ?? "..."}%
                        </div>
                        <div className="text-xs text-neutral-500">Last 24 hours</div>
                    </motion.div>
                </div>

                {/* System Components Status */}
                <div className="border-t border-white/10 pt-12">
                    <h2 className="text-2xl font-bold mb-8">{t('slaDashboard.status')}</h2>
                    <div className="space-y-4">
                        {[
                            { name: "Main Hub API", status: "Operational" },
                            { name: "Database (Vercel Postgres)", status: "Operational" },
                            { name: "Portfolio Subdomain", status: "Operational" },
                            { name: "Lab Subdomain", status: "Maintenance" },
                        ].map((component, i) => (
                            <motion.div
                                key={component.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="flex items-center justify-between p-4 rounded-lg bg-neutral-900/30 border border-white/5"
                            >
                                <div className="flex items-center gap-3">
                                    <Server className="w-4 h-4 text-neutral-500" />
                                    <span className="font-medium">{component.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={cn("text-sm", component.status === "Operational" ? "text-emerald-500" : "text-yellow-500")}>
                                        {component.status}
                                    </span>
                                    {component.status === "Operational" ? (
                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    ) : (
                                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatedFooter />
        </main>
    );
}

// Helper for conditional classes if not imported
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}
