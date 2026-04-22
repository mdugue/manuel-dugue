import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { readCachedSocialProof } from '@/lib/ai-cache'
import { SocialProofClient } from './social-proof-client'

export async function SocialProof({
  lang,
  proof,
}: {
  lang: Locale
  proof: Dictionary['portfolio']['proof']
}) {
  const cached = await readCachedSocialProof(lang)
  return (
    <SocialProofClient
      lang={lang}
      proof={proof}
      initialTestimonials={cached?.testimonials ?? null}
    />
  )
}
