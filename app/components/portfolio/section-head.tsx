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
      <div className="mb-12 flex flex-wrap items-baseline gap-x-10 gap-y-2">
        <h2 className="font-display text-ink m-0 text-[clamp(28px,3.2vw,34px)] leading-tight font-normal italic">
          {heading}
        </h2>
        <p className="font-display text-ink-soft m-0 flex-[1_1_280px] text-lg text-balance">
          {sub}
        </p>
      </div>
    </>
  );
}
