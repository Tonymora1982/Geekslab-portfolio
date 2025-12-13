import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { DialogflowChat } from "@/components/dialogflow-chat";
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

import { Navbar, SmoothScroll, NoiseOverlay, MagneticCursor, Preloader, LanguageProvider, ScrollToTop } from "@geekslab/ui";

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anthony Mora",
  alternateName: "Tony Mora",
  url: "https://geekslab.tech",
  image: "https://geekslab.tech/og",
  sameAs: [
    "https://github.com/Tonymora1982",
    "https://www.linkedin.com/in/anthony-mora-parra-94941282/",
  ],
  jobTitle: "Senior Full Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "GeeksLab",
  },
  description: "Senior Full Stack Developer specializing in Next.js, TypeScript, and high-performance web architectures. Former R&D Engineer with MedTech background.",
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "ISO 13485",
    "Quality Management Systems",
    "Medical Device Development",
  ],
  alumniOf: {
    "@type": "Organization",
    name: "Establishment Labs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Preloader />
        <SmoothScroll>
          {/* NoiseOverlay removed - was causing severe visual issues */}
          <MagneticCursor />
          <LanguageProvider>
            <Navbar />
            {children}
            <ScrollToTop />
          </LanguageProvider>
        </SmoothScroll>

        {/* Dialogflow Messenger Chatbot Integration */}
        <DialogflowChat
          agentId="c5c3e09c-f873-4644-8b57-95749196aded"
          chatTitle="GeeksLab Assistant"
          languageCode="en"
        />
      </body>
    </html>
  );
}
