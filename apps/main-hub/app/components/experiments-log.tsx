'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiments, getExperimentsByCategory, type Experiment } from '@/lib/experiments-data';
import { ExternalLink, FileText, Beaker } from 'lucide-react';

type CategoryFilter = 'all' | Experiment['category'];

export function ExperimentsLog() {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);

  const filteredExperiments = 
    filter === 'all' 
      ? experiments 
      : getExperimentsByCategory(filter);

  const categories: { id: CategoryFilter; label: string; emoji: string }[] = [
    { id: 'all', label: 'Todos', emoji: '📚' },
    { id: 'optimization', label: 'Optimización', emoji: '⚡' },
    { id: 'architecture', label: 'Arquitectura', emoji: '🏗️' },
    { id: 'failure', label: 'Fallas valiosas', emoji: '🔥' },
    { id: 'research', label: 'Investigación', emoji: '🔬' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === cat.id
                ? 'bg-zinc-800 text-zinc-100 border-2 border-zinc-600'
                : 'bg-zinc-900/50 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-300'
            }`}
          >
            <span className="mr-2">{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredExperiments.map((experiment) => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              onClick={() => setSelectedExperiment(experiment)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Experiment Modal */}
      <AnimatePresence>
        {selectedExperiment && (
          <ExperimentModal
            experiment={selectedExperiment}
            onClose={() => setSelectedExperiment(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface ExperimentCardProps {
  experiment: Experiment;
  onClick: () => void;
}

function ExperimentCard({ experiment, onClick }: ExperimentCardProps) {
  const categoryConfig = {
    optimization: { color: 'bg-emerald-400/10 text-emerald-400', emoji: '⚡' },
    architecture: { color: 'bg-blue-400/10 text-blue-400', emoji: '🏗️' },
    failure: { color: 'bg-red-400/10 text-red-400', emoji: '🔥' },
    research: { color: 'bg-purple-400/10 text-purple-400', emoji: '🔬' },
  };

  const config = categoryConfig[experiment.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 cursor-pointer hover:border-zinc-600 transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className={`px-2 py-1 rounded text-xs font-medium ${config.color}`}>
          {config.emoji} {experiment.category}
        </div>
        <span className="text-xs text-zinc-600">
          {new Date(experiment.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
          })}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors">
        {experiment.title}
      </h3>
      <p className="text-sm text-zinc-400 mb-4">{experiment.subtitle}</p>

      {/* Key Metric */}
      {experiment.results[0] && (
        <div className="bg-zinc-800/50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">{experiment.results[0].metric}</span>
            <span className="text-sm font-mono text-zinc-400">
              {experiment.results[0].before} → {experiment.results[0].after}
            </span>
          </div>
          <div className={`text-lg font-bold mt-1 ${
            experiment.category === 'failure' ? 'text-red-400' : 'text-emerald-400'
          }`}>
            {experiment.results[0].improvement}
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {experiment.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-zinc-800/50 text-zinc-400 text-xs rounded"
          >
            {tag}
          </span>
        ))}
        {experiment.tags.length > 3 && (
          <span className="px-2 py-1 text-zinc-500 text-xs">
            +{experiment.tags.length - 3}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 text-sm">
        {experiment.demoUrl && (
          <div className="flex items-center gap-1 text-emerald-400">
            <Beaker className="w-4 h-4" />
            <span>Reproducir</span>
          </div>
        )}
        {experiment.postmortemUrl && (
          <div className="flex items-center gap-1 text-zinc-400">
            <FileText className="w-4 h-4" />
            <span>Postmortem</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface ExperimentModalProps {
  experiment: Experiment;
  onClose: () => void;
}

function ExperimentModal({ experiment, onClose }: ExperimentModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 text-2xl"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">
          {experiment.title}
        </h2>
        <p className="text-zinc-400 mb-6">{experiment.subtitle}</p>

        {/* Hypothesis */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-emerald-400 mb-2">Hipótesis</h3>
          <p className="text-zinc-300">{experiment.hypothesis}</p>
        </section>

        {/* Methodology */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-blue-400 mb-2">Metodología</h3>
          <p className="text-zinc-300">{experiment.methodology}</p>
        </section>

        {/* Results */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-purple-400 mb-3">Resultados</h3>
          <div className="space-y-3">
            {experiment.results.map((result, i) => (
              <div key={i} className="bg-zinc-800/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-400">{result.metric}</span>
                  <span className="text-sm font-mono text-zinc-300">
                    {result.before} → {result.after}
                  </span>
                </div>
                <div className={`text-xl font-bold ${
                  experiment.category === 'failure' ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {result.improvement}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Context */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-yellow-400 mb-2">Contexto</h3>
          <p className="text-zinc-300 text-sm">{experiment.context}</p>
        </section>

        {/* Learnings */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-cyan-400 mb-3">Aprendizajes</h3>
          <ul className="space-y-2">
            {experiment.learnings.map((learning, i) => (
              <li key={i} className="flex gap-2 text-zinc-300 text-sm">
                <span className="text-cyan-400 mt-1">•</span>
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          {experiment.demoUrl && (
            <a
              href={experiment.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
            >
              <Beaker className="w-4 h-4" />
              Reproducir experimento
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {experiment.postmortemUrl && (
            <a
              href={experiment.postmortemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4" />
              Ver postmortem
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
