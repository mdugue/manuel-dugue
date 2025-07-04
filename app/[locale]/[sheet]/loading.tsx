import { SheetContent } from '@/Sheet';

export default function Loading() {
	return (
		<div className="animate-pulse">
			<SheetContent title="Loading…" />
		</div>
	);
}
