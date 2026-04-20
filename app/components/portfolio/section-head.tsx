export function SectionHead({
  label,
  heading,
  sub,
}: {
  label: string
  heading: string
  sub: string
}) {
  return (
    <>
      <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint mb-10 pt-6">
        <span>{label}</span>
        <span aria-hidden="true" className="flex-1 h-px bg-rule" />
      </div>
      <div className="grid grid-cols-[220px_1fr] gap-12 mb-12 max-[720px]:grid-cols-1 max-[720px]:gap-3">
        <h2 className="font-display italic text-[22px] font-normal text-ink m-0 mb-2 leading-tight">
          {heading}
        </h2>
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint leading-[1.7]">
          {sub}
        </div>
      </div>
    </>
  )
}
