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
      <div className="text-ink-faint text-micro tracking-heading mb-10 flex items-center gap-4 pt-6 font-mono uppercase">
        <span>{label}</span>
        <span aria-hidden="true" className="bg-rule h-px flex-1" />
      </div>
      <div className="mb-12 grid grid-cols-[220px_1fr] items-baseline gap-12 max-md:grid-cols-1 max-md:gap-3">
        <h2 className="font-display text-ink m-0 mb-2 text-[22px] leading-tight font-normal italic">
          {heading}
        </h2>
        <div className="text-ink-faint text-micro tracking-label font-mono leading-[1.7] uppercase">
          {sub}
        </div>
      </div>
    </>
  );
}
