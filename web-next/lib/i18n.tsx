"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { resolve, DEFAULT_LANG, type Lang } from "./i18n-core";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };

const LanguageContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "picodavi-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // En el export estático se pre-renderiza con ES; el cliente ajusta al hidratar.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") {
      document.documentElement.lang = saved;
      const frame = window.requestAnimationFrame(() => setLangState(saved));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback((k: string) => resolve(lang, k), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const c = useContext(LanguageContext);
  if (!c) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return { lang: c.lang, setLang: c.setLang };
}

export function useT() {
  const c = useContext(LanguageContext);
  if (!c) throw new Error("useT debe usarse dentro de <LanguageProvider>");
  return c.t;
}
