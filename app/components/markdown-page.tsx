import { notFound } from 'next/navigation'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import type { Locale } from '@/i18n/config'
import { readMarkdown } from './markdown-source'

export async function MarkdownPage({
  slug,
  lang,
}: {
  slug: string
  lang: Locale
}) {
  let raw: string
  try {
    raw = await readMarkdown(slug, lang)
  } catch {
    notFound()
  }

  const html = String(
    await remark().use(remarkGfm).use(remarkHtml).process(raw),
  )
  return <article dangerouslySetInnerHTML={{ __html: html }} />
}
