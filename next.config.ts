import { webpack } from "next/dist/compiled/webpack/webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"], // Enable modern image formats for optimization
  },
  env: {
    UNSPLASH_ACCESS_KEY: "J1fVSClatIlHRo-UUQUm6CCWrF9Rd16sNnwW4yL6tiA", // Access key for Unsplash API
  },
};

module.exports = nextConfig;
