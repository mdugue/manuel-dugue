import { renderToBuffer } from "@react-pdf/renderer";
import { type NextRequest, NextResponse } from "next/server";
import contentMap, { getSheetTitle } from "@/content";
import type { Locale } from "@/i18n-config";
import SheetPDF from "@/pdf/sheet-pdf";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;
	const locale = (request.nextUrl.searchParams.get("locale") ??
		"de") as Locale;

	const localizedContent = contentMap[slug];
	if (!localizedContent) {
		return NextResponse.json(
			{ error: "Content not found" },
			{ status: 404 },
		);
	}

	const content = localizedContent[locale];
	const title = getSheetTitle(slug, locale);

	const buffer = await renderToBuffer(
		<SheetPDF content={content} title={title} />,
	);

	return new NextResponse(new Uint8Array(buffer), {
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `attachment; filename="${title}.pdf"`,
		},
	});
}
