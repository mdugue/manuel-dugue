import { readFile } from "node:fs/promises";
import path from "node:path";

import { cache } from "react";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import { parse as parseYaml } from "yaml";

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

const frontmatterParser = remark().use(remarkFrontmatter, ["yaml"]);
const LEADING_NEWLINE = /^\r?\n/u;

/** Splits a leading YAML block (`---` fenced) from the markdown body. */
function splitFrontmatter(raw: string): {
  body: string;
  data: Record<string, unknown>;
} {
  const [first] = frontmatterParser.parse(raw).children;
  const end = first?.position?.end.offset;
  if (first?.type !== "yaml" || end === undefined) {
    return { body: raw, data: {} };
  }
  const data: unknown = parseYaml(first.value);
  return {
    body: raw.slice(end).replace(LEADING_NEWLINE, ""),
    data: typeof data === "object" && data !== null ? { ...data } : {},
  };
}

function toIso(value: unknown): string | undefined {
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
  }
  return undefined;
}

export const readMarkdownSource = cache(
  async (slug: string, lang: Locale): Promise<MarkdownSource> => {
    const raw = await readFile(
      path.join(process.cwd(), "public", lang, `${slug}.md`),
      "utf-8"
    );
    const { body, data } = splitFrontmatter(raw);
    return {
      body,
      meta: {
        publishedIso: toIso(data.published),
        updatedIso: toIso(data.updated),
      },
    };
  }
);

export function formatUpdatedDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(iso));
}

export function buildUpdatedLine(
  meta: MarkdownMeta,
  locale: Locale,
  label: string
): UpdatedLine | undefined {
  if (!meta.updatedIso) {
    return undefined;
  }
  return {
    iso: meta.updatedIso,
    label: `${label} ${formatUpdatedDate(meta.updatedIso, locale)}`,
  };
}
