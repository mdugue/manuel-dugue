import Link from 'next/link'
import type { Route } from 'next'

export default function Content({ lang }: { lang: string }) {
  return (
    <div>
      <Link href={`/${lang}/vanilla/cv` as Route}>CV Link</Link>
    </div>
  )
}
