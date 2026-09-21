import type { Route } from "next";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { nextQuarter } from "@/lib/next-quarter";

import { HeroLangPills } from "./hero-lang-pills";

const SITE_LABEL = "manuel.fyi";

function renderQuarter(template: string): string {
  const { quarter, year } = nextQuarter();
  return template
    .replace("{quarter}", String(quarter))
    .replace("{year}", String(year));
}

const ROW =
  "flex gap-4 border-rule-soft border-t py-2 last:border-rule-soft last:border-b";
const LABEL = "min-w-22 text-ink-faint";

export function Hero({
  hero,
  lang,
}: {
  hero: Dictionary["portfolio"]["hero"];
  lang: Locale;
}) {
  const { facts } = hero;
  const openForValue = renderQuarter(facts.openFor.template);

  return (
    <section className="relative py-[clamp(80px,14vw,180px)] [&>*:not(.hero-stamp)]:relative [&>*:not(.hero-stamp)]:z-[1]">
      <div
        aria-hidden="true"
        className="hero-stamp font-display pointer-events-none absolute top-[clamp(20px,4vw,60px)] right-0 z-0 text-[clamp(140px,24vw,340px)] leading-[0.8] font-normal tracking-tighter whitespace-nowrap text-transparent italic opacity-75 select-none [-webkit-text-stroke:1px_color-mix(in_oklch,var(--accent)_30%,transparent)]"
      >
        .fyi
      </div>

      <div className="text-ink-faint before:bg-accent mb-10 flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase before:h-px before:w-7 before:content-['']">
        {hero.eyebrow}
      </div>

      <h1 className="font-display [&_em]:text-accent m-0 text-[clamp(48px,8.5vw,120px)] leading-[0.96] font-normal tracking-tight text-balance [&_em]:italic">
        {hero.title.map((line) => (
          <span
            dangerouslySetInnerHTML={{ __html: line }}
            key={line}
            style={{ display: "block" }}
          />
        ))}
      </h1>

      <div className="mt-12 grid max-w-205 grid-cols-2 items-start gap-10 max-md:grid-cols-1 max-md:gap-6">
        <p className="font-display text-ink-soft m-0 max-w-[36ch] text-[clamp(19px,1.6vw,22px)] leading-normal italic">
          {hero.lede}
        </p>
        <div className="text-ink-soft font-mono text-xs leading-[1.9] tracking-wider">
          <div className={ROW}>
            <span className={LABEL}>{facts.base.label}</span>
            <span>{facts.base.value}</span>
          </div>
          <div className={ROW}>
            <span className={LABEL}>{facts.openFor.label}</span>
            <span>{openForValue}</span>
          </div>
          <div className={ROW}>
            <span className={LABEL}>{facts.languages.label}</span>
            <HeroLangPills lang={lang} />
          </div>
          <div className={ROW}>
            <span className={LABEL}>{facts.site.label}</span>
            <Link
              className="hover:text-ink focus-visible:outline-accent underline-offset-[3px] transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
              href={`/${lang}` as Route}
            >
              {SITE_LABEL}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
