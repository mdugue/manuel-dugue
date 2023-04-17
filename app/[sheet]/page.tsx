import StructuredSheetContent from 'components/StructuredSheetContent'
import { Article, Person, WithContext } from 'schema-dts'
import checkCVSPType from 'util/checkCVSPType'
import getGoogleSheetsData from 'util/getGoogleSheetsData'

export async function generateStaticParams() {
	return ['cv', 'skill-profile'].map((sheet) => ({ sheet }))
}

export const revalidate = 10

export default async function Page({ params }: { params: { sheet: string } }) {
	const { sheet } = params
	const type = sheet.replaceAll('-', ' ')
	checkCVSPType(type)

	const data = await getGoogleSheetsData(type)
	return (
		<>
			<StructuredSheetContent {...data} />
			{sheet === 'skill-profile' && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}
		</>
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
