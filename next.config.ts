import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  api: {
    bodyParser: true,
  },
  env: {
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  images: {
    domains: ["kartik-gothwal.vercel.app"],
  },
};

export default nextConfig;
