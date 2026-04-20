import type { Dictionary } from '@/i18n/dictionaries'

export function Hero({ hero }: { hero: Dictionary['portfolio']['hero'] }) {
  return (
    <section className="relative py-[clamp(80px,14vw,180px)] [&>*:not(.hero-stamp)]:relative [&>*:not(.hero-stamp)]:z-[1]">
      <div
        aria-hidden="true"
        className="hero-stamp absolute top-[clamp(20px,4vw,60px)] right-0 font-display italic font-normal text-[clamp(140px,24vw,340px)] leading-[0.8] text-transparent [-webkit-text-stroke:1px_color-mix(in_oklch,var(--accent)_30%,transparent)] tracking-[-0.05em] pointer-events-none select-none z-0 opacity-75 whitespace-nowrap"
      >
        .fyi
      </div>

      <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink-faint mb-10 flex items-center gap-3 before:content-[''] before:w-7 before:h-px before:bg-accent">
        {hero.eyebrow}
      </div>

      <h1 className="font-display font-normal text-[clamp(48px,8.5vw,120px)] leading-[0.96] tracking-[-0.02em] m-0 text-balance [&_em]:italic [&_em]:text-accent">
        {hero.title.map((line, i) => (
          <span
            key={i}
            style={{ display: 'block' }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </h1>

      <div className="mt-12 grid grid-cols-2 gap-10 max-w-[820px] items-start max-[720px]:grid-cols-1 max-[720px]:gap-6">
        <p className="font-display text-[clamp(19px,1.6vw,22px)] leading-[1.5] text-ink-soft italic max-w-[36ch] m-0">
          {hero.lede}
        </p>
        <div className="font-mono text-[12px] text-ink-soft tracking-[0.04em] leading-[1.9]">
          {hero.facts.map(([k, v], i) => (
            <div
              key={i}
              className="flex gap-4 border-t border-rule-soft py-2 last:border-b last:border-rule-soft"
            >
              <span className="text-ink-faint min-w-[88px]">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
