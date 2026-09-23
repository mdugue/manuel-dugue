import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";

import { Analytics } from "@/app/components/analytics";
import { NotFoundPage } from "@/app/components/not-found/not-found-page";
import { fontVariables } from "@/app/fonts";
import { localeOfPath } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { negotiateLocale } from "@/i18n/negotiate-locale";
import { REQUEST_PATH_HEADER } from "@/lib/request-path";

import "./globals.css";

/** Anything longer is not a path worth echoing back. */
const MAX_PATH_LENGTH = 2048;

/**
 * Locale and path of a request that matched no route. The proxy passes the
 * path on; requests it never sees (no locale prefix and a dot in the name, like
 * /wp-login.php) fall back to the browser's languages and stay pathless.
 */
async function missedRequest(): Promise<{ lang: Locale; path: string | null }> {
  const requestHeaders = await headers();
  const path = requestHeaders.get(REQUEST_PATH_HEADER);
  const pathLocale =
    path && path.length <= MAX_PATH_LENGTH ? localeOfPath(path) : null;
  if (path && pathLocale) {
    return { lang: pathLocale, path };
  }
  return {
    lang: negotiateLocale(requestHeaders.get("accept-language")),
    path: null,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await missedRequest();
  const { notFound } = getDictionary(lang).portfolio;
  return {
    description: notFound.metaDescription,
    title: `${notFound.metaTitle} – Manuel Dugué`,
  };
}

async function LocalizedNotFound() {
  const { lang, path } = await missedRequest();
  return (
    <>
      {/* The prerendered shell cannot know the language; fix <html lang> as
          soon as the streamed part arrives. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(lang)}`,
        }}
      />
      <NotFoundPage
        dict={getDictionary(lang).portfolio}
        lang={lang}
        path={path}
      />
    </>
  );
}

/**
 * Every unmatched URL lands here with a real 404 status. It renders outside the
 * [lang] layout, so it brings its own document, styles and fonts; the language
 * comes from the requested path.
 */
export default function GlobalNotFound() {
  return (
    <html
      className={`${fontVariables} antialiased`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <Suspense>
          <LocalizedNotFound />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
