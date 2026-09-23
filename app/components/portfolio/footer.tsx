import type { Route } from "next";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const footerLink =
  "text-sm text-ink-soft transition-colors hover:text-accent flex items-baseline gap-2 flex-wrap";

const extLabel = "font-mono text-nano text-ink-faint tracking-label-tight";

export function SiteFooter({
  lang,
  footer,
}: {
  lang: Locale;
  footer: Dictionary["portfolio"]["footer"];
}) {
  return (
    <footer
      className="border-rule mx-auto max-w-345 border-t px-(--pad-x) py-[clamp(60px,8vw,100px)] pl-[calc(var(--pad-x)+60px)] max-lg:pl-(--pad-x)"
      id="contact"
    >
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 pb-15 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <h3 className="font-display [&_em]:text-accent m-0 text-[clamp(40px,6vw,84px)] leading-[0.95] tracking-tight italic [&_em]:not-italic">
          {footer.word.map((w) => (
            <span
              dangerouslySetInnerHTML={{ __html: w }}
              key={w}
              style={{ display: "block" }}
            />
          ))}
        </h3>
        <div>
          <h5 className="text-ink-faint text-micro tracking-heading m-0 mb-4 font-mono uppercase">
            {footer.sayHello}
          </h5>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            <li>
              <a className={footerLink} href="mailto:mail@manuel.fyi">
                mail@manuel.fyi{" "}
                <span className={extLabel}>{footer.emailNote}</span>
              </a>
            </li>
            <li>
              <a
                className={footerLink}
                href="https://www.cal.eu/manuel-dugue"
                rel="noopener noreferrer"
                target="_blank"
              >
                {footer.calendar} <span className={extLabel}>cal.eu</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-ink-faint text-micro tracking-heading m-0 mb-4 font-mono uppercase">
            {footer.elsewhere}
          </h5>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            <li>
              <a
                className={footerLink}
                href="https://github.com/mdugue"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub <span className={extLabel}>@mdugue</span>
              </a>
            </li>
            <li>
              <a
                className={footerLink}
                href="https://x.com/mdugue"
                rel="noopener noreferrer"
                target="_blank"
              >
                X / Twitter <span className={extLabel}>@mdugue</span>
              </a>
            </li>
            <li>
              <a
                className={footerLink}
                href="https://linkedin.com/in/manuel-dugue"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn <span className={extLabel}>in/manuel-dugue</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-ink-faint text-micro tracking-heading m-0 mb-4 font-mono uppercase">
            {footer.legal}
          </h5>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            <li>
              <Link className={footerLink} href={`/${lang}/legal` as Route}>
                {footer.imprint}
              </Link>
            </li>
            <li>
              <Link className={footerLink} href={`/${lang}/privacy` as Route}>
                {footer.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-rule-soft text-ink-faint text-micro tracking-label flex flex-wrap items-baseline justify-between gap-4 border-t pt-8 font-mono uppercase">
        <div>{footer.meta}</div>
        <Link
          aria-label="manuel.fyi"
          className="font-display text-ink [&_.tld]:text-accent text-base tracking-normal normal-case [&_.tld]:font-medium [&_.tld]:italic"
          href={`/${lang}` as Route}
        >
          <span>manuel</span>
          <span className="tld">.fyi</span>
        </Link>
      </div>
    </footer>
  );
}
