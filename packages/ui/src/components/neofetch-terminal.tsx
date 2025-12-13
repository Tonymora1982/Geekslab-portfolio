"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SystemInfo {
  label: string;
  value: string;
  color?: string;
}

const ASCII_LOGO = `
   ██████╗ ███████╗███████╗██╗  ██╗███████╗
  ██╔════╝ ██╔════╝██╔════╝██║ ██╔╝██╔════╝
  ██║  ███╗█████╗  █████╗  █████╔╝ ███████╗
  ██║   ██║██╔══╝  ██╔══╝  ██╔═██╗ ╚════██║
  ╚██████╔╝███████╗███████╗██║  ██╗███████║
   ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝
       ██╗      █████╗ ██████╗ 
       ██║     ██╔══██╗██╔══██╗
       ██║     ███████║██████╔╝
       ██║     ██╔══██║██╔══██╗
       ███████╗██║  ██║██████╔╝
       ╚══════╝╚═╝  ╚═╝╚═════╝ 
`;

const SYSTEM_INFO: SystemInfo[] = [
  { label: "OS", value: "GeeksLab.tech v2.0", color: "text-cyan-400" },
  { label: "Host", value: "Anthony Mora Parra", color: "text-green-400" },
  { label: "Kernel", value: "Next.js 16 + React 19", color: "text-yellow-400" },
  { label: "Uptime", value: "13+ years in tech", color: "text-purple-400" },
  { label: "Packages", value: "TypeScript, Three.js, Framer", color: "text-pink-400" },
  { label: "Shell", value: "zsh + VS Code", color: "text-blue-400" },
  { label: "Resolution", value: "Pixel-perfect @ any scale", color: "text-orange-400" },
  { label: "DE", value: "R&D Engineering", color: "text-red-400" },
  { label: "WM", value: "AR/Mobile Development", color: "text-emerald-400" },
  { label: "Terminal", value: "ISO 13485 Certified", color: "text-violet-400" },
  { label: "CPU", value: "Creative @ 100%", color: "text-amber-400" },
  { label: "Memory", value: "∞ Coffee / 0 Bugs", color: "text-lime-400" },
];

const COLORS = [
  "bg-black", "bg-red-500", "bg-green-500", "bg-yellow-500",
  "bg-blue-500", "bg-purple-500", "bg-cyan-500", "bg-white",
];

const TYPING_COMMANDS = [
  { cmd: "neofetch", delay: 100 },
  { cmd: "cat skills.json | jq '.expertise'", delay: 2000 },
  { cmd: "ls -la ~/projects/", delay: 4000 },
];

