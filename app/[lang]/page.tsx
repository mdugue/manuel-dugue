import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { SITE_NAME, buildPageMetadata } from '@/i18n/seo'
import { Portfolio } from '@/app/components/portfolio/portfolio'

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
    title: `${SITE_NAME} — Manuel Dugué`,
    description: dict.portfolio.hero.lede,
    templateTitle: false,
  })
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  'use cache'
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale: Locale = lang
  const dict = await getDictionary(locale)
  return <Portfolio lang={locale} dict={dict.portfolio} />
}
