"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Glitch Effect 404 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h1 className="text-[12rem] md:text-[16rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 select-none">
            404
          </h1>
          <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black leading-none text-emerald-400/20 blur-2xl select-none">
            404
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">
            Página no encontrada
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            La página que buscas no existe, fue movida, o está en desarrollo. 
            Mientras tanto, puedes explorar otras secciones.
          </p>
        </motion.div>

        {/* Terminal Style Error */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-left max-w-md mx-auto"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <code className="text-zinc-400">
            <span className="text-emerald-400">$</span> curl -I /your-page
            <br />
            <span className="text-red-400">HTTP/1.1 404 Not Found</span>
            <br />
            <span className="text-zinc-500"># Try navigating to a valid route</span>
          </code>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors"
          >
            <Home size={20} />
            Ir al inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            Volver atrás
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-zinc-800"
        >
          <p className="text-zinc-500 text-sm mb-4">Páginas populares:</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/portfolio" className="text-emerald-400 hover:text-emerald-300 hover:underline">
              Portfolio
            </Link>
            <span className="text-zinc-700">•</span>
            <Link href="/cv" className="text-emerald-400 hover:text-emerald-300 hover:underline">
              CV
            </Link>
            <span className="text-zinc-700">•</span>
            <Link href="/evidence-layer" className="text-emerald-400 hover:text-emerald-300 hover:underline">
              Evidence Layer
            </Link>
            <span className="text-zinc-700">•</span>
            <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 hover:underline">
              Contacto
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
