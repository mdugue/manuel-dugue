import Sheet from 'components/Sheet'
import { NextSeo } from 'next-seo'

export const runtime = 'experimental-edge'

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

export default function SheetLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { sheet: string }
}) {
	const { sheet } = params
	const title = sheet.replaceAll('-', ' ')
	return (
		<>
			<NextSeo
				useAppDir
				title={title}
				openGraph={{
					locale: 'en_EN',
					title,
					type: 'article',
					article: {
						authors: ['https://manuel.fyi/'],
						publishedTime: '2008-01-01T00:00:00Z',
					},
					description: `Manuel Dugués ${title}`,
					images: [
						{
							url: `https://og-image.vercel.app/**Manuel%20Dugu%C3%A9**%20%E2%80%93%20${sheet}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`,
						},
					],
				}}
			/>

			<Sheet title={title}>{children}</Sheet>
		</>
	)
}
