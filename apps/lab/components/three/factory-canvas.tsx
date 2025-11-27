"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Grid,
  Stars,
  Float,
  Text,
  ContactShadows,
} from "@react-three/drei";
import { Group, Vector3 } from "three";

import {
  ConveyorBelt,
  QualityCheckStation,
  AssemblyStation,
  ShippingDock,
} from "./factory-elements";
import { CommitBox } from "./commit-box";
import { useFactoryStore } from "@/store/factory";

// Industrial ceiling lights
function CeilingLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Light housing */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[1.2, 0.3, 0.4]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Light diffuser */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.05, 0.3]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Actual light */}
      <pointLight
        position={[0, -0.5, 0]}
        intensity={15}
        distance={12}
        color="#f5f5dc"
        decay={2}
      />
    </group>
  );
}

function FactoryFloor() {
  return (
    <group>
      {/* Main floor grid */}
      <Grid
        position={[10, -0.99, 0]}
        args={[60, 40]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#1a1a2e"
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor="#3a3a4a"
        fadeDistance={60}
        fadeStrength={1}
        followCamera={false}
      />

      {/* Concrete floor with industrial look */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, -1, 0]} receiveShadow>
        <planeGeometry args={[70, 50]} />
        <meshStandardMaterial
          color="#1a1a1f"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Safety lines on floor - yellow warning stripes */}
      {[-6, 0, 6].map((z, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[10, -0.98, z]}>
          <planeGeometry args={[30, 0.15]} />
          <meshStandardMaterial
            color="#f5c842"
            emissive="#f5c842"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      {/* Floor markings - work zone squares */}
      {[
        { pos: [5, -0.97, 0], color: "#00ff88" },
        { pos: [12, -0.97, 0], color: "#22d3ee" },
        { pos: [18, -0.97, 0], color: "#a855f7" },
      ].map(({ pos, color }, i) => (
        <group key={i}>
          {/* Square zone marking */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={pos as [number, number, number]}>
            <planeGeometry args={[2.5, 2.5]} />
            <meshStandardMaterial color={color} transparent opacity={0.08} />
          </mesh>
          {/* Corner markers */}
          {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([ox, oz], j) => (
            <mesh 
              key={j} 
              rotation={[-Math.PI / 2, 0, 0]} 
              position={[pos[0] + ox, pos[1], pos[2] + oz]}
            >
              <planeGeometry args={[0.2, 0.2]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function FactoryTitle() {
  return (
    <group position={[10, 8, -12]}>
      {/* Backlit sign panel */}
      <mesh position={[0, 0, 0.2]}>
        <boxGeometry args={[12, 2.5, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>
      <Float speed={1} rotationIntensity={0} floatIntensity={0.1}>
        <Text
          position={[0, 0, 0.4]}
          fontSize={1.2}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
        >
          CODE FACTORY
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={2}
          />
        </Text>
      </Float>
      {/* Sign border lights */}
      <mesh position={[0, 1.35, 0.35]}>
        <boxGeometry args={[12.2, 0.08, 0.1]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0, -1.35, 0.35]}>
        <boxGeometry args={[12.2, 0.08, 0.1]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function ProductionLineLabel({
  position,
  text,
  color = "#4a9eff",
}: {
  position: [number, number, number];
  text: string;
  color?: string;
}) {
  return (
    <group position={position}>
      {/* Sign post */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#444" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Sign panel */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.5, 0.08]} />
        <meshStandardMaterial color="#1a1a2a" metalness={0.5} roughness={0.5} />
      </mesh>
      <Text
        position={[0, 0, 0.05]}
        fontSize={0.25}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {text}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
        />
      </Text>
    </group>
  );
}

// Camera controller with smooth transitions
function CameraController() {
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3(20, 12, 20));
  const lookAtTarget = useRef(new Vector3(10, 1, 0));

  useFrame(() => {
    camera.position.lerp(targetPosition.current, 0.02);
    const currentLookAt = new Vector3();
    camera.getWorldDirection(currentLookAt);
  });

  return null;
}

function FactoryScene() {
  const groupRef = useRef<Group>(null);
  const { commits, loadDemoData } = useFactoryStore();

  // Load demo data on mount
  useEffect(() => {
    loadDemoData();
  }, [loadDemoData]);

  return (
    <group ref={groupRef}>
      {/* === INDUSTRIAL LIGHTING SETUP === */}
      
      {/* Base ambient - very low for dramatic effect */}
      <ambientLight intensity={0.15} color="#b0c4de" />
      
      {/* Main overhead sun/key light */}
      <directionalLight
        position={[15, 25, 10]}
        intensity={1.5}
        color="#fff5e6"
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light from opposite side */}
      <directionalLight
        position={[-10, 15, -5]}
        intensity={0.4}
        color="#e6f0ff"
      />
      
      {/* Ceiling industrial lights */}
      <CeilingLight position={[0, 7, 0]} />
      <CeilingLight position={[8, 7, 0]} />
      <CeilingLight position={[16, 7, 0]} />
      <CeilingLight position={[24, 7, 0]} />
      <CeilingLight position={[4, 7, 5]} />
      <CeilingLight position={[12, 7, 5]} />
      <CeilingLight position={[4, 7, -5]} />
      <CeilingLight position={[12, 7, -5]} />

      {/* Accent colored lights for atmosphere */}
      <pointLight position={[-5, 4, 0]} intensity={8} color="#00ff88" distance={15} decay={2} />
      <pointLight position={[30, 4, 0]} intensity={8} color="#22d3ee" distance={15} decay={2} />
      <pointLight position={[10, 4, 10]} intensity={5} color="#a855f7" distance={12} decay={2} />

      {/* Rim light for depth */}
      <pointLight position={[10, 10, -15]} intensity={5} color="#1a1a2e" distance={20} decay={2} />

      {/* === ENVIRONMENT === */}
      <Stars
        radius={150}
        depth={60}
        count={3000}
        factor={5}
        saturation={0.3}
        fade
        speed={0.3}
      />

      {/* Contact shadows for grounding */}
      <ContactShadows
        position={[10, -0.99, 0]}
        opacity={0.6}
        scale={50}
        blur={2}
        far={20}
        color="#000000"
      />

      {/* Factory Floor */}
      <FactoryFloor />

      {/* Title Sign */}
      <FactoryTitle />

      {/* === MAIN PRODUCTION LINE === */}
      <group position={[0, 0, 0]}>
        <ProductionLineLabel position={[-3, 2, 0]} text="MAIN LINE" color="#00ff88" />
        <ConveyorBelt position={[0, 0, 0]} length={24} />

        {/* Commits on the line */}
        {commits.map((commit, index) => (
          <CommitBox
            key={commit.sha}
            commit={{
              ...commit,
              position: [index * 3 + 2, 0.8, 0],
            }}
          />
        ))}

        {/* Stations */}
        <AssemblyStation position={[5, 0, 0]} type="build" />
        <QualityCheckStation position={[12, 0, 0]} isActive />
        <AssemblyStation position={[18, 0, 0]} type="test" />
      </group>

      {/* === DEVELOPMENT LINE (parallel) === */}
      <group position={[0, 0, 6]}>
        <ProductionLineLabel position={[-3, 2, 0]} text="DEV BRANCH" color="#22d3ee" />
        <ConveyorBelt position={[0, 0, 0]} length={16} />
        <AssemblyStation position={[4, 0, 0]} type="build" />
        <QualityCheckStation position={[10, 0, 0]} isActive={false} />
      </group>

      {/* === FEATURE BRANCH LINE === */}
      <group position={[0, 0, -6]}>
        <ProductionLineLabel position={[-3, 2, 0]} text="FEATURE" color="#f59e0b" />
        <ConveyorBelt position={[0, 0, 0]} length={12} />
        <AssemblyStation position={[6, 0, 0]} type="merge" />
      </group>

      {/* === SHIPPING DOCK (deployment) === */}
      <ShippingDock position={[28, 0, 0]} />

      {/* === FACTORY STRUCTURE - Pillars === */}
      {[[-8, -6], [-8, 6], [30, -6], [30, 6]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Pillar */}
          <mesh position={[0, 3, 0]} castShadow>
            <boxGeometry args={[0.6, 8, 0.6]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Base */}
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function LoadingFallback() {
  return (
    <group>
      <mesh position={[10, 2, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#00ff88" wireframe />
      </mesh>
      <ambientLight intensity={0.5} />
    </group>
  );
}

export function FactoryCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-factory-darker flex items-center justify-center">
        <div className="text-factory-accent font-mono animate-pulse">
          Initializing Factory...
        </div>
      </div>
    );
  }

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ 
        antialias: true, 
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
      }}
      style={{ background: "linear-gradient(180deg, #0a0a12 0%, #05050a 100%)" }}
    >
      <Suspense fallback={<LoadingFallback />}>
        {/* Camera positioned for optimal factory overview */}
        <PerspectiveCamera 
          makeDefault 
          position={[25, 15, 25]} 
          fov={50}
          near={0.1}
          far={200}
        />
        <CameraController />

        {/* Fog for depth */}
        <fog attach="fog" args={["#0a0a12", 30, 80]} />

        <FactoryScene />

        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={8}
          maxDistance={60}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 2.2}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 2}
          target={[10, 1, 0]}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          panSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
        />
      </Suspense>
    </Canvas>
  );
}
