import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { testimonials } from '@/i18n/ai-variants'
import { SectionHead } from './section-head'

export function SocialProof({
  lang,
  proof,
}: {
  lang: Locale
  proof: Dictionary['portfolio']['proof']
}) {
  const items = testimonials[lang]

  return (
    <section className="block" id="proof">
      <SectionHead label={proof.label} heading={proof.heading} sub={proof.sub} />
      <div className="proof-stack">
        {items.map((t, i) => (
          <blockquote className="proof-card" key={i}>
            <q>{t.q}</q>
            <div className="attribution">
              <strong>{t.name}</strong> · {t.role}
            </div>
          </blockquote>
        ))}
      </div>
      <div className="proof-banner">{proof.banner}</div>
    </section>
  )
}
