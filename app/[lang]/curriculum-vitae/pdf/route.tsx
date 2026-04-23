import { createMarkdownPdfRoute } from "@/app/components/markdown-pdf";

export const GET = createMarkdownPdfRoute({
  slug: "curriculum-vitae",
  filenameBase: "curriculum-vitae-manuel-dugue",
  author: "Manuel Dugué",
  getDocMeta: (dict) => dict.portfolio.docs.cv,
});
