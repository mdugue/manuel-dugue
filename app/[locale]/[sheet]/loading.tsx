import { DrawerSheetContent } from "@/drawer-sheet";

export default function Loading() {
	return (
		<div className="animate-pulse">
			<DrawerSheetContent title="Loading…" />
		</div>
	);
}
