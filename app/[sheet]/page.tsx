import StructuredSheetContent from 'components/StructuredSheetContent'
import checkCVSPType from 'util/checkCVSPType'
import getGoogleSheetsData from 'util/getGoogleSheetsData'

export const revalidate = 60

export default async function Page({ params }: { params: { sheet: string } }) {
	const { sheet } = params
	const type = sheet.replaceAll('-', ' ')
	checkCVSPType(type)

	const data = await getGoogleSheetsData(type)
	return <StructuredSheetContent {...data} />
}
