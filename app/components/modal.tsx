'use client'

import { Dialog } from '@base-ui/react'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { DocSheetChrome } from './doc-sheet-chrome'

type Labels = {
  close: string
  download: string
  print: string
  escHint: string
}

export function DocSheetModal({
  title,
  subtitle,
  contact,
  pdfHref,
  labels,
  children,
}: {
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
        <Dialog.Backdrop className="fixed inset-0 z-[100] bg-[rgba(30,22,14,0.55)] [backdrop-filter:blur(4px)] [-webkit-backdrop-filter:blur(4px)]" />
        <Dialog.Popup
          finalFocus={false}
          className="fixed inset-0 z-[101] flex items-start justify-center p-10 overflow-y-auto overscroll-contain outline-none max-[720px]:p-0"
        >
          <Dialog.Close
            aria-label={labels.close}
            className="fixed top-5 right-6 z-[101] bg-[rgba(30,22,14,0.6)] border border-white/20 text-white w-9 h-9 rounded-full cursor-pointer text-xl leading-none inline-flex items-center justify-center hover:bg-accent hover:border-accent focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            ×
          </Dialog.Close>

          <DocSheetChrome
            title={title}
            subtitle={subtitle}
            contact={contact}
            actions={
              <>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-none border-0 p-0 font-inherit cursor-pointer uppercase tracking-[0.14em] text-accent hover:underline"
                >
                  {labels.print}
                </button>
                <span className="text-[#888] text-[9px]">{labels.escHint}</span>
                <a
                  href={pdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase tracking-[0.14em] text-accent hover:underline"
                >
                  {labels.download}
                </a>
              </>
            }
          >
            {children}
          </DocSheetChrome>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
