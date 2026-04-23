import { createMarkdownPdfRoute } from "@/app/components/markdown-pdf";

export const GET = createMarkdownPdfRoute({
  slug: "privacy",
  filenameBase: "privacy-manuel-dugue",
  author: "Manuel Dugué",
  getDocMeta: (dict) => dict.portfolio.legal.privacy,
});
