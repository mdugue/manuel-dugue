export function SectionHead({
  label,
  heading,
  sub,
}: {
  label: string;
  heading: string;
  sub: string;
}) {
  return (
    <>
      <div className="mb-10 flex items-center gap-4 pt-6 font-mono text-ink-faint text-micro uppercase tracking-heading">
        <span>{label}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-rule" />
      </div>
      <div className="mb-12 grid grid-cols-[220px_1fr] items-baseline gap-12 max-md:grid-cols-1 max-md:gap-3">
        <h2 className="m-0 mb-2 font-display font-normal text-[22px] text-ink italic leading-tight">
          {heading}
        </h2>
        <div className="font-mono text-ink-faint text-micro uppercase leading-[1.7] tracking-label">
          {sub}
        </div>
      </div>
    </>
  );
}
