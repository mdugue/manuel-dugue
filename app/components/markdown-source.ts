import { readFile } from 'node:fs/promises'
import path from 'node:path'

export function readMarkdown(slug: string): Promise<string> {
  return readFile(
    path.join(process.cwd(), 'public', `${slug}.md`),
    'utf-8',
  )
}
