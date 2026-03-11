import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'down-br.img.susercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.susercontent.com',
      },
    ],
  },
};

export default nextConfig;
