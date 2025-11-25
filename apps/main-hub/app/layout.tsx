import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://geekslab.tech"),
  title: {
    default: "Anthony Mora | Senior Full Stack Developer",
    template: "%s | GeeksLab",
  },
  description: "Senior Full Stack Developer specializing in Next.js, TypeScript, and high-performance web architectures. Former R&D Engineer with MedTech background. Available for hire.",
  keywords: [
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Software Engineer",
    "Remote Developer",
    "Web Development",
    "Costa Rica",
    "MedTech",
    "R&D Engineer",
  ],
  authors: [{ name: "Anthony Mora", url: "https://geekslab.tech" }],
  creator: "Anthony Mora",
  publisher: "GeeksLab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: "https://geekslab.tech",
    siteName: "GeeksLab - Anthony Mora Portfolio",
    title: "Anthony Mora | Senior Full Stack Developer",
    description: "Building production-grade web applications with the discipline of regulated environments and the pace of product teams.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Anthony Mora - Full Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anthony Mora | Senior Full Stack Developer",
    description: "Building production-grade web applications. Next.js, TypeScript, Node.js. Available for hire.",
    images: ["/og"],
    creator: "@tonymora",
  },
  verification: {
    google: "OsSyFQoAXK_fLnqDEVSq1qjvaU5Kjb9xxp_BepxEptI",
  },
  category: "technology",
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
