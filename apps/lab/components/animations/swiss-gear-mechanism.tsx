"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";

interface GearProps {
  id: string;
  cx: number;
  cy: number;
  outerRadius: number;
  innerRadius: number;
  teeth: number;
  toothDepth: number;
  color: string;
  rotationSpeed: number;
  direction: 1 | -1;
  delay: number;
}

function generateGearPath(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  teeth: number,
  toothDepth: number
): string {
  const points: string[] = [];
  const anglePerTooth = (Math.PI * 2) / teeth;
  const toothWidth = anglePerTooth * 0.4;

  for (let i = 0; i < teeth; i++) {
    const startAngle = i * anglePerTooth;
    
    // Base of tooth (outer edge going up)
    const baseX1 = cx + Math.cos(startAngle) * innerRadius;
    const baseY1 = cy + Math.sin(startAngle) * innerRadius;
    
    // Tip of tooth left
    const tipX1 = cx + Math.cos(startAngle + toothWidth * 0.3) * (innerRadius + toothDepth);
    const tipY1 = cy + Math.sin(startAngle + toothWidth * 0.3) * (innerRadius + toothDepth);
    
    // Tip of tooth right
    const tipX2 = cx + Math.cos(startAngle + toothWidth * 0.7) * (innerRadius + toothDepth);
    const tipY2 = cy + Math.sin(startAngle + toothWidth * 0.7) * (innerRadius + toothDepth);
    
    // Base of tooth (going down)
    const baseX2 = cx + Math.cos(startAngle + toothWidth) * innerRadius;
    const baseY2 = cy + Math.sin(startAngle + toothWidth) * innerRadius;
    
    // Valley between teeth
    const valleyX = cx + Math.cos(startAngle + anglePerTooth * 0.7) * (innerRadius - toothDepth * 0.3);
    const valleyY = cy + Math.sin(startAngle + anglePerTooth * 0.7) * (innerRadius - toothDepth * 0.3);

    if (i === 0) {
      points.push(`M ${baseX1} ${baseY1}`);
    }
    
    points.push(`L ${tipX1} ${tipY1}`);
    points.push(`L ${tipX2} ${tipY2}`);
    points.push(`L ${baseX2} ${baseY2}`);
    points.push(`L ${valleyX} ${valleyY}`);
  }
  
  points.push("Z");
  return points.join(" ");
}

function Gear({ gear, isExploded, gearRef }: { 
  gear: GearProps; 
  isExploded: boolean;
  gearRef: (el: SVGGElement | null) => void;
}) {
  const pathD = generateGearPath(
    0, 0,
    gear.outerRadius,
    gear.innerRadius,
    gear.teeth,
    gear.toothDepth
  );

  // Center hole radius
  const holeRadius = gear.innerRadius * 0.3;
  // Decorative holes
  const decorativeHoleRadius = gear.innerRadius * 0.15;
  const decorativeHoleDistance = gear.innerRadius * 0.6;

  return (
    <g
      ref={gearRef}
      className="gear"
      data-id={gear.id}
      style={{
        transformOrigin: `${gear.cx}px ${gear.cy}px`,
        transform: `translate(${gear.cx}px, ${gear.cy}px)`,
      }}
    >
      {/* Main gear body */}
      <path
        d={pathD}
        fill={gear.color}
        stroke={`${gear.color}88`}
        strokeWidth="1"
        className="gear-body"
      />
      
      {/* Inner ring */}
      <circle
        cx={0}
        cy={0}
        r={gear.innerRadius * 0.7}
        fill="none"
        stroke={`${gear.color}66`}
        strokeWidth="2"
      />
      
      {/* Center hub */}
      <circle
        cx={0}
        cy={0}
        r={holeRadius + 3}
        fill={`${gear.color}33`}
        stroke={gear.color}
        strokeWidth="1.5"
      />
      
      {/* Center hole (dark) */}
      <circle
        cx={0}
        cy={0}
        r={holeRadius}
        fill="#0a0a0f"
        stroke={`${gear.color}44`}
        strokeWidth="1"
      />
      
      {/* Decorative holes - swiss watch style */}
      {gear.teeth > 8 && Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const hx = Math.cos(angle) * decorativeHoleDistance;
        const hy = Math.sin(angle) * decorativeHoleDistance;
        return (
          <circle
            key={i}
            cx={hx}
            cy={hy}
            r={decorativeHoleRadius}
            fill="#0a0a0f"
            stroke={`${gear.color}44`}
            strokeWidth="0.5"
          />
        );
      })}
      
      {/* Spoke lines for small gears */}
      {gear.teeth <= 8 && Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x2 = Math.cos(angle) * (gear.innerRadius * 0.65);
        const y2 = Math.sin(angle) * (gear.innerRadius * 0.65);
        return (
          <line
            key={i}
            x1={0}
            y1={0}
            x2={x2}
            y2={y2}
            stroke={`${gear.color}66`}
            strokeWidth="2"
          />
        );
      })}
      
      {/* Highlight arc */}
      <path
        d={`M ${-gear.innerRadius * 0.4} ${-gear.innerRadius * 0.4} A ${gear.innerRadius * 0.5} ${gear.innerRadius * 0.5} 0 0 1 ${gear.innerRadius * 0.4} ${-gear.innerRadius * 0.3}`}
        fill="none"
        stroke={`${gear.color}33`}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  );
}

