import { notFound } from 'next/navigation'
import { hasLocale } from '@/i18n/config'
import { MarkdownPage } from '@/app/components/markdown-page'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  'use cache'
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return <MarkdownPage slug="skill-profile" lang={lang} />
}
