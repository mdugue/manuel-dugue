import 'server-only'
import en from './dictionaries/en.json'
import de from './dictionaries/de.json'
import fr from './dictionaries/fr.json'
import es from './dictionaries/es.json'
import type { Locale } from './config'

export type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = { en, de, fr, es }

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]
