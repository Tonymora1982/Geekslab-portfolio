/**
 * Theme System for BrickWorld
 * Supports seasonal themes based on current date or manual selection
 */

import { BrickColor } from "./blocks";

// ============================================
// THEME INTERFACE
// ============================================

export interface Theme {
    id: string;
    name: string;
    emoji: string;

    // Environment colors
    gridColor: string;
    groundColor: string;
    backgroundColor: string;

    // UI colors
    accentColor: string;
    headerBackground: string;

    // Block color palette for this theme
    palette: BrickColor[];

    // Optional particle effects
    particles?: "snow" | "leaves" | "hearts" | "confetti";

    // Date range for auto-selection (month-day format)
    dateRange?: {
        start: string; // "MM-DD"
        end: string;   // "MM-DD"
    };
}

// ============================================
// THEME DEFINITIONS
// ============================================

/**
 * Default theme - used most of the year
 */
export const DEFAULT_THEME: Theme = {
    id: "default",
    name: "Classic",
    emoji: "🧱",
    gridColor: "#333355",
    groundColor: "#1a1a2e",
    backgroundColor: "#0a0a0f",
    accentColor: "#10b981",
    headerBackground: "rgba(26, 26, 46, 0.9)",
    palette: [
        { id: "red", name: "Red", hex: "#C4281B" },
        { id: "blue", name: "Blue", hex: "#0055BF" },
        { id: "yellow", name: "Yellow", hex: "#F5CD2F" },
        { id: "green", name: "Green", hex: "#237841" },
        { id: "white", name: "White", hex: "#FFFFFF" },
        { id: "black", name: "Black", hex: "#1B2A34" },
        { id: "orange", name: "Orange", hex: "#FE8A18" },
        { id: "purple", name: "Purple", hex: "#81007B" },
    ],
};

/**
 * Christmas theme - December 15 to January 6
 */
export const CHRISTMAS_THEME: Theme = {
    id: "christmas",
    name: "Christmas",
    emoji: "🎄",
    gridColor: "#1a3a1a",
    groundColor: "#0d1f0d",
    backgroundColor: "#050a05",
    accentColor: "#ff4444",
    headerBackground: "rgba(13, 31, 13, 0.95)",
    palette: [
        { id: "xmas-red", name: "Christmas Red", hex: "#CC231E" },
        { id: "xmas-green", name: "Christmas Green", hex: "#165B33" },
        { id: "xmas-gold", name: "Gold", hex: "#FFD700" },
        { id: "xmas-white", name: "Snow White", hex: "#FFFAFA" },
        { id: "xmas-silver", name: "Silver", hex: "#C0C0C0" },
        { id: "xmas-dark-green", name: "Pine Green", hex: "#0A3D0A" },
        { id: "xmas-burgundy", name: "Burgundy", hex: "#800020" },
        { id: "xmas-cream", name: "Cream", hex: "#FFFDD0" },
    ],
    particles: "snow",
    dateRange: { start: "12-15", end: "01-06" },
};

/**
 * Halloween theme - October 15 to November 1
 */
export const HALLOWEEN_THEME: Theme = {
    id: "halloween",
    name: "Halloween",
    emoji: "🎃",
    gridColor: "#3d2a1a",
    groundColor: "#1a1008",
    backgroundColor: "#0a0805",
    accentColor: "#ff6600",
    headerBackground: "rgba(26, 16, 8, 0.95)",
    palette: [
        { id: "hw-orange", name: "Pumpkin", hex: "#FF6600" },
        { id: "hw-black", name: "Midnight", hex: "#1a1a1a" },
        { id: "hw-purple", name: "Witch Purple", hex: "#6B238E" },
        { id: "hw-green", name: "Slime Green", hex: "#39FF14" },
        { id: "hw-red", name: "Blood Red", hex: "#8B0000" },
        { id: "hw-white", name: "Ghost White", hex: "#F8F8FF" },
        { id: "hw-brown", name: "Coffin Brown", hex: "#3D2314" },
        { id: "hw-gray", name: "Tombstone", hex: "#708090" },
    ],
    particles: "leaves",
    dateRange: { start: "10-15", end: "11-01" },
};

/**
 * Valentine's Day theme - February 1 to February 15
 */
export const VALENTINE_THEME: Theme = {
    id: "valentine",
    name: "Valentine's Day",
    emoji: "💘",
    gridColor: "#3d1a2a",
    groundColor: "#1f0d15",
    backgroundColor: "#0a0508",
    accentColor: "#ff69b4",
    headerBackground: "rgba(31, 13, 21, 0.95)",
    palette: [
        { id: "val-pink", name: "Hot Pink", hex: "#FF69B4" },
        { id: "val-red", name: "Romantic Red", hex: "#E31B54" },
        { id: "val-white", name: "Pure White", hex: "#FFFFFF" },
        { id: "val-rose", name: "Rose", hex: "#FF007F" },
        { id: "val-lavender", name: "Lavender", hex: "#E6E6FA" },
        { id: "val-burgundy", name: "Burgundy", hex: "#800020" },
        { id: "val-gold", name: "Gold", hex: "#FFD700" },
        { id: "val-mauve", name: "Mauve", hex: "#E0B0FF" },
    ],
    particles: "hearts",
    dateRange: { start: "02-01", end: "02-15" },
};

/**
 * Easter theme - variable dates (approx March-April)
 */
export const EASTER_THEME: Theme = {
    id: "easter",
    name: "Easter",
    emoji: "🐰",
    gridColor: "#2a3d2a",
    groundColor: "#152015",
    backgroundColor: "#080a08",
    accentColor: "#98fb98",
    headerBackground: "rgba(21, 32, 21, 0.95)",
    palette: [
        { id: "easter-pink", name: "Pastel Pink", hex: "#FFB6C1" },
        { id: "easter-blue", name: "Pastel Blue", hex: "#AEC6CF" },
        { id: "easter-yellow", name: "Pastel Yellow", hex: "#FDFD96" },
        { id: "easter-green", name: "Pastel Green", hex: "#98FB98" },
        { id: "easter-lavender", name: "Lavender", hex: "#E6E6FA" },
        { id: "easter-peach", name: "Peach", hex: "#FFDAB9" },
        { id: "easter-white", name: "Egg White", hex: "#FFFAFA" },
        { id: "easter-purple", name: "Lilac", hex: "#C8A2C8" },
    ],
    dateRange: { start: "03-20", end: "04-20" },
};

// ============================================
// ALL THEMES
// ============================================

export const ALL_THEMES: Theme[] = [
    DEFAULT_THEME,
    CHRISTMAS_THEME,
    HALLOWEEN_THEME,
    VALENTINE_THEME,
    EASTER_THEME,
];

// ============================================
// THEME UTILITIES
// ============================================

/**
 * Get the current theme based on today's date
 * Falls back to default theme if no seasonal theme matches
 */
export function getCurrentTheme(): Theme {
    const today = new Date();
    const monthDay = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    for (const theme of ALL_THEMES) {
        if (!theme.dateRange) continue;

        const { start, end } = theme.dateRange;

        // Handle year wrap (e.g., Christmas: 12-15 to 01-06)
        if (start > end) {
            // Spans across year boundary
            if (monthDay >= start || monthDay <= end) {
                return theme;
            }
        } else {
            // Normal range within same year
            if (monthDay >= start && monthDay <= end) {
                return theme;
            }
        }
    }

    return DEFAULT_THEME;
}

/**
 * Get theme by ID
 */
export function getThemeById(id: string): Theme | undefined {
    return ALL_THEMES.find((t) => t.id === id);
}
