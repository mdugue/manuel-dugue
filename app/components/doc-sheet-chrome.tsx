import { Fragment, ViewTransition } from "react";

import type { Locale } from "@/i18n/config";

import { docTitleName } from "./doc-morph";
import type { UpdatedLine } from "./markdown-source";

export interface DocSheetChromeProps {
  authorName: string;
  children: React.ReactNode;
  contact: readonly string[];
  lang: Locale;
  /** Slug of the home-page card this sheet morphs from; names the title. */
  morphSlug?: string;
  standalone?: boolean;
  subtitle: string;
  title: string;
  toolbar: React.ReactNode;
  updatedLine?: UpdatedLine;
}

export function DocSheetChrome({
  title,
  subtitle,
  contact,
  toolbar,
  morphSlug,
  standalone = false,
  children,
  updatedLine,
  authorName,
  lang,
}: DocSheetChromeProps) {
  // In the modal the gap above the sheet is margin, not padding on the scroll
  // container: padding there would hold the sticky toolbar 40px below the top.
  const sheetClass = [
    "bg-paper max-w-195 w-full px-18 pb-16 font-display relative",
    "max-md:px-6 max-md:pb-16 max-md:min-h-screen",
    standalone
      ? "my-15 mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.12)] max-md:my-0"
      : "my-10 shadow-[0_30px_80px_rgba(0,0,0,0.3)] max-md:my-0",
  ].join(" ");

  const heading = (
    <h1
      className="font-display text-accent m-0 mb-3 w-fit text-[46px] leading-[1.02] font-normal tracking-[-0.01em] italic"
      id="doc-sheet-title"
    >
      {title}
    </h1>
  );

  return (
    <article aria-labelledby="doc-sheet-title" className={sheetClass}>
      {toolbar}
      <header>
        <div className="border-ink-soft text-ink mb-9 flex flex-wrap items-start justify-between gap-4 border-b-2 pb-4.5">
          <div className="text-ink-soft text-nano inline-block pr-6 font-mono tracking-[0.22em] uppercase">
            manuel
            <span className="text-accent font-semibold">.fyi</span>
          </div>
          <address className="text-ink-soft text-nano tracking-label text-right font-mono leading-[1.8] uppercase not-italic">
            {contact.map((l) => (
              <Fragment key={l}>
                <span>{l}</span>
                <br />
              </Fragment>
            ))}
          </address>
        </div>

        <div className="mb-8">
          {morphSlug ? (
            <ViewTransition
              default="none"
              name={docTitleName(morphSlug)}
              share="doc-title"
            >
              {heading}
            </ViewTransition>
          ) : (
            heading
          )}

          <p className="font-display text-ink-soft m-0 text-base italic">
            {subtitle}
          </p>

          <p className="text-ink-faint text-nano tracking-label m-0 mt-2 font-mono uppercase">
            <a
              className="text-ink-faint hover:text-accent"
              href={`/${lang}`}
              rel="author"
            >
              {authorName}
            </a>
            {updatedLine ? (
              <>
                {" · "}
                <time dateTime={updatedLine.iso}>{updatedLine.label}</time>
              </>
            ) : null}
          </p>
        </div>
      </header>

      {children}

      <div className="border-rule text-ink-faint text-nano tracking-label mt-15 flex items-baseline justify-between border-t pt-5 font-mono uppercase">
        <span>Manuel Dugué · mail@manuel.fyi</span>
        {/* Tombstone: the end of the document, the way a proof ends. */}
        <span
          aria-hidden="true"
          className="doc-end text-accent font-display text-lg leading-none"
        >
          ∎
        </span>
      </div>
    </article>
  );
}
