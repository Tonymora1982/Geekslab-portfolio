import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // output: 'export', // ❌ Removed - Vercel handles SSR natively
  // trailingSlash: true, // ❌ Not needed with Vercel
  images: {
    // unoptimized: true, // ❌ Vercel optimizes images automatically
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  transpilePackages: ["@geekslab/ui"],
};

export default nextConfig;
