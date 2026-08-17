import matter from "gray-matter";
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

// Bundled and parsed at build time, so no filesystem access at request time.
// `base` is required: glob patterns cannot climb out of the calling directory
// with `../`.
const RAW_SOURCES = import.meta.glob("*/*.md", {
  base: "../../public",
  eager: true,
});

const SOURCE_KEY_RE = /([^/]+)\/([^/]+)\.md$/;

const decoder = new TextDecoder();

function toText(value: unknown): string | undefined {
  const content = (value as { default?: unknown } | null)?.default;
  if (typeof content === "string") {
    return content;
  }
  if (content instanceof Uint8Array) {
    return decoder.decode(content);
  }
}

function toIso(value: unknown): string | undefined {
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
  }
}

function parseSources(): Map<string, MarkdownSource> {
  const parsed = new Map<string, MarkdownSource>();
  for (const [path, value] of Object.entries(RAW_SOURCES)) {
    const match = SOURCE_KEY_RE.exec(path);
    const raw = toText(value);
    if (!(match && raw !== undefined)) {
      continue;
    }
    const [, lang, slug] = match;
    const file = matter(raw);
    const data = file.data as Record<string, unknown>;
    parsed.set(`${lang}/${slug}`, {
      body: file.content,
      meta: {
        publishedIso: toIso(data.published),
        updatedIso: toIso(data.updated),
      },
    });
  }
  return parsed;
}

const SOURCES = parseSources();

if (SOURCES.size === 0) {
  // A glob that matches nothing compiles cleanly, so without this the app
  // would build green and serve every document broken.
  throw new Error(
    "No markdown documents were bundled — check the glob below and the `*.md` rule in next.config.ts"
  );
}

/** Slugs are literals in the route tree and locales are validated upstream, so a miss is a build defect. */
export function readMarkdownSource(slug: string, lang: Locale): MarkdownSource {
  const source = SOURCES.get(`${lang}/${slug}`);
  if (!source) {
    throw new Error(`No bundled markdown document for ${lang}/${slug}`);
  }
  return source;
}

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
    return;
  }
  return {
    iso: meta.updatedIso,
    label: `${label} ${formatUpdatedDate(meta.updatedIso, locale)}`,
  };
}
