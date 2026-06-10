import "server-only";
import { createHash } from "node:crypto";
import { readMarkdownSource } from "@/app/components/markdown-source";
import type { Locale } from "@/i18n/config";
import { buildSelfPresentationPrompt } from "@/i18n/self-presentation-prompt";
import { buildSocialProofPrompt } from "@/i18n/social-proof-prompt";

export type AiCacheNamespace = "self-presentation" | "social-proof";

export interface AiRequest {
  system: string;
  prompt: string;
}

export async function buildSelfPresentationRequest(
  locale: Locale
): Promise<AiRequest> {
  const [cv, skills] = await Promise.all([
    readMarkdownSource("curriculum-vitae", locale),
    readMarkdownSource("skill-profile", locale),
  ]);
  return {
    system: buildSelfPresentationPrompt(locale),
    prompt:
      "<documents>\n" +
      `<document index="1">\n<source>curriculum-vitae</source>\n<document_content>\n${cv.body}\n</document_content>\n</document>\n` +
      `<document index="2">\n<source>skill-profile</source>\n<document_content>\n${skills.body}\n</document_content>\n</document>\n` +
      "</documents>\n\n" +
      "Now write Manuel's two-paragraph self-introduction, grounded only in the documents above.",
  };
}

export async function buildSocialProofRequest(
  locale: Locale
): Promise<AiRequest> {
  const skills = await readMarkdownSource("skill-profile", locale);
  return {
    system: buildSocialProofPrompt(locale),
    prompt:
      `<skill-profile>\n${skills.body}\n</skill-profile>\n\n` +
      "Now write the three fictional testimonials as instructed.",
  };
}

export function buildAiRequest(
  namespace: AiCacheNamespace,
  locale: Locale
): Promise<AiRequest> {
  return namespace === "self-presentation"
    ? buildSelfPresentationRequest(locale)
    : buildSocialProofRequest(locale);
}

// A short, stable fingerprint of the exact prompt sent to the model (system +
// user message, including the source markdown). Folded into the cache key so
// that editing a prompt or the underlying CV/skill profile serves fresh output
// instead of a stale generation.
export function hashAiRequest({ system, prompt }: AiRequest): string {
  return createHash("sha256")
    .update(`${system}\n\n${prompt}`)
    .digest("hex")
    .slice(0, 16);
}
