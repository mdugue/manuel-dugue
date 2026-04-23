import { Fragment } from "react";

export interface DocSheetChromeProps {
  actions: React.ReactNode;
  children: React.ReactNode;
  contact: readonly string[];
  standalone?: boolean;
  subtitle: string;
  title: string;
}

export function DocSheetChrome({
  title,
  subtitle,
  contact,
  actions,
  standalone = false,
  children,
}: DocSheetChromeProps) {
  const sheetClass = [
    "bg-paper max-w-[780px] w-full px-18 py-16 font-display relative",
    "max-[720px]:px-6 max-[720px]:py-12 max-[720px]:pb-16 max-[720px]:min-h-screen",
    standalone
      ? "my-15 mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.12)] max-[720px]:my-0"
      : "shadow-[0_30px_80px_rgba(0,0,0,0.3)]",
  ].join(" ");

  return (
    <article className={sheetClass}>
      <header className="mb-9 flex flex-wrap items-start justify-between gap-4 border-ink-soft border-b-2 pb-4.5 text-ink">
        <div>
          <div className="inline-block pr-6 font-mono text-[9px] text-ink-soft uppercase tracking-[0.22em]">
            manuel
            <span className="font-semibold text-accent">.fyi</span>
          </div>
        </div>
        <address className="text-right font-mono text-[#555] text-[9px] uppercase not-italic leading-[1.8] tracking-[0.14em]">
          {contact.map((l) => (
            <Fragment key={l}>
              <span>{l}</span>
              <br />
            </Fragment>
          ))}
        </address>
      </header>

      <div className="mb-8">
        <p className="m-0 mb-3 font-display font-normal text-[46px] text-accent italic leading-[1.02] tracking-[-0.01em]">
          {title}
        </p>

        <div className="font-display text-[#555] text-base italic">
          {subtitle}
        </div>
      </div>

      {children}

      <div className="mt-15 flex justify-between border-[#d6cfc2] border-t pt-5 font-mono text-[#888] text-[9px] uppercase tracking-[0.14em]">
        <span>Manuel Dugué · mail@manuel.fyi</span>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border border-[#d6cfc2] bg-white px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em]">
        {actions}
      </div>
    </article>
  );
}
