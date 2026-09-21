"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { localeLabels, locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
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
            className="hover:text-ink focus-visible:outline-accent aria-current:text-accent underline-offset-[3px] transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            href={swapLang(pathname, code)}
          >
            {localeLabels[code]}
          </Link>
        </Fragment>
      ))}
    </span>
  );
}
