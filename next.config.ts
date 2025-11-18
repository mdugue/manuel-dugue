import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
        reactStrictMode: true,
        reactCompiler: true,
        cacheComponents: true,
        cacheLife: {
                default: {
                        stale: 300,
                        revalidate: 900,
                },
                seconds: {
                        stale: 30,
                        revalidate: 1,
                        expire: 60,
                },
                minutes: {
                        stale: 300,
                        revalidate: 60,
                        expire: 3_600,
                },
                hours: {
                        stale: 300,
                        revalidate: 3_600,
                        expire: 86_400,
                },
                days: {
                        stale: 300,
                        revalidate: 86_400,
                        expire: 604_800,
                },
                weeks: {
                        stale: 300,
                        revalidate: 604_800,
                        expire: 2_592_000,
                },
                max: {
                        stale: 300,
                        revalidate: 2_592_000,
                },
        },
};

module.exports = nextConfig;
