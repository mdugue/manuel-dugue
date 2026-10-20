import { createMarkdownPdfRoute } from "@/app/components/markdown-pdf";

export const GET = createMarkdownPdfRoute({
  getDocMeta: (dict) => dict.portfolio.legal.imprint,
  slug: "legal",
});
