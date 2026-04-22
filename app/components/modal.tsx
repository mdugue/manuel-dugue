"use client";

import { Dialog } from "@base-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { DocSheetChrome } from "./doc-sheet-chrome";

interface Labels {
  close: string;
  download: string;
  escHint: string;
}

export function DocSheetModal({
  title,
  subtitle,
  contact,
  pdfHref,
  labels,
  children,
}: {
  title: string;
  subtitle: string;
  contact: readonly string[];
  pdfHref: string;
  labels: Labels;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { lang } = useParams<{ lang: string }>();

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        return;
      }
      const idx = (window.history.state as { idx?: number } | null)?.idx;
      if (typeof idx === "number" && idx > 0) {
        router.back();
      } else {
        router.push(`/${lang}`);
      }
    },
    [router, lang]
  );

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] bg-[rgba(30,22,14,0.55)] [-webkit-backdrop-filter:blur(4px)] [backdrop-filter:blur(4px)]" />
        <Dialog.Popup
          className="fixed inset-0 z-[101] flex items-start justify-center overflow-y-auto overscroll-contain p-10 outline-none max-[720px]:p-0"
          finalFocus={false}
        >
          <Dialog.Close
            aria-label={labels.close}
            className="fixed top-5 right-6 z-[101] inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[rgba(30,22,14,0.6)] text-white text-xl leading-none hover:border-accent hover:bg-accent focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            ×
          </Dialog.Close>

          <DocSheetChrome
            actions={
              <>
                <a
                  className="text-accent uppercase tracking-[0.14em] hover:underline"
                  href={pdfHref}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {labels.download}
                </a>
                <span className="text-[#888] text-[9px]">{labels.escHint}</span>
              </>
            }
            contact={contact}
            subtitle={subtitle}
            title={title}
          >
            {children}
          </DocSheetChrome>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
