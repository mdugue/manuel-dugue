import 'server-only'
import { getCache } from '@vercel/functions'

const WINDOW_SECONDS = 60
const MAX_REQUESTS = 10

export function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0]?.trim() ?? 'unknown'
  return req.headers.get('x-real-ip') ?? 'unknown'
}

type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfter: number }

export async function checkRateLimit(
  namespace: string,
  req: Request,
): Promise<RateLimitResult> {
  const ip = clientIp(req)
  const bucket = Math.floor(Date.now() / 1000 / WINDOW_SECONDS)
  try {
    const cache = getCache({ namespace: `ratelimit-${namespace}` })
    const key = `${ip}:${bucket}`
    const current = await cache.get(key)
    const count = typeof current === 'number' ? current : 0
    if (count >= MAX_REQUESTS) {
      const nowSec = Math.floor(Date.now() / 1000)
      return {
        ok: false,
        retryAfter: (bucket + 1) * WINDOW_SECONDS - nowSec,
      }
    }
    await cache.set(key, count + 1, { ttl: WINDOW_SECONDS + 5 })
    return { ok: true }
  } catch {
    return { ok: true }
  }
}

export function rateLimited(retryAfter: number): Response {
  return new Response('rate limited', {
    status: 429,
    headers: { 'retry-after': String(Math.max(1, retryAfter)) },
  })
}
