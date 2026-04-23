import "server-only";
import { getCache } from "@vercel/functions";
import { defaultAiModel } from "@/i18n/ai-models";
import type { Locale } from "@/i18n/config";
import {
  type SocialProofObject,
  socialProofSchema,
} from "@/i18n/social-proof-schema";

async function safeRead(
  namespace: string,
  key: string
): Promise<string | null> {
  try {
    const cache = getCache({ namespace });
    const cached = await cache.get(key);
    return typeof cached === "string" && cached.length > 0 ? cached : null;
  } catch {
    return null;
  }
}

export function readCachedSelfPresentation(
  locale: Locale
): Promise<string | null> {
  return safeRead("self-presentation", `${locale}:${defaultAiModel}`);
}

export async function readCachedSocialProof(
  locale: Locale
): Promise<SocialProofObject | null> {
  const raw = await safeRead("social-proof", `${locale}:${defaultAiModel}`);
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as unknown;
    const result = socialProofSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
