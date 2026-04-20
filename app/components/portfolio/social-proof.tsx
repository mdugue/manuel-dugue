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
    <section id="proof" className="py-[clamp(60px,9vw,130px)]">
      <SectionHead label={proof.label} heading={proof.heading} sub={proof.sub} />
      <div className="flex flex-col gap-8 max-w-[760px]">
        {items.map((t, i) => (
          <blockquote key={i} className="border-t border-rule pt-6 m-0">
            <p className="font-display text-[clamp(20px,2vw,26px)] leading-[1.5] italic text-ink m-0 before:content-['\201c'] after:content-['\201d']">
              {t.q}
            </p>
            <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              <strong className="text-ink-soft font-medium">{t.name}</strong> ·{' '}
              {t.role}
            </div>
          </blockquote>
        ))}
      </div>
      <div className="mt-10 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-faint max-w-[680px] leading-[1.7] py-4 border-t border-b border-dashed border-rule">
        {proof.banner}
      </div>
    </section>
  )
}
