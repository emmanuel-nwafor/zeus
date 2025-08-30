import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGO_URI: process.env.MONGO_URI, // Expose MONGO_URI to the build
  },
  // Optional: Skip linting during build (remove after fixing warnings)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;