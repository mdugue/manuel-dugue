import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { locales } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiate-locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocalePrefix = locales.some(
    (candidate) =>
      pathname === `/${candidate}` || pathname.startsWith(`/${candidate}/`)
  );
  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  const locale = negotiateLocale(request.headers.get("accept-language"));
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api/|stats/|icon|apple-icon|.*\\..*).*)"],
};
