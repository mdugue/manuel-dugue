import type { Dictionary } from "@/i18n/dictionaries";

export type DocSlug =
  | "curriculum-vitae"
  | "legal"
  | "privacy"
  | "skill-profile";

export interface DocMeta {
  sheetSubtitle: string;
  sheetTitle: string;
}

interface DocDefinition {
  /** Emit Article JSON-LD. The legal documents are pages, not articles. */
  article: boolean;
  meta: (dict: Dictionary) => DocMeta;
}

export const AUTHOR = "Manuel Dugué";

export const DOCUMENTS: Record<DocSlug, DocDefinition> = {
  "curriculum-vitae": { article: true, meta: (d) => d.portfolio.docs.cv },
  legal: { article: false, meta: (d) => d.portfolio.legal.imprint },
  privacy: { article: false, meta: (d) => d.portfolio.legal.privacy },
  "skill-profile": { article: true, meta: (d) => d.portfolio.docs.profile },
};
