/**
 * Type declarations for Dialogflow Messenger Web Component
 * 
 * The df-messenger component is a custom Web Component provided by Google Dialogflow.
 * This declaration allows TypeScript to recognize it as a valid JSX element.
 */

declare namespace JSX {
    interface IntrinsicElements {
        /**
         * Dialogflow Messenger chat widget
         * @see https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger
         */
        'df-messenger': {
            /** The Dialogflow agent ID */
            'agent-id': string;
            /** Title displayed in the chat header */
            'chat-title'?: string;
            /** Language code for the chat (e.g., "en", "es") */
            'language-code'?: string;
            /** Intent to trigger on welcome */
            intent?: string;
            /** Additional HTML attributes */
            [key: string]: unknown;
        };
    }
}
