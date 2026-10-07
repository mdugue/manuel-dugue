import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { nextQuarter } from "@/lib/next-quarter";

import { LocalTime } from "./local-time";

const MONTHS_PER_QUARTER = 3;
const BOOKING_URL = "https://www.cal.eu/manuel-dugue";
const EMAIL = "mail@manuel.fyi";

/** First month of the next bookable quarter, named in the page's language. */
function renderAvailability(template: string, lang: Locale): string {
  const { quarter, year } = nextQuarter();
  const firstMonth = new Date(
    Date.UTC(year, (quarter - 1) * MONTHS_PER_QUARTER, 1)
  );
  const month = new Intl.DateTimeFormat(lang, {
    month: "long",
    timeZone: "UTC",
  }).format(firstMonth);
  return template.replace("{month}", month).replace("{year}", String(year));
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
  const openForValue = renderAvailability(facts.openFor.template, lang);

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

      <div className="mt-[clamp(48px,7vw,96px)] grid max-w-205 grid-cols-2 items-start gap-x-14 max-md:grid-cols-1 max-md:gap-y-12">
        <div>
          <p className="font-display text-ink-soft m-0 max-w-[36ch] text-[clamp(19px,1.6vw,22px)] leading-normal text-pretty italic">
            {hero.lede}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              className="group border-ink/20 text-ink hover:border-accent hover:text-accent focus-visible:outline-accent inline-flex min-h-11 items-center gap-2.5 border px-4.5 font-mono text-xs tracking-[0.12em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-3"
              href={BOOKING_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              {hero.cta.book}
              <span
                aria-hidden="true"
                className="text-accent motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <a
              className="border-rule text-ink-soft hover:border-accent hover:text-accent focus-visible:outline-accent border-b pb-1 font-mono text-xs tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              href={`mailto:${EMAIL}`}
            >
              {EMAIL}
            </a>
          </div>
        </div>
        <div className="text-ink-soft font-mono text-xs leading-[1.9] tracking-wider">
          <div className={ROW}>
            <span className={LABEL}>{facts.base.label}</span>
            <span>{facts.base.value}</span>
          </div>
          <div className={ROW}>
            <span className={LABEL}>{facts.openFor.label}</span>
            <a
              className="hover:text-ink focus-visible:outline-accent inline-flex items-center gap-2 underline-offset-[3px] transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
              href="#contact"
            >
              <span
                aria-hidden="true"
                className="bg-signal size-[7px] shrink-0 rounded-full"
              />
              {openForValue}
            </a>
          </div>
          <div className={ROW}>
            <span className={LABEL}>{facts.localTime.label}</span>
            <LocalTime lang={lang} template={facts.localTime.template} />
          </div>
        </div>
      </div>
    </section>
  );
}
