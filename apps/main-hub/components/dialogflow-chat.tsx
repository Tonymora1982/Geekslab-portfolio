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
    chatTitle = "Chat Assistant",
    languageCode = "en",
    intent = "WELCOME",
}: DialogflowChatProps) {
    // Only render on client to prevent hydration mismatch
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Don't render anything on the server
    if (!isMounted) {
        return null;
    }

    // Create the df-messenger HTML string
    // Using dangerouslySetInnerHTML to avoid TypeScript JSX issues with web components
    const messengerHtml = `
    <df-messenger
      intent="${intent}"
      chat-title="${chatTitle}"
      agent-id="${agentId}"
      language-code="${languageCode}"
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
