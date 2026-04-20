import { NextResponse, type NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { defaultLocale, locales } from '@/i18n/config'

function getLocale(request: NextRequest): string {
  const headers = {
    'accept-language': request.headers.get('accept-language') ?? '',
  }
  const languages = new Negotiator({ headers }).languages()
  return match(languages, locales as unknown as string[], defaultLocale)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocalePrefix) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
