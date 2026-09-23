import type { Route } from "next";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { guessRoute } from "@/lib/guess-route";
import type { RouteGuess } from "@/lib/guess-route";

import { SiteFooter } from "../portfolio/footer";
import { SectionHead } from "../portfolio/section-head";
import { MobileBar, SideRail } from "../portfolio/side-rail";

type Portfolio = Dictionary["portfolio"];

interface Destination {
  href: Route;
  label: string;
}

const ROW =
  "flex gap-4 border-rule-soft border-t py-2 last:border-rule-soft last:border-b";
const LABEL = "min-w-22 text-ink-faint";
const FACT_LINK =
  "hover:text-ink focus-visible:outline-accent underline-offset-[3px] transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2";

const DETOUR =
  "group border-rule-soft hover:border-accent focus-visible:border-accent focus-visible:outline-accent grid grid-cols-[96px_1fr] items-start gap-x-8 gap-y-3 border-t py-7 transition-colors last:border-b focus-visible:outline-2 focus-visible:outline-offset-2 max-md:grid-cols-1";

/** Enough for any honest mistake; longer paths are cut rather than allowed to
 *  stretch the fact column. */
const MAX_SHOWN_PATH = 80;

/** The ": {path}" tail of the report subject, dropped when the path is unknown. */
const PATH_TAIL = /\s*:\s*\{path\}/u;

function decodePath(path: string): string {
  try {
    return decodeURI(path);
  } catch {
    return path;
  }
}

function shownPath(path: string): string {
  const decoded = decodePath(path);
  return decoded.length > MAX_SHOWN_PATH
    ? `${decoded.slice(0, MAX_SHOWN_PATH - 1)}…`
    : decoded;
}

function destinations(
  lang: Locale,
  dict: Portfolio
): Record<RouteGuess, Destination> {
  const home = `/${lang}`;
  return {
    contact: { href: `${home}#contact` as Route, label: dict.notFound.contact },
    "curriculum-vitae": {
      href: `${home}/curriculum-vitae` as Route,
      label: dict.docs.cv.title,
    },
    home: { href: home as Route, label: dict.notFound.detours.home.title },
    lab: { href: `${home}#lab` as Route, label: dict.lab.label },
    legal: {
      href: `${home}/legal` as Route,
      label: dict.legal.imprint.sheetTitle,
    },
    privacy: {
      href: `${home}/privacy` as Route,
      label: dict.legal.privacy.sheetTitle,
    },
    "skill-profile": {
      href: `${home}/skill-profile` as Route,
      label: dict.docs.profile.title,
    },
  };
}

function reportHref(subject: string, path: string | null): string {
  const filled = path
    ? subject.replace("{path}", decodePath(path))
    : subject.replace(PATH_TAIL, "");
  return `mailto:mail@manuel.fyi?subject=${encodeURIComponent(filled)}`;
}

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="text-accent text-lg not-italic transition-transform duration-[250ms] group-hover:translate-x-0.5"
    >
      →
    </span>
  );
}

function DetourBody({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <>
      <span className="text-ink-faint text-nano mt-2 font-mono tracking-[0.18em] uppercase max-md:mt-0">
        {num}
      </span>
      <span className="flex flex-col gap-2">
        <span className="font-display group-hover:text-accent flex items-baseline gap-2 text-[26px] leading-[1.15] font-normal italic transition-colors">
          {title}
          <Arrow />
        </span>
        <span className="text-ink-soft max-w-[58ch] text-sm leading-[1.55]">
          {desc}
        </span>
      </span>
    </>
  );
}

/**
 * The 404, built from the home page's own parts: a hero that quotes the real
 * one and rows in the lab's shape. `path` is the requested address when the
 * proxy passed it on, and drives the guess at what was meant.
 */
