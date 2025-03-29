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
  // webpackDevMiddleware: (config: any) => {
  //   // Solve compiling problem via vagrant
  //   config.watchOptions = {
  //     poll: 1000, // Check for changes every second
  //     aggregateTimeout: 300, // delay before rebuilding
  //   };
  //   return config;
  // },
};

export default nextConfig;
