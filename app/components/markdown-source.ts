import path from 'node:path'

export function readMarkdown(slug: string): Promise<string> {
  return Bun.file(
    path.join(process.cwd(), 'public', `${slug}.md`),
  ).text()
}
