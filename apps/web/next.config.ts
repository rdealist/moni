import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ["@moni/ui", "@moni/db"],
  // Fix monorepo root detection when running inside another workspace that also has lockfiles.
  // (e.g. /home/ubuntu/clawd/package-lock.json)
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
};

export default withNextIntl(nextConfig);
