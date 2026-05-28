import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    browserDebugInfoInTerminal: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "ciptagrafika.com",
      },
      {
        protocol: "https",
        hostname: "www.ciptagrafika.com",
      },
    ],
  },
};

export default nextConfig;
