"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  GitBranch,
  Star,
  GitFork,
  AlertCircle,
  Loader2,
  ExternalLink,
  X,
} from "lucide-react";
import { useFactoryStore } from "@/store/factory";

interface RepoSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RepoSelector({ isOpen, onClose }: RepoSelectorProps) {
  const [repoInput, setRepoInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { repo, loadDemoData } = useFactoryStore();

  const handleLoadRepo = async () => {
    if (!repoInput.includes("/")) {
      setError("Please use format: owner/repo");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // For now, just load demo data
      // In production, this would fetch from GitHub API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      loadDemoData();
      onClose();
    } catch (err) {
      setError("Failed to load repository. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadDemo = () => {
    loadDemoData();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass-panel p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <GitBranch className="w-5 h-5 text-factory-accent" />
                <h2 className="font-display text-xl font-bold">
                  Connect Repository
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Repo */}
            {repo && (
              <div className="mb-6 p-4 bg-factory-dark/50 rounded-lg">
                <div className="text-xs text-gray-500 font-mono uppercase mb-2">
                  Currently Loaded
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-mono">{repo.fullName}</div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {repo.forks}
                      </span>
                      <span>{repo.language}</span>
                    </div>
                  </div>
                  <a
                    href={`https://github.com/${repo.fullName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-factory-accent hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 font-mono uppercase mb-2 block">
                GitHub Repository
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={repoInput}
                  onChange={(e) => setRepoInput(e.target.value)}
                  placeholder="owner/repository"
                  className="w-full bg-factory-dark border border-factory-steel rounded-lg py-3 pl-10 pr-4 text-white font-mono placeholder:text-gray-600 focus:outline-none focus:border-factory-accent transition-colors"
                  onKeyDown={(e) => e.key === "Enter" && handleLoadRepo()}
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 mt-2 text-factory-danger text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleLoadRepo}
                disabled={isLoading || !repoInput}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-factory-accent text-factory-darker font-display font-bold rounded-lg hover:bg-factory-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Load Repository"
                )}
              </button>
              <button
                onClick={handleLoadDemo}
                className="px-4 py-3 bg-factory-steel/50 text-white font-mono text-sm rounded-lg hover:bg-factory-steel transition-colors"
              >
                Demo
              </button>
            </div>

            {/* Popular repos */}
            <div className="mt-6 pt-4 border-t border-factory-steel/30">
              <div className="text-xs text-gray-500 font-mono uppercase mb-3">
                Quick Load
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "facebook/react",
                  "vercel/next.js",
                  "microsoft/vscode",
                ].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRepoInput(r)}
                    className="px-3 py-1.5 bg-factory-dark/50 border border-factory-steel/50 rounded text-xs font-mono text-gray-400 hover:text-white hover:border-factory-accent/50 transition-colors"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* API Note */}
            <div className="mt-4 p-3 bg-factory-warning/10 border border-factory-warning/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-factory-warning flex-shrink-0 mt-0.5" />
                <div className="text-xs text-gray-400 font-mono">
                  <span className="text-factory-warning">Note:</span> GitHub API
                  has rate limits. For full functionality, authenticate with a
                  GitHub token.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
