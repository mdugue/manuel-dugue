import type { LocalizedSheetContent } from "@/types/content";
import cv from "./cv";
import legal from "./legal";
import privacy from "./privacy";
import skillProfile from "./skill-profile";

const contentMap: Record<string, LocalizedSheetContent> = {
	"skill-profile": skillProfile,
	cv,
	legal,
	privacy,
};

export default contentMap;

export function getSheetTitle(
	sheet: string,
	locale: "de" | "en",
): string {
	const titles: Record<string, Record<string, string>> = {
		"skill-profile": { de: "Skill Profile", en: "Skill Profile" },
		cv: { de: "Lebenslauf", en: "CV" },
		legal: { de: "Impressum", en: "Legal Note" },
		privacy: { de: "Datenschutz", en: "Privacy" },
	};
	return titles[sheet]?.[locale] ?? sheet;
}
