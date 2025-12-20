"use client";

/**
 * LoadingScreen Component
 * Displayed while the 3D scene is loading
 */
export function LoadingScreen() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-background)] z-50">
            <div className="text-center">
                {/* Animated brick icon */}
                <div className="text-6xl mb-4 animate-bounce">
                    🧱
                </div>
                <h2 className="text-xl font-semibold mb-2">Loading BrickWorld...</h2>
                <p className="text-[var(--color-muted)]">Preparing your creative space</p>

                {/* Loading bar */}
                <div className="mt-6 w-48 h-1 bg-[var(--color-surface)] rounded-full overflow-hidden mx-auto">
                    <div
                        className="h-full bg-[var(--color-accent)] rounded-full animate-pulse"
                        style={{ width: "60%" }}
                    />
                </div>
            </div>
        </div>
    );
}
