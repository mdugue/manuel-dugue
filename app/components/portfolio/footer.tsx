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
      className="mx-auto max-w-345 border-rule border-t px-(--pad-x) py-[clamp(60px,8vw,100px)] pl-[calc(var(--pad-x)+60px)] max-lg:pl-(--pad-x)"
      id="contact"
    >
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 pb-15 max-sm:grid-cols-1 max-lg:grid-cols-2">
        <h3 className="m-0 font-display text-[clamp(40px,6vw,84px)] italic leading-[0.95] tracking-tight [&_em]:text-accent [&_em]:not-italic">
          {footer.word.map((w) => (
            <span
              // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted footer copy from i18n dictionaries
              dangerouslySetInnerHTML={{ __html: w }}
              key={w}
              style={{ display: "block" }}
            />
          ))}
        </h3>
        <div>
          <h5 className="m-0 mb-4 font-mono text-ink-faint text-micro uppercase tracking-heading">
            {footer.sayHello}
          </h5>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            <li>
              <a className={footerLink} href="mailto:mail@manuel.fyi">
                mail@manuel.fyi <span className={extLabel}>email</span>
              </a>
            </li>
            <li>
              <a className={footerLink} href="#signal">
                Signal <span className={extLabel}>on request</span>
              </a>
            </li>
            <li>
              <a
                className={footerLink}
                href="https://www.cal.eu/manuel-dugue"
                rel="noopener noreferrer"
                target="_blank"
              >
                Calendar <span className={extLabel}>cal.com</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="m-0 mb-4 font-mono text-ink-faint text-micro uppercase tracking-heading">
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
          <h5 className="m-0 mb-4 font-mono text-ink-faint text-micro uppercase tracking-heading">
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
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-rule-soft border-t pt-8 font-mono text-ink-faint text-micro uppercase tracking-label">
        <div>{footer.meta}</div>
        <Link
          aria-label="manuel.fyi"
          className="font-display text-base text-ink normal-case tracking-normal [&_.tld]:font-medium [&_.tld]:text-accent [&_.tld]:italic"
          href={`/${lang}` as Route}
        >
          <span>manuel</span>
          <span className="tld">.fyi</span>
        </Link>
      </div>
    </footer>
  );
}
