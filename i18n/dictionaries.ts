import "server-only";
import type { Locale } from "./config";
import de from "./dictionaries/de.json";
import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";
import fr from "./dictionaries/fr.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { de, en, es, fr };

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale];
