import ReactPDF from '@react-pdf/renderer'
import PDFDocument from 'components/PDFDocument'
import { StructuredSheetProps } from 'components/StructuredSheet'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
import notEmpty from 'util/notEmpty'

// TODO: Stream the PDF to the client
const pdfHandler = async (
	request: NextApiRequest,
	response: NextApiResponse,
) => {
	const url =
		request.headers.referer ||
		`http://${request.headers.host}/${request.query.url}`
	console.log(
		'process.env.VERCEL_URL',
		`https://${process.env.VERCEL_URL}`,
		url.startsWith(`https://${process.env.VERCEL_URL}`),
	)
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
	try {
		const index = 'skill-profile'
		if (
			process.env.GOOGLE_SHEET_CV_ID == null ||
			process.env.GOOGLE_SHEETS_AUTH == null ||
			process.env.GOOGLE_SHEET_SKILL_PROFILE_ID == null
		)
			throw new Error(
				'GOOGLE_SHEET_CV_ID, GOOGLE_SHEETS_AUTH or GOOGLE_SHEET_SKILL_PROFILE_ID not properly initialized',
			)

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

export default pdfHandler
