import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexastore.geekslab.tech"),
  title: "NEXASTORE | Luxury Tech Collection",
  description:
    "Discover the finest selection of premium technology. Where innovation meets elegance.",
  keywords: ["luxury", "tech", "premium", "electronics", "exclusive"],
  authors: [{ name: "GeeksLab", url: "https://geekslab.tech" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexastore.geekslab.tech",
    siteName: "NEXASTORE",
    title: "NEXASTORE | Luxury Tech Collection",
    description:
      "Discover the finest selection of premium technology. Where innovation meets elegance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NEXASTORE - Luxury Tech Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXASTORE | Luxury Tech Collection",
    description:
      "Discover the finest selection of premium technology. Where innovation meets elegance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen bg-white text-black">
        {children}
      </body>
    </html>
  );
}
