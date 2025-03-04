import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
      GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'storage.googleapis.com',
        },
      ],
    },
  };
export default nextConfig;
