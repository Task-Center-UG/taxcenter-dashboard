import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://dev.api.taxcenterug.com/api/:path*",
      },
    ];
  },
  images: {
    domains: ["dev.api.taxcenterug.com", "images.unsplash.com"],
  },
};

export default nextConfig;
