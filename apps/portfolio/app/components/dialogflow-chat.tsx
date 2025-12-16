"use client";

/**
 * DialogflowChat Component
 *
 * Client-side wrapper for the Dialogflow Messenger web component.
 * This prevents hydration errors by only mounting the df-messenger
 * element after the component mounts on the client.
 *
 * Uses dangerouslySetInnerHTML to inject the web component as raw HTML,
 * avoiding TypeScript JSX intrinsic element issues.
 */

import Script from "next/script";
import { useEffect, useState } from "react";
import { useLanguage } from "@geekslab/ui";

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

export function DialogflowChat({
    agentId,
    chatTitle = "GeeksLab AI",
    languageCode = "en",
    intent = "WELCOME",
}: DialogflowChatProps) {
    // Only render on client to prevent hydration mismatch
    const [isMounted, setIsMounted] = useState(false);
    const { language } = useLanguage();

    // Use context language if available, otherwise fallback to prop
    const currentLanguage = language || languageCode;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Don't render anything on the server
    if (!isMounted) {
        return null;
    }

    // Create the df-messenger HTML string
    // Using dangerouslySetInnerHTML to avoid TypeScript JSX issues with web components
    // Added chat-icon and inline styles to ensure customization applies
    const messengerHtml = `
    <df-messenger
      intent="${intent}"
      chat-title="${chatTitle}"
      agent-id="${agentId}"
      language-code="${currentLanguage}"
      chat-icon="/assets/graphics/Robot.png"
      style="
        --df-messenger-bot-message: #1a1a1a;
        --df-messenger-button-titlebar-color: #ffffff;
        --df-messenger-button-titlebar-font-color: #000000;
        --df-messenger-chat-background-color: #0a0a0a;
        --df-messenger-font-color: #e5e5e5;
        --df-messenger-send-icon: #ffffff;
        --df-messenger-user-message: #262626;
        --df-messenger-input-box-color: #171717;
        --df-messenger-input-font-color: #ffffff;
        --df-messenger-input-placeholder-font-color: #737373;
        --df-messenger-minimized-chat-close-icon-color: #000000;
        --df-messenger-titlebar-font-color: #000000;
        --df-messenger-titlebar-icon-color: #000000;
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
