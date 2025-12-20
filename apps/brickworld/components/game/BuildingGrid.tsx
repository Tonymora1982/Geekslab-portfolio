"use client";

import { useRef } from "react";
import { Mesh, Vector3 } from "three";
import { useGameStore } from "@/store/game-store";
import { getBlockType } from "@/lib/blocks";

const GRID_SIZE = 20; // 20x20 grid
const CELL_SIZE = 1;  // 1 unit per cell

interface BuildingGridProps {
    gridColor?: string;
    groundColor?: string;
}

/**
 * BuildingGrid Component
 * Interactive ground plane where blocks can be placed
 * Now supports themed colors
 */
export function BuildingGrid({
    gridColor = "#333355",
    groundColor = "#1a1a2e"
}: BuildingGridProps) {
    const meshRef = useRef<Mesh>(null);
    const { addBlock, isDeleteMode, setGhostPosition, selectedBlockType } = useGameStore();
    const blockType = getBlockType(selectedBlockType);

    /**
     * Calculate snapped grid position from pointer event
     */
    const getSnappedPosition = (point: Vector3): [number, number, number] => {
        const x = Math.floor(point.x / CELL_SIZE) * CELL_SIZE + CELL_SIZE / 2;
        const z = Math.floor(point.z / CELL_SIZE) * CELL_SIZE + CELL_SIZE / 2;
        const y = blockType ? blockType.dimensions[1] / 2 : 0.5;
        return [x, y, z];
    };

    /**
     * Handle pointer move to update ghost position
     */
    const handlePointerMove = (event: { point: Vector3; stopPropagation: () => void }) => {
        event.stopPropagation();
        const position = getSnappedPosition(event.point);
        setGhostPosition(position);
    };

    /**
     * Handle click to place a block
     */
    const handleClick = (event: { point: Vector3; stopPropagation: () => void }) => {
        event.stopPropagation();

        if (isDeleteMode) return;

        const position = getSnappedPosition(event.point);
        addBlock(position);
    };

    /**
     * Clear ghost when pointer leaves grid
     */
    const handlePointerLeave = () => {
        setGhostPosition(null);
    };

    return (
        <group>
            {/* Ground plane (clickable area) */}
            <mesh
                ref={meshRef}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onClick={handleClick}
                receiveShadow
            >
                <planeGeometry args={[GRID_SIZE, GRID_SIZE]} />
                <meshStandardMaterial
                    color={groundColor}
                    roughness={0.8}
                    metalness={0.1}
                />
            </mesh>

            {/* Grid lines - themed color */}
            <gridHelper
                args={[GRID_SIZE, GRID_SIZE, gridColor, gridColor]}
                position={[0, 0.01, 0]}
            />
        </group>
    );
}
