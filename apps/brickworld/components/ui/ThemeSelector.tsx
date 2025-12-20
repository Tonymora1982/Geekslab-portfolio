"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { useThemeStore } from "@/store/theme-store";

interface ThemeSelectorProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * ThemeSelector Component
 * Modal for selecting visual themes
 */
export function ThemeSelector({ isOpen, onClose }: ThemeSelectorProps) {
    const { currentTheme, autoDetect, setTheme, toggleAutoDetect, getAllThemes } = useThemeStore();
    const themes = getAllThemes();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-[var(--color-surface)] border border-white/10 rounded-xl w-full max-w-sm mx-4 p-6 shadow-2xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold mb-4">Select Theme</h2>

                {/* Auto-detect toggle */}
                <label className="flex items-center gap-3 mb-4 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={autoDetect}
                        onChange={toggleAutoDetect}
                        className="w-4 h-4 accent-[var(--color-accent)]"
                    />
                    <span className="text-sm">
                        Auto-detect by date
                        <span className="block text-xs text-white/50">
                            Automatically switch themes for holidays
                        </span>
                    </span>
                </label>

                {/* Theme list */}
                <div className="space-y-2">
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => {
                                setTheme(theme.id);
                                onClose();
                            }}
                            disabled={autoDetect}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all
                ${currentTheme.id === theme.id
                                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                                    : "border-white/10 hover:border-white/30"
                                }
                ${autoDetect ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <span className="text-2xl">{theme.emoji}</span>
                            <div className="flex-1 text-left">
                                <div className="font-medium">{theme.name}</div>
                                {theme.dateRange && (
                                    <div className="text-xs text-white/50">
                                        {theme.dateRange.start} → {theme.dateRange.end}
                                    </div>
                                )}
                            </div>
                            {currentTheme.id === theme.id && (
                                <Check size={18} className="text-[var(--color-accent)]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
