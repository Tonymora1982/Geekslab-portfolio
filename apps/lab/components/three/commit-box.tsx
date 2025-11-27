"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import { Mesh, Color, Vector3 } from "three";
import { FactoryCommit } from "@/lib/types";

interface CommitBoxProps {
  commit: FactoryCommit;
  targetPosition?: [number, number, number];
  showLabel?: boolean;
  onClick?: () => void;
}

export function CommitBox({
  commit,
  targetPosition,
  showLabel = true,
  onClick,
}: CommitBoxProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const currentPos = useRef(new Vector3(...commit.position));

  // Calculate color based on status
  const boxColor = useMemo(() => {
    switch (commit.status) {
      case "shipped":
        return new Color("#00ff88");
      case "passed":
        return new Color("#22d3ee");
      case "processing":
        return new Color("#f59e0b");
      case "failed":
        return new Color("#ef4444");
      default:
        return new Color("#6b7280");
    }
  }, [commit.status]);

  // Calculate size based on changes
  const boxSize = useMemo(() => {
    const total = commit.stats?.total || 50;
    const base = 0.8;
    const scale = Math.min(Math.log10(total + 1) * 0.3, 0.5);
    return base + scale;
  }, [commit.stats]);

  // Smooth movement animation
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Move towards target position
    if (targetPosition) {
      const target = new Vector3(...targetPosition);
      currentPos.current.lerp(target, delta * 2);
      meshRef.current.position.copy(currentPos.current);
    }

    // Floating animation
    meshRef.current.position.y =
      currentPos.current.y + Math.sin(state.clock.elapsedTime * 2 + commit.sha.charCodeAt(0)) * 0.05;

    // Gentle rotation when processing
    if (commit.status === "processing") {
      meshRef.current.rotation.y += delta * 0.5;
    }

    // Pulse when hovered
    if (hovered) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.05;
      meshRef.current.scale.setScalar(scale);
    } else {
      meshRef.current.scale.setScalar(1);
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={commit.position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main box */}
        <boxGeometry args={[boxSize, boxSize, boxSize]} />
        <meshStandardMaterial
          color={boxColor}
          emissive={boxColor}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Status indicator - pulsing glow for processing */}
      {commit.status === "processing" && (
        <pointLight 
          position={commit.position} 
          color="#f59e0b" 
          intensity={2} 
          distance={2}
          decay={2}
        />
      )}

      {/* Commit label on hover */}
      {showLabel && hovered && (
        <Html
          position={[commit.position[0], commit.position[1] + boxSize + 0.5, commit.position[2]]}
          center
          distanceFactor={10}
        >
          <div className="glass-panel px-3 py-2 min-w-[200px] max-w-[300px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-factory-accent">
                {commit.sha.slice(0, 7)}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-mono ${
                  commit.status === "shipped"
                    ? "bg-green-500/20 text-green-400"
                    : commit.status === "passed"
                    ? "bg-cyan-500/20 text-cyan-400"
                    : commit.status === "processing"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : commit.status === "failed"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {commit.status.toUpperCase()}
              </span>
            </div>
            <p className="text-white text-sm font-mono truncate">
              {commit.message}
            </p>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 font-mono">
              <span className="text-green-400">+{commit.stats?.additions || 0}</span>
              <span className="text-red-400">-{commit.stats?.deletions || 0}</span>
              {commit.qualityScore > 0 && (
                <span className="text-factory-accent">
                  QS: {commit.qualityScore}%
                </span>
              )}
            </div>
          </div>
        </Html>
      )}

      {/* SHA label always visible */}
      {showLabel && !hovered && (
        <Text
          position={[
            commit.position[0],
            commit.position[1] + boxSize * 0.7,
            commit.position[2],
          ]}
          fontSize={0.15}
          color="#888899"
          anchorX="center"
          anchorY="bottom"
        >
          {commit.sha.slice(0, 7)}
        </Text>
      )}
    </group>
  );
}

interface CommitStreamProps {
  commits: FactoryCommit[];
  conveyorLength?: number;
  speed?: number;
}

export function CommitStream({
  commits,
  conveyorLength = 20,
  speed = 0.5,
}: CommitStreamProps) {
  const positionsRef = useRef<Map<string, number>>(new Map());

  // Initialize positions
  useMemo(() => {
    commits.forEach((commit, index) => {
      if (!positionsRef.current.has(commit.sha)) {
        positionsRef.current.set(commit.sha, index * 3);
      }
    });
  }, [commits]);

  // Animate positions
  useFrame((_, delta) => {
    commits.forEach((commit) => {
      const currentX = positionsRef.current.get(commit.sha) || 0;
      if (commit.status !== "processing") {
        positionsRef.current.set(commit.sha, currentX + delta * speed);
      }
    });
  });

  return (
    <group>
      {commits.map((commit) => {
        const x = positionsRef.current.get(commit.sha) || 0;
        const targetPos: [number, number, number] = [x, 0.8, 0];

        return (
          <CommitBox
            key={commit.sha}
            commit={commit}
            targetPosition={targetPos}
            showLabel={true}
          />
        );
      })}
    </group>
  );
}
