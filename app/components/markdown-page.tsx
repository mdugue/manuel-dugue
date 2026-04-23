import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Locale } from "@/i18n/config";
import { readMarkdown } from "./markdown-source";

export async function MarkdownPage({
  slug,
  lang,
}: {
  slug: string;
  lang: Locale;
}) {
  let raw: string;
  try {
    raw = await readMarkdown(slug, lang);
  } catch {
    notFound();
  }

  return (
    <div className="doc-prose">
      <Markdown
        components={{
          a: ({ node: _node, ...props }) => (
            <a {...props} rel="noopener noreferrer" target="_blank" />
          ),
        }}
        remarkPlugins={[remarkGfm]}
      >
        {raw}
      </Markdown>
    </div>
  );
}
