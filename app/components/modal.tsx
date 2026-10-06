"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  ViewTransition,
} from "react";

import { hasLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

import { docSheetName } from "./doc-morph";
import { DocSheetChrome } from "./doc-sheet-chrome";
import { CloseButton, DocSheetToolbar, EscHint } from "./doc-sheet-toolbar";
import type { UpdatedLine } from "./markdown-source";

interface Labels {
  close: string;
  download: string;
  escHint: string;
}

/** Marks the modal's own top-level nodes, which stay interactive while the
 *  rest of the page is made inert. */
const MODAL_ATTR = "data-doc-modal";

/**
 * The document sheet over the home page. Rendered in place rather than through
 * a portal: the sheet has to be in the DOM in the same commit as the
 * navigation, or the card on the home page has nothing to morph into.
 */
export function DocSheetModal({
  slug,
  title,
  subtitle,
  contact,
  pdfHref,
  labels,
  children,
  updatedLine,
}: {
  slug: string;
  title: string;
  subtitle: string;
  contact: readonly string[];
  pdfHref: string;
  labels: Labels;
  children: React.ReactNode;
  updatedLine?: UpdatedLine;
}) {
  const router = useRouter();
  const { lang } = useParams<{ lang: string }>();
  const locale: Locale = hasLocale(lang) ? lang : "en";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [escPressed, setEscPressed] = useState(false);

  const close = useCallback(() => {
    const idx = (window.history.state as { idx?: number } | null)?.idx;
    if (typeof idx === "number" && idx > 0) {
      router.back();
    } else {
      router.push(`/${lang}`);
    }
  }, [router, lang]);

  // Esc and a click beside the sheet close it. Listeners rather than JSX
  // handlers, since the dialog element itself is not a control.
  useEffect(() => {
    const dialog = dialogRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEscPressed(true);
        close();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (event.target === dialog) {
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    dialog?.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      dialog?.removeEventListener("click", onClick);
    };
  }, [close]);

  // Modal behaviour without a portal: everything else on the page goes inert,
  // the page stops scrolling underneath, focus moves into the sheet.
  useEffect(() => {
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;

    const inerted: Element[] = [];
    for (const el of document.body.children) {
      if (!(el.hasAttribute(MODAL_ATTR) || el.hasAttribute("inert"))) {
        el.setAttribute("inert", "");
        inerted.push(el);
      }
    }
    dialogRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      for (const el of inerted) {
        el.removeAttribute("inert");
      }
    };
  }, []);

  return (
    <>
      <ViewTransition default="none" enter="doc-scrim-in" exit="doc-scrim-out">
        <div
          aria-hidden="true"
          className="doc-scrim fixed inset-0 z-[100] bg-[rgba(30,22,14,0.55)] [backdrop-filter:blur(4px)] [-webkit-backdrop-filter:blur(4px)]"
          data-doc-modal
        />
      </ViewTransition>
      <ViewTransition default="none" enter="doc-sheet-in" exit="doc-sheet-out">
        <dialog
          aria-labelledby="doc-sheet-title"
          aria-modal="true"
          className="fixed inset-0 z-[101] m-0 flex size-full max-h-none max-w-none items-start justify-center overflow-y-auto overscroll-contain border-0 bg-transparent p-0 text-inherit outline-none"
          data-doc-modal
          open
          ref={dialogRef}
          tabIndex={-1}
        >
          <ViewTransition
            default="none"
            name={docSheetName(slug)}
            share="doc-morph"
          >
            <DocSheetChrome
              authorName={contact[0] ?? "Manuel Dugué"}
              contact={contact}
              lang={locale}
              morphSlug={slug}
              subtitle={subtitle}
              title={title}
              toolbar={
                <DocSheetToolbar
                  close={<CloseButton label={labels.close} onClick={close} />}
                  downloadLabel={labels.download}
                  lead={<EscHint pressed={escPressed} text={labels.escHint} />}
                  pdfHref={pdfHref}
                />
              }
              updatedLine={updatedLine}
            >
              {children}
            </DocSheetChrome>
          </ViewTransition>
        </dialog>
      </ViewTransition>
    </>
  );
}
