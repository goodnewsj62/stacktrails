import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const backendURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8082";
const IsDEV = backendURL.startsWith("http://localhost");

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8082/:path*", // backend
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: IsDEV ? "http" : "https",
        hostname: new URL(backendURL).hostname, // ✅ only your backend
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
