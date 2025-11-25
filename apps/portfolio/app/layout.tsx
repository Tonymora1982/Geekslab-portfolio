import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, SmoothScroll, NoiseOverlay, MagneticCursor, Preloader, LanguageProvider } from "@geekslab/ui";

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
                <SmoothScroll>
                    <NoiseOverlay />
                    <MagneticCursor />
                    <LanguageProvider>
                        <Navbar />
                        {children}
                    </LanguageProvider>
                </SmoothScroll>
            </body>
        </html>
    );
}
