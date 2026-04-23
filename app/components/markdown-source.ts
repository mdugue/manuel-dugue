import path from "node:path";
import type { Locale } from "@/i18n/config";

export function readMarkdown(slug: string, lang: Locale): Promise<string> {
  return Bun.file(
    path.join(process.cwd(), "public", lang, `${slug}.md`)
  ).text();
}
