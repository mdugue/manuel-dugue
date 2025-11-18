import type { MetadataRoute } from 'next';
import { i18n } from './i18n-config';
import { cacheLife } from 'next/cache';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	'use cache';
	cacheLife("days");
	return i18n.locales.flatMap((locale) => [
		{ url: `https://manuel.fyi/${locale}`, lastModified: new Date() },
		{
			url: `https://manuel.fyi/${locale}/skill-profile`,
			lastModified: new Date(),
		},
		{ url: `https://manuel.fyi/${locale}/cv`, lastModified: new Date() },
		{ url: `https://manuel.fyi/${locale}/legal`, lastModified: new Date() },
		{ url: `https://manuel.fyi/${locale}/privacy`, lastModified: new Date() },
	]);
}
