import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // Performance optimizations for Vercel
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Turbopack config (empty to enable with customizations later if needed)
  turbopack: {},
};

export default nextConfig;
