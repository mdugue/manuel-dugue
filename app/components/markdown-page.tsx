import { notFound } from 'next/navigation'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { readMarkdown } from './markdown-source'

export async function MarkdownPage({ slug }: { slug: string }) {
  let raw: string
  try {
    raw = await readMarkdown(slug)
  } catch {
    notFound()
  }

  const html = String(
    await remark().use(remarkGfm).use(remarkHtml).process(raw),
  )
  return <article dangerouslySetInnerHTML={{ __html: html }} />
}
