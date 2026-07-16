"use client";

import { useEffect, useState } from "react";
import { useT, useLang } from "@/lib/i18n";

const LINKS = [
  { href: "#services", key: "nav.services" },
  { href: "#process", key: "nav.process" },
  { href: "#work", key: "nav.work" },
  { href: "#pricing", key: "nav.pricing" },
  { href: "#faq", key: "nav.faq" },
];

export function Nav() {
  const t = useT();
  const { lang, setLang } = useLang();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        solid ? "border-b border-border bg-bg/85 backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight text-ink">
          Picodavi<span className="text-gold">.</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-text transition-colors hover:text-pine"
              >
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label={t("nav.langAria")}
            className="rounded-full border border-border px-3 py-1.5 font-mono text-xs font-bold text-ink transition-colors hover:border-pine hover:text-pine"
          >
            {t("nav.langToggle")}
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-pine-700 sm:inline-block"
          >
            {t("nav.contact")}
          </a>
        </div>
      </nav>
    </header>
  );
}
