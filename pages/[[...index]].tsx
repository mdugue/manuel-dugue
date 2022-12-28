import { Github, Linkedin, Twitter } from '@icons-pack/react-simple-icons'
import ClaimCard from 'components/ClaimCard'
import DocumentsNavigation from 'components/DocumentsNavigation'
import { StructuredSheetProps } from 'components/StructuredSheet'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'

const StructuredSheet = dynamic(() => import('components/StructuredSheet'))

function ContactAside() {
	return (
		<aside className="lg:absolute ml-1 mt-16 lg:ml-20 lg:bottom-12 lg:left-0 flex flex-col">
			<SocialProfileJsonLd
				type="Person"
				name="Manuel Dugué"
				url="https://manuel.fyi/"
				sameAs={[
					'https://www.linkedin.com/in/mdugue',
					'https://www.xing.com/profile/Manuel_Dugue',
					'https://github.com/mdugue',
					'https://www.instagram.com/manuel.dugue/',
					'https://www.facebook.com/manuel.dugue/',
				]}
			/>
			<div className="flex text-gray-300 dark:text-gray-500 mb-2">
				<a
					className="mr-2 hover:text-teal-400"
					href="https://www.linkedin.com/in/manuel-dugue/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Linkedin className="coarse:w-12 coarse:h-12 w-8 h-8" />
				</a>
				<a
					className="mr-2 hover:text-teal-400"
					href="https://twitter.com/mdugue"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Twitter className="coarse:w-12 coarse:h-12 w-8 h-8" />
				</a>
				<a
					className="mr-2 hover:text-teal-400"
					href="https://github.com/mdugue"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Github className="coarse:w-12 coarse:h-12 w-8 h-8" />
				</a>
			</div>
			<div className="text-gradient bg-gradient-to-tr from-indigo-500 to-green-500 font-display text-2xl">
				Manuel Dugué
			</div>
		</aside>
	)
}

function LegalSection() {
	return (
		<nav className="font-display absolute bottom-2 left-2 lg:bottom-auto lg:left-auto lg:top-4 lg:right-4 flex flex-col lg:text-right text-gray-300 dark:text-gray-500">
			<Link
				href="/legal"
				prefetch={false}
				className="coarse:h-12 mb-2 hover:text-gray-400"
			>
				legal note
			</Link>
			<Link
				href="/privacy"
				prefetch={false}
				className="coarse:h-12 mb-2 hover:text-gray-400"
			>
				privacy
			</Link>
		</nav>
	)
}

export default function Home(props: { document?: StructuredSheetProps }) {
	const { document } = props
	const isShowingADocument = document != null
	return (
		<>
			{document == null && (
				<NextSeo
					openGraph={{
						type: 'profile',
						profile: {
							firstName: 'Manuel',
							lastName: 'Dugué',
							username: 'mdugue',
						},
						images: [
							{
								url: 'https://og-image.vercel.app/**Manuel%20Dugu%C3%A9**%20%E2%80%93%20handcrafting%20web%20experiences.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg',
							},
						],
					}}
				/>
			)}
			<div
				className={`flex flex-col min-h-screen transform-gpu ${
					isShowingADocument ? 'print:hidden' : ''
				} `}
			>
				<Head>
					<link rel="icon" href="/favicon.ico" />
					<link rel="manifest" href="/manifest.webmanifest"></link>
				</Head>
				<ClaimCard />
				<ContactAside />
				<LegalSection />
				<DocumentsNavigation />
			</div>
			{document != null && (
				<StructuredSheet title={document.title} document={document.document} />
			)}
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		fallback: false,
		paths: [
			{ params: { index: [''] } },
			{ params: { index: ['cv'] } },
			{ params: { index: ['skill-profile'] } },
		],
	}
}

export const getStaticProps: GetStaticProps<
	{ document?: StructuredSheetProps },
	{
		index?: ('cv' | 'skill-profile')[]
	}
> = async (context) => {
	const index = context.params?.index?.[0]
	if (
		process.env.GOOGLE_SHEET_CV_ID == null ||
		process.env.GOOGLE_SHEETS_AUTH == null ||
		process.env.GOOGLE_SHEET_SKILL_PROFILE_ID == null
	)
		throw new Error(
			'GOOGLE_SHEET_CV_ID, GOOGLE_SHEETS_AUTH or GOOGLE_SHEET_SKILL_PROFILE_ID not properly initialized',
		)
	if (index === 'cv') {
		const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_CV_ID)
		const creds = JSON.parse(
			process.env.GOOGLE_SHEETS_AUTH.replace(/(\r\n|\n|\r)/gm, '\\n'),
		)
		await doc.useServiceAccountAuth(creds)
		await doc.loadInfo()
		const sections = await Promise.all(
			doc.sheetsByIndex.map(async (sheet) => {
				const rows = await sheet.getRows()
				return {
					sectionTitle: sheet.title,
					entries: rows.map((row) => ({
						title: row.title,
						subtitle: row.subtitle || null,
						description: row.description,
						links: row.links?.split(',') || null,
					})),
				}
			}),
		)
		const document: StructuredSheetProps = {
			document: { sections },
			title: 'cv',
		}
		return { props: { document }, revalidate: 1 }
	}
	if (index === 'skill-profile') {
		const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_SKILL_PROFILE_ID)
		const creds = JSON.parse(
			process.env.GOOGLE_SHEETS_AUTH.replace(/(\r\n|\n|\r)/gm, '\\n'),
		)
		await doc.useServiceAccountAuth(creds)
		await doc.loadInfo()
		const sections = await Promise.all(
			doc.sheetsByIndex.map(async (sheet) => {
				const rows = await sheet.getRows()
				return {
					sectionTitle: sheet.title,
					entries: rows.map((row) => ({
						title: row.title,
						subtitle: row.subtitle || null,
						description: row.description,
						links: row.links?.split(',') || null,
					})),
				}
			}),
		)
		const document: StructuredSheetProps = {
			document: { sections },
			title: 'skill profile',
		}

		return { props: { document } }
	}

	return { props: {} }
}
