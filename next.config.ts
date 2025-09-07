import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://dev.api.taxcenterug.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
