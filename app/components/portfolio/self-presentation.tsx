import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { readCachedSelfPresentation } from "@/lib/ai-cache";
import { SelfPresentationClient } from "./self-presentation-client";

export async function SelfPresentation({
  lang,
  self,
  fallback,
}: {
  lang: Locale;
  self: Dictionary["portfolio"]["self"];
  fallback: string;
}) {
  const cached = await readCachedSelfPresentation(lang);
  return (
    <SelfPresentationClient
      initialText={cached ?? fallback}
      lang={lang}
      self={self}
    />
  );
}
