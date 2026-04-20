import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { Hero } from './hero'
import { SelfPresentation } from './self-presentation'
import { Documents } from './documents'
import { SocialProof } from './social-proof'
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
      <main className="px-(--pad-x) pl-[calc(var(--pad-x)+60px)] max-w-[1380px] mx-auto relative max-[900px]:pl-(--pad-x)">
        <Hero hero={dict.hero} />
        <SelfPresentation lang={lang} self={dict.self} />
        <Documents lang={lang} docs={dict.docs} />
        <SocialProof lang={lang} proof={dict.proof} />
      </main>
      <SiteFooter lang={lang} footer={dict.footer} />
    </>
  )
}
