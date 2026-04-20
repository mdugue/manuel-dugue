import { notFound } from 'next/navigation'
import { hasLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { HomeContent } from '@/app/components/home-content'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  return <HomeContent lang={lang} dict={dict.home} />
}
