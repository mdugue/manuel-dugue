import Link from 'next/link'
import type { Route } from 'next'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { DocSheetChrome } from './doc-sheet-chrome'

export function DocSheetPage({
  lang,
  title,
  subtitle,
  contact,
  pdfHref,
  modalLabels,
  children,
}: {
  lang: Locale
  title: string
  subtitle: string
  contact: readonly string[]
  pdfHref: string
  modalLabels: Dictionary['portfolio']['modal']
  children: React.ReactNode
}) {
  return (
    <main className="flex items-start justify-center p-10 max-[720px]:p-0">
      <DocSheetChrome
        standalone
        title={title}
        subtitle={subtitle}
        contact={contact}
        actions={
          <>
            <Link
              href={`/${lang}` as Route}
              className="uppercase tracking-[0.14em] text-accent hover:underline"
            >
              ← manuel.fyi
            </Link>
            <a
              href={pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-[0.14em] text-accent hover:underline"
            >
              {modalLabels.download}
            </a>
          </>
        }
      >
        {children}
      </DocSheetChrome>
    </main>
  )
}
