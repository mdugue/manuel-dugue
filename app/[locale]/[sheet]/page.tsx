import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES } from '@contentful/rich-text-types'
import { ArrowUpRightIcon } from '@heroicons/react/20/solid'
import { graphqlClient } from 'app/graphQlClient'
import { SheetContent } from 'components/Sheet'
import { AllInOnePageQuery } from 'gql/graphql'
import { i18n } from 'i18n-config'
import { Article, WithContext } from 'schema-dts'
import { LocalePageType } from '../LocalePageType'
import { pageQuery } from '../pageQuery'

export const runtime = 'edge'
export const revalidate = 60 * 60 * 24

export function generateStaticParams() {
	return (['cv', 'skill-profile'] as const).flatMap((sheet) =>
		i18n.locales.map((locale) => ({ sheet, locale })),
	)
}

export default async function Page({
	params,
}: LocalePageType<{ sheet: string }>) {
	const { sheet, locale } = params

	const { allInOnePageCollection } =
		await graphqlClient.request<AllInOnePageQuery>(pageQuery, {
			slug: sheet,
			locale,
		})

	return (
		<SheetContent title={allInOnePageCollection?.items[0]?.title || ''}>
			<div
				className={`
				leading-6
				whitespace-pre-line
				md:grid grid-cols-4 gap-x-4 prose 
				prose-h1:pt-4 prose-h1:text-lg prose-h1:font-inline prose-h1:text-gradient prose-h1:bg-gradient-to-tr prose-h1:from-amber-500 prose-h1:to-amber-300 prose-h1:mb-2 prose-h1:self-start	prose-h1:col-span-4
				prose-h3:col-start-2 prose-h3:col-span-3 prose-p:col-start-2 prose-p:col-span-3 prose-ul:col-start-2 prose-ul:col-span-3
				md:prose-h2:text-right prose-h2:font-bold prose-h2:text-gradient prose-h2:bg-gradient-to-tr prose-h2:from-teal-500 prose-h2:to-teal-600 md:prose-h2:justify-self-end prose-h2:capitalize prose-h2:text-base prose-h2:mb-2 prose-h2:mt-0 prose-h2:hyphens-auto 
				prose-h3:font-bold prose-h3:text-gray-700 prose-h3:text-gradient prose-h3:bg-gradient-to-tr prose-h3:from-teal-700 prose-h3:to-teal-600 prose-h3:capitalize prose-h3:mb-0 prose-h3:text-base prose-h3:mt-0
				prose-p:mt-0 prose-p:mb-2 prose-p:text-gray-800
				prose-a:text-fuchsia-400 prose-a:font-medium prose-a:no-underline hover:prose-a:underline 
				`}
			>
				{documentToReactComponents(
					allInOnePageCollection?.items[0]?.content?.json,
					{
						renderNode: {
							[INLINES.HYPERLINK]: (node, children) => (
								<a
									href={node.data.uri}
									target="_blank"
									className="inline-flex items-center group"
								>
									<ArrowUpRightIcon className="h-4 w-4 opacity-75 group-hover:opacity-100" />{' '}
									{children}
								</a>
							),
						},
					},
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
