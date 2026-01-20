import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@moni/ui", "@moni/db"],
};

export default nextConfig;
