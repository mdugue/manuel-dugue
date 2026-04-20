import Link from 'next/link'
import type { Route } from 'next'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { SectionHead } from './section-head'

type DocCard = Dictionary['portfolio']['docs']['cv']

export function Documents({
  lang,
  docs,
}: {
  lang: Locale
  docs: Dictionary['portfolio']['docs']
}) {
  const entries: Array<{ slug: 'curriculum-vitae' | 'skill-profile'; card: DocCard }> = [
    { slug: 'curriculum-vitae', card: docs.cv },
    { slug: 'skill-profile', card: docs.profile },
  ]

  return (
    <section id="docs" className="py-[clamp(60px,9vw,130px)]">
      <SectionHead label={docs.label} heading={docs.heading} sub={docs.sub} />
      <div className="grid grid-cols-2 gap-6 max-w-[900px] max-[720px]:grid-cols-1">
        {entries.map(({ slug, card }) => (
          <Link
            key={slug}
            href={`/${lang}/${slug}` as Route}
            prefetch
            className="bg-paper border border-rule px-7 pt-7 pb-6 cursor-pointer relative transition-[transform,border-color] duration-[250ms] text-left text-inherit flex flex-col gap-5 min-h-[220px] hover:-translate-y-0.5 hover:border-accent focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <div className="font-mono text-[10px] text-ink-faint tracking-[0.18em] uppercase">
              Document · {card.num}
            </div>
            <h3 className="font-display text-[28px] italic font-normal m-0 leading-[1.15]">
              {card.title}
            </h3>
            <div className="text-sm text-ink-soft leading-[1.55] max-w-[34ch] flex-1">
              {card.desc}
            </div>
            <div className="flex justify-between items-baseline font-mono text-[11px] uppercase tracking-[0.14em] text-accent border-t border-dashed border-rule pt-4">
              <span>{card.cta}</span>
              <span aria-hidden="true" className="text-sm">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
