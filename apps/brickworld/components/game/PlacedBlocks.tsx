"use client";

import { useGameStore } from "@/store/game-store";
import { Block } from "./Block";

/**
 * PlacedBlocks Component
 * Renders all blocks that have been placed in the scene
 */
export function PlacedBlocks() {
    const blocks = useGameStore((state) => state.blocks);

    return (
        <group>
            {blocks.map((block) => (
                <Block
                    key={block.id}
                    id={block.id}
                    typeId={block.typeId}
                    position={block.position}
                    rotation={block.rotation}
                    color={block.color}
                />
            ))}
        </group>
    );
}
