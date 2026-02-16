import type { Locale } from "@/i18n-config";

type SheetEntry = {
	date?: string;
	title?: string;
	content?: string;
	links?: string[];
};

type SheetSection = {
	sectionTitle: string;
	entries: SheetEntry[];
};

type SheetContent = SheetSection[];

type LocalizedSheetContent = Record<Locale, SheetContent>;

export type { SheetEntry, SheetSection, SheetContent, LocalizedSheetContent };
