import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Locale } from "@/i18n/config";
import { readMarkdownSource } from "./markdown-source";

export async function MarkdownPage({
  slug,
  lang,
}: {
  slug: string;
  lang: Locale;
}) {
  let body: string;
  try {
    body = (await readMarkdownSource(slug, lang)).body;
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
          // hiding the h1 because the title gets rendered more complex in the doc sheet chrome
          h1: () => null,
        }}
        remarkPlugins={[remarkGfm]}
      >
        {body}
      </Markdown>
    </div>
  );
}
