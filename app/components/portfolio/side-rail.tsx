'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'

const LANG_LABELS: Record<Locale, string> = {
  en: 'EN',
  de: 'DE',
  fr: 'FR',
  es: 'ES',
}

function swapLang(pathname: string, target: Locale): Route {
  return pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${target}`) as Route
}

const WORDMARK =
  'font-display text-[19px] leading-none tracking-[-0.005em] text-ink'

function Wordmark({
  orientation,
}: {
  orientation: 'vertical' | 'horizontal'
}) {
  if (orientation === 'vertical') {
    return (
      <>
        <span>manuel</span>
        <span className="font-mono text-[11px] text-ink-faint my-1.5">/</span>
        <span className="text-accent italic font-medium">fyi</span>
      </>
    )
  }
  return (
    <>
      <span>manuel</span>
      <span className="font-mono text-[12px] text-ink-faint mx-1">/</span>
      <span className="text-accent italic font-medium">fyi</span>
    </>
  )
}

export function SideRail({ lang, spine }: { lang: Locale; spine: string }) {
  const pathname = usePathname()

  return (
    <aside
      aria-label="Site navigation"
      className="fixed inset-y-0 left-0 w-[60px] flex flex-col items-center justify-between py-7 z-30 pointer-events-none max-[900px]:hidden [&>*]:pointer-events-auto"
    >
      <Link
        href={`/${lang}` as Route}
        aria-label="manuel.fyi — home"
        className={`${WORDMARK} [writing-mode:vertical-rl] rotate-180 py-1 inline-flex items-baseline [&:hover_.tld]:underline [&:hover_.tld]:underline-offset-[3px]`}
      >
        <Wordmark orientation="vertical" />
      </Link>

      <div
        aria-hidden="true"
        className="font-mono text-[10px] uppercase tracking-[0.42em] text-ink-faint [writing-mode:vertical-rl] rotate-180 whitespace-nowrap select-none"
      >
        {spine}
      </div>

      <nav
        aria-label="Language"
        className="flex flex-col gap-0.5 font-mono text-[10.5px] tracking-[0.1em] items-center"
      >
        {locales.map((code) => (
          <Link
            key={code}
            href={swapLang(pathname, code)}
            data-active={lang === code}
            aria-current={lang === code ? 'true' : undefined}
            lang={code}
            className="relative px-1.5 py-1 text-ink-faint transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 data-[active=true]:text-accent data-[active=true]:before:content-[''] data-[active=true]:before:absolute data-[active=true]:before:-left-1 data-[active=true]:before:top-1/2 data-[active=true]:before:w-[3px] data-[active=true]:before:h-[3px] data-[active=true]:before:bg-accent data-[active=true]:before:rounded-full data-[active=true]:before:-translate-y-1/2"
          >
            {LANG_LABELS[code]}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export function MobileBar({ lang }: { lang: Locale }) {
  const pathname = usePathname()

  return (
    <header className="hidden max-[900px]:flex sticky top-0 z-30 justify-between items-center px-(--pad-x) py-3.5 bg-[color-mix(in_oklch,var(--bg)_88%,transparent)] [backdrop-filter:saturate(140%)_blur(10px)] [-webkit-backdrop-filter:saturate(140%)_blur(10px)] border-b border-rule-soft">
      <Link
        href={`/${lang}` as Route}
        aria-label="manuel.fyi — home"
        className="font-display text-[20px] text-ink"
      >
        <Wordmark orientation="horizontal" />
      </Link>
      <nav
        aria-label="Language"
        className="flex gap-0.5 font-mono text-[11px] tracking-[0.08em]"
      >
        {locales.map((code) => (
          <Link
            key={code}
            href={swapLang(pathname, code)}
            data-active={lang === code}
            aria-current={lang === code ? 'true' : undefined}
            lang={code}
            className="px-1.5 py-1 text-ink-faint data-[active=true]:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            {LANG_LABELS[code]}
          </Link>
        ))}
      </nav>
    </header>
  )
}