export function NeofetchTerminal({ 
  className = "",
  showMatrixBg = true,
  autoStart = true,
  onComplete,
}: {
  className?: string;
  showMatrixBg?: boolean;
  autoStart?: boolean;
  onComplete?: () => void;
}) {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [typedCommand, setTypedCommand] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"typing" | "neofetch" | "skills" | "projects" | "prompt">("typing");
  const terminalRef = useRef<HTMLDivElement>(null);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Typing animation for command
  useEffect(() => {
    if (!autoStart) return;
    
    const command = "neofetch";
    let index = 0;
    
    const typeInterval = setInterval(() => {
      if (index <= command.length) {
        setTypedCommand(command.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentPhase("neofetch");
        }, 300);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [autoStart]);

  // Neofetch lines animation
  useEffect(() => {
    if (currentPhase !== "neofetch") return;

    const totalLines = SYSTEM_INFO.length;
    let line = 0;

    const lineInterval = setInterval(() => {
      if (line <= totalLines) {
        setDisplayedLines(line);
        line++;
      } else {
        clearInterval(lineInterval);
        setTimeout(() => {
          setIsComplete(true);
          setCurrentPhase("prompt");
          onComplete?.();
        }, 500);
      }
    }, 120);

    return () => clearInterval(lineInterval);
  }, [currentPhase, onComplete]);

  // Matrix rain characters (if enabled)
  const MatrixRain = () => {
    const [columns, setColumns] = useState<{ chars: string[], x: number, speed: number }[]>([]);
    
    useEffect(() => {
      const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";
      const newColumns = Array.from({ length: 40 }, (_, i) => ({
        chars: Array.from({ length: 25 }, () => chars[Math.floor(Math.random() * chars.length)]),
        x: i * 25,
        speed: 0.5 + Math.random() * 1.5,
      }));
      setColumns(newColumns);
    }, []);

    return (
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {columns.map((col, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500 font-mono text-sm leading-tight"
            style={{ left: col.x }}
            initial={{ y: -500 }}
            animate={{ y: "100vh" }}
            transition={{
              duration: 10 / col.speed,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            {col.chars.map((char, j) => (
              <div key={j} style={{ opacity: 1 - j * 0.04 }}>{char}</div>
            ))}
          </motion.div>
        ))}
      </div>
    );
  };

  const asciiLines = ASCII_LOGO.split('\n').filter(line => line.trim());

  return (
    <div className={`relative ${className}`}>
      {showMatrixBg && <MatrixRain />}
      
      <motion.div
        ref={terminalRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 bg-black/90 backdrop-blur-xl border border-green-500/30 rounded-lg overflow-hidden shadow-2xl shadow-green-500/10 max-w-4xl mx-auto"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900/80 border-b border-green-500/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
          </div>
          <span className="ml-4 text-neutral-400 text-sm font-mono">
            anthony@geekslab ~ 
          </span>
          <span className="text-green-400 text-sm font-mono ml-auto">
            zsh
          </span>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm md:text-base min-h-[500px]">
          {/* Command Line */}
          <div className="flex items-center text-green-400 mb-6">
            <span className="text-pink-400">❯</span>
            <span className="text-cyan-400 ml-2">~</span>
            <span className="text-white ml-2">{typedCommand}</span>
            {currentPhase === "typing" && (
              <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>▋</span>
            )}
          </div>

          {/* Neofetch Output */}
          {currentPhase !== "typing" && (
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              {/* ASCII Logo */}
              <div className="text-green-400 whitespace-pre leading-tight text-[8px] sm:text-[10px] md:text-xs flex-shrink-0">
                {asciiLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="text-green-500"
                  >
                    {line}
                  </motion.div>
                ))}
              </div>

              {/* System Info */}
              <div className="flex-1 space-y-1">
                {/* User@Host header */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-2"
                >
                  <span className="text-green-400 font-bold">anthony</span>
                  <span className="text-white">@</span>
                  <span className="text-cyan-400 font-bold">geekslab</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-500/50 mb-3"
                >
                  ─────────────────────────
                </motion.div>

                {/* Info Lines */}
                {SYSTEM_INFO.slice(0, displayedLines).map((info, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <span className={`${info.color || 'text-cyan-400'} font-bold w-28 md:w-32`}>
                      {info.label}
                    </span>
                    <span className="text-white/80">{info.value}</span>
                  </motion.div>
                ))}

                {/* Color Palette */}
                {displayedLines >= SYSTEM_INFO.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 flex gap-1"
                  >
                    {COLORS.map((color, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className={`w-6 h-6 ${color} rounded-sm`}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Final prompt with cursor */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center text-green-400 mt-8"
            >
              <span className="text-pink-400">❯</span>
              <span className="text-cyan-400 ml-2">~</span>
              <span className={`ml-2 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>▋</span>
            </motion.div>
          )}
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-30" />
        
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-green-500/20 rounded-lg blur-xl opacity-50 -z-10" />
      </motion.div>

      {/* Enter Button */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <motion.a
            href="#main-content"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 font-mono hover:bg-green-500/20 hover:border-green-400 transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg">./enter_geekslab.sh</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xl"
            >
              →
            </motion.span>
          </motion.a>
          <p className="text-neutral-500 text-sm mt-3 font-mono">
            Press Enter or scroll to continue
          </p>
        </motion.div>
      )}
    </div>
  );
}

// Interactive version with actual command input
export function InteractiveTerminal({ className = "" }: { className?: string }) {
  const [history, setHistory] = useState<{ type: 'cmd' | 'output', content: string }[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  const commands: Record<string, string> = {
    help: `Available commands:
  whoami     - Display user info
  skills     - List technical skills
  projects   - Show portfolio projects
  contact    - Display contact info
  clear      - Clear terminal
  neofetch   - System information`,
    whoami: "Anthony Mora Parra - AR/Mobile Development Specialist\n13+ years in R&D Engineering | ISO 13485 Certified",
    skills: `Frontend:  React, Next.js, TypeScript, Three.js
Backend:   Node.js, Python, C#, SQL
DevOps:    Docker, CI/CD, Linux (LFC)
Security:  Cybersecurity (CEH)
Soft:      R&D Management, Agile, English B2+`,
    projects: `📁 nexastore/     E-commerce Platform
📁 qms/           Quality Management System
📁 code-factory/  3D Git Visualization
📁 ar-apps/       AR/VR Experiences`,
    contact: `📧 tonymora1982@gmail.com
📱 +506 7017-9787
🔗 github.com/geekslab
🌐 geekslab.tech`,
    neofetch: "Running neofetch... [View full terminal above]",
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    const output = commands[trimmed] || `Command not found: ${trimmed}. Type 'help' for available commands.`;
    
    setHistory(prev => [
      ...prev,
      { type: 'cmd', content: cmd },
      { type: 'output', content: output }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
      setCurrentInput("");
    }
  };

  return (
    <div 
      className={`bg-black/90 border border-green-500/30 rounded-lg overflow-hidden font-mono text-sm ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900/80 border-b border-green-500/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-4 text-neutral-400">Interactive Terminal — Type “help”</span>
      </div>
      
      <div className="p-4 h-64 overflow-y-auto">
        {history.map((item, i) => (
          <div key={i} className={item.type === 'cmd' ? 'text-green-400' : 'text-white/70 whitespace-pre-wrap mb-2'}>
            {item.type === 'cmd' && <span className="text-pink-400">❯ </span>}
            {item.content}
          </div>
        ))}
        
        <div className="flex items-center text-green-400">
          <span className="text-pink-400">❯ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white"
            autoFocus
          />
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>▋</span>
        </div>
      </div>
    </div>
  );
}

export default NeofetchTerminal;
