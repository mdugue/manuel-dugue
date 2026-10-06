import type { Route } from "next";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

import { DocSheetChrome } from "./doc-sheet-chrome";
import { DocSheetToolbar } from "./doc-sheet-toolbar";
import type { UpdatedLine } from "./markdown-source";

export function DocSheetPage({
  lang,
  title,
  subtitle,
  contact,
  pdfHref,
  modalLabels,
  children,
  updatedLine,
}: {
  lang: Locale;
  title: string;
  subtitle: string;
  contact: readonly string[];
  pdfHref: string;
  modalLabels: Dictionary["portfolio"]["modal"];
  children: React.ReactNode;
  updatedLine?: UpdatedLine;
}) {
  return (
    <main className="flex items-start justify-center p-10 max-md:p-0">
      <DocSheetChrome
        authorName={contact[0] ?? "Manuel Dugué"}
        contact={contact}
        lang={lang}
        standalone
        subtitle={subtitle}
        title={title}
        toolbar={
          <DocSheetToolbar
            downloadLabel={modalLabels.download}
            lead={
              <Link
                className="text-ink-soft hover:text-accent text-nano tracking-label font-mono uppercase transition-colors"
                href={`/${lang}` as Route}
              >
                ← manuel.fyi
              </Link>
            }
            pdfHref={pdfHref}
          />
        }
        updatedLine={updatedLine}
      >
        {children}
      </DocSheetChrome>
    </main>
  );
}
