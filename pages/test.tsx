import PDFDocument from 'components/PDFDocument'
import { StructuredSheetProps } from 'components/StructuredSheet'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

const PDFViewer = dynamic(
	() => import('@react-pdf/renderer').then((e) => ({ default: e.PDFViewer })),
	{ ssr: false },
)

export default function Test(props: { document?: StructuredSheetProps }) {
	const { document } = props
	return (
		<PDFViewer className="w-full aspect-[3/4]">
			{document && <PDFDocument {...document} />}
		</PDFViewer>
	)
}

export const getStaticProps: GetStaticProps<{
	document?: StructuredSheetProps
}> = async (context) => {
	const index = 'skill-profile'
	if (
		process.env.GOOGLE_SHEET_CV_ID == null ||
		process.env.GOOGLE_SHEETS_AUTH == null ||
		process.env.GOOGLE_SHEET_SKILL_PROFILE_ID == null
	)
		throw new Error(
			'GOOGLE_SHEET_CV_ID, GOOGLE_SHEETS_AUTH or GOOGLE_SHEET_SKILL_PROFILE_ID not properly initialized',
		)

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
