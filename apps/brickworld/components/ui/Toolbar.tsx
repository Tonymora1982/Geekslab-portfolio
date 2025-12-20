"use client";

import { useGameStore } from "@/store/game-store";
import { useThemeStore } from "@/store/theme-store";
import { BLOCK_TYPES } from "@/lib/blocks";
import { RotateCw, Trash2, Undo } from "lucide-react";

/**
 * Toolbar Component
 * Bottom bar with block selection, color picker (theme-based), and action buttons
 */
export function Toolbar() {
    const {
        selectedBlockType,
        setSelectedBlockType,
        selectedColor,
        setSelectedColor,
        isDeleteMode,
        toggleDeleteMode,
        undo,
        currentRotation,
    } = useGameStore();

    // Get palette from current theme
    const { currentTheme } = useThemeStore();
    const colorPalette = currentTheme.palette;

    return (
        <div className="toolbar">
            {/* Theme indicator */}
            <div className="flex items-center mr-4 text-sm opacity-70" title={`Theme: ${currentTheme.name}`}>
                <span className="text-xl mr-1">{currentTheme.emoji}</span>
            </div>

            {/* Block Type Selection */}
            <div className="flex gap-2 mr-4">
                {BLOCK_TYPES.map((block) => (
                    <button
                        key={block.id}
                        className={`block-btn ${selectedBlockType === block.id ? "active" : ""}`}
                        onClick={() => setSelectedBlockType(block.id)}
                        title={block.name}
                    >
                        {/* Simple visual representation of block */}
                        <div
                            className="rounded"
                            style={{
                                width: block.preview.width,
                                height: block.preview.height,
                                backgroundColor: selectedColor,
                                transform: `rotate(${currentRotation}deg)`,
                                transition: "transform 0.2s ease",
                            }}
                        />
                    </button>
                ))}
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-white/20 mx-2" />

            {/* Color Picker - uses theme palette */}
            <div className="flex gap-1 mr-4">
                {colorPalette.map((color) => (
                    <button
                        key={color.id}
                        className={`color-swatch ${selectedColor === color.hex ? "active" : ""}`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setSelectedColor(color.hex)}
                        title={color.name}
                    />
                ))}
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-white/20 mx-2" />

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button
                    className="action-btn"
                    onClick={() => useGameStore.getState().rotateSelectedBlock()}
                    title="Rotate (R)"
                >
                    <RotateCw size={16} />
                </button>
                <button
                    className={`action-btn ${isDeleteMode ? "primary" : ""}`}
                    onClick={toggleDeleteMode}
                    title="Delete Mode (X)"
                >
                    <Trash2 size={16} />
                </button>
                <button
                    className="action-btn"
                    onClick={undo}
                    title="Undo (Ctrl+Z)"
                >
                    <Undo size={16} />
                </button>
            </div>
        </div>
    );
}
