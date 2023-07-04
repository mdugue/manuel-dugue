import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { SheetContent } from 'components/Sheet'
import { AllInOnePageQuery } from 'gql/graphql'
import { request } from 'graphql-request'
import { Article, WithContext } from 'schema-dts'
import { LocalePageType } from '../LocalePageType'
import { pageQuery } from '../pageQuery'

// TODO export const runtime = 'edge'

export async function generateStaticParams() {
	return ['cv', 'skill-profile'].map((sheet) => ({ sheet }))
}

export const revalidate = 10

// TODO: Edge?

export default async function Page({
	params,
}: LocalePageType<{ sheet: string }>) {
	const { sheet, locale } = params

	const { allInOnePageCollection } = await request<AllInOnePageQuery>(
		`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
		pageQuery,
		{ slug: sheet, locale },
		{ Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}` },
	)

	return (
		<SheetContent title={allInOnePageCollection?.items[0]?.title || ''}>
			<div
				className={`
				leading-6
				whitespace-pre-line
				md:grid grid-cols-4 gap-x-4 prose 
				prose-h1:pt-4 prose-h1:text-lg prose-h1:font-inline prose-h1:text-gradient prose-h1:bg-gradient-to-tr prose-h1:from-amber-500 prose-h1:to-amber-300 prose-h1:mb-2 prose-h1:self-start	prose-h1:col-span-4
				prose-h3:col-start-2 prose-h3:col-span-3 prose-p:col-start-2 prose-p:col-span-3
				md:prose-h2:text-right prose-h2:font-bold prose-h2:text-gradient prose-h2:bg-gradient-to-tr prose-h2:from-teal-500 prose-h2:to-teal-600 md:prose-h2:justify-self-end prose-h2:capitalize prose-h2:text-base prose-h2:mb-0 prose-h2:mt-1
				prose-h3:font-bold prose-h3:text-gray-700 prose-h3:text-gradient prose-h3:bg-gradient-to-tr prose-h3:from-teal-700 prose-h3:to-teal-600 prose-h3:capitalize prose-h3:mb-0 prose-h3:text-base prose-h3:mt-1
				prose-p:mt-0 prose-p:mb-2 prose-p:text-gray-800
				prose-a:text-fuchsia-400 prose-a:font-medium prose-a:no-underline hover:prose-a:underline 
				`}
			>
				{/* TODO: links to _blank */}
				{documentToReactComponents(
					allInOnePageCollection?.items[0]?.content?.json,
				)}
			</div>

			{sheet === 'skill-profile' && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}
		</SheetContent>
	)
}

const jsonLd: WithContext<Article> = {
	'@context': 'https://schema.org',
	'@type': 'Article',
	headline:
		'Manuel Dugué: A Media Computer Scientist with Passion for Creativity and Languages',
	datePublished: '2022-01-01',
	author: {
		'@type': 'Person',
		name: 'Manuel Dugué',
		url: 'https://manuel.fyi',
	},
	publisher: {
		'@type': 'Organization',
		name: 'Manuel Dugué',
	},
	mainEntityOfPage: {
		'@type': 'WebPage',
		url: 'https://manuel.fyi',
	},
	articleBody:
		"Manuel Dugué is a media computer scientist born in Berlin with German and French roots. He is passionate about sports, music, photography, typography, architecture, and cooking. Manuel is a language enthusiast, fluent in German, French, English, and Spanish, with basic knowledge of Portuguese and Dutch. He has programming skills in TypeScript, JavaScript, HTML, and more, and loves working with frameworks like React, D3.js, and Next.js. Manuel has had an exciting career working on projects like digital exhibitions, family trees, and an online shop for garden culture. He has also done some cool stuff with Android tablets for seniors and interactive presentation films. Manuel has a diploma in Media Informatics from TU Dresden and a research thesis on 'materiality and interaction.' He has won awards like the arctic code vault contributor and a couple of photo competitions. Manuel is a tech-savvy, creative, and multilingual individual.",
}
