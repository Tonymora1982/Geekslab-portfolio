import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PlacedBlock, generateBlockId, BRICK_COLORS, BLOCK_TYPES } from "@/lib/blocks";

/**
 * Game State Interface
 * Central state management for BrickWorld
 */
interface GameState {
    // Placed blocks in the scene
    blocks: PlacedBlock[];

    // Currently selected block type ID
    selectedBlockType: string;

    // Currently selected color hex
    selectedColor: string;

    // Rotation for next placed block
    currentRotation: 0 | 90 | 180 | 270;

    // Delete mode toggle
    isDeleteMode: boolean;

    // Ghost block position (where cursor is hovering)
    ghostPosition: [number, number, number] | null;

    // Undo history
    history: PlacedBlock[][];

    // Actions
    addBlock: (position: [number, number, number]) => void;
    removeBlock: (blockId: string) => void;
    setSelectedBlockType: (typeId: string) => void;
    setSelectedColor: (color: string) => void;
    rotateSelectedBlock: () => void;
    toggleDeleteMode: () => void;
    setGhostPosition: (position: [number, number, number] | null) => void;
    undo: () => void;
    clearAll: () => void;
    // Save/Load
    saveCreation: (name: string) => void;
    loadCreation: (name: string) => boolean;
    getSavedCreations: () => string[];
    deleteCreation: (name: string) => void;
}

// Storage key prefix for saved creations
const STORAGE_PREFIX = "brickworld_creation_";

/**
 * Zustand store for game state with persistence
 * Manages all blocks, selection, and actions
 */
export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            // Initial state
            blocks: [],
            selectedBlockType: BLOCK_TYPES[0].id,
            selectedColor: BRICK_COLORS[0].hex,
            currentRotation: 0,
            isDeleteMode: false,
            ghostPosition: null,
            history: [],

            /**
             * Add a new block at the specified position
             */
            addBlock: (position) => {
                const { blocks, selectedBlockType, selectedColor, currentRotation, history } = get();

                const newBlock: PlacedBlock = {
                    id: generateBlockId(),
                    typeId: selectedBlockType,
                    position,
                    rotation: currentRotation,
                    color: selectedColor,
                };

                set({
                    blocks: [...blocks, newBlock],
                    history: [...history, blocks].slice(-50), // Keep last 50 states for undo
                });
            },

            /**
             * Remove a block by ID
             */
            removeBlock: (blockId) => {
                const { blocks, history } = get();
                set({
                    blocks: blocks.filter((b) => b.id !== blockId),
                    history: [...history, blocks].slice(-50),
                });
            },

            /**
             * Set the currently selected block type
             */
            setSelectedBlockType: (typeId) => {
                set({ selectedBlockType: typeId, isDeleteMode: false });
            },

            /**
             * Set the currently selected color
             */
            setSelectedColor: (color) => {
                set({ selectedColor: color });
            },

            /**
             * Rotate the next block to be placed by 90 degrees
             */
            rotateSelectedBlock: () => {
                const { currentRotation } = get();
                const newRotation = ((currentRotation + 90) % 360) as 0 | 90 | 180 | 270;
                set({ currentRotation: newRotation });
            },

            /**
             * Toggle delete mode on/off
             */
            toggleDeleteMode: () => {
                set((state) => ({ isDeleteMode: !state.isDeleteMode }));
            },

            /**
             * Set ghost block position for preview
             */
            setGhostPosition: (position) => {
                set({ ghostPosition: position });
            },

            /**
             * Undo the last action
             */
            undo: () => {
                const { history } = get();
                if (history.length === 0) return;

                const previousState = history[history.length - 1];
                set({
                    blocks: previousState,
                    history: history.slice(0, -1),
                });
            },

            /**
             * Clear all blocks from the scene
             */
            clearAll: () => {
                const { blocks, history } = get();
                if (blocks.length === 0) return;

                set({
                    blocks: [],
                    history: [...history, blocks].slice(-50),
                });
            },

            /**
             * Save current creation to localStorage
             */
            saveCreation: (name: string) => {
                const { blocks } = get();
                const key = STORAGE_PREFIX + name.toLowerCase().replace(/\s+/g, "_");
                localStorage.setItem(key, JSON.stringify({ name, blocks, savedAt: new Date().toISOString() }));
            },

            /**
             * Load a saved creation from localStorage
             */
            loadCreation: (name: string) => {
                const key = STORAGE_PREFIX + name.toLowerCase().replace(/\s+/g, "_");
                const saved = localStorage.getItem(key);
                if (!saved) return false;

                try {
                    const { blocks } = JSON.parse(saved);
                    set({ blocks, history: [] });
                    return true;
                } catch {
                    return false;
                }
            },

            /**
             * Get list of all saved creation names
             */
            getSavedCreations: () => {
                const creations: string[] = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key?.startsWith(STORAGE_PREFIX)) {
                        try {
                            const saved = localStorage.getItem(key);
                            if (saved) {
                                const { name } = JSON.parse(saved);
                                creations.push(name);
                            }
                        } catch {
                            // Skip invalid entries
                        }
                    }
                }
                return creations;
            },

            /**
             * Delete a saved creation
             */
            deleteCreation: (name: string) => {
                const key = STORAGE_PREFIX + name.toLowerCase().replace(/\s+/g, "_");
                localStorage.removeItem(key);
            },
        }),
        {
            name: "brickworld-current",
            // Only persist blocks and settings, not ghost position or history
            partialize: (state) => ({
                blocks: state.blocks,
                selectedBlockType: state.selectedBlockType,
                selectedColor: state.selectedColor,
                currentRotation: state.currentRotation,
            }),
        }
    )
);
