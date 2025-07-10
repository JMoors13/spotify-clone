import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fffxsgoenbbfmaymfbxb.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
