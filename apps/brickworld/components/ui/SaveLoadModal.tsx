"use client";

import { useState } from "react";
import { X, Save, FolderOpen, Trash2 } from "lucide-react";
import { useGameStore } from "@/store/game-store";

interface SaveLoadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * SaveLoadModal Component
 * Modal dialog for saving, loading, and managing creations
 */
export function SaveLoadModal({ isOpen, onClose }: SaveLoadModalProps) {
    const [saveName, setSaveName] = useState("");
    const [savedCreations, setSavedCreations] = useState<string[]>([]);
    const { saveCreation, loadCreation, deleteCreation, getSavedCreations, blocks } = useGameStore();

    // Refresh saved creations list when modal opens
    const refreshCreations = () => {
        setSavedCreations(getSavedCreations());
    };

    // Load creations when modal opens
    if (isOpen && savedCreations.length === 0) {
        refreshCreations();
    }

    if (!isOpen) return null;

    const handleSave = () => {
        if (!saveName.trim()) return;
        saveCreation(saveName.trim());
        setSaveName("");
        refreshCreations();
    };

    const handleLoad = (name: string) => {
        loadCreation(name);
        onClose();
    };

    const handleDelete = (name: string) => {
        deleteCreation(name);
        refreshCreations();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-[var(--color-surface)] border border-white/10 rounded-xl w-full max-w-md mx-4 p-6 shadow-2xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold mb-6">Save / Load Creation</h2>

                {/* Save section */}
                <div className="mb-6">
                    <label className="block text-sm text-white/60 mb-2">Save Current ({blocks.length} blocks)</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={saveName}
                            onChange={(e) => setSaveName(e.target.value)}
                            placeholder="My Creation"
                            className="flex-1 bg-[var(--color-surface-elevated)] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[var(--color-accent)]"
                            onKeyDown={(e) => e.key === "Enter" && handleSave()}
                        />
                        <button
                            onClick={handleSave}
                            disabled={!saveName.trim() || blocks.length === 0}
                            className="action-btn primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save size={16} />
                            Save
                        </button>
                    </div>
                </div>

                {/* Load section */}
                <div>
                    <label className="block text-sm text-white/60 mb-2">Saved Creations</label>
                    {savedCreations.length === 0 ? (
                        <p className="text-white/40 text-sm italic">No saved creations yet</p>
                    ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {savedCreations.map((name) => (
                                <div
                                    key={name}
                                    className="flex items-center justify-between bg-[var(--color-surface-elevated)] border border-white/10 rounded-lg px-3 py-2"
                                >
                                    <span className="truncate mr-2">{name}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleLoad(name)}
                                            className="p-1.5 rounded hover:bg-[var(--color-accent)] transition-colors"
                                            title="Load"
                                        >
                                            <FolderOpen size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(name)}
                                            className="p-1.5 rounded hover:bg-red-500 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
