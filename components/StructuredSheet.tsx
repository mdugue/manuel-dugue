import Sheet from 'components/Sheet'
import { NextSeo } from 'next-seo'

export type StructuredSheetProps = {
	title: 'cv' | 'skill profile'
	document: {
		sections: {
			sectionTitle: string
			entries: {
				title: string
				subtitle?: string
				description: string
				links?: string[]
			}[]
		}[]
	}
}

const completeTitleMap: { [key: string]: string | undefined } = {
	cv: 'curriculum vitae',
	'skill profile': 'skill profile',
}

export default function StructuredSheet(props: StructuredSheetProps) {
	const { document, title } = props
	return (
		<>
			{
				<NextSeo
					title={completeTitleMap[title]}
					openGraph={{
						locale: 'en_EN',
						title: completeTitleMap[title] || title,
						type: 'article',
						article: {
							authors: ['https://manuel.fyi/'],
							publishedTime: '2008-01-01T00:00:00Z',
						},
						description: `Manuel Dugués ${
							completeTitleMap[title] || 'document'
						}`,
						images: [
							{
								url: `https://og-image.vercel.app/**Manuel%20Dugu%C3%A9**%20%E2%80%93%20${completeTitleMap[title]}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`,
							},
						],
					}}
				/>
			}
			<Sheet title={title}>
				{document.sections.map((section) => (
					<section
						key={section.sectionTitle}
						className="py-4"
						style={{ orphans: 10, widows: 10 }}
					>
						<h1 className="text-lg font-inline text-gradient bg-gradient-to-tr from-yellow-500 to-yellow-300 mb-2 self-start">
							{section.sectionTitle}
						</h1>
						{section.entries.map((entry, index) => (
							<div className="mb-4 grid grid-cols-4 gap-4" key={index}>
								<h2 className="text-right font-bold text-gradient bg-gradient-to-tr from-green-800 to-teal-600 justify-self-end capitalize">
									{entry.title}
								</h2>
								<div className="col-span-3 flex items-start flex-col">
									{entry.subtitle && (
										<h3 className="font-bold text-gray-700 text-gradient bg-gradient-to-tr from-teal-600 to-yellow-500 justify-self-end capitalize">
											{entry.subtitle}
										</h3>
									)}
									{entry.description.split('\n').map((item) => (
										<p key={item}>{item}</p>
									))}
									{entry.links?.map((link) => (
										<a
											key={link}
											href={link}
											target="_blank"
											className="text-gray-500 text-sm line-clamp-1"
											rel="noopener noreferrer"
										>
											{link.replace('https://', '').replace('www.', '')}
										</a>
									))}
								</div>
							</div>
						))}
					</section>
				))}
			</Sheet>
		</>
	)
}
