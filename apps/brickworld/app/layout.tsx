import type { Metadata } from "next";
import "./globals.css";

/**
 * BrickWorld - A 3D block building game
 * Root layout with metadata and global styles
 */
export const metadata: Metadata = {
    title: "BrickWorld | Build Your Dreams",
    description: "A browser-based 3D block building game. Create structures, vehicles, and share your creations with the world.",
    keywords: ["3D game", "block building", "creative", "web game", "three.js"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
