// Lógica i18n pura (sin React), para poder testearla sin DOM.
import { dict, type Lang } from "../content/i18n";

export type { Lang };
export const LANGS: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";

/** Resuelve una clave i18n. Si falta en el idioma, cae al ES; si tampoco, a la clave. */
export function resolve(lang: Lang, key: string): string {
  return dict[lang]?.[key] ?? dict[DEFAULT_LANG]?.[key] ?? key;
}
