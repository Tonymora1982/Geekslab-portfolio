import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider, MagneticCursor, MotionProvider, Navbar, NoiseOverlay, Preloader, SmoothScroll } from "@geekslab/ui";
import { DialogflowChat } from "./components/dialogflow-chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Portfolio | Geekslab Ecosystem",
    description: "Showcase of projects and case studies.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <body className={inter.className}>
                <Preloader />
                <MotionProvider>
                    <SmoothScroll>
                        <NoiseOverlay />
                        <MagneticCursor />
                        <LanguageProvider>
                            <Navbar />
                            {children}
                            <DialogflowChat
                                agentId="c5c3e09c-f873-4644-8b57-95749196aded"
                                chatTitle="GeeksLab Assistant"
                            />
                        </LanguageProvider>
                    </SmoothScroll>
                </MotionProvider>
            </body>
        </html>
    );
}
