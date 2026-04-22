import { Suspense } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { Hero } from './hero'
import { SelfPresentation } from './self-presentation'
import { SelfPresentationClient } from './self-presentation-client'
import { Documents } from './documents'
import { SocialProof } from './social-proof'
import { SocialProofClient } from './social-proof-client'
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
        <Suspense
          fallback={
            <SelfPresentationClient
              lang={lang}
              self={dict.self}
              initialText={dict.hero.lede}
            />
          }
        >
          <SelfPresentation
            lang={lang}
            self={dict.self}
            fallback={dict.hero.lede}
          />
        </Suspense>
        <Documents lang={lang} docs={dict.docs} />
        <Suspense
          fallback={
            <SocialProofClient
              lang={lang}
              proof={dict.proof}
              initialTestimonials={null}
            />
          }
        >
          <SocialProof lang={lang} proof={dict.proof} />
        </Suspense>
      </main>
      <SiteFooter lang={lang} footer={dict.footer} />
    </>
  )
}
