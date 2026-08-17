import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getLocale, getLocaleDictionary } from "@/i18n/root-locale";
import { SectionErrorBoundary } from "./error-boundary";
import { readMarkdownSource } from "./markdown-source";

async function MarkdownBody({ slug }: { slug: string }) {
  const lang = await getLocale();
  const { body } = readMarkdownSource(slug, lang);

  return (
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
  );
}

export async function MarkdownPage({ slug }: { slug: string }) {
  const { dict } = await getLocaleDictionary();

  return (
    <div className="doc-prose">
      {/* Keeps the surrounding sheet chrome when a document fails to render. */}
      <SectionErrorBoundary labels={dict.portfolio.error}>
        <MarkdownBody slug={slug} />
      </SectionErrorBoundary>
    </div>
  );
}
