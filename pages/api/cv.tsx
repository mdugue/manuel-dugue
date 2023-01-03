import ReactPDF from '@react-pdf/renderer'
import PDFDocument from 'components/PDFDocument'
import { StructuredSheetProps } from 'components/StructuredSheet'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

async function logFiles(directoryPath: string) {
	console.log('directoryPath', directoryPath)
	try {
		const fileNames = await fs.readdir(directoryPath, { withFileTypes: true })

		//listing all files using forEach
		fileNames.forEach(function (file) {
			// Do whatever you want to do with the file
			console.log(directoryPath, file)
		})
	} catch (err) {
		console.log('err', err)
	}
}

// TODO: Stream the PDF to the client
const pdfHandler = async (
	request: NextApiRequest,
	response: NextApiResponse,
) => {
	console.log('1')
	const url =
		request.headers.referer ||
		`http://${request.headers.host}/${request.query.url}`
	/* TODO VERCEL_URL if (
		!['http://localhost:3000/', 'https://manuel.fyi/'].some((allowedDomain) =>
			url.startsWith(allowedDomain),
		)
	) {
		response.statusCode = 403
		response.setHeader('Content-Type', 'text/html')
		response.end(
			`<h1>not allowed</h1><p>Sorry, this is for internal usage only</p>
      <a href="/">back</a>`,
		)
		return
	} */
	try {
		console.log('cwd')
		logFiles(process.cwd())

		console.log('cwd/public')
		logFiles(path.resolve(process.cwd(), 'public'))

		console.log('cwd/fonts')
		logFiles(path.resolve(process.cwd(), 'fonts'))

		console.log('cwd/public/fonts')
		logFiles(path.resolve(process.cwd(), 'public', 'fonts'))
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
		console.log('2')
		const creds = JSON.parse(
			process.env.GOOGLE_SHEETS_AUTH.replace(/(\r\n|\n|\r)/gm, '\\n'),
		)
		console.log('3')
		await doc.useServiceAccountAuth(creds)
		await doc.loadInfo()
		console.log('4')
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
		console.log('5')
		console.log('fileStream', fileStream)

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
