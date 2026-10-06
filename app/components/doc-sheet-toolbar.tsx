"use client";

import { useState } from "react";

const ESC_KEY = /^(?<before>.*?)(?<key>Esc|Échap)(?<after>.*)$/u;

const escHintClass =
  "text-ink-faint text-nano tracking-label font-mono uppercase max-md:hidden [@media(hover:none)]:hidden";

/** Sticky bar at the top edge of a document sheet: something on the left
 *  (Esc hint or the way home), the PDF and an optional close button on the
 *  right. A hairline underneath fills with the accent as the sheet is read. */
export function DocSheetToolbar({
  lead,
  pdfHref,
  downloadLabel,
  close,
}: {
  lead: React.ReactNode;
  pdfHref: string;
  downloadLabel: string;
  close?: React.ReactNode;
}) {
  const [dropping, setDropping] = useState(false);

  return (
    <div className="bg-paper sticky top-0 z-10 -mx-18 mb-10 flex min-h-16 items-center justify-between gap-4 px-18 py-3 max-md:-mx-6 max-md:px-6">
      <div className="min-w-0">{lead}</div>
      <div className="flex items-center gap-2">
        <a
          className="doc-pdf bg-accent text-paper hover:bg-ink focus-visible:outline-accent inline-flex h-10 items-center gap-2.5 px-4 font-mono text-xs tracking-[0.12em] whitespace-nowrap uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-3"
          data-dropping={dropping || undefined}
          href={pdfHref}
          onAnimationEnd={() => {
            setDropping(false);
          }}
          onClick={() => {
            setDropping(true);
          }}
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            aria-hidden="true"
            className="size-3.5 shrink-0 overflow-visible"
            fill="none"
            stroke="currentColor"
            strokeLinecap="square"
            strokeWidth="1.5"
            viewBox="0 0 14 14"
          >
            <g className="doc-pdf-arrow">
              <path d="M7 1v8" />
              <path d="M3.5 5.5 7 9l3.5-3.5" />
            </g>
            <path d="M1.5 12.5h11" />
          </svg>
          {downloadLabel}
        </a>
        {close}
      </div>
      <span aria-hidden="true" className="doc-progress" />
    </div>
  );
}

/** "Esc to close" with the key itself set as a keycap. The keycap goes down
 *  when Esc is pressed, so the sheet flies home with the key still pressed. */
export function EscHint({ text, pressed }: { text: string; pressed: boolean }) {
  const parts = ESC_KEY.exec(text)?.groups;
  if (!parts) {
    return <span className={escHintClass}>{text}</span>;
  }
  const { before, key, after } = parts;
  return (
    <span className={escHintClass}>
      {before}
      <kbd className="doc-kbd" data-pressed={pressed || undefined}>
        {key}
      </kbd>
      {after}
    </span>
  );
}

/** Square close button with a drawn cross that sits dead centre (the old
 *  `×` glyph rode on the font's baseline). The cross turns a quarter on hover. */
export function CloseButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="doc-close border-rule text-ink hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-accent inline-flex size-10 shrink-0 cursor-pointer items-center justify-center border bg-transparent p-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-3"
      onClick={onClick}
      type="button"
    >
      <svg
        aria-hidden="true"
        className="size-3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="1.5"
        viewBox="0 0 14 14"
      >
        <path d="M2 2l10 10M12 2 2 12" />
      </svg>
    </button>
  );
}
