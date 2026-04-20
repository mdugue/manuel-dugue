import { Fragment } from 'react'

export type DocSheetChromeProps = {
  title: string
  subtitle: string
  contact: readonly string[]
  actions: React.ReactNode
  standalone?: boolean
  children: React.ReactNode
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
    'bg-paper max-w-[780px] w-full px-18 py-16 font-display relative',
    'max-[720px]:px-6 max-[720px]:py-12 max-[720px]:pb-16 max-[720px]:min-h-screen',
    standalone
      ? 'my-15 mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.12)] max-[720px]:my-0'
      : 'shadow-[0_30px_80px_rgba(0,0,0,0.3)]',
  ].join(' ')

  return (
    <article className={sheetClass}>
      <header className="flex justify-between items-start pb-4.5 text-ink border-b-2 border-ink-soft mb-9 gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-soft inline-block pr-6 ">
            manuel
            <span className="text-accent font-semibold">.fyi</span>
          </div>
        </div>
        <address className="font-mono text-[9px] uppercase tracking-[0.14em] leading-[1.8] text-[#555] text-right not-italic">
          {contact.map((l, i) => (
            <Fragment key={i}>
              <span>{l}</span>
              <br />
            </Fragment>
          ))}
        </address>
      </header>

      <div className="mb-8">
        <p className="font-display text-[46px] italic font-normal leading-[1.02] tracking-[-0.01em] m-0 mb-3 text-accent">
          {title}
        </p>

        <div className="font-display text-base text-[#555] italic">
          {subtitle}
        </div>
      </div>

      {children}

      <div className="mt-15 pt-5 border-t border-[#d6cfc2] flex justify-between font-mono text-[9px] tracking-[0.14em] uppercase text-[#888]">
        <span>Manuel Dugué · mail@manuel.fyi</span>
      </div>

      <div className="mt-10 px-5 py-3 flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.14em] bg-white border border-[#d6cfc2] gap-3 flex-wrap">
        {actions}
      </div>
    </article>
  )
}
