import { streamText, Output } from 'ai'
import { getCache } from '@vercel/functions'
import { hasLocale, type Locale } from '@/i18n/config'
import { readMarkdown } from '@/app/components/markdown-source'
import { isAiModelId } from '@/i18n/ai-models'
import { socialProofSchema } from '@/i18n/social-proof-schema'
import { buildSocialProofPrompt } from '@/i18n/social-proof-prompt'
import { checkRateLimit, rateLimited } from '@/lib/rate-limit'

export const maxDuration = 60

const ONE_DAY_SECONDS = 60 * 60 * 24

export async function POST(req: Request) {
  const rate = await checkRateLimit('social-proof', req)
  if (!rate.ok) return rateLimited(rate.retryAfter)

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return new Response('bad json', { status: 400 })
  }

  const { lang, model } = payload as { lang?: unknown; model?: unknown }

  if (typeof lang !== 'string' || !hasLocale(lang)) {
    return new Response('bad lang', { status: 400 })
  }
  if (!isAiModelId(model)) {
    return new Response('unknown model', { status: 400 })
  }

  const locale: Locale = lang
  const cache = getCache({ namespace: 'social-proof' })
  const key = `${locale}:${model}`

  const cached = await cache.get(key)
  if (typeof cached === 'string' && cached.length > 0) {
    return new Response(cached, {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'x-cache': 'HIT',
      },
    })
  }

  const skills = await readMarkdown('skill-profile', locale)

  const result = streamText({
    model,
    system: buildSocialProofPrompt(locale),
    prompt: `<skill-profile>\n${skills}\n</skill-profile>`,
    output: Output.object({ schema: socialProofSchema }),
    temperature: 0.85,
    onFinish: async ({ text }) => {
      if (!text) return
      await cache.set(key, text, {
        ttl: ONE_DAY_SECONDS,
        tags: ['social-proof', `social-proof:${locale}`],
        name: `social-proof · ${locale} · ${model}`,
      })
    },
  })

  const response = result.toTextStreamResponse()
  response.headers.set('x-cache', 'MISS')
  return response
}
