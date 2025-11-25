import type { Metadata } from "next";
import "./globals.css";
import { Navbar, LanguageProvider } from "@geekslab/ui";

export const metadata: Metadata = {
    title: "CV | Geekslab Ecosystem",
    description: "Professional Curriculum Vitae.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-black text-white">
                <LanguageProvider>
                    <Navbar />
                    {children}
                </LanguageProvider>
            </body>
        </html>
    );
}
