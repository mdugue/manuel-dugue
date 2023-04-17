import Sheet from 'components/Sheet'
import { Metadata } from 'next'

export const revalidate = 60

type Props = {
	children: React.ReactNode
	params: { sheet: string }
}

export default function SheetLayout({ children, params }: Props) {
	const { sheet } = params
	const title = createTitle(sheet)
	return <Sheet title={title}>{children}</Sheet>
}

export async function generateMetadata({
	params,
	...rest
}: Props): Promise<Metadata> {
	console.log('rest', rest)
	console.log('params', params)
	const { sheet } = params
	const title = createTitle(sheet)
	return {
		title,
		alternates: { canonical: `https://manuel.fyi/${sheet}` },
		openGraph: {
			url: `https://manuel.fyi/${sheet}`,
			type: 'article',
			title: `${title} | Manuel Dugué – Freelance Web Development`,
			description:
				"Hey there! I'm Manuel, a media computer scientist born in Berlin with German and French roots.",
			authors: 'https://manuel.fyi/',
			modifiedTime: '2023-17-04T00:00:00Z',
			images: [
				{
					url: `https://og-image.vercel.app/**Manuel%20Dugu%C3%A9**%20%E2%80%93%20${title}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`,
				},
			],
		},
	}
}

const createTitle = (sheet: string) =>
	sheet
		.split('-')
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(' ')
