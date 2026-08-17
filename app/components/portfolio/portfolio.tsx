import { Suspense } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/root-locale";
import { Documents } from "./documents";
import { SiteFooter } from "./footer";
import { Hero } from "./hero";
import { SelfPresentation } from "./self-presentation";
import { SelfPresentationClient } from "./self-presentation-client";
import { MobileBar, SideRail } from "./side-rail";

export async function Portfolio({ dict }: { dict: Dictionary["portfolio"] }) {
  const lang = await getLocale();

  return (
    <>
      <SideRail lang={lang} spine={dict.spine} />
      <MobileBar lang={lang} />
      <main className="relative mx-auto max-w-345 px-(--pad-x) pl-[calc(var(--pad-x)+60px)] max-lg:pl-(--pad-x)">
        <Hero hero={dict.hero} />
        <Suspense
          fallback={
            <SelfPresentationClient
              initialText={dict.hero.lede}
              lang={lang}
              self={dict.self}
            />
          }
        >
          <SelfPresentation fallback={dict.hero.lede} self={dict.self} />
        </Suspense>
        <Documents docs={dict.docs} />
        {/*         <Suspense
          fallback={
            <SocialProofClient
              initialTestimonials={null}
              lang={lang}
              proof={dict.proof}
            />
          }
        >
          <SocialProof proof={dict.proof} />
        </Suspense> */}
      </main>
      <SiteFooter footer={dict.footer} />
    </>
  );
}
