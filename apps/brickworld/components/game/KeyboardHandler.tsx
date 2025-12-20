"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/game-store";

/**
 * KeyboardHandler Component
 * Handles keyboard shortcuts for the game
 * - R: Rotate block
 * - X: Toggle delete mode
 * - Z (with Ctrl/Cmd): Undo
 * - Escape: Exit delete mode / clear selection
 */
export function KeyboardHandler() {
    const { rotateSelectedBlock, toggleDeleteMode, undo, isDeleteMode } = useGameStore();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Ignore if typing in an input
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
                return;
            }

            switch (event.key.toLowerCase()) {
                case "r":
                    // Rotate block 90 degrees
                    rotateSelectedBlock();
                    break;

                case "x":
                    // Toggle delete mode
                    toggleDeleteMode();
                    break;

                case "z":
                    // Undo with Ctrl/Cmd
                    if (event.ctrlKey || event.metaKey) {
                        event.preventDefault();
                        undo();
                    }
                    break;

                case "escape":
                    // Exit delete mode
                    if (isDeleteMode) {
                        toggleDeleteMode();
                    }
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [rotateSelectedBlock, toggleDeleteMode, undo, isDeleteMode]);

    // This component doesn't render anything
    return null;
}
