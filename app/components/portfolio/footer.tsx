import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

export function SiteFooter({
  lang,
  footer,
}: {
  lang: Locale
  footer: Dictionary['portfolio']['footer']
}) {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-top">
        <h3 className="footer-word">
          {footer.word.map((w, i) => (
            <span
              key={i}
              style={{ display: 'block' }}
              dangerouslySetInnerHTML={{ __html: w }}
            />
          ))}
        </h3>
        <div className="footer-col">
          <h5>{footer.sayHello}</h5>
          <ul>
            <li>
              <a href="mailto:mail@manuel.fyi">
                mail@manuel.fyi <span className="ext">email</span>
              </a>
            </li>
            <li>
              <a href="#">
                Signal <span className="ext">on request</span>
              </a>
            </li>
            <li>
              <a href="https://cal.com" rel="noopener noreferrer">
                Calendar <span className="ext">cal.com</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>{footer.elsewhere}</h5>
          <ul>
            <li>
              <a href="https://github.com/manueldugue" rel="noopener noreferrer">
                GitHub <span className="ext">@manueldugue</span>
              </a>
            </li>
            <li>
              <a href="https://x.com/manueldugue" rel="noopener noreferrer">
                X / Twitter <span className="ext">@manueldugue</span>
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/manueldugue"
                rel="noopener noreferrer"
              >
                LinkedIn <span className="ext">in/manueldugue</span>
              </a>
            </li>
            <li>
              <a
                href="https://hachyderm.io/@manuel"
                rel="me noopener noreferrer"
              >
                Mastodon <span className="ext">@manuel@hachyderm</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>{footer.legal}</h5>
          <ul>
            <li>
              <a href="#imprint">{footer.imprint}</a>
            </li>
            <li>
              <a href="#privacy">{footer.privacy}</a>
            </li>
            <li>
              <a href="#colophon">{footer.colophon}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>{footer.meta}</div>
        <Link href={`/${lang}`} className="footer-mark" aria-label="manuel.fyi">
          <span>manuel</span>
          <span className="tld">.fyi</span>
        </Link>
      </div>
    </footer>
  )
}
