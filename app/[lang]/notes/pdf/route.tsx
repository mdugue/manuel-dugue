import { createMarkdownPdfRoute } from "@/app/components/markdown-pdf";

export const GET = createMarkdownPdfRoute({
  author: "Manuel Dugué",
  filenameBase: "notes-manuel-dugue",
  getDocMeta: (dict) => dict.portfolio.docs.notes,
  slug: "notes",
});
