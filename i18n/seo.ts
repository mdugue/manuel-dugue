import type { Metadata } from "next";
import type { Person, WithContext } from "schema-dts";
import { defaultLocale, type Locale, locales } from "./config";

export const SITE = "https://manuel.fyi";
export const SITE_NAME = "manuel.fyi";
export const TWITTER = "@mdugue";
export const METADATA_BASE = new URL(SITE);

export const LOCALE_TAGS: Record<Locale, { og: string; bcp47: string }> = {
  de: { bcp47: "de-DE", og: "de_DE" },
  en: { bcp47: "en-US", og: "en_US" },
  es: { bcp47: "es-ES", og: "es_ES" },
  fr: { bcp47: "fr-FR", og: "fr_FR" },
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
    alternateLocale: locales
      .filter((l) => l !== locale)
      .map((l) => LOCALE_TAGS[l].og),
    description,
    locale: LOCALE_TAGS[locale].og,
    siteName: SITE_NAME,
    title: fullTitle,
    url,
  } as const;
  const isArticle = Boolean(publishedIso || updatedIso);
  return {
    alternates: {
      canonical: url,
      languages: languageAlternates(slug),
    },
    description,
    openGraph: isArticle
      ? {
          ...ogBase,
          authors: [SITE],
          type: "article",
          ...(publishedIso ? { publishedTime: publishedIso } : {}),
          ...(updatedIso ? { modifiedTime: updatedIso } : {}),
        }
      : { ...ogBase, type: "website" },
    title: fullTitle,
    twitter: {
      card: "summary_large_image",
      creator: TWITTER,
      description,
      title: fullTitle,
    },
  };
}

export function personJsonLd(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    email: "mailto:mail@manuel.fyi",
    name: "Manuel Dugué",
    sameAs: [
      "https://linkedin.com/in/manuel-dugue",
      "https://x.com/mdugue",
      "https://github.com/mdugue",
    ],
    url: SITE,
  };
}

export function jsonLdString(value: object): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
