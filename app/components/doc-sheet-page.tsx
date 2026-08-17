import type { Route } from "next";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/root-locale";
import { DocSheetChrome } from "./doc-sheet-chrome";
import type { UpdatedLine } from "./markdown-source";

export async function DocSheetPage({
  title,
  subtitle,
  contact,
  pdfHref,
  modalLabels,
  children,
  updatedLine,
}: {
  title: string;
  subtitle: string;
  contact: readonly string[];
  pdfHref: string;
  modalLabels: Dictionary["portfolio"]["modal"];
  children: React.ReactNode;
  updatedLine?: UpdatedLine;
}) {
  const lang = await getLocale();

  return (
    <main className="flex items-start justify-center p-10 max-md:p-0">
      <DocSheetChrome
        actions={
          <>
            <Link
              className="text-accent uppercase tracking-label hover:underline"
              href={`/${lang}` as Route}
            >
              ← manuel.fyi
            </Link>
            <a
              className="text-accent uppercase tracking-label hover:underline"
              href={pdfHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              {modalLabels.download}
            </a>
          </>
        }
        authorName={contact[0] ?? "Manuel Dugué"}
        contact={contact}
        lang={lang}
        standalone
        subtitle={subtitle}
        title={title}
        updatedLine={updatedLine}
      >
        {children}
      </DocSheetChrome>
    </main>
  );
}
