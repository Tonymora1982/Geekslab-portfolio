import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { LanguageProvider, MotionProvider, Navbar, NoiseOverlay, Preloader, ScrollToTop, SmoothScroll } from "@geekslab/ui";
import { DialogflowChat } from "@/components/dialogflow-chat";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://geekslab.tech"),
  title: {
    default: "Anthony Mora | Full Stack Developer",
    template: "%s | GeeksLab",
  },
  description: "Full Stack Developer specializing in Next.js, TypeScript, and high-performance web architectures. 7+ years in MedTech (Establishment Labs). Available for hire.",
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
    title: "Anthony Mora | Full Stack Developer",
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
    title: "Anthony Mora | Full Stack Developer",
    description: "Building production-grade web applications. Next.js, TypeScript, Node.js. Available for hire.",
    images: ["/og"],
    creator: "@tonymora",
  },
  verification: {
    google: "OsSyFQoAXK_fLnqDEVSq1qjvaU5Kjb9xxp_BepxEptI",
  },
  category: "technology",
};

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
  jobTitle: "Full Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "GeeksLab",
  },
  description: "Full Stack Developer specializing in Next.js, TypeScript, and high-performance web architectures. 7+ years in MedTech at Establishment Labs.",
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
      <body className={`${inter.className} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
        <Preloader mode="never" />
        <MotionProvider>
          <SmoothScroll>
            <NoiseOverlay />
            <LanguageProvider>
              <Navbar />
              {children}
              <ScrollToTop />
            </LanguageProvider>
          </SmoothScroll>
        </MotionProvider>

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
