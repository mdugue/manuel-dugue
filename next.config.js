const withPreact = require("next-plugin-preact");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
withBundleAnalyzer({});

module.exports = withPreact(
  withBundleAnalyzer({
    poweredByHeader: false,
    experimental: {
      optimizeFonts: true,
    },
  })
);
