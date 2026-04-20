import Link from 'next/link'
import type { Route } from 'next'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

const footerLink =
  'text-sm text-ink-soft transition-colors hover:text-accent flex items-baseline gap-2 flex-wrap'

const extLabel = 'font-mono text-[10.5px] text-ink-faint tracking-[0.08em]'

export function SiteFooter({
  lang,
  footer,
}: {
  lang: Locale
  footer: Dictionary['portfolio']['footer']
}) {
  return (
    <footer
      id="contact"
      className="border-t border-rule px-(--pad-x) py-[clamp(60px,8vw,100px)] pl-[calc(var(--pad-x)+60px)] max-w-[1380px] mx-auto max-[900px]:pl-(--pad-x)"
    >
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 pb-[60px] max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
        <h3 className="font-display text-[clamp(40px,6vw,84px)] leading-[0.95] tracking-[-0.02em] m-0 italic [&_em]:text-accent [&_em]:not-italic">
          {footer.word.map((w, i) => (
            <span
              key={i}
              style={{ display: 'block' }}
              dangerouslySetInnerHTML={{ __html: w }}
            />
          ))}
        </h3>
        <div>
          <h5 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint m-0 mb-4">
            {footer.sayHello}
          </h5>
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            <li>
              <a href="mailto:mail@manuel.fyi" className={footerLink}>
                mail@manuel.fyi <span className={extLabel}>email</span>
              </a>
            </li>
            <li>
              <a href="#signal" className={footerLink}>
                Signal <span className={extLabel}>on request</span>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.cal.eu/manuel-dugue"
                rel="noopener noreferrer"
                className={footerLink}
              >
                Calendar <span className={extLabel}>cal.com</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint m-0 mb-4">
            {footer.elsewhere}
          </h5>
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            <li>
              <a
                target="_blank"
                href="https://github.com/mdugue"
                rel="noopener noreferrer"
                className={footerLink}
              >
                GitHub <span className={extLabel}>@mdugue</span>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://x.com/mdugue"
                rel="noopener noreferrer"
                className={footerLink}
              >
                X / Twitter <span className={extLabel}>@mdugue</span>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://linkedin.com/in/manuel-dugue"
                rel="noopener noreferrer"
                className={footerLink}
              >
                LinkedIn <span className={extLabel}>in/manuel-dugue</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint m-0 mb-4">
            {footer.legal}
          </h5>
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            <li>
              <Link href={`/${lang}/imprint` as Route} className={footerLink}>
                {footer.imprint}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/privacy` as Route} className={footerLink}>
                {footer.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-8 flex justify-between items-baseline flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint border-t border-rule-soft">
        <div>{footer.meta}</div>
        <Link
          href={`/${lang}` as Route}
          aria-label="manuel.fyi"
          className="font-display text-base tracking-[-0.005em] normal-case text-ink [&_.tld]:text-accent [&_.tld]:italic [&_.tld]:font-medium"
        >
          <span>manuel</span>
          <span className="tld">.fyi</span>
        </Link>
      </div>
    </footer>
  )
}
