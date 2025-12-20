"use client";

import { useState } from "react";
import { Share2, Save, Trash2, Palette } from "lucide-react";
import { useGameStore } from "@/store/game-store";
import { useThemeStore } from "@/store/theme-store";
import { SaveLoadModal } from "./SaveLoadModal";
import { ThemeSelector } from "./ThemeSelector";

/**
 * Header Component
 * Top navigation bar with logo, theme selector, save/load, clear, and share buttons
 */
export function Header() {
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const { clearAll, blocks } = useGameStore();
    const { currentTheme } = useThemeStore();

    const handleShare = async () => {
        // Generate shareable URL with encoded block data
        const data = JSON.stringify(blocks);
        const encoded = btoa(encodeURIComponent(data));
        const url = `${window.location.origin}?build=${encoded}`;

        try {
            await navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
        } catch {
            alert("Share functionality coming soon!");
        }
    };

    const handleClear = () => {
        if (blocks.length === 0) return;
        if (confirm("Clear all blocks? This action can be undone with Ctrl+Z.")) {
            clearAll();
        }
    };

    return (
        <>
            <header
                className="header"
                style={{ background: currentTheme.headerBackground }}
            >
                {/* Logo with theme emoji */}
                <div className="logo">
                    <span className="text-2xl">{currentTheme.emoji}</span>
                    <span>BrickWorld</span>
                    {blocks.length > 0 && (
                        <span className="text-xs text-white/40 ml-2">
                            {blocks.length} block{blocks.length !== 1 ? "s" : ""}
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Theme selector button */}
                    <button
                        className="action-btn"
                        onClick={() => setIsThemeModalOpen(true)}
                        title={`Theme: ${currentTheme.name}`}
                        style={{ borderColor: currentTheme.accentColor }}
                    >
                        <Palette size={16} />
                    </button>

                    {/* Save/Load button */}
                    <button
                        className="action-btn"
                        onClick={() => setIsSaveModalOpen(true)}
                        title="Save / Load"
                    >
                        <Save size={16} className="inline mr-2" />
                        Save
                    </button>

                    {/* Clear button */}
                    <button
                        className="action-btn"
                        onClick={handleClear}
                        disabled={blocks.length === 0}
                        title="Clear All"
                    >
                        <Trash2 size={16} />
                    </button>

                    {/* Share button */}
                    <button
                        className="action-btn primary"
                        onClick={handleShare}
                        disabled={blocks.length === 0}
                        title="Share your creation"
                        style={{
                            background: currentTheme.accentColor,
                            borderColor: currentTheme.accentColor
                        }}
                    >
                        <Share2 size={16} className="inline mr-2" />
                        Share
                    </button>
                </div>
            </header>

            {/* Modals */}
            <SaveLoadModal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} />
            <ThemeSelector isOpen={isThemeModalOpen} onClose={() => setIsThemeModalOpen(false)} />
        </>
    );
}
