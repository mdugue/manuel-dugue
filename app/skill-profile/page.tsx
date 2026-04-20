// app/[...slug]/page.tsx
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  'use cache'
  /* const { slug } = await params */
  const file = path.join(process.cwd(), 'public', 'skill-profile') + '.md'
  /* const file = path.join(process.cwd(), 'public', ...slug) + '.md' */

  let raw: string
  try {
    raw = await readFile(file, 'utf-8')
  } catch {
    notFound()
  }

  const html = String(await remark().use(remarkHtml).process(raw))
  return <article dangerouslySetInnerHTML={{ __html: html }} />
}

export async function generateStaticParams() {
  // Walk public/ for .md files and return [{ slug: ['docs','intro'] }, ...]
  return []
}
