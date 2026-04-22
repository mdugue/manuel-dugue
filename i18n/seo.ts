import type { Metadata } from 'next'
import type { Person, WithContext } from 'schema-dts'
import { locales, defaultLocale, type Locale } from './config'

export const SITE = 'https://manuel.fyi'
export const SITE_NAME = 'manuel.fyi'
export const TWITTER = '@mdugue'
export const METADATA_BASE = new URL(SITE)

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  de: 'de_DE',
  fr: 'fr_FR',
  es: 'es_ES',
}

export function pageUrl(locale: Locale, slug = '') {
  return slug ? `${SITE}/${locale}/${slug}` : `${SITE}/${locale}`
}

export function languageAlternates(slug = '') {
  const languages = Object.fromEntries(
    locales.map((l) => [l, pageUrl(l, slug)]),
  ) as Record<Locale, string>
  return { ...languages, 'x-default': pageUrl(defaultLocale, slug) }
}

type SeoInput = {
  locale: Locale
  slug?: string
  title: string
  description: string
  templateTitle?: boolean
}

export function buildPageMetadata({
  locale,
  slug = '',
  title,
  description,
  templateTitle = true,
}: SeoInput): Metadata {
  const url = pageUrl(locale, slug)
  const fullTitle = templateTitle ? `${title} – Manuel Dugué` : title
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(slug),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: OG_LOCALE[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: TWITTER,
    },
  }
}

export function personJsonLd(): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Manuel Dugué',
    url: SITE,
    email: 'mailto:mail@manuel.fyi',
    sameAs: [
      'https://linkedin.com/in/manuel-dugue',
      'https://x.com/mdugue',
      'https://github.com/mdugue',
    ],
  }
}

export function jsonLdString(value: object): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
