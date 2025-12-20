"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface SnowParticlesProps {
    count?: number;
    area?: number;
}

/**
 * SnowParticles Component
 * Falling snow effect for winter/Christmas theme
 */
export function SnowParticles({ count = 2000, area = 30 }: SnowParticlesProps) {
    const ref = useRef<THREE.Points>(null);

    // Generate random snowflake positions
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * area;     // x
            positions[i * 3 + 1] = Math.random() * area;         // y (start at various heights)
            positions[i * 3 + 2] = (Math.random() - 0.5) * area; // z
        }
        return positions;
    }, [count, area]);

    // Animate snow falling
    useFrame((state, delta) => {
        if (!ref.current) return;

        const positions = ref.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            // Fall speed (y decreases)
            positions[i * 3 + 1] -= delta * 2;

            // Slight horizontal drift
            positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * delta * 0.1;
            positions[i * 3 + 2] += Math.cos(state.clock.elapsedTime + i * 0.5) * delta * 0.1;

            // Reset to top when below ground
            if (positions[i * 3 + 1] < 0) {
                positions[i * 3 + 1] = area;
                positions[i * 3] = (Math.random() - 0.5) * area;
                positions[i * 3 + 2] = (Math.random() - 0.5) * area;
            }
        }

        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.08}
                sizeAttenuation
                depthWrite={false}
                opacity={0.8}
            />
        </Points>
    );
}

interface HeartParticlesProps {
    count?: number;
    area?: number;
}

/**
 * HeartParticles Component
 * Floating hearts for Valentine's theme
 */
export function HeartParticles({ count = 500, area = 30 }: HeartParticlesProps) {
    const ref = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * area;
            positions[i * 3 + 1] = Math.random() * area * 0.5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * area;
        }
        return positions;
    }, [count, area]);

    useFrame((state, delta) => {
        if (!ref.current) return;

        const positions = ref.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            // Float upward slowly
            positions[i * 3 + 1] += delta * 0.5;

            // Gentle sway
            positions[i * 3] += Math.sin(state.clock.elapsedTime * 2 + i) * delta * 0.2;

            // Reset when too high
            if (positions[i * 3 + 1] > area * 0.5) {
                positions[i * 3 + 1] = 0;
                positions[i * 3] = (Math.random() - 0.5) * area;
                positions[i * 3 + 2] = (Math.random() - 0.5) * area;
            }
        }

        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ff69b4"
                size={0.12}
                sizeAttenuation
                depthWrite={false}
                opacity={0.7}
            />
        </Points>
    );
}

interface LeafParticlesProps {
    count?: number;
    area?: number;
}

/**
 * LeafParticles Component
 * Falling leaves for Halloween/Autumn theme
 */
export function LeafParticles({ count = 800, area = 30 }: LeafParticlesProps) {
    const ref = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * area;
            positions[i * 3 + 1] = Math.random() * area;
            positions[i * 3 + 2] = (Math.random() - 0.5) * area;
        }
        return positions;
    }, [count, area]);

    useFrame((state, delta) => {
        if (!ref.current) return;

        const positions = ref.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            // Fall slowly with more horizontal movement
            positions[i * 3 + 1] -= delta * 1.5;
            positions[i * 3] += Math.sin(state.clock.elapsedTime * 1.5 + i) * delta * 0.5;
            positions[i * 3 + 2] += Math.cos(state.clock.elapsedTime + i) * delta * 0.3;

            if (positions[i * 3 + 1] < 0) {
                positions[i * 3 + 1] = area;
                positions[i * 3] = (Math.random() - 0.5) * area;
                positions[i * 3 + 2] = (Math.random() - 0.5) * area;
            }
        }

        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ff6600"
                size={0.1}
                sizeAttenuation
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    );
}
