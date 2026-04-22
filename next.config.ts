import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  typedRoutes: true,
  serverExternalPackages: ["@react-pdf/renderer"],
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: "/:lang(en|de|fr|es)/cv",
        destination: "/:lang/curriculum-vitae",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/stats/script.js",
          destination: "https://cloud.umami.is/script.js",
        },
        {
          source: "/stats/api/send",
          destination: "https://cloud.umami.is/api/send",
        },
        {
          source: "/:path((?!.*\\.md$|_next|api).*)",
          has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
          destination: "/:path.md",
        },
      ],
    };
  },
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "Vary", value: "Accept" }] }];
  },
};

export default nextConfig;
