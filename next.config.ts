import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "via.placeholder.com", // Allow placeholder images
      "images.unsplash.com", // Allow Unsplash images
    ],
    formats: ["image/avif", "image/webp"], // Enable modern image formats for optimization
  },
  env: {
    UNSPLASH_ACCESS_KEY: "J1fVSClatIlHRo-UUQUm6CCWrF9Rd16sNnwW4yL6tiA", // Access key for Unsplash API
  },
};

export default nextConfig;
