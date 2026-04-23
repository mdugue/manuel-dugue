import { createMarkdownPdfRoute } from "@/app/components/markdown-pdf";

export const GET = createMarkdownPdfRoute({
  slug: "legal",
  filenameBase: "legal-manuel-dugue",
  author: "Manuel Dugué",
  getDocMeta: (dict) => dict.portfolio.legal.imprint,
});
