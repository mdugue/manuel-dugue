"use cache";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import type { Article, WithContext } from "schema-dts";
import contentMap, { getSheetTitle } from "@/content";
import { DrawerSheetContent } from "@/drawer-sheet";
import { i18n, type Locale } from "@/i18n-config";
import Sheet from "@/sheet";

export default async function Page({ params }: PageProps<"/[locale]/[sheet]">) {
	cacheLife("hours");
	const { sheet, locale } = await params;

	const localizedContent = contentMap[sheet];
	if (!localizedContent) {
		notFound();
	}

	const title = getSheetTitle(sheet, locale as Locale);
	const content = localizedContent[locale as Locale];

	return (
		<DrawerSheetContent title={title}>
			<Sheet content={content} />
			{sheet === "skill-profile" && (
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: This is needed for the JSON-LD schema
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
					type="application/ld+json"
				/>
			)}
		</DrawerSheetContent>
	);
}

const jsonLd: WithContext<Article> = {
	"@context": "https://schema.org",
	"@type": "Article",
	headline:
		"Manuel Dugué: A Media Computer Scientist with Passion for Creativity and Languages",
	datePublished: "2022-01-01",
	author: {
		"@type": "Person",
		name: "Manuel Dugué",
		url: "https://manuel.fyi",
	},
	publisher: {
		"@type": "Organization",
		name: "Manuel Dugué",
	},
	mainEntityOfPage: {
		"@type": "WebPage",
		url: "https://manuel.fyi",
	},
	articleBody:
		"Manuel Dugué is a media computer scientist born in Berlin with German and French roots. He is passionate about sports, music, photography, typography, architecture, and cooking. Manuel is a language enthusiast, fluent in German, French, English, and Spanish, with basic knowledge of Portuguese and Dutch. He has programming skills in TypeScript, JavaScript, HTML, and more, and loves working with frameworks like React, D3.js, and Next.js. Manuel has had an exciting career working on projects like digital exhibitions, family trees, and an online shop for garden culture. He has also done some cool stuff with Android tablets for seniors and interactive presentation films. Manuel has a diploma in Media Informatics from TU Dresden and a research thesis on 'materiality and interaction.' He has won awards like the arctic code vault contributor and a couple of photo competitions. Manuel is a tech-savvy, creative, and multilingual individual.",
};

export async function generateStaticParams() {
	const sheets = ["skill-profile", "cv", "legal", "privacy"] as const;
	return i18n.locales.flatMap((locale) =>
		sheets.map((sheet) => ({ locale, sheet }))
	);
}
