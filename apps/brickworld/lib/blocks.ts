/**
 * Block Types and Color Definitions
 * Core data structures for the BrickWorld building system
 */

// ============================================
// BLOCK TYPES
// ============================================

export interface BlockType {
    id: string;
    name: string;
    /** Dimensions in grid units [width, height, depth] */
    dimensions: [number, number, number];
    /** Preview size in toolbar [width, height] in pixels */
    preview: { width: number; height: number };
}

/**
 * Available block types for building
 * Dimensions are in grid units (1 unit = 1 stud width)
 */
export const BLOCK_TYPES: BlockType[] = [
    {
        id: "brick-1x1",
        name: "1×1 Brick",
        dimensions: [1, 1, 1],
        preview: { width: 16, height: 16 },
    },
    {
        id: "brick-2x1",
        name: "2×1 Brick",
        dimensions: [2, 1, 1],
        preview: { width: 24, height: 16 },
    },
    {
        id: "brick-2x2",
        name: "2×2 Brick",
        dimensions: [2, 1, 2],
        preview: { width: 24, height: 24 },
    },
    {
        id: "brick-4x2",
        name: "4×2 Brick",
        dimensions: [4, 1, 2],
        preview: { width: 32, height: 24 },
    },
    {
        id: "plate-2x2",
        name: "2×2 Plate",
        dimensions: [2, 0.33, 2],
        preview: { width: 24, height: 8 },
    },
    {
        id: "slope-2x1",
        name: "2×1 Slope",
        dimensions: [2, 1, 1],
        preview: { width: 24, height: 16 },
    },
];

// ============================================
// COLORS
// ============================================

export interface BrickColor {
    id: string;
    name: string;
    hex: string;
}

/**
 * Available brick colors
 * Inspired by classic building block palettes
 */
export const BRICK_COLORS: BrickColor[] = [
    { id: "red", name: "Red", hex: "#C4281B" },
    { id: "blue", name: "Blue", hex: "#0055BF" },
    { id: "yellow", name: "Yellow", hex: "#F5CD2F" },
    { id: "green", name: "Green", hex: "#237841" },
    { id: "white", name: "White", hex: "#FFFFFF" },
    { id: "black", name: "Black", hex: "#1B2A34" },
    { id: "orange", name: "Orange", hex: "#FE8A18" },
    { id: "purple", name: "Purple", hex: "#81007B" },
];

// ============================================
// PLACED BLOCK DATA
// ============================================

export interface PlacedBlock {
    id: string;
    typeId: string;
    position: [number, number, number];
    rotation: 0 | 90 | 180 | 270;
    color: string;
}

/**
 * Generate unique ID for a placed block
 */
export function generateBlockId(): string {
    return `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get block type definition by ID
 */
export function getBlockType(typeId: string): BlockType | undefined {
    return BLOCK_TYPES.find((b) => b.id === typeId);
}
