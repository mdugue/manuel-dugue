import type { MetadataRoute } from "next";
import { defaultLocale, type Locale, locales } from "@/i18n/config";

const SITE = "https://manuel.fyi";

const PAGES = [
  "",
  "curriculum-vitae",
  "skill-profile",
  "legal",
  "privacy",
] as const;

function url(locale: Locale, slug: string) {
  return slug ? `${SITE}/${locale}/${slug}` : `${SITE}/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((slug) => {
    const languages = Object.fromEntries(
      locales.map((l) => [l, url(l, slug)])
    ) as Record<Locale, string>;
    return locales.map((locale) => ({
      alternates: {
        languages: {
          ...languages,
          "x-default": url(defaultLocale, slug),
        },
      },
      changeFrequency: slug === "" ? ("weekly" as const) : ("monthly" as const),
      priority: slug === "" ? 1 : 0.7,
      url: url(locale, slug),
    }));
  });
}
