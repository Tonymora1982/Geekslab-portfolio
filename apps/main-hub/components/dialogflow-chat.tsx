"use client";

/**
 * DialogflowChat Component
 *
 * Client-side wrapper for the Dialogflow Messenger web component.
 * This prevents hydration errors by only mounting the df-messenger
 * element after the component mounts on the client.
 *
 * Features:
 * - Bilingual support via useLanguage hook (auto-switches EN/ES)
 * - Custom robot icon for better branding
 * - Styled via globals.css with emerald theme
 * - Graceful fallback if LanguageProvider is not available
 *
 * Uses dangerouslySetInnerHTML to inject the web component as raw HTML,
 * avoiding TypeScript JSX intrinsic element issues.
 */

import Script from "next/script";
import { useEffect, useState } from "react";

interface DialogflowChatProps {
    /** The Dialogflow agent ID */
    agentId: string;
    /** Title displayed in the chat header */
    chatTitle?: string;
    /** Language code for the chat (e.g., "en", "es") */
    languageCode?: string;
    /** Intent to trigger on welcome */
    intent?: string;
}

/**
 * Safe language hook that doesn't throw if provider is missing.
 * This allows DialogflowChat to work even outside LanguageProvider context.
 */
function useSafeLanguage(fallbackLanguage: string): string {
    const [language, setLanguage] = useState(fallbackLanguage);

    useEffect(() => {
        // Try to get language from localStorage (same as LanguageProvider)
        try {
            const savedLang = localStorage.getItem('language');
            if (savedLang === 'en' || savedLang === 'es') {
                setLanguage(savedLang);
            }
        } catch {
            // localStorage not available (SSR or privacy mode)
        }

        // Listen for language changes via storage event
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'language' && (e.newValue === 'en' || e.newValue === 'es')) {
                setLanguage(e.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return language;
}

export function DialogflowChat({
    agentId,
    chatTitle = "GeeksLab AI",
    languageCode = "en",
    intent = "WELCOME",
}: DialogflowChatProps) {
    // Only render on client to prevent hydration mismatch
    const [isMounted, setIsMounted] = useState(false);

    // Use safe language hook that syncs with LanguageProvider via localStorage
    const currentLanguage = useSafeLanguage(languageCode);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Don't render anything on the server
    if (!isMounted) {
        return null;
    }

    // Create the df-messenger HTML string
        // IMPORTANT: Dialogflow Messenger sometimes ignores external CSS for theming in certain builds.
        // Setting CSS custom properties inline ensures the minimal dark theme is applied consistently.
        // Using dangerouslySetInnerHTML to avoid TypeScript JSX issues with web components.
    const messengerHtml = `
    <df-messenger
      intent="${intent}"
      chat-title="${chatTitle}"
      agent-id="${agentId}"
      language-code="${currentLanguage}"
      chat-icon="/assets/graphics/Robot.png"
            style="
                --df-messenger-chat-background-color: var(--color-background);
                                --df-messenger-font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;
                --df-messenger-font-color: var(--color-foreground);
                                --df-messenger-input-box-color: rgba(0, 0, 0, 0.66);
                --df-messenger-input-font-color: var(--color-foreground);
                --df-messenger-input-placeholder-font-color: var(--color-muted-foreground);
                --df-messenger-send-icon: var(--color-emerald);

                --df-messenger-bot-message: rgba(255, 255, 255, 0.05);
                --df-messenger-user-message: color-mix(in srgb, var(--color-emerald-subtle) 80%, transparent);

                                --df-messenger-primary-color: rgba(0, 0, 0, 0.88);
                                --df-messenger-titlebar-color: rgba(0, 0, 0, 0.88);
                                --df-messenger-button-titlebar-color: rgba(0, 0, 0, 0.88);
                --df-messenger-button-titlebar-font-color: var(--color-foreground);
                --df-messenger-titlebar-font-color: var(--color-foreground);
                --df-messenger-titlebar-icon-color: var(--color-foreground);
                --df-messenger-minimized-chat-close-icon-color: var(--color-foreground);
                z-index: 9999;
            "
    ></df-messenger>
  `;

    return (
        <>
            {/* Load Dialogflow Messenger script */}
            <Script
                src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
                strategy="lazyOnload"
            />
            {/* Inject the df-messenger web component as raw HTML */}
            <div dangerouslySetInnerHTML={{ __html: messengerHtml }} />
        </>
    );
}
