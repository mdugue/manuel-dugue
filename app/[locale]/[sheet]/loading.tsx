import { DocumentSheetContent } from "@/document-sheet";

export default function Loading() {
	return (
		<div className="animate-pulse">
			<DocumentSheetContent title="Loading…" />
		</div>
	);
}
