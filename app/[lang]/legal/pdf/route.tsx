import { createMarkdownPdfRoute } from "@/app/components/markdown-pdf";

export const GET = createMarkdownPdfRoute({
  author: "Manuel Dugué",
  filenameBase: "legal-manuel-dugue",
  getDocMeta: (dict) => dict.portfolio.legal.imprint,
  slug: "legal",
});
