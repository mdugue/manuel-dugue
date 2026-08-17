import { createMarkdownPdfRoute } from "@/app/components/markdown-pdf";

export const GET = createMarkdownPdfRoute({
  author: "Manuel Dugué",
  filenameBase: "curriculum-vitae-manuel-dugue",
  getDocMeta: (dict) => dict.portfolio.docs.cv,
  slug: "curriculum-vitae",
});
