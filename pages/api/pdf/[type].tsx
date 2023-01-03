import ReactPDF from '@react-pdf/renderer'
import PDFDocument from 'components/PDFDocument'
import { StructuredSheetProps } from 'components/StructuredSheet'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
import notEmpty from 'util/notEmpty'

type SupportedType = 'cv' | 'skill profile'

function checkType(t: string): asserts t is SupportedType {
	if (t !== 'cv' && t !== 'skill profile') throw new Error('invalid type')
}

export default async function pdfHandler(
	request: NextApiRequest,
	response: NextApiResponse,
) {
	const type =
		typeof request.query.type === 'string'
			? decodeURI(request.query.type || '')
			: ''
	checkType(type)

	const url =
		request.headers.referer ||
		`http://${request.headers.host}/${request.query.url}`
	if (
		![
			'http://localhost:3000/',
			'https://manuel.fyi/',
			`https://${process.env.VERCEL_URL}`,
		]
			.filter(notEmpty)
			.some((allowedDomain) => url.startsWith(allowedDomain))
	) {
		response.statusCode = 403
		response.setHeader('Content-Type', 'text/html')
		response.end(
			`<h1>not allowed</h1><p>Sorry, this is for internal usage only</p>
      <a href="/">back</a>`,
		)
		return
	}
	const googleSheetId =
		type === 'cv'
			? process.env.GOOGLE_SHEET_CV_ID
			: process.env.GOOGLE_SHEET_SKILL_PROFILE_ID
	try {
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
		)
		const document: StructuredSheetProps = {
			document: { sections },
			title: type,
		}

		const fileStream = await ReactPDF.renderToStream(
			<PDFDocument {...document} />,
		)

		response.statusCode = 200
		response.setHeader('Content-Type', `application/pdf`)
		fileStream.pipe(response)
		fileStream.on('end', () => console.log('Done streaming, response sent.'))
	} catch (e: unknown) {
		response.statusCode = 500
		response.setHeader('Content-Type', 'text/html')
		response.end(
			`<h1>Server Error</h1><p>Sorry, there was a problem</p><code>${JSON.stringify(
				e,
			)}</code>`,
		)
	}
}
