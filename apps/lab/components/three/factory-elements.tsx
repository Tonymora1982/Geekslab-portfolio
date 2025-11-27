"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Mesh, Color, Group, MeshStandardMaterial } from "three";

// ============================================
// INDUSTRIAL CONVEYOR BELT - Ultra Detailed
// ============================================

interface ConveyorBeltProps {
  position?: [number, number, number];
  length?: number;
  width?: number;
  speed?: number;
}

export function ConveyorBelt({
  position = [0, 0, 0],
  length = 20,
  width = 2.5,
  speed = 0.5,
}: ConveyorBeltProps) {
  const rollersRef = useRef<Group>(null);

  useFrame((state) => {
    if (rollersRef.current) {
      rollersRef.current.children.forEach((roller) => {
        roller.rotation.x = state.clock.elapsedTime * speed * 3;
      });
    }
  });

  const numRollers = Math.floor(length / 0.8);
  const numSupports = Math.floor(length / 4) + 1;

  return (
    <group position={position}>
      {/* Main Frame - Heavy Industrial Steel Structure */}
      <group>
        {/* Side beams - I-beam profile simulation */}
        {[-1, 1].map((side) => (
          <group key={side} position={[length / 2, 0.3, (side * width) / 2]}>
            {/* Main beam */}
            <mesh>
              <boxGeometry args={[length + 0.5, 0.08, 0.15]} />
              <meshStandardMaterial color="#3d3d4d" metalness={0.95} roughness={0.15} />
            </mesh>
            {/* Top flange */}
            <mesh position={[0, 0.06, 0]}>
              <boxGeometry args={[length + 0.5, 0.04, 0.25]} />
              <meshStandardMaterial color="#4a4a5a" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Bottom flange */}
            <mesh position={[0, -0.06, 0]}>
              <boxGeometry args={[length + 0.5, 0.04, 0.25]} />
              <meshStandardMaterial color="#4a4a5a" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Safety rail */}
            <mesh position={[0, 0.25, side * 0.1]}>
              <boxGeometry args={[length + 0.3, 0.04, 0.04]} />
              <meshStandardMaterial color="#ffaa00" metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Rollers - Cylindrical with bearings */}
      <group ref={rollersRef}>
        {Array.from({ length: numRollers }).map((_, i) => (
          <group key={i} position={[i * 0.8 + 0.4, 0.35, 0]}>
            {/* Main roller cylinder */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.12, 0.12, width - 0.3, 16]} />
              <meshStandardMaterial color="#2a2a3a" metalness={0.85} roughness={0.25} />
            </mesh>
            {/* Bearing ends */}
            {[-1, 1].map((side) => (
              <mesh key={side} position={[0, 0, (side * (width - 0.2)) / 2]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.15, 0.15, 0.08, 16]} />
                <meshStandardMaterial color="#1a1a2a" metalness={0.95} roughness={0.1} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Belt Surface - Rubberized look */}
      <mesh position={[length / 2, 0.48, 0]}>
        <boxGeometry args={[length, 0.02, width - 0.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Belt tracking lines */}
      {Array.from({ length: Math.floor(length / 1.5) }).map((_, i) => (
        <mesh key={i} position={[i * 1.5 + 0.75, 0.49, 0]}>
          <boxGeometry args={[0.08, 0.01, width - 0.5]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.4}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Support Legs - Industrial A-frame style */}
      {Array.from({ length: numSupports }).map((_, i) => {
        const x = i * (length / (numSupports - 1));
        return (
          <group key={i} position={[x, 0, 0]}>
            {[-1, 1].map((side) => (
              <group key={side} position={[0, 0, (side * width) / 2]}>
                {/* Main vertical leg */}
                <mesh position={[0, -0.4, 0]}>
                  <boxGeometry args={[0.12, 0.8, 0.12]} />
                  <meshStandardMaterial color="#4a4a5a" metalness={0.8} roughness={0.3} />
                </mesh>
                {/* Diagonal brace */}
                <mesh position={[0.15, -0.4, -side * 0.15]} rotation={[side * 0.3, 0, 0.4]}>
                  <boxGeometry args={[0.04, 0.6, 0.04]} />
                  <meshStandardMaterial color="#3d3d4d" metalness={0.8} roughness={0.3} />
                </mesh>
                {/* Floor mounting plate */}
                <mesh position={[0, -0.82, 0]}>
                  <boxGeometry args={[0.25, 0.04, 0.25]} />
                  <meshStandardMaterial color="#2a2a3a" metalness={0.9} roughness={0.2} />
                </mesh>
                {/* Mounting bolts */}
                {[[-0.08, -0.08], [0.08, -0.08], [-0.08, 0.08], [0.08, 0.08]].map(([bx, bz], bi) => (
                  <mesh key={bi} position={[bx, -0.8, bz]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
                    <meshStandardMaterial color="#666" metalness={0.95} roughness={0.1} />
                  </mesh>
                ))}
              </group>
            ))}
            {/* Cross brace */}
            <mesh position={[0, -0.5, 0]}>
              <boxGeometry args={[0.08, 0.08, width + 0.2]} />
              <meshStandardMaterial color="#3d3d4d" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        );
      })}

      {/* Motor unit at start */}
      <group position={[0, 0.1, width / 2 + 0.4]}>
        {/* Motor housing */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 0.5, 16]} />
          <meshStandardMaterial color="#2d4a2d" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Cooling fins */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[0, 0, -0.1 - i * 0.04]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.02, 16]} />
            <meshStandardMaterial color="#1a3a1a" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Drive shaft */}
        <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
          <meshStandardMaterial color="#666" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Junction box */}
        <mesh position={[0.2, 0.15, -0.1]}>
          <boxGeometry args={[0.15, 0.12, 0.1]} />
          <meshStandardMaterial color="#3d3d4d" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Status LED */}
        <mesh position={[0.2, 0.22, -0.1]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* End roller drum */}
      <group position={[length, 0.35, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, width - 0.2, 24]} />
          <meshStandardMaterial color="#3d3d4d" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Tension adjustment */}
        <mesh position={[0.25, 0, 0]}>
          <boxGeometry args={[0.15, 0.3, 0.3]} />
          <meshStandardMaterial color="#4a4a5a" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================
// QUALITY CHECK STATION - Vision Inspection System
// ============================================

interface QualityCheckStationProps {
  position?: [number, number, number];
  isActive?: boolean;
}

export function QualityCheckStation({
  position = [0, 0, 0],
  isActive = true,
}: QualityCheckStationProps) {
  const scannerRef = useRef<Group>(null);
  const laserRef = useRef<Mesh>(null);
  
  const statusColor = useMemo(
    () => new Color(isActive ? "#00ff88" : "#ffaa00"),
    [isActive]
  );

  useFrame((state) => {
    if (scannerRef.current && isActive) {
      scannerRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.5;
    }
    if (laserRef.current && isActive) {
      const material = laserRef.current.material as THREE.MeshStandardMaterial;
      if (material && 'opacity' in material) {
        material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 10) * 0.15;
      }
    }
  });

  return (
    <group position={position}>
      {/* Main Gantry Frame - Heavy duty steel */}
      <group>
        {/* Vertical columns */}
        {[[-0.15, 1.8], [0.15, 1.8]].map(([xOffset, zPos], i) => (
          <group key={i}>
            {/* Front column */}
            <mesh position={[xOffset, 2, zPos]}>
              <boxGeometry args={[0.15, 4, 0.15]} />
              <meshStandardMaterial color="#4a4a5a" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Back column */}
            <mesh position={[xOffset, 2, -zPos]}>
              <boxGeometry args={[0.15, 4, 0.15]} />
              <meshStandardMaterial color="#4a4a5a" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Top cross beam */}
        <mesh position={[0, 4.1, 0]}>
          <boxGeometry args={[0.5, 0.2, 3.8]} />
          <meshStandardMaterial color="#3d3d4d" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Side bracing */}
        {[-1, 1].map((side) => (
          <group key={side}>
            <mesh position={[side * 0.15, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.08, 3.4, 0.08]} />
              <meshStandardMaterial color="#3d3d4d" metalness={0.85} roughness={0.25} />
            </mesh>
            {/* Diagonal braces */}
            <mesh position={[side * 0.15, 2.5, 1.2]} rotation={[0.5, 0, 0]}>
              <boxGeometry args={[0.05, 1.5, 0.05]} />
              <meshStandardMaterial color="#3d3d4d" metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh position={[side * 0.15, 2.5, -1.2]} rotation={[-0.5, 0, 0]}>
              <boxGeometry args={[0.05, 1.5, 0.05]} />
              <meshStandardMaterial color="#3d3d4d" metalness={0.85} roughness={0.25} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Vision System Housing */}
      <group ref={scannerRef} position={[0, 3.5, 0]}>
        {/* Main camera housing */}
        <mesh>
          <boxGeometry args={[0.6, 0.4, 0.5]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Camera lens */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 0.2, 24]} />
          <meshStandardMaterial color="#111" metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Lens glass */}
        <mesh position={[0, -0.26, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 24]} />
          <meshStandardMaterial 
            color="#224466" 
            metalness={0.3} 
            roughness={0.1}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* LED ring light */}
        <mesh position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.02, 8, 24]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={isActive ? 0.8 : 0.1} 
          />
        </mesh>
        {/* Status indicators */}
        {[-0.2, 0, 0.2].map((x, i) => (
          <mesh key={i} position={[x, 0.22, 0.2]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial 
              color={i === 1 ? statusColor : "#333"} 
              emissive={i === 1 ? statusColor : "#000"} 
              emissiveIntensity={i === 1 && isActive ? 1 : 0} 
            />
          </mesh>
        ))}
      </group>

      {/* Laser scanning system */}
      {isActive && (
        <group position={[0, 2.8, 0]}>
          {/* Laser emitter */}
          <mesh>
            <boxGeometry args={[0.3, 0.1, 0.1]} />
            <meshStandardMaterial color="#2a2a3a" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Laser beam */}
          <mesh ref={laserRef} position={[0, -1.3, 0]}>
            <boxGeometry args={[0.01, 2.4, 0.01]} />
            <meshBasicMaterial color="#ff0000" transparent opacity={0.4} />
          </mesh>
          {/* Laser fan effect */}
          <mesh position={[0, -1.3, 0]} rotation={[0, 0, Math.PI / 2]}>
            <planeGeometry args={[2.4, 1.5]} />
            <meshBasicMaterial 
              color="#ff0000" 
              transparent 
              opacity={0.05}
              side={2}
            />
          </mesh>
        </group>
      )}

      {/* Control panel */}
      <group position={[0.8, 1.5, 1.5]}>
        <mesh>
          <boxGeometry args={[0.4, 0.6, 0.1]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.1, 0.06]}>
          <boxGeometry args={[0.3, 0.25, 0.01]} />
          <meshStandardMaterial 
            color={isActive ? "#003311" : "#111"} 
            emissive={isActive ? "#00ff88" : "#000"} 
            emissiveIntensity={0.3} 
          />
        </mesh>
        {/* Buttons */}
        {[[-0.1, -0.2], [0, -0.2], [0.1, -0.2]].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.02, 12]} />
            <meshStandardMaterial 
              color={i === 0 ? "#00aa44" : i === 1 ? "#ffaa00" : "#aa0000"} 
              metalness={0.5} 
              roughness={0.5} 
            />
          </mesh>
        ))}
      </group>

      {/* Warning lights */}
      {[-1.8, 1.8].map((z, i) => (
        <group key={i} position={[0, 4.3, z]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.1, 0.15, 16]} />
            <meshStandardMaterial 
              color={statusColor} 
              emissive={statusColor} 
              emissiveIntensity={isActive ? 0.8 : 0.2}
              transparent
              opacity={0.9}
            />
          </mesh>
          <pointLight 
            color={statusColor} 
            intensity={isActive ? 1 : 0.2} 
            distance={3} 
          />
        </group>
      ))}

      {/* Floor markings - square zone */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.08} />
      </mesh>
      {/* QC Zone corner markers */}
      {[[-1.3, -1.3], [1.3, -1.3], [-1.3, 1.3], [1.3, 1.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.25, 0.25]} />
          <meshBasicMaterial color="#ffaa00" transparent opacity={0.5} />
        </mesh>
      ))}
      {/* QC Zone text area */}
      <mesh position={[0, 0.02, 2.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 0.4]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// ============================================
// ROBOTIC ASSEMBLY STATION - 6-Axis Industrial Robot
// ============================================

interface AssemblyStationProps {
  position?: [number, number, number];
  type?: "merge" | "build" | "test";
}

export function AssemblyStation({
  position = [0, 0, 0],
  type = "build",
}: AssemblyStationProps) {
  const joint1Ref = useRef<Group>(null);
  const joint2Ref = useRef<Group>(null);
  const joint3Ref = useRef<Group>(null);
  const effectorRef = useRef<Group>(null);
  
  const stationColor = useMemo(() => {
    switch (type) {
      case "merge": return new Color("#8b5cf6");
      case "test": return new Color("#f59e0b");
      default: return new Color("#00ff88");
    }
  }, [type]);

  const stationLabel = useMemo(() => {
    switch (type) {
      case "merge": return "MERGE";
      case "test": return "TEST";
      default: return "BUILD";
    }
  }, [type]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (joint1Ref.current) {
      joint1Ref.current.rotation.y = Math.sin(t * 0.8) * 0.6;
    }
    if (joint2Ref.current) {
      joint2Ref.current.rotation.z = Math.sin(t * 1.2 + 1) * 0.4 - 0.3;
    }
    if (joint3Ref.current) {
      joint3Ref.current.rotation.z = Math.sin(t * 1.5 + 2) * 0.5 + 0.2;
    }
    if (effectorRef.current) {
      effectorRef.current.rotation.x = Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Heavy base platform */}
      <group position={[0, 0, 2]}>
        {/* Floor plate */}
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[1.2, 1.3, 0.06, 32]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Warning stripes - solid yellow ring on base */}
        <mesh position={[0, 0.065, 0]}>
          <cylinderGeometry args={[1.25, 1.25, 0.02, 32]} />
          <meshStandardMaterial color="#ffaa00" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Robot base */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.5, 0.6, 0.4, 24]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Base detail ring */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 0.1, 24]} />
          <meshStandardMaterial color={stationColor} metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Joint 1 - Base rotation */}
        <group ref={joint1Ref} position={[0, 0.5, 0]}>
          {/* Shoulder housing */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.35, 0.4, 0.5, 24]} />
            <meshStandardMaterial color="#3d3d4d" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Cable management */}
          <mesh position={[0.3, 0.2, 0]} rotation={[0, 0, -0.5]}>
            <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#222" metalness={0.3} roughness={0.8} />
          </mesh>

          {/* Joint 2 - Shoulder */}
          <group ref={joint2Ref} position={[0, 0.5, 0]}>
            {/* Upper arm */}
            <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.12, 0.15, 1, 16]} />
              <meshStandardMaterial color="#4a4a5a" metalness={0.85} roughness={0.2} />
            </mesh>
            {/* Joint cover */}
            <mesh>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color="#3d3d4d" metalness={0.9} roughness={0.15} />
            </mesh>

            {/* Joint 3 - Elbow */}
            <group ref={joint3Ref} position={[1, 0, 0]}>
              {/* Elbow joint */}
              <mesh>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#3d3d4d" metalness={0.9} roughness={0.15} />
              </mesh>
              {/* Forearm */}
              <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.1, 0.8, 16]} />
                <meshStandardMaterial color="#4a4a5a" metalness={0.85} roughness={0.2} />
              </mesh>

              {/* End Effector */}
              <group ref={effectorRef} position={[0.85, 0, 0]}>
                {/* Wrist */}
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
                  <meshStandardMaterial color="#2a2a3a" metalness={0.9} roughness={0.2} />
                </mesh>
                {/* Tool holder */}
                <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.06, 0.08, 0.1, 16]} />
                  <meshStandardMaterial color={stationColor} metalness={0.7} roughness={0.3} />
                </mesh>
                {/* Gripper/Tool */}
                <group position={[0.2, 0, 0]}>
                  {[-0.04, 0.04].map((offset, i) => (
                    <mesh key={i} position={[0.05, offset, 0]}>
                      <boxGeometry args={[0.1, 0.02, 0.06]} />
                      <meshStandardMaterial color="#666" metalness={0.9} roughness={0.2} />
                    </mesh>
                  ))}
                </group>
                {/* Tool light */}
                <pointLight color={stationColor} intensity={0.5} distance={2} position={[0.2, 0, 0]} />
              </group>
            </group>
          </group>
        </group>

        {/* Control cabinet */}
        <group position={[-1.5, 0.6, 0]}>
          <mesh>
            <boxGeometry args={[0.6, 1.2, 0.4]} />
            <meshStandardMaterial color="#3d3d4d" metalness={0.7} roughness={0.4} />
          </mesh>
          {/* Ventilation grilles */}
          {[0.3, 0, -0.3].map((y, i) => (
            <mesh key={i} position={[0.31, y, 0]}>
              <boxGeometry args={[0.02, 0.15, 0.3]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
            </mesh>
          ))}
          {/* Status display */}
          <mesh position={[0.31, 0.45, 0]}>
            <boxGeometry args={[0.02, 0.1, 0.2]} />
            <meshStandardMaterial color={stationColor} emissive={stationColor} emissiveIntensity={0.5} />
          </mesh>
        </group>
      </group>

      {/* Floor marking - Safety zone square */}
      <mesh position={[0, 0.01, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial color={stationColor} transparent opacity={0.05} />
      </mesh>
      {/* Corner marks */}
      {[[-1.3, -1.3 + 2], [1.3, -1.3 + 2], [-1.3, 1.3 + 2], [1.3, 1.3 + 2]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color={stationColor} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// ============================================
// SHIPPING DOCK - Deployment Zone
// ============================================

interface ShippingDockProps {
  position?: [number, number, number];
}

export function ShippingDock({ position = [0, 0, 0] }: ShippingDockProps) {
  const checkmarkRef = useRef<Group>(null);

  useFrame((state) => {
    if (checkmarkRef.current) {
      checkmarkRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      checkmarkRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Main dock platform */}
      <group>
        {/* Base concrete pad */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[5, 0.1, 5]} />
          <meshStandardMaterial color="#3a3a3a" metalness={0.3} roughness={0.8} />
        </mesh>
        
        {/* Raised platform */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[4, 0.2, 4]} />
          <meshStandardMaterial color="#1a4a1a" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Platform edge trim */}
        {[[-2, 0], [2, 0], [0, -2], [0, 2]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.3, z]} rotation={[0, i < 2 ? Math.PI / 2 : 0, 0]}>
            <boxGeometry args={[4, 0.05, 0.1]} />
            <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} />
          </mesh>
        ))}

        {/* Success stripes */}
        {[-1.2, -0.4, 0.4, 1.2].map((z, i) => (
          <mesh key={i} position={[0, 0.31, z]}>
            <boxGeometry args={[3.5, 0.02, 0.25]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}

        {/* Corner bollards */}
        {[[-1.7, -1.7], [1.7, -1.7], [-1.7, 1.7], [1.7, 1.7]].map(([x, z], i) => (
          <group key={i} position={[x, 0.5, z]}>
            <mesh>
              <cylinderGeometry args={[0.1, 0.12, 0.6, 16]} />
              <meshStandardMaterial color="#ffaa00" metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.35, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Success indicator arch */}
      <group position={[0, 0, -2.2]}>
        {/* Arch structure */}
        {[-1.5, 1.5].map((x, i) => (
          <mesh key={i} position={[x, 1.5, 0]}>
            <boxGeometry args={[0.15, 3, 0.15]} />
            <meshStandardMaterial color="#4a4a5a" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        <mesh position={[0, 3.1, 0]}>
          <boxGeometry args={[3.3, 0.2, 0.2]} />
          <meshStandardMaterial color="#4a4a5a" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* DEPLOYED sign */}
        <mesh position={[0, 2.6, 0.15]}>
          <boxGeometry args={[2.5, 0.6, 0.1]} />
          <meshStandardMaterial color="#0a0a0f" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0, 2.6, 0.21]}>
          <boxGeometry args={[2.3, 0.45, 0.01]} />
          <meshStandardMaterial 
            color="#001a00" 
            emissive="#00ff88" 
            emissiveIntensity={0.4} 
          />
        </mesh>
      </group>

      {/* Floating checkmark hologram */}
      <group ref={checkmarkRef} position={[0, 1.5, 0]}>
        {/* 3D Checkmark */}
        <group rotation={[0, 0.5, 0]}>
          {/* Short part of check */}
          <mesh position={[-0.25, -0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.6, 0.15, 0.15]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
          {/* Long part of check */}
          <mesh position={[0.35, 0.25, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[1.1, 0.15, 0.15]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
        
        {/* Glow effect */}
        <pointLight color="#00ff88" intensity={2} distance={4} />
      </group>

      {/* Ambient lighting */}
      <pointLight position={[0, 3, 0]} color="#00ff88" intensity={2} distance={8} />
    </group>
  );
}
