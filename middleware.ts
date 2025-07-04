import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { i18n } from './app/i18n-config';

function getLocale(request: NextRequest): string | undefined {
	// Negotiator expects plain object so we need to transform headers
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

	// @ts-expect-error locales are readonly
	const locales: string[] = i18n.locales;

	// Use negotiator and intl-localematcher to get best locale
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
		locales
	);

	const locale = match(languages, locales, i18n.defaultLocale);

	return locale;
}

// TODO: update to https://nextjs.org/docs/app/building-your-application/routing/internationalization
export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
	// If you have one
	if (
		[
			'/manifest.json',
			'/favicon.ico',
			'/robots.txt',
			'/sitemap.xml',
			'/site.webmanifest',
		].includes(pathname)
	) {
		return;
	}
	if (
		pathname.startsWith('/android-') ||
		pathname.startsWith('/apple-') ||
		pathname.startsWith('/mstile-') ||
		pathname.startsWith('/safari-') ||
		pathname.startsWith('/favicon')
	) {
		return;
	}

	// Check if there is any supported locale in the pathname
	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	);

	// Redirect if there is no locale
	if (pathnameIsMissingLocale) {
		const locale = getLocale(request);

		// e.g. incoming request is /products
		// The new URL is now /en-US/products
		return NextResponse.redirect(
			new URL(`/${locale}/${pathname}`, request.url)
		);
	}
}

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
