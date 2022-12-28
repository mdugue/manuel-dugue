const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
withBundleAnalyzer({})

withBundleAnalyzer({
  poweredByHeader: false,
})
