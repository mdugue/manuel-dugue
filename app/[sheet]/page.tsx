import StructuredSheetContent from 'components/StructuredSheetContent'
import checkCVSPType from 'util/checkCVSPType'
import getGoogleSheetsData from 'util/getGoogleSheetsData'

export async function generateStaticParams() {
	return ['cv', 'skill-profile'].map((sheet) => ({ sheet }))
}

export const revalidate = 10

export default async function Page({ params }: { params: { sheet: string } }) {
	const { sheet } = params
	const type = sheet.replaceAll('-', ' ')
	checkCVSPType(type)

	const data = await getGoogleSheetsData(type)
	return <StructuredSheetContent {...data} />
}
