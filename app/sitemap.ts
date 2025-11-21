"use cache";
import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";
import { i18n } from "./i18n-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
