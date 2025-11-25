import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anthony Mora | R&D Software Engineer",
  description: "Senior R&D Engineer & Full Stack Developer. Specializing in high-performance web architectures and medical software systems.",
  openGraph: {
    title: "Anthony Mora | R&D Software Engineer",
    description: "Bridging the gap between Industrial R&D and Modern Web Engineering.",
    type: "website",
    locale: "en_US",
    url: "https://geekslab.tech",
  },
};

import { Navbar, SmoothScroll, NoiseOverlay, MagneticCursor, Preloader, LanguageProvider } from "@geekslab/ui";

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
