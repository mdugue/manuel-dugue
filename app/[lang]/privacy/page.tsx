import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { buildPageMetadata } from '@/i18n/seo'
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
    slug: 'privacy',
    title: dict.portfolio.legal.privacy.sheetTitle,
    description: dict.portfolio.legal.privacy.sheetSubtitle,
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

  return (
    <DocSheetPage
      lang={locale}
      title={portfolio.legal.privacy.sheetTitle}
      subtitle={portfolio.legal.privacy.sheetSubtitle}
      contact={portfolio.contact}
      pdfHref={`/${locale}/privacy/pdf`}
      modalLabels={portfolio.modal}
    >
      <MarkdownPage slug="privacy" lang={locale} />
    </DocSheetPage>
  )
}
