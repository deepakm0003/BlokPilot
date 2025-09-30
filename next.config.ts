import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      // Silence incorrect workspace root selection by specifying the root explicitly
      root: __dirname,
    },
  },
};

export default nextConfig;
