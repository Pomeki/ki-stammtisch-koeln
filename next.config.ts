import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for next-auth v5 beta
  experimental: {
    // serverComponentsExternalPackages: ['mongoose'],
  },
  // Disable strict mode for development (helps with double rendering)
  reactStrictMode: true,
  // Allow external images if needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
