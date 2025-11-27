"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";

// LEGO Colors - vibrant classic colors
const COLORS = ['#E53935', '#1E88E5', '#43A047', '#FDD835', '#FF9800', '#8E24AA', '#00ACC1'];

// Letter pixel patterns (5 rows x 4 cols)
const LETTERS: Record<string, string[]> = {
  R: ['1110', '1001', '1110', '1010', '1001'],
  '&': ['0110', '1001', '0110', '1010', '0101'],
  D: ['1110', '1001', '1001', '1001', '1110'],
  L: ['1000', '1000', '1000', '1000', '1111'],
  A: ['0110', '1001', '1111', '1001', '1001'],
  B: ['1110', '1001', '1110', '1001', '1110'],
};

// Color helpers
function darken(hex: string, amt = 40): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (num >> 16) - amt);
  const g = Math.max(0, ((num >> 8) & 0x00FF) - amt);
  const b = Math.max(0, (num & 0x0000FF) - amt);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

function lighten(hex: string, amt = 50): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, (num >> 16) + amt);
  const g = Math.min(255, ((num >> 8) & 0x00FF) + amt);
  const b = Math.min(255, (num & 0x0000FF) + amt);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

interface BrickData {
  id: number;
  x: number;
  y: number;
  color: string;
  startX: number;
  startY: number;
  startRotate: number;
}

// Generate bricks for all letters
function generateAllBricks(): BrickData[] {
  const bricks: BrickData[] = [];
  const letterSpacing = [0, 145, 290, 390, 435, 580, 725]; // R & D _ L A B
  const letters = ['R', '&', 'D', '', 'L', 'A', 'B'];
  let id = 0;

  letters.forEach((letter, letterIdx) => {
    if (!letter) return;
    const pattern = LETTERS[letter];
    if (!pattern) return;

    pattern.forEach((row, rowIdx) => {
      row.split('').forEach((cell, colIdx) => {
        if (cell === '1') {
          bricks.push({
            id: id++,
            x: letterSpacing[letterIdx] + colIdx * 34,
            y: rowIdx * 24,
            color: COLORS[id % COLORS.length],
            startX: (Math.random() - 0.5) * 1000,
            startY: -500 - Math.random() * 500,
            startRotate: (Math.random() - 0.5) * 720,
          });
        }
      });
    });
  });

  return bricks;
}

export function LegoTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'building' | 'ready'>('building');
  const [bricks] = useState<BrickData[]>(() => generateAllBricks());

  useEffect(() => {
    if (!containerRef.current) return;

    // Wait a tick for DOM to be ready
    const timer = setTimeout(() => {
      const brickEls = containerRef.current?.querySelectorAll('.lego-brick');
      if (!brickEls || brickEls.length === 0) return;

      // Animate from starting positions to final positions
      anime({
        targets: brickEls,
        translateX: 0,
        translateY: 0,
        rotate: 0,
        opacity: [0, 1],
        scale: [0.5, 1],
        delay: anime.stagger(40, { start: 200 }),
        duration: 800,
        easing: 'easeOutBack',
        complete: () => {
          setPhase('ready');
          // Subtle breathing animation
          anime({
            targets: brickEls,
            translateY: [0, -2, 0],
            duration: 2000,
            loop: true,
            easing: 'easeInOutSine',
            delay: anime.stagger(20),
          });
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (!containerRef.current || phase !== 'ready') return;
    const brickEls = containerRef.current.querySelectorAll('.lego-brick');

    // Stop current animations
    anime.remove(brickEls);

    // Explode outward
    anime({
      targets: brickEls,
      translateX: () => anime.random(-400, 400),
      translateY: () => anime.random(-300, 300),
      rotate: () => anime.random(-180, 180),
      scale: 0.6,
      opacity: 0.6,
      duration: 600,
      easing: 'easeOutExpo',
      delay: anime.stagger(15, { from: 'center' }),
      complete: () => {
        // Reassemble
        setTimeout(() => {
          anime({
            targets: brickEls,
            translateX: 0,
            translateY: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 700,
            easing: 'easeOutElastic(1, 0.5)',
            delay: anime.stagger(25, { from: 'last' }),
            complete: () => {
              // Restart breathing
              anime({
                targets: brickEls,
                translateY: [0, -2, 0],
                duration: 2000,
                loop: true,
                easing: 'easeInOutSine',
                delay: anime.stagger(20),
              });
            }
          });
        }, 300);
      }
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Main container */}
      <div
        ref={containerRef}
        onClick={handleClick}
        className="relative cursor-pointer select-none"
        style={{ width: 860, height: 130 }}
      >
        {bricks.map((brick) => (
          <div
            key={brick.id}
            className="lego-brick absolute"
            style={{
              left: brick.x,
              top: brick.y,
              width: 30,
              height: 20,
              transform: `translate(${brick.startX}px, ${brick.startY}px) rotate(${brick.startRotate}deg)`,
              opacity: 0,
            }}
          >
            {/* Brick body */}
            <div
              className="w-full h-full rounded-[3px] relative"
              style={{
                background: `linear-gradient(145deg, ${lighten(brick.color, 20)}, ${brick.color})`,
                boxShadow: `
                  inset 1px 1px 2px ${lighten(brick.color, 60)},
                  inset -1px -1px 2px ${darken(brick.color, 30)},
                  2px 3px 6px rgba(0,0,0,0.35)
                `,
                border: `1px solid ${darken(brick.color, 20)}`,
              }}
            >
              {/* Studs */}
              <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 flex gap-[4px]">
                <div
                  className="w-[8px] h-[5px] rounded-full"
                  style={{
                    background: `radial-gradient(ellipse at 30% 30%, ${lighten(brick.color, 60)}, ${brick.color})`,
                    boxShadow: `0 1px 2px ${darken(brick.color, 40)}`,
                    border: `1px solid ${darken(brick.color, 10)}`,
                  }}
                />
                <div
                  className="w-[8px] h-[5px] rounded-full"
                  style={{
                    background: `radial-gradient(ellipse at 30% 30%, ${lighten(brick.color, 60)}, ${brick.color})`,
                    boxShadow: `0 1px 2px ${darken(brick.color, 40)}`,
                    border: `1px solid ${darken(brick.color, 10)}`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subtitle */}
      <div 
        className="mt-4 text-center transition-opacity duration-500"
        style={{ opacity: phase === 'ready' ? 1 : 0 }}
      >
        <p className="text-gray-400 font-mono text-sm tracking-[0.25em]">
          RESEARCH & DEVELOPMENT
        </p>
        <p className="text-gray-600 font-mono text-xs mt-1">
          ↑ click to disassemble
        </p>
      </div>

      {/* Building indicator */}
      {phase === 'building' && (
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="text-gray-500 font-mono text-xs ml-1">Building...</span>
        </div>
      )}
    </div>
  );
}

export default LegoTitle;
