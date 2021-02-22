const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
withBundleAnalyzer({});

module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  experimental: {
    optimizeFonts: true,
    reactMode: "concurrent",
  },
});