export function NotFoundPage({
  lang,
  dict,
  path,
}: {
  lang: Locale;
  dict: Portfolio;
  path: string | null;
}) {
  const nf = dict.notFound;
  const places = destinations(lang, dict);
  const guess = path ? guessRoute(path) : null;
  const wayBack = guess ? places[guess] : places.home;

  return (
    <div lang={lang}>
      {/* Every link here leaves this root layout, so nothing is prefetched; and
          the language links lead to the other home pages, because the same dead
          end in another language helps nobody. */}
      <SideRail
        labels={dict.nav}
        lang={lang}
        pathname={`/${lang}`}
        prefetch={false}
        spine={dict.spine}
      />
      <MobileBar
        labels={dict.nav}
        lang={lang}
        pathname={`/${lang}`}
        prefetch={false}
      />
      <main className="relative mx-auto max-w-345 px-(--pad-x) pl-[calc(var(--pad-x)+60px)] max-lg:pl-(--pad-x)">
        <section className="relative py-[clamp(80px,14vw,180px)] [&>*:not(.hero-stamp)]:relative [&>*:not(.hero-stamp)]:z-[1]">
          <div
            aria-hidden="true"
            className="hero-stamp font-display pointer-events-none absolute top-[clamp(20px,4vw,60px)] right-0 z-0 text-[clamp(140px,24vw,340px)] leading-[0.8] font-normal tracking-tighter whitespace-nowrap text-transparent italic opacity-75 select-none [-webkit-text-stroke:1px_color-mix(in_oklch,var(--accent)_30%,transparent)]"
          >
            404
          </div>

          <div className="text-ink-faint before:bg-accent mb-10 flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase before:h-px before:w-7 before:content-['']">
            {nf.eyebrow}
          </div>

          <h1 className="font-display [&_em]:text-accent m-0 text-[clamp(48px,8.5vw,120px)] leading-[0.96] font-normal tracking-tight text-balance [&_em]:italic">
            {nf.title.map((line) => (
              <span
                dangerouslySetInnerHTML={{ __html: line }}
                key={line}
                style={{ display: "block" }}
              />
            ))}
          </h1>

          <div className="mt-12 grid max-w-205 grid-cols-2 items-start gap-10 max-md:grid-cols-1 max-md:gap-6">
            <p className="font-display text-ink-soft m-0 max-w-[36ch] text-[clamp(19px,1.6vw,22px)] leading-normal italic">
              {nf.lede}
            </p>
            <dl className="text-ink-soft m-0 font-mono text-xs leading-[1.9] tracking-wider">
              {path ? (
                <div className={ROW}>
                  <dt className={LABEL}>{nf.facts.requested}</dt>
                  <dd className="m-0 min-w-0 break-all">{shownPath(path)}</dd>
                </div>
              ) : null}
              <div className={ROW}>
                <dt className={LABEL}>{nf.facts.status.label}</dt>
                <dd className="m-0">{nf.facts.status.value}</dd>
              </div>
              <div className={ROW}>
                <dt className={LABEL}>{nf.facts.rideable.label}</dt>
                <dd className="m-0">{nf.facts.rideable.value}</dd>
              </div>
              <div className={ROW}>
                <dt className={LABEL}>
                  {guess ? nf.facts.guess : nf.facts.wayBack}
                </dt>
                <dd className="m-0">
                  <Link
                    className={FACT_LINK}
                    href={wayBack.href}
                    prefetch={false}
                  >
                    {wayBack.label} <span aria-hidden="true">→</span>
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="py-[clamp(60px,9vw,130px)]">
          <SectionHead
            heading={nf.detours.heading}
            label={nf.detours.label}
            sub={nf.detours.sub}
          />
          <nav aria-label={nf.detours.heading} className="max-w-225">
            <Link className={DETOUR} href={places.home.href} prefetch={false}>
              <DetourBody
                desc={nf.detours.home.desc}
                num="01"
                title={nf.detours.home.title}
              />
            </Link>
            <Link
              className={DETOUR}
              href={places["curriculum-vitae"].href}
              prefetch={false}
            >
              <DetourBody
                desc={dict.docs.cv.desc}
                num="02"
                title={dict.docs.cv.title}
              />
            </Link>
            <Link
              className={DETOUR}
              href={places["skill-profile"].href}
              prefetch={false}
            >
              <DetourBody
                desc={dict.docs.profile.desc}
                num="03"
                title={dict.docs.profile.title}
              />
            </Link>
            <a
              className={DETOUR}
              href={reportHref(nf.detours.report.subject, path)}
            >
              <DetourBody
                desc={nf.detours.report.desc}
                num="04"
                title={nf.detours.report.title}
              />
            </a>
          </nav>
        </section>
      </main>
      <SiteFooter footer={dict.footer} lang={lang} prefetch={false} />
    </div>
  );
}
