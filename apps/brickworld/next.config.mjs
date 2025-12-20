/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // Transpile Three.js packages for proper ESM handling
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

    // Empty turbopack config to prevent warning
    turbopack: {},

    // Ignore TypeScript errors during build (for R3F type compatibility issues)
    typescript: {
        ignoreBuildErrors: true,
    },

    // Ignore ESLint errors during build
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;

