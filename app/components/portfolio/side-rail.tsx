"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, localeLabels, locales } from "@/i18n/config";
import { swapLang } from "@/i18n/swap-lang";

const WORDMARK =
  "font-display text-[19px] leading-none tracking-[-0.005em] text-ink";

function Wordmark({ orientation }: { orientation: "vertical" | "horizontal" }) {
  if (orientation === "vertical") {
    return (
      <>
        <span>manuel</span>
        <span className="my-1.5 font-mono text-[11px] text-ink-faint">/</span>
        <span className="font-medium text-accent italic">fyi</span>
      </>
    );
  }
  return (
    <>
      <span>manuel</span>
      <span className="mx-1 font-mono text-[12px] text-ink-faint">/</span>
      <span className="font-medium text-accent italic">fyi</span>
    </>
  );
}

export function SideRail({ lang, spine }: { lang: Locale; spine: string }) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Site navigation"
      className="pointer-events-none fixed inset-y-0 left-0 z-30 flex w-[60px] flex-col items-center justify-between py-7 max-[900px]:hidden [&>*]:pointer-events-auto"
    >
      <Link
        aria-label="manuel.fyi — home"
        className={`${WORDMARK} inline-flex rotate-180 items-baseline py-1 [writing-mode:vertical-rl] [&:hover_.tld]:underline [&:hover_.tld]:underline-offset-[3px]`}
        href={`/${lang}` as Route}
      >
        <Wordmark orientation="vertical" />
      </Link>

      <div
        aria-hidden="true"
        className="rotate-180 select-none whitespace-nowrap font-mono text-[10px] text-ink-faint uppercase tracking-[0.42em] [writing-mode:vertical-rl]"
      >
        {spine}
      </div>

      <nav
        aria-label="Language"
        className="flex flex-col items-center gap-0.5 font-mono text-[10.5px] tracking-[0.1em]"
      >
        {locales.map((code) => (
          <Link
            aria-current={lang === code ? "true" : undefined}
            className="relative px-1.5 py-1 text-ink-faint transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 data-[active=true]:text-accent data-[active=true]:before:absolute data-[active=true]:before:top-1/2 data-[active=true]:before:-left-1 data-[active=true]:before:h-[3px] data-[active=true]:before:w-[3px] data-[active=true]:before:-translate-y-1/2 data-[active=true]:before:rounded-full data-[active=true]:before:bg-accent data-[active=true]:before:content-['']"
            data-active={lang === code}
            href={swapLang(pathname, code)}
            key={code}
            lang={code}
          >
            {localeLabels[code]}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export function MobileBar({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 hidden items-center justify-between border-rule-soft border-b bg-[color-mix(in_oklch,var(--bg)_88%,transparent)] px-(--pad-x) py-3.5 [-webkit-backdrop-filter:saturate(140%)_blur(10px)] [backdrop-filter:saturate(140%)_blur(10px)] max-[900px]:flex">
      <Link
        aria-label="manuel.fyi — home"
        className="font-display text-[20px] text-ink"
        href={`/${lang}` as Route}
      >
        <Wordmark orientation="horizontal" />
      </Link>
      <nav
        aria-label="Language"
        className="flex gap-0.5 font-mono text-[11px] tracking-[0.08em]"
      >
        {locales.map((code) => (
          <Link
            aria-current={lang === code ? "true" : undefined}
            className="px-1.5 py-1 text-ink-faint focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 data-[active=true]:text-accent"
            data-active={lang === code}
            href={swapLang(pathname, code)}
            key={code}
            lang={code}
          >
            {localeLabels[code]}
          </Link>
        ))}
      </nav>
    </header>
  );
}
