"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  GitBranch,
  Settings,
  Maximize2,
  Minimize2,
  RefreshCw,
  Github,
  Info,
  Keyboard,
} from "lucide-react";
import { MetricsDashboard } from "@/components/dashboard/metrics-dashboard";
import { RepoSelector } from "@/components/dashboard/repo-selector";
import { useFactoryStore } from "@/store/factory";

// Dynamic import for Three.js canvas (client-side only)
const FactoryCanvas = dynamic(
  () =>
    import("@/components/three/factory-canvas").then((mod) => mod.FactoryCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-factory-darker flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-factory-accent/30 border-t-factory-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-factory-accent font-mono animate-pulse">
            Initializing Factory...
          </p>
        </div>
      </div>
    ),
  }
);

export default function CodeFactoryPage() {
  const [showMetrics, setShowMetrics] = useState(true);
  const [showRepoSelector, setShowRepoSelector] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const { repo, loadDemoData, isLoading } = useFactoryStore();

  useEffect(() => {
    // Load demo data on first mount
    loadDemoData();
  }, [loadDemoData]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-factory-darker relative">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <FactoryCanvas />
      </div>

      {/* HUD Overlay */}
      <div className="hud-overlay">
        {/* Top Bar */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute top-0 left-0 right-0 glass-panel m-4 rounded-lg border-t-0 border-l-0 border-r-0 rounded-t-none"
        >
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-mono hidden sm:inline">Lab</span>
              </Link>

              <div className="h-4 w-px bg-factory-steel" />

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-factory-accent/20 to-factory-accent/5 border border-factory-accent/30 flex items-center justify-center">
                  <GitBranch className="w-4 h-4 text-factory-accent" />
                </div>
                <div>
                  <h1 className="font-display text-sm font-bold">CODE FACTORY</h1>
                  <p className="text-[10px] text-gray-500 font-mono">
                    Git History Visualization
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Repo info */}
              {repo && (
                <button
                  onClick={() => setShowRepoSelector(true)}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-factory-dark/50 rounded-lg border border-factory-steel/50 hover:border-factory-accent/50 transition-colors"
                >
                  <Github className="w-4 h-4 text-factory-accent" />
                  <span className="text-sm font-mono text-gray-300">
                    {repo.fullName}
                  </span>
                </button>
              )}

              {/* Actions */}
              <button
                onClick={() => loadDemoData()}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Refresh data"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              </button>

              <button
                onClick={() => setShowMetrics(!showMetrics)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Toggle metrics"
              >
                <Settings className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowHelp(!showHelp)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Help"
              >
                <Info className="w-4 h-4" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Toggle fullscreen"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </motion.header>

        {/* Metrics Panel */}
        {showMetrics && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="absolute top-20 right-4 bottom-4 overflow-auto"
          >
            <MetricsDashboard />
          </motion.div>
        )}

        {/* Help Panel */}
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 glass-panel p-4 max-w-xs"
          >
            <div className="flex items-center gap-2 mb-3">
              <Keyboard className="w-4 h-4 text-factory-accent" />
              <h3 className="font-display text-sm font-bold">Controls</h3>
            </div>
            <div className="space-y-2 text-xs font-mono text-gray-400">
              <div className="flex justify-between">
                <span>Rotate View</span>
                <span className="text-gray-500">Left Click + Drag</span>
              </div>
              <div className="flex justify-between">
                <span>Pan View</span>
                <span className="text-gray-500">Right Click + Drag</span>
              </div>
              <div className="flex justify-between">
                <span>Zoom</span>
                <span className="text-gray-500">Scroll Wheel</span>
              </div>
              <div className="flex justify-between">
                <span>Select Commit</span>
                <span className="text-gray-500">Click on Box</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-factory-steel/30">
              <h4 className="text-xs font-mono text-gray-500 uppercase mb-2">
                Legend
              </h4>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-factory-accent" />
                  <span className="text-gray-400">Shipped (Deployed)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-cyan-400" />
                  <span className="text-gray-400">Passed QC</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-factory-warning" />
                  <span className="text-gray-400">Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gray-500" />
                  <span className="text-gray-400">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-factory-danger" />
                  <span className="text-gray-400">Failed</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="mt-4 w-full py-2 bg-factory-steel/30 text-gray-400 text-xs font-mono rounded hover:bg-factory-steel/50 transition-colors"
            >
              Close
            </button>
          </motion.div>
        )}

        {/* Status Bar */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-full"
        >
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-factory-accent animate-pulse" />
              <span className="text-gray-400">System Active</span>
            </div>
            <div className="h-3 w-px bg-factory-steel" />
            <span className="text-gray-500">
              {repo ? repo.fullName : "Demo Mode"}
            </span>
            <div className="h-3 w-px bg-factory-steel" />
            <span className="text-factory-accent">WebGL Enabled</span>
          </div>
        </motion.div>
      </div>

      {/* Repo Selector Modal */}
      <RepoSelector
        isOpen={showRepoSelector}
        onClose={() => setShowRepoSelector(false)}
      />
    </div>
  );
}
