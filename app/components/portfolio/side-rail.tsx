"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { localeLabels, locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { swapLang } from "@/i18n/swap-lang";

const WORDMARK =
  "font-display text-[19px] leading-none tracking-normal text-ink";

function Wordmark({ orientation }: { orientation: "vertical" | "horizontal" }) {
  if (orientation === "vertical") {
    return (
      <>
        <span>manuel</span>
        <span className="text-ink-faint text-micro my-1.5 font-mono">/</span>
        <span className="text-accent font-medium italic">fyi</span>
      </>
    );
  }
  return (
    <>
      <span>manuel</span>
      <span className="text-ink-faint mx-1 font-mono text-xs">/</span>
      <span className="text-accent font-medium italic">fyi</span>
    </>
  );
}

export function SideRail({ lang, spine }: { lang: Locale; spine: string }) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Site navigation"
      className="pointer-events-none fixed inset-y-0 left-0 z-30 flex w-15 flex-col items-center justify-between py-7 *:pointer-events-auto max-lg:hidden"
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
        className="text-ink-faint text-nano rotate-180 font-mono tracking-[0.42em] whitespace-nowrap uppercase select-none [writing-mode:vertical-rl]"
      >
        {spine}
      </div>

      <nav
        aria-label="Language"
        className="text-nano flex flex-col items-center gap-0.5 font-mono tracking-widest"
      >
        {locales.map((code) => (
          <Link
            aria-current={lang === code ? "true" : undefined}
            className="text-ink-faint hover:text-ink focus-visible:outline-accent data-[active=true]:text-accent data-[active=true]:before:bg-accent relative px-1.5 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 data-[active=true]:before:absolute data-[active=true]:before:top-1/2 data-[active=true]:before:-left-1 data-[active=true]:before:h-[3px] data-[active=true]:before:w-[3px] data-[active=true]:before:-translate-y-1/2 data-[active=true]:before:rounded-full data-[active=true]:before:content-['']"
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
    <header className="border-rule-soft sticky top-0 z-30 hidden items-center justify-between border-b bg-[color-mix(in_oklch,var(--bg)_88%,transparent)] px-(--pad-x) py-3.5 [backdrop-filter:saturate(140%)_blur(10px)] [-webkit-backdrop-filter:saturate(140%)_blur(10px)] max-lg:flex">
      <Link
        aria-label="manuel.fyi — home"
        className="font-display text-ink text-xl"
        href={`/${lang}` as Route}
      >
        <Wordmark orientation="horizontal" />
      </Link>
      <nav
        aria-label="Language"
        className="text-micro tracking-label-tight flex gap-0.5 font-mono"
      >
        {locales.map((code) => (
          <Link
            aria-current={lang === code ? "true" : undefined}
            className="text-ink-faint focus-visible:outline-accent data-[active=true]:text-accent px-1.5 py-1 focus-visible:outline-2 focus-visible:outline-offset-2"
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
