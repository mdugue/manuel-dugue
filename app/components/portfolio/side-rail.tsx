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

export function SideRail({ lang, spine }: { lang: Locale; spine: string }) {
  const pathname = usePathname()

  return (
    <aside className="side-rail" aria-label="Site navigation">
      <Link href={`/${lang}` as Route} className="rail-mark" aria-label="manuel.fyi — home">
        <span>manuel</span>
        <span className="slash">/</span>
        <span className="tld">fyi</span>
      </Link>
      <div className="rail-spine" aria-hidden="true">
        {spine}
      </div>
      <nav className="rail-lang" aria-label="Language">
        {locales.map((code) => (
          <Link
            key={code}
            href={swapLang(pathname, code)}
            data-active={lang === code}
            aria-current={lang === code ? 'true' : undefined}
            lang={code}
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
    <header className="mobile-bar">
      <Link href={`/${lang}` as Route} className="mark" aria-label="manuel.fyi — home">
        <span>manuel</span>
        <span className="slash">/</span>
        <span className="tld">fyi</span>
      </Link>
      <nav className="lang" aria-label="Language">
        {locales.map((code) => (
          <Link
            key={code}
            href={swapLang(pathname, code)}
            data-active={lang === code}
            aria-current={lang === code ? 'true' : undefined}
            lang={code}
          >
            {LANG_LABELS[code]}
          </Link>
        ))}
      </nav>
    </header>
  )
}
