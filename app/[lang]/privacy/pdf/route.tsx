import { createMarkdownPdfRoute } from "@/app/components/markdown-pdf";

export const GET = createMarkdownPdfRoute({
  author: "Manuel Dugué",
  filenameBase: "privacy-manuel-dugue",
  getDocMeta: (dict) => dict.portfolio.legal.privacy,
  slug: "privacy",
});
