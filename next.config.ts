import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  experimental: {
    optimizePackageImports: ["date-fns", "github-slugger"],
    viewTransition: true,
  },
  async headers() {
    return [
      {
        source: "/feed.xml",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
      },
    ];
  },
};

export default config;
