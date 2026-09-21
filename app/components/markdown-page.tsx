import { notFound } from "next/navigation";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Locale } from "@/i18n/config";
import { readMarkdownSource } from "./markdown-source";

const components: Components = {
  a: ({ node: _node, children, ...props }) => (
    <a {...props} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  ),
  // hiding the h1 because the title gets rendered more complex in the doc sheet chrome
  h1: () => null,
};

export async function MarkdownPage({
  slug,
  lang,
}: {
  slug: string;
  lang: Locale;
}) {
  let body: string;
  try {
    ({ body } = await readMarkdownSource(slug, lang));
  } catch {
    notFound();
  }

  return (
    <div className="doc-prose">
      <Markdown components={components} remarkPlugins={[remarkGfm]}>
        {body}
      </Markdown>
    </div>
  );
}
