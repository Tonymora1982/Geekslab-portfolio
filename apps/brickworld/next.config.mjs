/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // Transpile Three.js packages for proper ESM handling
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

    // Empty turbopack config to prevent warning
    turbopack: {},
};

export default nextConfig;
