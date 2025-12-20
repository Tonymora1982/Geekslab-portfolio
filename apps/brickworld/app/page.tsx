"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/ui/Header";
import { Toolbar } from "@/components/ui/Toolbar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { KeyboardHandler } from "@/components/game/KeyboardHandler";

/**
 * Dynamic import of the 3D scene to avoid SSR issues with Three.js
 * This is necessary because Three.js requires browser APIs
 */
const GameScene = dynamic(() => import("@/components/game/GameScene"), {
    ssr: false,
    loading: () => <LoadingScreen />,
});

/**
 * BrickWorld Main Page
 * The main game interface with 3D scene and UI controls
 * Keyboard shortcuts: R (rotate), X (delete mode), Ctrl+Z (undo)
 */
export default function HomePage() {
    return (
        <main className="h-screen w-screen relative overflow-hidden">
            {/* Keyboard shortcut handler */}
            <KeyboardHandler />

            {/* Header with logo and actions */}
            <Header />

            {/* 3D Game Scene */}
            <Suspense fallback={<LoadingScreen />}>
                <GameScene />
            </Suspense>

            {/* Bottom toolbar with block selection */}
            <Toolbar />
        </main>
    );
}
