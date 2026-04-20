'use client'

import { Dialog } from '@base-ui/react'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

type Labels = {
  close: string
  watermark: string
  page: string
  download: string
  print: string
  escHint: string
}

export function DocSheetModal({
  kicker,
  title,
  subtitle,
  contact,
  pdfHref,
  labels,
  children,
}: {
  kicker: string
  title: string
  subtitle: string
  contact: readonly string[]
  pdfHref: string
  labels: Labels
  children: React.ReactNode
}) {
  const router = useRouter()
  const { lang } = useParams<{ lang: string }>()

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) return
      const idx = (window.history.state as { idx?: number } | null)?.idx
      if (typeof idx === 'number' && idx > 0) {
        router.back()
      } else {
        router.push(`/${lang}`)
      }
    },
    [router, lang],
  )

  return (
    <Dialog.Root open onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="doc-backdrop" />
        <Dialog.Popup className="doc-scroll" finalFocus={false}>
          <Dialog.Close className="doc-close" aria-label={labels.close}>
            ×
          </Dialog.Close>
          <article className="doc-sheet">
            <header className="doc-letterhead">
              <div>
                <div className="doc-letterhead-url">
                  manuel<span className="tld">.fyi</span>
                </div>
                <Dialog.Title render={<h2 />} className="doc-letterhead-name">
                  Manuel <span>Dugué</span>
                </Dialog.Title>
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
              <Dialog.Description
                render={<p />}
                className="doc-title-main"
              >
                {title}
              </Dialog.Description>
              <div className="doc-title-sub">{subtitle}</div>
            </div>

            {children}

            <div className="doc-footer">
              <span>Manuel Dugué · mail@manuel.fyi</span>
              <span>{labels.page}</span>
            </div>

            <div className="doc-watermark">{labels.watermark}</div>

            <div className="doc-actions">
              <button type="button" onClick={() => window.print()}>
                {labels.print}
              </button>
              <span className="hint">{labels.escHint}</span>
              <a href={pdfHref} target="_blank" rel="noopener noreferrer">
                {labels.download}
              </a>
            </div>
          </article>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
