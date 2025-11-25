"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function TorusKnot() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[1, 0.3, 128, 16]} />
            <meshStandardMaterial
                color="#ffffff"
                roughness={0.1}
                metalness={0.8}
                wireframe
            />
        </mesh>
    );
}

export function Scene3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <TorusKnot />
                </Float>
            </Canvas>
        </div>
    );
}
