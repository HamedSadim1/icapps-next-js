import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default function getTranslation(lang:Locale) {
    const translation = getDictionary(lang)
    return translation;
  }