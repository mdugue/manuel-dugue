import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  typedRoutes: true,
  serverExternalPackages: ['@react-pdf/renderer'],
  experimental: {
    viewTransition: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path((?!.*\\.md$|_next|api).*)',
          has: [{ type: 'header', key: 'accept', value: '.*text/markdown.*' }],
          destination: '/:path.md',
        },
      ],
    }
  },
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'Vary', value: 'Accept' }] }]
  },
}

export default nextConfig
