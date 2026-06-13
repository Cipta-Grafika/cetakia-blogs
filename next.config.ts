import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  turbopack: {
    root: path.resolve(process.cwd()),
  },

  logging: {
    browserToTerminal: false,
  },

  images: {
    qualities: [68, 72, 75],
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
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "staging.cetakia.com",
        pathname: "/upload/img/**",
      },
    ],
  },
};

export default nextConfig;