import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    // Native Rust port of the React Compiler, run inside Turbopack instead of
    // through the Babel plugin. Requires `reactCompiler` below to be on.
    turbopackRustReactCompiler: true,
  },
  async headers() {
    return [{ headers: [{ key: "Vary", value: "Accept" }], source: "/:path*" }];
  },
  partialPrefetching: true,
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
  turbopack: {
    rules: {
      // Lets the documents be bundled by `import.meta.glob` instead of read
      // from disk at request time. Turbopack has no built-in handler for
      // `.md`; `bytes` is the type that resolves through a glob, and
      // markdown-source.ts decodes it back to text.
      "*.md": { type: "bytes" },
    },
  },
  typedRoutes: true,
};

export default nextConfig;
