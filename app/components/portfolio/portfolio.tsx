import { Suspense } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/root-locale";
import { FallbackErrorBoundary } from "../error-boundary";
import { Documents } from "./documents";
import { SiteFooter } from "./footer";
import { Hero } from "./hero";
import { SelfPresentation } from "./self-presentation";
import { SelfPresentationClient } from "./self-presentation-client";
import { MobileBar, SideRail } from "./side-rail";

export async function Portfolio({ dict }: { dict: Dictionary["portfolio"] }) {
  const lang = await getLocale();
  // The static lede is both the streaming placeholder and the degraded state
  // when the cached generation cannot be read.
  const staticSelfPresentation = (
    <SelfPresentationClient
      initialText={dict.hero.lede}
      lang={lang}
      self={dict.self}
    />
  );

  return (
    <>
      <SideRail lang={lang} spine={dict.spine} />
      <MobileBar lang={lang} />
      <main className="relative mx-auto max-w-345 px-(--pad-x) pl-[calc(var(--pad-x)+60px)] max-lg:pl-(--pad-x)">
        <Hero hero={dict.hero} />
        <FallbackErrorBoundary fallback={staticSelfPresentation}>
          <Suspense fallback={staticSelfPresentation}>
            <SelfPresentation fallback={dict.hero.lede} self={dict.self} />
          </Suspense>
        </FallbackErrorBoundary>
        <Documents docs={dict.docs} />
        {/*         <FallbackErrorBoundary fallback={staticSocialProof}>
          <Suspense fallback={staticSocialProof}>
            <SocialProof proof={dict.proof} />
          </Suspense>
        </FallbackErrorBoundary> */}
      </main>
      <SiteFooter footer={dict.footer} />
    </>
  );
}
