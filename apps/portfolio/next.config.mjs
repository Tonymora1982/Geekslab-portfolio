/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    reactStrictMode: true,
    transpilePackages: ["@geekslab/ui"],
};

export default nextConfig;
