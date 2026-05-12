import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { Locale } from "@/i18n/config";

export interface MarkdownMeta {
  publishedIso?: string;
  updatedIso?: string;
}

export interface MarkdownSource {
  body: string;
  meta: MarkdownMeta;
}

export interface UpdatedLine {
  iso: string;
  label: string;
}

function toIso(value: unknown): string | undefined {
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
  }
  return;
}

export const readMarkdownSource = cache(
  async (slug: string, lang: Locale): Promise<MarkdownSource> => {
    const raw = await Bun.file(
      path.join(process.cwd(), "public", lang, `${slug}.md`)
    ).text();
    const parsed = matter(raw);
    const data = parsed.data as Record<string, unknown>;
    return {
      body: parsed.content,
      meta: {
        publishedIso: toIso(data.published),
        updatedIso: toIso(data.updated),
      },
    };
  }
);

export function formatUpdatedDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function buildUpdatedLine(
  meta: MarkdownMeta,
  locale: Locale,
  label: string
): UpdatedLine | undefined {
  if (!meta.updatedIso) {
    return;
  }
  return {
    iso: meta.updatedIso,
    label: `${label} ${formatUpdatedDate(meta.updatedIso, locale)}`,
  };
}
