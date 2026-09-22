import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        pathname: "/**",
      },
    ],
    formats: ["image/webp"],
    qualities: [70],
    minimumCacheTTL: 3600,
  },
  // We issue an explicit 301 for every trailing-slash variant ourselves
  // (see scripts/redirect-map.mjs) — without this, Next's own trailing-slash
  // handling fires first and returns a 308 before our rule ever runs.
  skipTrailingSlashRedirect: true,
  async redirects() {
    // Loaded dynamically so next.config.ts doesn't need type declarations
    // for the plain-JS helper module.
    const { buildRedirectRules } = await import("./scripts/redirect-map.mjs");
    return buildRedirectRules().map((rule: { source: string; destination: string }) => ({
      ...rule,
      // The brief calls for a permanent 301. Next's `permanent: true` maps
      // to a 308, not a 301 — `statusCode` is the escape hatch that gets
      // the exact status code search engines were told to expect.
      statusCode: 301,
    }));
  },
};

export default nextConfig;