export function SwissGearMechanism() {
  const svgRef = useRef<SVGSVGElement>(null);
  const gearsRef = useRef<(SVGGElement | null)[]>([]);
  const [phase, setPhase] = useState<'assembled' | 'exploding' | 'exploded' | 'assembling'>('assembled');
  const animationRef = useRef<anime.AnimeInstance | null>(null);
  const rotationRef = useRef<anime.AnimeInstance | null>(null);

  const gears: GearProps[] = [
    // Main central gear
    { id: 'main', cx: 200, cy: 200, outerRadius: 60, innerRadius: 50, teeth: 20, toothDepth: 12, color: '#00ff88', rotationSpeed: 1, direction: 1, delay: 0 },
    // Top right gear
    { id: 'top-right', cx: 290, cy: 140, outerRadius: 40, innerRadius: 32, teeth: 14, toothDepth: 10, color: '#22d3ee', rotationSpeed: 1.43, direction: -1, delay: 100 },
    // Bottom gear
    { id: 'bottom', cx: 200, cy: 310, outerRadius: 50, innerRadius: 40, teeth: 16, toothDepth: 11, color: '#a855f7', rotationSpeed: 1.25, direction: -1, delay: 200 },
    // Left gear
    { id: 'left', cx: 100, cy: 200, outerRadius: 45, innerRadius: 36, teeth: 15, toothDepth: 10, color: '#f59e0b', rotationSpeed: 1.33, direction: -1, delay: 300 },
    // Small top gear
    { id: 'small-top', cx: 200, cy: 100, outerRadius: 25, innerRadius: 20, teeth: 8, toothDepth: 6, color: '#ef4444', rotationSpeed: 2.5, direction: -1, delay: 400 },
    // Small right gear
    { id: 'small-right', cx: 340, cy: 200, outerRadius: 30, innerRadius: 24, teeth: 10, toothDepth: 7, color: '#3b82f6', rotationSpeed: 2, direction: 1, delay: 500 },
    // Tiny connector gear
    { id: 'tiny', cx: 255, cy: 255, outerRadius: 18, innerRadius: 14, teeth: 6, toothDepth: 5, color: '#ec4899', rotationSpeed: 3.33, direction: 1, delay: 600 },
  ];

  // Explosion positions - where gears fly to
  const explosionOffsets: Record<string, { x: number; y: number; rotation: number }> = {
    'main': { x: 0, y: -80, rotation: 180 },
    'top-right': { x: 120, y: -100, rotation: -270 },
    'bottom': { x: 0, y: 150, rotation: 360 },
    'left': { x: -150, y: 0, rotation: 270 },
    'small-top': { x: 0, y: -180, rotation: -540 },
    'small-right': { x: 200, y: 50, rotation: 450 },
    'tiny': { x: 80, y: 120, rotation: -720 },
  };

  // Start continuous rotation
  const startRotation = () => {
    if (rotationRef.current) {
      rotationRef.current.pause();
    }

    rotationRef.current = anime({
      targets: gearsRef.current,
      rotate: (el: Element) => {
        const id = (el as HTMLElement).dataset.id;
        const gear = gears.find(g => g.id === id);
        if (!gear) return 0;
        return gear.direction * 360;
      },
      duration: (el: Element) => {
        const id = (el as HTMLElement).dataset.id;
        const gear = gears.find(g => g.id === id);
        return gear ? 4000 / gear.rotationSpeed : 4000;
      },
      easing: 'linear',
      loop: true,
    });
  };

  // Explode animation
  const explode = () => {
    if (phase !== 'assembled') return;
    setPhase('exploding');

    // Stop rotation
    if (rotationRef.current) {
      rotationRef.current.pause();
    }

    // Animate each gear to its explosion position
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      complete: () => setPhase('exploded'),
    });

    gearsRef.current.forEach((gear, index) => {
      if (!gear) return;
      const id = gear.dataset.id || '';
      const offset = explosionOffsets[id] || { x: 0, y: 0, rotation: 0 };
      const gearData = gears.find(g => g.id === id);

      timeline.add({
        targets: gear,
        translateX: offset.x,
        translateY: offset.y,
        rotate: offset.rotation,
        scale: [1, 1.1, 1],
        duration: 800,
        delay: gearData?.delay || 0,
      }, index * 80);
    });

    // Add floating effect after explosion
    timeline.add({
      targets: gearsRef.current,
      translateY: (el: SVGGElement) => {
        const id = el.dataset.id || '';
        const offset = explosionOffsets[id]?.y || 0;
        return [offset, offset - 10, offset];
      },
      duration: 2000,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: 2,
    });
  };

  // Assemble animation
  const assemble = () => {
    if (phase !== 'exploded') return;
    setPhase('assembling');

    const timeline = anime.timeline({
      easing: 'easeOutElastic(1, 0.5)',
      complete: () => {
        setPhase('assembled');
        startRotation();
      },
    });

    // Reverse order - small gears first, then main gear
    const reversedGears = [...gearsRef.current].reverse();
    
    reversedGears.forEach((gear, index) => {
      if (!gear) return;

      timeline.add({
        targets: gear,
        translateX: 0,
        translateY: 0,
        rotate: 0,
        scale: [1.1, 1],
        duration: 600,
      }, index * 100);
    });
  };

  // Auto cycle between explode and assemble
  useEffect(() => {
    startRotation();

    const cycleAnimation = () => {
      setTimeout(() => {
        explode();
        setTimeout(() => {
          assemble();
        }, 4000); // Wait after explosion
      }, 5000); // Initial wait before first explosion
    };

    cycleAnimation();
    const interval = setInterval(cycleAnimation, 12000);

    return () => {
      clearInterval(interval);
      if (rotationRef.current) rotationRef.current.pause();
      if (animationRef.current) animationRef.current.pause();
    };
  }, []);

  // Manual trigger on click
  const handleClick = () => {
    if (phase === 'assembled') {
      explode();
    } else if (phase === 'exploded') {
      assemble();
    }
  };

  return (
    <div 
      className="relative cursor-pointer select-none"
      onClick={handleClick}
      title="Click to trigger animation"
    >
      {/* Glow effect behind mechanism */}
      <div className="absolute inset-0 bg-gradient-radial from-factory-accent/10 via-transparent to-transparent blur-2xl" />
      
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[400px] mx-auto"
        style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.3))' }}
      >
        {/* Background circle */}
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="url(#circleGradient)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.3"
        />
        
        {/* Decorative rings */}
        <circle cx="200" cy="200" r="160" fill="none" stroke="#00ff8822" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="#22d3ee22" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="#a855f722" strokeWidth="0.5" />
        
        {/* Gradients */}
        <defs>
          <radialGradient id="circleGradient">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
          </radialGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Gears */}
        <g filter="url(#glow)">
          {gears.map((gear, index) => (
            <Gear
              key={gear.id}
              gear={gear}
              isExploded={phase === 'exploded'}
              gearRef={(el) => { gearsRef.current[index] = el; }}
            />
          ))}
        </g>

        {/* Center decoration */}
        <circle cx="200" cy="200" r="8" fill="#0a0a0f" stroke="#00ff88" strokeWidth="2" />
        <circle cx="200" cy="200" r="3" fill="#00ff88" />
      </svg>

      {/* Phase indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-500 opacity-50">
        {phase === 'assembled' && '● RUNNING'}
        {phase === 'exploding' && '◐ DISASSEMBLING...'}
        {phase === 'exploded' && '○ EXPLODED'}
        {phase === 'assembling' && '◑ ASSEMBLING...'}
      </div>
    </div>
  );
}
