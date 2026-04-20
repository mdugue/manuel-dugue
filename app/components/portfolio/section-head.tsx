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
      <div className="section-label">
        <span>{label}</span>
        <span className="rule" aria-hidden="true" />
      </div>
      <div className="two-col">
        <h2 className="col-heading">{heading}</h2>
        <div className="col-sub">{sub}</div>
      </div>
    </>
  )
}
