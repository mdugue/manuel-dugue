import type { Dictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/root-locale";
import { readCachedSocialProof } from "@/lib/ai-cache";
import { SocialProofClient } from "./social-proof-client";

export async function SocialProof({
  proof,
}: {
  proof: Dictionary["portfolio"]["proof"];
}) {
  const lang = await getLocale();
  const cached = await readCachedSocialProof(lang);
  return (
    <SocialProofClient
      initialTestimonials={cached?.testimonials ?? null}
      lang={lang}
      proof={proof}
    />
  );
}
