import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { MarkdownPage } from '@/app/components/markdown-page'
import { DocSheetPage } from '@/app/components/doc-sheet-page'

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
      title={portfolio.docs.cv.sheetTitle}
      subtitle={portfolio.docs.cv.sheetSubtitle}
      contact={portfolio.contact}
      pdfHref={`/${locale}/curriculum-vitae/pdf`}
      modalLabels={portfolio.modal}
    >
      <MarkdownPage slug="curriculum-vitae" lang={locale} />
    </DocSheetPage>
  )
}
