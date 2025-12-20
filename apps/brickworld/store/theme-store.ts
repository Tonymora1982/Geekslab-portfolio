import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme, getCurrentTheme, getThemeById, ALL_THEMES } from "@/lib/themes";

/**
 * Theme Store Interface
 * Manages the current visual theme
 */
interface ThemeState {
    // Current theme
    currentTheme: Theme;

    // Whether to auto-detect theme by date
    autoDetect: boolean;

    // Actions
    setTheme: (themeId: string) => void;
    toggleAutoDetect: () => void;
    refreshTheme: () => void;

    // Getters
    getAllThemes: () => Theme[];
}

/**
 * Zustand store for theme management
 */
export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            // Initialize with auto-detected theme
            currentTheme: getCurrentTheme(),
            autoDetect: true,

            /**
             * Set theme manually by ID
             */
            setTheme: (themeId: string) => {
                const theme = getThemeById(themeId);
                if (theme) {
                    set({ currentTheme: theme, autoDetect: false });
                }
            },

            /**
             * Toggle auto-detection mode
             */
            toggleAutoDetect: () => {
                const { autoDetect } = get();
                if (!autoDetect) {
                    // Turning on auto-detect, refresh to current date's theme
                    set({ autoDetect: true, currentTheme: getCurrentTheme() });
                } else {
                    set({ autoDetect: false });
                }
            },

            /**
             * Refresh theme (useful when date changes)
             */
            refreshTheme: () => {
                const { autoDetect } = get();
                if (autoDetect) {
                    set({ currentTheme: getCurrentTheme() });
                }
            },

            /**
             * Get all available themes
             */
            getAllThemes: () => ALL_THEMES,
        }),
        {
            name: "brickworld-theme",
            // Only persist theme ID and autoDetect setting
            partialize: (state) => ({
                currentTheme: { id: state.currentTheme.id },
                autoDetect: state.autoDetect,
            }),
            // Reconstruct full theme on hydration
            onRehydrateStorage: () => (state) => {
                if (state) {
                    if (state.autoDetect) {
                        state.currentTheme = getCurrentTheme();
                    } else {
                        const theme = getThemeById(state.currentTheme.id);
                        if (theme) {
                            state.currentTheme = theme;
                        } else {
                            state.currentTheme = getCurrentTheme();
                        }
                    }
                }
            },
        }
    )
);
