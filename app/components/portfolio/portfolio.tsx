import { Suspense } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Documents } from "./documents";
import { SiteFooter } from "./footer";
import { Hero } from "./hero";
import { SelfPresentation } from "./self-presentation";
import { SelfPresentationClient } from "./self-presentation-client";
import { MobileBar, SideRail } from "./side-rail";

export function Portfolio({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary["portfolio"];
}) {
  return (
    <>
      <SideRail lang={lang} spine={dict.spine} />
      <MobileBar lang={lang} />
      <main className="relative mx-auto max-w-[1380px] px-(--pad-x) pl-[calc(var(--pad-x)+60px)] max-[900px]:pl-(--pad-x)">
        <Hero hero={dict.hero} lang={lang} />
        <Suspense
          fallback={
            <SelfPresentationClient
              initialText={dict.hero.lede}
              lang={lang}
              self={dict.self}
            />
          }
        >
          <SelfPresentation
            fallback={dict.hero.lede}
            lang={lang}
            self={dict.self}
          />
        </Suspense>
        <Documents docs={dict.docs} lang={lang} />
        {/*         <Suspense
          fallback={
            <SocialProofClient
              initialTestimonials={null}
              lang={lang}
              proof={dict.proof}
            />
          }
        >
          <SocialProof lang={lang} proof={dict.proof} />
        </Suspense> */}
      </main>
      <SiteFooter footer={dict.footer} lang={lang} />
    </>
  );
}
