import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { locales } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiate-locale";
import { REQUEST_PATH_HEADER } from "@/lib/request-path";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocalePrefix = locales.some(
    (candidate) =>
      pathname === `/${candidate}` || pathname.startsWith(`/${candidate}/`)
  );
  if (hasLocalePrefix) {
    const headers = new Headers(request.headers);
    headers.set(REQUEST_PATH_HEADER, pathname);
    return NextResponse.next({ request: { headers } });
  }

  const locale = negotiateLocale(request.headers.get("accept-language"));
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next|api/|stats/|icon|apple-icon|.*\\..*).*)",
    // Locale-prefixed paths with a dot (/de/cv.pdf) never reach a page, but the
    // 404 can still answer them in the right language.
    "/(de|en|fr|es)/(.*\\..*)",
  ],
};
