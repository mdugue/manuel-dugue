import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

export function DocSheetPage({
  lang,
  kicker,
  title,
  subtitle,
  contact,
  pdfHref,
  modalLabels,
  children,
}: {
  lang: Locale
  kicker: string
  title: string
  subtitle: string
  contact: readonly string[]
  pdfHref: string
  modalLabels: Dictionary['portfolio']['modal']
  children: React.ReactNode
}) {
  return (
    <main className="doc-scroll" style={{ position: 'static' }}>
      <article className="doc-sheet doc-sheet--standalone">
        <header className="doc-letterhead">
          <div>
            <div className="doc-letterhead-url">
              manuel<span className="tld">.fyi</span>
            </div>
            <h1 className="doc-letterhead-name">
              Manuel <span>Dugué</span>
            </h1>
          </div>
          <address
            className="doc-letterhead-contact"
            style={{ fontStyle: 'normal' }}
          >
            {contact.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </address>
        </header>

        <div className="doc-title-block">
          <div className="doc-title-kicker">{kicker}</div>
          <p className="doc-title-main">{title}</p>
          <div className="doc-title-sub">{subtitle}</div>
        </div>

        {children}

        <div className="doc-footer">
          <span>Manuel Dugué · mail@manuel.fyi</span>
          <span>{modalLabels.page}</span>
        </div>

        <div className="doc-watermark">{modalLabels.watermark}</div>

        <div className="doc-actions">
          <Link href={`/${lang}`}>← manuel.fyi</Link>
          <a href={pdfHref} target="_blank" rel="noopener noreferrer">
            {modalLabels.download}
          </a>
        </div>
      </article>
    </main>
  )
}
