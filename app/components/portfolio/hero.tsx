import type { Dictionary } from '@/i18n/dictionaries'

export function Hero({ hero }: { hero: Dictionary['portfolio']['hero'] }) {
  return (
    <section className="hero">
      <div className="hero-stamp" aria-hidden="true">
        .fyi
      </div>
      <div className="hero-eyebrow">{hero.eyebrow}</div>
      <h1>
        {hero.title.map((line, i) => (
          <span
            key={i}
            style={{ display: 'block' }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </h1>
      <div className="hero-meta">
        <p className="lede">{hero.lede}</p>
        <div className="facts">
          {hero.facts.map(([k, v], i) => (
            <div key={i}>
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
