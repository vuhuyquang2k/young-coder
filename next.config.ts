import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ghtk.vn' },
      { protocol: 'https', hostname: 'gam.vn' },
      { protocol: 'https', hostname: 'ksbgroup.vn' },
    ],
  },
};

export default nextConfig;
