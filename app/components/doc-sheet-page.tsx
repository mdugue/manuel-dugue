import type { Route } from "next";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { DocSheetChrome } from "./doc-sheet-chrome";

export function DocSheetPage({
  lang,
  title,
  subtitle,
  contact,
  pdfHref,
  modalLabels,
  children,
}: {
  lang: Locale;
  title: string;
  subtitle: string;
  contact: readonly string[];
  pdfHref: string;
  modalLabels: Dictionary["portfolio"]["modal"];
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-start justify-center p-10 max-[720px]:p-0">
      <DocSheetChrome
        actions={
          <>
            <Link
              className="text-accent uppercase tracking-[0.14em] hover:underline"
              href={`/${lang}` as Route}
            >
              ← manuel.fyi
            </Link>
            <a
              className="text-accent uppercase tracking-[0.14em] hover:underline"
              href={pdfHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              {modalLabels.download}
            </a>
          </>
        }
        contact={contact}
        standalone
        subtitle={subtitle}
        title={title}
      >
        {children}
      </DocSheetChrome>
    </main>
  );
}
