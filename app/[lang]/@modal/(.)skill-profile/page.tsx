import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { MarkdownPage } from '@/app/components/markdown-page'
import { DocSheetModal } from '@/app/components/modal'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale: Locale = lang
  const dict = await getDictionary(locale)
  const portfolio = dict.portfolio

  return (
    <DocSheetModal
      title={portfolio.docs.profile.sheetTitle}
      subtitle={portfolio.docs.profile.sheetSubtitle}
      contact={portfolio.contact}
      pdfHref={`/${locale}/skill-profile/pdf`}
      labels={portfolio.modal}
    >
      <MarkdownPage slug="skill-profile" lang={locale} />
    </DocSheetModal>
  )
}
