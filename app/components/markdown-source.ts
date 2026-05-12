import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/config";

export interface MarkdownMeta {
  published?: string;
  updated?: string;
}

export interface MarkdownSource {
  body: string;
  meta: MarkdownMeta;
}

function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string") {
    return value;
  }
  return;
}

export async function readMarkdownSource(
  slug: string,
  lang: Locale
): Promise<MarkdownSource> {
  const raw = await Bun.file(
    path.join(process.cwd(), "public", lang, `${slug}.md`)
  ).text();
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;
  return {
    body: parsed.content,
    meta: {
      published: toIsoDate(data.published),
      updated: toIsoDate(data.updated),
    },
  };
}

export function formatUpdatedDate(value: string, locale: Locale): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(date);
}
