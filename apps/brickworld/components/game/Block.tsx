"use client";

import { useRef, useState } from "react";
import { Mesh } from "three";
import { useGameStore } from "@/store/game-store";
import { getBlockType } from "@/lib/blocks";

interface BlockProps {
    id: string;
    typeId: string;
    position: [number, number, number];
    rotation: 0 | 90 | 180 | 270;
    color: string;
}

/**
 * Block Component
 * Individual 3D block with hover and click interactions
 * Click to stack new block on top, or delete in delete mode
 */
export function Block({ id, typeId, position, rotation, color }: BlockProps) {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);

    const { isDeleteMode, removeBlock, addBlock, setGhostPosition } = useGameStore();
    const blockType = getBlockType(typeId);

    if (!blockType) return null;

    const [width, height, depth] = blockType.dimensions;

    /**
     * Handle click - either delete or stack
     */
    const handleClick = (event: { stopPropagation: () => void }) => {
        event.stopPropagation();

        if (isDeleteMode) {
            removeBlock(id);
        } else {
            // Stack a new block on top
            const [x, y, z] = position;
            const { selectedBlockType } = useGameStore.getState();
            const newBlockType = getBlockType(selectedBlockType);

            if (newBlockType) {
                const newY = y + height / 2 + newBlockType.dimensions[1] / 2;
                addBlock([x, newY, z]);
            }
        }
    };

    /**
     * Update ghost position when hovering over block (for stacking preview)
     */
    const handlePointerEnter = () => {
        setHovered(true);
        if (!isDeleteMode) {
            const [x, y, z] = position;
            const { selectedBlockType } = useGameStore.getState();
            const newBlockType = getBlockType(selectedBlockType);
            if (newBlockType) {
                const newY = y + height / 2 + newBlockType.dimensions[1] / 2;
                setGhostPosition([x, newY, z]);
            }
        }
    };

    const handlePointerLeave = () => {
        setHovered(false);
    };

    // Determine outline color based on mode
    const outlineColor = isDeleteMode && hovered ? "#ff4444" : hovered ? "#10b981" : null;

    return (
        <group position={position} rotation={[0, (rotation * Math.PI) / 180, 0]}>
            {/* Main block mesh */}
            <mesh
                ref={meshRef}
                onClick={handleClick}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.4}
                    metalness={0.1}
                />
            </mesh>

            {/* Studs on top */}
            {Array.from({ length: Math.floor(width) }).map((_, i) =>
                Array.from({ length: Math.floor(depth) }).map((_, j) => (
                    <mesh
                        key={`stud-${i}-${j}`}
                        position={[
                            -width / 2 + 0.5 + i,
                            height / 2 + 0.1,
                            -depth / 2 + 0.5 + j,
                        ]}
                        castShadow
                    >
                        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
                        <meshStandardMaterial color={color} roughness={0.4} />
                    </mesh>
                ))
            )}

            {/* Hover outline effect - simple wireframe box */}
            {hovered && (
                <mesh scale={[1.02, 1.02, 1.02]}>
                    <boxGeometry args={[width, height, depth]} />
                    <meshBasicMaterial
                        color={outlineColor || "#10b981"}
                        wireframe
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            )}
        </group>
    );
}
