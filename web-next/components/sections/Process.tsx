"use client";

import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";

const STEPS: [string, string, string][] = [
  ["p1.tag", "p1.title", "p1.desc"],
  ["p2.tag", "p2.title", "p2.desc"],
  ["p3.tag", "p3.title", "p3.desc"],
];

// Bloque OSCURO (ritmo de color): fondo tinta, texto claro, luz ambiental.
export function Process() {
  const t = useT();
  return (
    <Section id="process" className="!px-4 sm:!px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#071d16] px-6 py-14 sm:px-10 lg:px-14">
        {/* Haz de luz dorado en la esquina (ambiente integrado, sin tapar contenido) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(196,220,125,0.25),transparent_70%)]"
        />

        <header className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
            {t("process.tag")}
          </p>
          <h2
            data-sr
            className="mt-3 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight text-white sm:text-5xl"
          >
            {t("process.heading")}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-white/70">{t("process.lead")}</p>
        </header>

        <ol className="relative mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map(([tag, title, desc], i) => (
            <li
              key={tag}
              data-step
              className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition-colors hover:border-gold/50"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-gold">
                {t(tag)}
              </span>
              <span className="mt-3 block font-display text-6xl font-extrabold leading-none text-white/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                {t(title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{t(desc)}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
