import type { Dictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/root-locale";
import { readCachedSelfPresentation } from "@/lib/ai-cache";
import { SelfPresentationClient } from "./self-presentation-client";

export async function SelfPresentation({
  self,
  fallback,
}: {
  self: Dictionary["portfolio"]["self"];
  fallback: string;
}) {
  const lang = await getLocale();
  const cached = await readCachedSelfPresentation(lang);
  return (
    <SelfPresentationClient
      initialText={cached ?? fallback}
      lang={lang}
      self={self}
    />
  );
}
