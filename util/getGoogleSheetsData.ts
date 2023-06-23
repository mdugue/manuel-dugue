import { kv } from '@vercel/kv'
import { StructuredSheetProps } from 'components/StructuredSheetContent'
import { GoogleSpreadsheet } from 'google-spreadsheet'

export default async function getGoogleSheetsData(
	type: 'cv' | 'skill profile',
) {
	const cache = await kv.get<StructuredSheetProps>(type)
	if (cache) {
		console.log(type, 'cache hit')
		return cache
	}
	console.log(type, 'cache miss')

	const googleSheetId =
		type === 'cv'
			? process.env.GOOGLE_SHEET_CV_ID
			: process.env.GOOGLE_SHEET_SKILL_PROFILE_ID

	if (googleSheetId == null || process.env.GOOGLE_SHEETS_AUTH == null)
		throw new Error(
			'GOOGLE_SHEET_CV_ID, GOOGLE_SHEETS_AUTH or GOOGLE_SHEET_SKILL_PROFILE_ID not properly initialized',
		)

	const doc = new GoogleSpreadsheet(googleSheetId)
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
	).catch((e) => {
		throw new Error('Failed to fetch data', e)
	})
	const document: StructuredSheetProps = {
		document: { sections },
		title: type,
	}
	await kv.set(type, document, { ex: 120 }) // cache for 2 minutes
	return document
}
