import type { NextConfig } from "next";
import { withPlausibleProxy } from "next-plausible";

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

export default withPlausibleProxy({
  customDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_CUSTOM_DOMAIN,
})(config);
