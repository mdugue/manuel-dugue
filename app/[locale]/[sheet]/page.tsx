"use cache";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES } from "@contentful/rich-text-types";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import type { AllInOnePageQuery } from "gql/graphql";
import { cacheLife } from "next/cache";
import type { Article, WithContext } from "schema-dts";
import { DocumentSheetContent } from "@/document-sheet";
import { graphqlClient } from "@/graphql-client";
import { i18n } from "@/i18n-config";
import { pageQuery } from "../page-query";

export default async function Page({ params }: PageProps<"/[locale]/[sheet]">) {
	cacheLife("hours");
	const { sheet, locale } = await params;

	const { allInOnePageCollection } =
		await graphqlClient.request<AllInOnePageQuery>(pageQuery, {
			slug: sheet,
			locale,
		});

	return (
		<DocumentSheetContent title={allInOnePageCollection?.items[0]?.title || ""}>
			<div
				className={
					"prose prose-h1:col-span-4 prose-h3:col-span-3 prose-p:col-span-3 prose-ul:col-span-3 prose-h3:col-start-2 prose-p:col-start-2 prose-ul:col-start-2 prose-h2:mt-0 prose-h3:mt-0 prose-p:mt-0 prose-h1:mb-2 prose-h2:mb-2 prose-h3:mb-0 prose-p:mb-2 grid-cols-4 gap-x-4 prose-h1:self-start prose-h2:hyphens-auto whitespace-pre-line prose-h1:bg-linear-to-tr prose-h2:bg-linear-to-tr prose-h3:bg-linear-to-tr prose-h1:from-amber-500 prose-h2:from-teal-500 prose-h3:from-teal-700 prose-h1:to-amber-300 prose-h2:to-teal-600 prose-h3:to-teal-600 prose-h1:pt-4 prose-a:font-medium prose-h1:font-inline prose-h2:font-bold prose-h3:font-bold prose-a:text-fuchsia-400 prose-h1:text-gradient prose-h1:text-lg prose-h2:text-base prose-h2:text-gradient prose-h3:text-base prose-h3:text-gradient prose-h3:text-gray-700 prose-p:text-gray-800 prose-h2:capitalize prose-h3:capitalize leading-6 prose-a:no-underline prose-a:hover:underline md:grid md:prose-h2:justify-self-end md:prose-h2:text-right"
				}
			>
				{documentToReactComponents(
					allInOnePageCollection?.items[0]?.content?.json,
					{
						renderNode: {
							[INLINES.HYPERLINK]: (node, children) => (
								<a
									className="group inline-flex items-center"
									href={node.data.uri}
									target="_blank"
								>
									<ArrowUpRightIcon className="h-4 w-4 opacity-75 group-hover:opacity-100" />{" "}
									{children}
								</a>
							),
						},
					}
				)}
			</div>
			{sheet === "skill-profile" && (
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: This is needed for the JSON-LD schema
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
					type="application/ld+json"
				/>
			)}
		</DocumentSheetContent>
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
	return i18n.locales.map((locale) =>
		sheets.map((sheet) => ({ locale, sheet }))
	);
}
