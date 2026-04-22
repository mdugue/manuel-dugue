import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { Article, WithContext } from 'schema-dts'
import { hasLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import {
  SITE,
  buildPageMetadata,
  jsonLdString,
  pageUrl,
} from '@/i18n/seo'
import { MarkdownPage } from '@/app/components/markdown-page'
import { DocSheetPage } from '@/app/components/doc-sheet-page'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const locale: Locale = lang
  const dict = await getDictionary(locale)
  return buildPageMetadata({
    locale,
    slug: 'skill-profile',
    title: dict.portfolio.docs.profile.sheetTitle,
    description: dict.portfolio.docs.profile.sheetSubtitle,
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  'use cache'
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale: Locale = lang
  const dict = await getDictionary(locale)
  const portfolio = dict.portfolio

  const articleJsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: portfolio.docs.profile.sheetTitle,
    description: portfolio.docs.profile.sheetSubtitle,
    inLanguage: locale,
    author: { '@type': 'Person', name: 'Manuel Dugué', url: SITE },
    url: pageUrl(locale, 'skill-profile'),
  }

  return (
    <DocSheetPage
      lang={locale}
      title={portfolio.docs.profile.sheetTitle}
      subtitle={portfolio.docs.profile.sheetSubtitle}
      contact={portfolio.contact}
      pdfHref={`/${locale}/skill-profile/pdf`}
      modalLabels={portfolio.modal}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(articleJsonLd) }}
      />
      <MarkdownPage slug="skill-profile" lang={locale} />
    </DocSheetPage>
  )
}
