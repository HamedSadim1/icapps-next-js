
import type { Locale } from './i18n-config'

import en from './dictionaries/locales/en/common.json';
import nl from './dictionaries/locales/nl/common.json';
import fr from './dictionaries/locales/fr/common.json';

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: en,
  nl: nl,
  fr: fr,
}

export const getDictionary = (locale: Locale) =>
  dictionaries[locale] ?? dictionaries.en