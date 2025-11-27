"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import anime from "animejs";
import {
  Factory,
  GitBranch,
  Cpu,
  Zap,
  BarChart3,
  ArrowRight,
  Github,
  Beaker,
  Layers,
  Activity,
  Sparkles,
} from "lucide-react";
import { LegoTitle } from "@/components/animations/lego-title";

// ===== ANIME.JS ANIMATED COMPONENTS =====

// Animated Grid Background
function AnimatedGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    
    const dots = gridRef.current.querySelectorAll('.grid-dot');
    
    // Staggered wave animation
    anime({
      targets: dots,
      scale: [
        { value: 1.5, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 500 }
      ],
      opacity: [
        { value: 1, easing: 'easeOutSine', duration: 500 },
        { value: 0.3, easing: 'easeInOutQuad', duration: 500 }
      ],
      delay: anime.stagger(50, { grid: [20, 10], from: 'center' }),
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
    });
  }, []);

  return (
    <div ref={gridRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid grid-cols-20 gap-8 p-8" style={{ gridTemplateColumns: 'repeat(20, 1fr)' }}>
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="grid-dot w-1 h-1 rounded-full bg-factory-accent/30 opacity-30"
          />
        ))}
      </div>
    </div>
  );
}

// Morphing Title Animation
function MorphingTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (lettersRef.current.length === 0) return;

    // Initial animation
    anime({
      targets: lettersRef.current,
      opacity: [0, 1],
      translateY: [50, 0],
      rotateX: [90, 0],
      delay: anime.stagger(80, { start: 300 }),
      duration: 1200,
      easing: 'easeOutExpo',
    });

    // Continuous subtle floating
    anime({
      targets: lettersRef.current,
      translateY: (el: HTMLSpanElement, i: number) => [0, Math.sin(i) * 3, 0],
      delay: anime.stagger(100),
      duration: 2000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
    });
  }, []);

  const text = "R&D LABORATORY";
  
  return (
    <h2 ref={titleRef} className="font-display text-5xl md:text-7xl font-black tracking-tight mb-6 perspective-1000">
      {text.split('').map((char, i) => (
        <span
          key={i}
          ref={(el) => { if (el) lettersRef.current[i] = el; }}
          className={`inline-block ${char === ' ' ? 'w-4' : ''} ${
            i < 3 ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-factory-accent to-cyan-400'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h2>
  );
}

// Particle System
function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const particles = containerRef.current.querySelectorAll('.particle');
    
    particles.forEach((particle, i) => {
      anime({
        targets: particle,
        translateX: () => anime.random(-300, 300),
        translateY: () => anime.random(-200, 200),
        scale: [0, anime.random(0.5, 1.5), 0],
        opacity: [0, 0.8, 0],
        duration: () => anime.random(3000, 6000),
        delay: () => anime.random(0, 2000),
        loop: true,
        easing: 'easeInOutQuad',
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#22d3ee' : '#a855f7',
            boxShadow: `0 0 10px ${i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#22d3ee' : '#a855f7'}`,
          }}
        />
      ))}
    </div>
  );
}

