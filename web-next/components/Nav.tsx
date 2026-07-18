"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [solid, setSolid] = useState(!isHome);

  useEffect(() => {
    const onScroll = () =>
      setSolid(!isHome || window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  const overHero = isHome && !solid;

  return (
    <header
      className={`site-header ${isHome ? "fixed" : "sticky"} left-0 right-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-border/80 bg-bg/88 shadow-[0_12px_40px_-28px_rgba(6,34,25,0.45)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <a
          href={isHome ? "#top" : "/"}
          className={`font-display text-xl font-extrabold tracking-tight transition-colors ${
            overHero ? "text-white" : "text-ink"
          }`}
        >
          Picodavi
          <span className={overHero ? "text-[#c4dc7d]" : "text-gold"}>.</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={isHome ? link.href : `/${link.href}`}
                className={`text-sm font-medium transition-colors ${
                  overHero ? "text-white/76 hover:text-white" : "text-text hover:text-pine"
                }`}
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label={t("nav.langAria")}
            className={`min-h-11 min-w-11 cursor-pointer rounded-full border px-3 py-1.5 font-mono text-xs font-bold transition-colors ${
              overHero
                ? "border-white/25 text-white hover:border-white/70"
                : "border-border text-ink hover:border-pine hover:text-pine"
            }`}
          >
            {t("nav.langToggle")}
          </button>
          <a
            href={isHome ? "#contact" : "/#contact"}
            className={`hidden min-h-11 items-center rounded-full px-5 py-2 text-sm font-semibold transition-all sm:inline-flex ${
              overHero
                ? "bg-white text-pine hover:bg-[#dceba6]"
                : "bg-pine text-white hover:bg-pine-700"
            }`}
          >
            {t("nav.contact")}
          </a>
        </div>
      </nav>
    </header>
  );
}
