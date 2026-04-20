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
    <section className="block" id="docs">
      <SectionHead label={docs.label} heading={docs.heading} sub={docs.sub} />
      <div className="doc-list">
        {entries.map(({ slug, card }) => (
          <Link
            key={slug}
            href={`/${lang}/${slug}` as Route}
            className="doc-card"
            prefetch
          >
            <div className="num">Document · {card.num}</div>
            <h3>{card.title}</h3>
            <div className="desc">{card.desc}</div>
            <div className="action">
              <span>{card.cta}</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
