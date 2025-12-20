"use client";

import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "@/store/game-store";
import { getBlockType } from "@/lib/blocks";

/**
 * GhostBlock Component
 * Semi-transparent preview of the block to be placed
 * Now follows the cursor position from global state
 */
export function GhostBlock() {
    const meshRef = useRef<Mesh>(null);
    const {
        selectedBlockType,
        selectedColor,
        currentRotation,
        isDeleteMode,
        ghostPosition
    } = useGameStore();

    const blockType = getBlockType(selectedBlockType);

    // Subtle floating animation
    useFrame((state) => {
        if (meshRef.current && ghostPosition) {
            const floatOffset = Math.sin(state.clock.elapsedTime * 3) * 0.03;
            meshRef.current.position.y = ghostPosition[1] + floatOffset;
        }
    });

    // Don't show ghost in delete mode, no block type, or no position
    if (isDeleteMode || !blockType || !ghostPosition) {
        return null;
    }

    const [width, height, depth] = blockType.dimensions;

    return (
        <group
            position={[ghostPosition[0], ghostPosition[1], ghostPosition[2]]}
            rotation={[0, (currentRotation * Math.PI) / 180, 0]}
        >
            {/* Main ghost block */}
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                    color={selectedColor}
                    transparent
                    opacity={0.5}
                    roughness={0.3}
                    depthWrite={false}
                />
            </mesh>

            {/* Ghost studs on top */}
            {Array.from({ length: Math.floor(width) }).map((_, i) =>
                Array.from({ length: Math.floor(depth) }).map((_, j) => (
                    <mesh
                        key={`ghost-stud-${i}-${j}`}
                        position={[
                            -width / 2 + 0.5 + i,
                            height / 2 + 0.1,
                            -depth / 2 + 0.5 + j,
                        ]}
                    >
                        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
                        <meshStandardMaterial
                            color={selectedColor}
                            transparent
                            opacity={0.5}
                            depthWrite={false}
                        />
                    </mesh>
                ))
            )}

            {/* Placement indicator ring */}
            <mesh position={[0, -height / 2 + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.4, 0.5, 32]} />
                <meshBasicMaterial color="#10b981" transparent opacity={0.8} />
            </mesh>
        </group>
    );
}
