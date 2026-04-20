import type { Dictionary } from '@/i18n/dictionaries'

export function Now({ now }: { now: Dictionary['portfolio']['now'] }) {
  return (
    <section className="now block" id="now" aria-labelledby="now-label">
      <span id="now-label" className="sr-only">
        {now.label}
      </span>
      <div>
        <h4>{now.status.h}</h4>
        <p>{now.status.t}</p>
      </div>
      <div>
        <h4>{now.elsewhere.h}</h4>
        <p>{now.elsewhere.t}</p>
      </div>
    </section>
  )
}
