import { notFound } from "next/navigation";
import { lang } from "next/root-params";

import { hasLocale } from "./config";
import type { Locale } from "./config";

/** The `[lang]` root param as a supported locale. Anything else is a 404. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) {
    notFound();
  }
  return value;
}
