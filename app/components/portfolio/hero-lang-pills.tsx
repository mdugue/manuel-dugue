"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { type Locale, localeLabels, locales } from "@/i18n/config";
import { swapLang } from "@/i18n/swap-lang";

export function HeroLangPills({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  return (
    <span>
      {locales.map((code, i) => (
        <Fragment key={code}>
          {i > 0 && " · "}
          <Link
            aria-current={code === lang ? "true" : undefined}
            className="underline-offset-[3px] transition-colors hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 aria-current:text-accent"
            href={swapLang(pathname, code)}
          >
            {localeLabels[code]}
          </Link>
        </Fragment>
      ))}
    </span>
  );
}
