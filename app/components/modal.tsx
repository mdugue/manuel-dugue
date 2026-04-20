'use client'

import { Dialog } from '@base-ui/react'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function Modal({ children }: { children: React.ReactNode }) {
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
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup
          className="fixed left-1/2 top-1/2 z-50 w-[min(calc(100vw-2rem),32rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl outline-none transition-[opacity,transform] duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 dark:border-zinc-800 dark:bg-zinc-950"
          finalFocus={false}
        >
          {children}
          <Dialog.Close
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-blue-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
