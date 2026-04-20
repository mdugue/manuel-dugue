import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { Hero } from './hero'
import { SelfPresentation } from './self-presentation'
import { Documents } from './documents'
import { SocialProof } from './social-proof'
import { Now } from './now'
import { SiteFooter } from './footer'
import { SideRail, MobileBar } from './side-rail'

export function Portfolio({
  lang,
  dict,
}: {
  lang: Locale
  dict: Dictionary['portfolio']
}) {
  return (
    <>
      <SideRail lang={lang} spine={dict.spine} />
      <MobileBar lang={lang} />
      <main className="page">
        <Hero hero={dict.hero} />
        <SelfPresentation lang={lang} self={dict.self} />
        <Documents lang={lang} docs={dict.docs} />
        <SocialProof lang={lang} proof={dict.proof} />
        <Now now={dict.now} />
      </main>
      <SiteFooter lang={lang} footer={dict.footer} />
    </>
  )
}
