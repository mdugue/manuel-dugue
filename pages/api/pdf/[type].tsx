import ReactPDF from '@react-pdf/renderer'
import PDFDocument from 'components/PDFDocument'
import type { NextApiRequest, NextApiResponse } from 'next'
import checkCVSPType from 'util/checkCVSPType'
import getGoogleSheetsData from 'util/getGoogleSheetsData'
import notEmpty from 'util/notEmpty'

export default async function pdfHandler(
	request: NextApiRequest,
	response: NextApiResponse,
) {
	const type =
		typeof request.query.type === 'string'
			? decodeURI(request.query.type || '')
			: ''
	checkCVSPType(type)

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

	try {
		const document = await getGoogleSheetsData(type)

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
