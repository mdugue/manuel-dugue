import GptClaim from 'app/GptClaim2'
import GptTldr from 'app/GptTldr'
import StructuredSheetContent from 'components/StructuredSheetContent'
import { Suspense } from 'react'
import checkCVSPType from 'util/checkCVSPType'
import getGoogleSheetsData from 'util/getGoogleSheetsData'

export async function generateStaticParams() {
	return ['cv', 'skill-profile'].map((sheet) => ({ sheet }))
}

export const revalidate = 60
//TODO export const runtime = 'edge'

export default async function Page({ params }: { params: { sheet: string } }) {
	const { sheet } = params
	const type = sheet.replaceAll('-', ' ')
	checkCVSPType(type)

	const data = await getGoogleSheetsData(type)
	return (
		<>
			<Suspense fallback={<div>Loading Summary...</div>}>
				<figure className="flex flex-col gap-8">
					<blockquote className="prose">
						{/* @ts-expect-error Async Server Component */}
						<GptClaim text={JSON.stringify(data)} />
					</blockquote>
					<figcaption className="">
						<div className="font-semibold text-gray-900">Manuel Dugué</div>
						<div className="mt-1 text-gray-500">well… actually GPT</div>
					</figcaption>
				</figure>
			</Suspense>
			<details>
				<summary>Show complete List</summary>
				<StructuredSheetContent {...data} />
			</details>
		</>
	)
}
