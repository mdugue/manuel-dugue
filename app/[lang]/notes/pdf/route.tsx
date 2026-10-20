import { createMarkdownPdfRoute } from "@/app/components/markdown-pdf";

export const GET = createMarkdownPdfRoute({
  getDocMeta: (dict) => dict.portfolio.docs.notes,
  slug: "notes",
});
