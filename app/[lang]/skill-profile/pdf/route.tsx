import { createMarkdownPdfRoute } from "@/app/components/markdown-pdf";

export const GET = createMarkdownPdfRoute({
  author: "Manuel Dugué",
  filenameBase: "skill-profile-manuel-dugue",
  getDocMeta: (dict) => dict.portfolio.docs.profile,
  slug: "skill-profile",
});
