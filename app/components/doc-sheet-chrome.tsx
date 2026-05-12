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
        <div className="mb-9 flex flex-wrap items-start justify-between gap-4 border-ink-soft border-b-2 pb-4.5 text-ink">
          <div className="inline-block pr-6 font-mono text-ink-soft text-nano uppercase tracking-[0.22em]">
            manuel
            <span className="font-semibold text-accent">.fyi</span>
          </div>
          <address className="text-right font-mono text-ink-soft text-nano uppercase not-italic leading-[1.8] tracking-label">
            {contact.map((l) => (
              <Fragment key={l}>
                <span>{l}</span>
                <br />
              </Fragment>
            ))}
          </address>
        </div>

        <div className="mb-8">
          <h1 className="m-0 mb-3 font-display font-normal text-[46px] text-accent italic leading-[1.02] tracking-[-0.01em]">
            {title}
          </h1>

          <p className="m-0 font-display text-base text-ink-soft italic">
            {subtitle}
          </p>

          <p className="m-0 mt-2 font-mono text-ink-faint text-nano uppercase tracking-label">
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

      <div className="mt-15 flex justify-between border-rule border-t pt-5 font-mono text-ink-faint text-nano uppercase tracking-label">
        <span>Manuel Dugué · mail@manuel.fyi</span>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border border-rule bg-white px-5 py-3 font-mono text-nano uppercase tracking-label">
        {actions}
      </div>
    </article>
  );
}
