import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "books.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "books.google.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
