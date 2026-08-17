import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    viewTransition: true,
  },
  async headers() {
    return [{ headers: [{ key: "Vary", value: "Accept" }], source: "/:path*" }];
  },
  reactCompiler: true,
  async redirects() {
    return [
      {
        destination: "/:lang/curriculum-vitae",
        permanent: true,
        source: "/:lang(en|de|fr|es)/cv",
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          destination: "https://cloud.umami.is/script.js",
          source: "/stats/script.js",
        },
        {
          destination: "https://cloud.umami.is/api/send",
          source: "/stats/api/send",
        },
        {
          destination: "/:path.md",
          has: [{ key: "accept", type: "header", value: ".*text/markdown.*" }],
          source: "/:path((?!.*\\.md$|_next|api).*)",
        },
      ],
    };
  },
  serverExternalPackages: ["@react-pdf/renderer"],
  typedRoutes: true,
};

export default nextConfig;
