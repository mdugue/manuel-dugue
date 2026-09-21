import { Fragment } from "react";

import type { Locale } from "@/i18n/config";

import type { UpdatedLine } from "./markdown-source";

export interface DocSheetChromeProps {
  actions: React.ReactNode;
  authorName: string;
  children: React.ReactNode;
  contact: readonly string[];
  lang: Locale;
  standalone?: boolean;
  subtitle: string;
  title: string;
  updatedLine?: UpdatedLine;
}

export function DocSheetChrome({
  title,
  subtitle,
  contact,
  actions,
  standalone = false,
  children,
  updatedLine,
  authorName,
  lang,
}: DocSheetChromeProps) {
  const sheetClass = [
    "bg-paper max-w-195 w-full px-18 py-16 font-display relative",
    "max-md:px-6 max-md:py-12 max-md:pb-16 max-md:min-h-screen",
    standalone
      ? "my-15 mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.12)] max-md:my-0"
      : "shadow-[0_30px_80px_rgba(0,0,0,0.3)]",
  ].join(" ");

  return (
    <article className={sheetClass}>
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
          <h1 className="font-display text-accent m-0 mb-3 text-[46px] leading-[1.02] font-normal tracking-[-0.01em] italic">
            {title}
          </h1>

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

      <div className="border-rule text-ink-faint text-nano tracking-label mt-15 flex justify-between border-t pt-5 font-mono uppercase">
        <span>Manuel Dugué · mail@manuel.fyi</span>
      </div>

      <div className="border-rule text-nano tracking-label mt-10 flex flex-wrap items-center justify-between gap-3 border bg-white px-5 py-3 font-mono uppercase">
        {actions}
      </div>
    </article>
  );
}