// Animated Counter
function AnimatedCounter({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
  const countRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!countRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const numValue = parseInt(value) || 0;
          const obj = { count: 0 };
          
          anime({
            targets: obj,
            count: numValue,
            round: 1,
            duration: 2000,
            easing: 'easeOutExpo',
            update: () => {
              if (countRef.current) {
                countRef.current.textContent = value.includes('+') 
                  ? `${Math.floor(obj.count)}+` 
                  : `${Math.floor(obj.count)}`;
              }
            },
          });

          // Icon bounce
          anime({
            targets: countRef.current?.parentElement?.querySelector('.stat-icon'),
            scale: [1, 1.3, 1],
            rotate: [0, 15, -15, 0],
            duration: 800,
            easing: 'easeOutElastic(1, .5)',
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div className="text-center p-4 glass-panel rounded-lg group hover:border-factory-accent/50 transition-all duration-300">
      <Icon className="stat-icon w-5 h-5 text-factory-accent mx-auto mb-2" />
      <div ref={countRef} className="font-display text-2xl font-bold text-white">
        0
      </div>
      <div className="text-xs text-gray-500 font-mono uppercase">
        {label}
      </div>
    </div>
  );
}

// Experiment Card with Anime.js hover effects
function ExperimentCard({ exp, index }: { exp: typeof experiments[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current || exp.status === 'coming-soon') return;

    // Card lift effect
    anime({
      targets: cardRef.current,
      translateY: -8,
      boxShadow: '0 20px 40px rgba(0, 255, 136, 0.15)',
      duration: 300,
      easing: 'easeOutQuad',
    });

    // Tech tags stagger
    if (techRef.current) {
      anime({
        targets: techRef.current.querySelectorAll('.tech-tag'),
        translateY: [-10, 0],
        opacity: [0.5, 1],
        delay: anime.stagger(50),
        duration: 400,
        easing: 'easeOutQuad',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    anime({
      targets: cardRef.current,
      translateY: 0,
      boxShadow: '0 0 0 rgba(0, 255, 136, 0)',
      duration: 300,
      easing: 'easeOutQuad',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="h-full"
      >
        <Link
          href={exp.href}
          className={`block metric-card group h-full ${
            exp.status === "coming-soon" ? "opacity-60 cursor-not-allowed" : ""
          }`}
          onClick={(e) => exp.status === "coming-soon" && e.preventDefault()}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exp.gradient} p-0.5 relative overflow-hidden`}>
              <div className="w-full h-full rounded-xl bg-factory-dark flex items-center justify-center relative z-10">
                <exp.icon className="w-6 h-6 text-white" />
              </div>
              {exp.status === 'live' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              )}
            </div>

            {exp.status === "live" ? (
              <span className="px-3 py-1 rounded-full bg-factory-accent/20 text-factory-accent text-xs font-mono border border-factory-accent/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-factory-accent animate-pulse" />
                LIVE
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-factory-steel/50 text-gray-400 text-xs font-mono border border-factory-steel">
                COMING SOON
              </span>
            )}
          </div>

          <h4 className="font-display text-xl font-bold mb-2 group-hover:text-factory-accent transition-colors">
            {exp.title}
          </h4>

          <p className="text-gray-400 text-sm mb-4 font-mono leading-relaxed">
            {exp.description}
          </p>

          <div className="flex items-center justify-between">
            <div ref={techRef} className="flex flex-wrap gap-2">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="tech-tag px-2 py-1 rounded bg-factory-steel/30 text-gray-300 text-xs font-mono"
                >
                  {t}
                </span>
              ))}
            </div>

            {exp.status === "live" && (
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-factory-accent group-hover:translate-x-1 transition-all" />
            )}
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

const experiments = [
  {
    id: "code-factory",
    title: "Code Factory",
    description:
      "Visualize Git history as a manufacturing assembly line. Commits become products, branches become production lines.",
    icon: Factory,
    status: "live",
    tech: ["Three.js", "React Three Fiber", "GitHub API"],
    href: "/code-factory",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    id: "neural-network",
    title: "Neural Network Viz",
    description:
      "Interactive 3D visualization of neural network architectures. Watch data flow through layers in real-time.",
    icon: Cpu,
    status: "coming-soon",
    tech: ["Three.js", "TensorFlow.js", "WebGL"],
    href: "#",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "api-stress-test",
    title: "API Load Simulator",
    description:
      "Stress test APIs with configurable load patterns. Visualize response times and error rates in real-time.",
    icon: Zap,
    status: "coming-soon",
    tech: ["WebWorkers", "D3.js", "Service Workers"],
    href: "#",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "metrics-dashboard",
    title: "DevOps Metrics",
    description:
      "DORA metrics dashboard with real-time data from GitHub Actions, deployments, and incident tracking.",
    icon: BarChart3,
    status: "coming-soon",
    tech: ["React", "Recharts", "GitHub API"],
    href: "#",
    gradient: "from-blue-500 to-indigo-500",
  },
];

const stats = [
  { label: "Experiments", value: "4", icon: Beaker },
  { label: "Technologies", value: "12+", icon: Layers },
  { label: "Active Projects", value: "1", icon: Activity },
];

// Animated CTA Button
function AnimatedCTAButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Continuous glow pulse
    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        boxShadow: [
          '0 0 20px rgba(0, 255, 136, 0.3)',
          '0 0 40px rgba(0, 255, 136, 0.5)',
          '0 0 20px rgba(0, 255, 136, 0.3)',
        ],
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine',
      });
    }
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!rippleRef.current || !buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    rippleRef.current.style.left = `${x}px`;
    rippleRef.current.style.top = `${y}px`;
    
    anime({
      targets: rippleRef.current,
      scale: [0, 4],
      opacity: [1, 0],
      duration: 600,
      easing: 'easeOutExpo',
    });
  };

  return (
    <Link
      ref={buttonRef}
      href="/code-factory"
      onClick={handleClick}
      className="relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-factory-accent to-cyan-500 text-factory-darker font-display font-bold rounded-lg overflow-hidden group"
    >
      <span ref={rippleRef} className="absolute w-4 h-4 rounded-full bg-white/30 pointer-events-none scale-0" />
      <Sparkles className="w-5 h-5 animate-pulse" />
      Launch Code Factory
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}

export default function LabHomePage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Entrance animation for entire hero
    anime({
      targets: '.hero-element',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(100, { start: 200 }),
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  return (
    <div className="min-h-screen bg-factory-darker relative overflow-hidden">
      {/* Animated Background Elements */}
      <AnimatedGrid />
      <ParticleField />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-factory-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-t-0 border-l-0 border-r-0 rounded-none backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-factory-accent/20 to-factory-accent/5 border border-factory-accent/30 flex items-center justify-center group-hover:border-factory-accent/60 transition-colors relative overflow-hidden">
                <Beaker className="w-5 h-5 text-factory-accent relative z-10" />
                <div className="absolute inset-0 bg-factory-accent/20 scale-0 group-hover:scale-100 transition-transform rounded-lg" />
              </div>
              <div>
                <h1 className="font-display text-lg font-bold tracking-wider">
                  GEEKSLAB
                </h1>
                <p className="text-xs text-gray-500 font-mono">R&D LABORATORY</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/code-factory"
                className="text-sm text-gray-400 hover:text-factory-accent transition-colors font-mono relative group"
              >
                Code Factory
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-factory-accent group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="https://geekslab.tech"
                className="text-sm text-gray-400 hover:text-white transition-colors font-mono relative group"
              >
                Main Site
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </Link>
              <a
                href="https://github.com/Tonymora1982"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors hover:rotate-12 transition-transform"
              >
                <Github className="w-5 h-5" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* LEGO Title - Full Width Centered */}
          <div className="text-center mb-12">
            <div className="hero-element inline-flex items-center gap-2 px-4 py-2 rounded-full bg-factory-accent/10 border border-factory-accent/30 text-factory-accent text-sm font-mono mb-8">
              <span className="w-2 h-2 rounded-full bg-factory-accent animate-ping" />
              <span className="w-2 h-2 rounded-full bg-factory-accent absolute" />
              EXPERIMENTAL ZONE
            </div>

            {/* LEGO Animated Title */}
            <div className="hero-element mb-8">
              <LegoTitle />
            </div>

            <p className="hero-element text-lg text-gray-400 max-w-2xl mx-auto font-mono mt-12">
              Where code meets creativity. Interactive experiments, 3D
              visualizations, and cutting-edge web technologies.
            </p>
          </div>

          {/* Stats - Centered below */}
          <div className="hero-element grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display text-2xl font-bold mb-8 flex items-center gap-3"
          >
            <Factory className="w-6 h-6 text-factory-accent" />
            EXPERIMENTS
            <span className="ml-auto text-sm font-mono text-gray-500">
              {experiments.filter(e => e.status === 'live').length} / {experiments.length} active
            </span>
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {experiments.map((exp, index) => (
              <ExperimentCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="glass-panel p-8 md:p-12 text-center neon-border relative overflow-hidden"
          >
            {/* Animated background lines */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-factory-accent to-transparent w-full"
                  style={{
                    top: `${20 + i * 15}%`,
                    animation: `slideRight ${3 + i * 0.5}s linear infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
            
            <GitBranch className="w-12 h-12 text-factory-accent mx-auto mb-6 animate-bounce" style={{ animationDuration: '2s' }} />
            <h3 className="font-display text-3xl font-bold mb-4">
              Ready to Explore?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto font-mono">
              Start with the Code Factory - visualize any GitHub repository as a
              manufacturing assembly line.
            </p>
            <AnimatedCTAButton />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-factory-steel/30 py-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-mono">
            © 2024 GeeksLab R&D. Experimental by design.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="https://geekslab.tech"
              className="text-gray-400 hover:text-white text-sm font-mono transition-colors hover:scale-105 transition-transform"
            >
              Main Site
            </Link>
            <Link
              href="https://nexastore.geekslab.tech"
              className="text-gray-400 hover:text-white text-sm font-mono transition-colors hover:scale-105 transition-transform"
            >
              NexaStore
            </Link>
            <a
              href="https://github.com/Tonymora1982"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors hover:scale-110 transition-transform"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%);
        }
        
        /* Gear animation styles */
        .gear {
          will-change: transform;
          transform-box: fill-box;
        }
        
        .gear-body {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
        }
      `}</style>
    </div>
  );
}
