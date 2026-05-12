import type { Metadata } from "next";
import type { Person, WithContext } from "schema-dts";
import { defaultLocale, type Locale, locales } from "./config";

export const SITE = "https://manuel.fyi";
export const SITE_NAME = "manuel.fyi";
export const TWITTER = "@mdugue";
export const METADATA_BASE = new URL(SITE);

export const LOCALE_TAGS: Record<Locale, { og: string; bcp47: string }> = {
  en: { og: "en_US", bcp47: "en-US" },
  de: { og: "de_DE", bcp47: "de-DE" },
  fr: { og: "fr_FR", bcp47: "fr-FR" },
  es: { og: "es_ES", bcp47: "es-ES" },
};

export function pageUrl(locale: Locale, slug = "") {
  return slug ? `${SITE}/${locale}/${slug}` : `${SITE}/${locale}`;
}

export function languageAlternates(slug = "") {
  const languages = Object.fromEntries(
    locales.map((l) => [l, pageUrl(l, slug)])
  ) as Record<Locale, string>;
  return { ...languages, "x-default": pageUrl(defaultLocale, slug) };
}

interface SeoInput {
  description: string;
  locale: Locale;
  publishedIso?: string;
  slug?: string;
  templateTitle?: boolean;
  title: string;
  updatedIso?: string;
}

export function buildPageMetadata({
  locale,
  slug = "",
  title,
  description,
  templateTitle = true,
  publishedIso,
  updatedIso,
}: SeoInput): Metadata {
  const url = pageUrl(locale, slug);
  const fullTitle = templateTitle ? `${title} – Manuel Dugué` : title;
  const ogBase = {
    title: fullTitle,
    description,
    url,
    siteName: SITE_NAME,
    locale: LOCALE_TAGS[locale].og,
    alternateLocale: locales
      .filter((l) => l !== locale)
      .map((l) => LOCALE_TAGS[l].og),
  } as const;
  const isArticle = Boolean(publishedIso || updatedIso);
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(slug),
    },
    openGraph: isArticle
      ? {
          ...ogBase,
          type: "article",
          authors: [SITE],
          ...(publishedIso ? { publishedTime: publishedIso } : {}),
          ...(updatedIso ? { modifiedTime: updatedIso } : {}),
        }
      : { ...ogBase, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: TWITTER,
    },
  };
}

export function personJsonLd(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Manuel Dugué",
    url: SITE,
    email: "mailto:mail@manuel.fyi",
    sameAs: [
      "https://linkedin.com/in/manuel-dugue",
      "https://x.com/mdugue",
      "https://github.com/mdugue",
    ],
  };
}

export function jsonLdString(value: object): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
