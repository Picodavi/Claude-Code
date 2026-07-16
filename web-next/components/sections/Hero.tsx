"use client";

import { useT } from "@/lib/i18n";

export function Hero() {
  const t = useT();
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold-800">
          {t("hero.kicker")}
        </p>

        <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-7xl">
          {t("hero.title1")}{" "}
          <span className="text-pine">{t("hero.title2")}</span>
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          {t("hero.lead")}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-pine px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-pine-700"
          >
            {t("hero.ctaPrimary")}
          </a>
          <a
            href="#work"
            className="rounded-full border border-border bg-bg px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-pine hover:text-pine"
          >
            {t("hero.ctaSecondary")}
          </a>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {["hero.chip1", "hero.chip2", "hero.chip3"].map((k) => (
            <li key={k} className="flex items-center gap-2 text-sm font-medium text-text">
              <span aria-hidden className="text-pine">
                ✓
              </span>
              {t(k)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
