import "server-only";
import { getCache } from "@vercel/functions";
import { type AiModelId, aiModels, defaultAiModel } from "@/i18n/ai-models";
import type { Locale } from "@/i18n/config";
import {
  type SocialProofObject,
  socialProofSchema,
} from "@/i18n/social-proof-schema";
import {
  AI_CACHE_SHAPE_VERSION,
  AI_CACHE_TTL_MS,
  AI_CACHE_TTL_SECONDS,
} from "@/lib/ai-cache-shared";

export type AiCacheNamespace = "self-presentation" | "social-proof";

export type AiCacheStatus = {
  cachedAt: number;
  expiresAt: number;
} | null;

export type AiCacheStatuses = { [K in AiModelId]: AiCacheStatus };

interface StoredEntry {
  cachedAt: number;
  text: string;
}

function parseStored(raw: unknown): StoredEntry | null {
  if (typeof raw !== "string" || raw.length === 0) {
    return null;
  }
  try {
    const obj: unknown = JSON.parse(raw);
    if (
      obj &&
      typeof obj === "object" &&
      typeof (obj as { text?: unknown }).text === "string" &&
      (obj as { text: string }).text.length > 0 &&
      typeof (obj as { cachedAt?: unknown }).cachedAt === "number"
    ) {
      return obj as StoredEntry;
    }
  } catch {
    // fall through to legacy handling
  }
  return { cachedAt: 0, text: raw };
}

function statusFromEntry(entry: StoredEntry): AiCacheStatus {
  if (entry.cachedAt <= 0) {
    return null;
  }
  return {
    cachedAt: entry.cachedAt,
    expiresAt: entry.cachedAt + AI_CACHE_TTL_MS,
  };
}

async function safeReadEntry(
  namespace: AiCacheNamespace,
  key: string
): Promise<StoredEntry | null> {
  try {
    const cache = getCache({ namespace });
    const raw = await cache.get(key);
    return parseStored(raw);
  } catch {
    return null;
  }
}

function cacheKey(locale: Locale, model: AiModelId): string {
  return `v${AI_CACHE_SHAPE_VERSION}:${locale}:${model}`;
}

export async function readAiCacheText(params: {
  namespace: AiCacheNamespace;
  locale: Locale;
  model: AiModelId;
}): Promise<{ text: string; status: AiCacheStatus } | null> {
  const { namespace, locale, model } = params;
  const entry = await safeReadEntry(namespace, cacheKey(locale, model));
  if (!entry) {
    return null;
  }
  return { status: statusFromEntry(entry), text: entry.text };
}

export async function writeAiCacheText(params: {
  namespace: AiCacheNamespace;
  locale: Locale;
  model: AiModelId;
  text: string;
}): Promise<void> {
  const { namespace, locale, model, text } = params;
  if (!text) {
    return;
  }
  const cache = getCache({ namespace });
  const entry: StoredEntry = { cachedAt: Date.now(), text };
  await cache.set(cacheKey(locale, model), JSON.stringify(entry), {
    name: `${namespace} · ${locale} · ${model}`,
    tags: [namespace, `${namespace}:${locale}`],
    ttl: AI_CACHE_TTL_SECONDS,
  });
}

export async function readAiCacheStatuses(
  namespace: AiCacheNamespace,
  locale: Locale
): Promise<AiCacheStatuses> {
  const entries = await Promise.all(
    aiModels.map(async ({ id }) => {
      const result = await readAiCacheText({ locale, model: id, namespace });
      return [id, result?.status ?? null] as const;
    })
  );
  return Object.fromEntries(entries) as AiCacheStatuses;
}

export async function readCachedSelfPresentation(
  locale: Locale
): Promise<string | null> {
  const result = await readAiCacheText({
    locale,
    model: defaultAiModel,
    namespace: "self-presentation",
  });
  return result?.text ?? null;
}

export async function readCachedSocialProof(
  locale: Locale
): Promise<SocialProofObject | null> {
  const result = await readAiCacheText({
    locale,
    model: defaultAiModel,
    namespace: "social-proof",
  });
  if (!result) {
    return null;
  }
  try {
    const parsed = JSON.parse(result.text) as unknown;
    const verified = socialProofSchema.safeParse(parsed);
    return verified.success ? verified.data : null;
  } catch {
    return null;
  }
}
