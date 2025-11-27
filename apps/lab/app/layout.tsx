import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lab.geekslab.tech"),
  title: {
    default: "GeeksLab R&D | Code Factory",
    template: "%s | GeeksLab R&D",
  },
  description:
    "Experimental R&D Laboratory - Interactive 3D visualizations, Code Factory, and cutting-edge web experiments.",
  keywords: [
    "R&D Lab",
    "Code Factory",
    "Three.js",
    "WebGL",
    "3D Visualization",
    "Git History",
    "Manufacturing Metrics",
    "Developer Tools",
  ],
  authors: [{ name: "Tony Mora", url: "https://geekslab.tech" }],
  creator: "Tony Mora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lab.geekslab.tech",
    siteName: "GeeksLab R&D",
    title: "GeeksLab R&D | Code Factory",
    description:
      "Experimental R&D Laboratory - Interactive 3D visualizations and cutting-edge web experiments.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeeksLab R&D Laboratory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeeksLab R&D | Code Factory",
    description:
      "Experimental R&D Laboratory - Interactive 3D visualizations and cutting-edge web experiments.",
    images: ["/og-image.png"],
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
