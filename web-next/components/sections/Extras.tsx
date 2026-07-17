"use client";

import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";

const EXTRAS: [string, string][] = [
  ["ext.1t", "ext.1d"],
  ["ext.2t", "ext.2d"],
  ["ext.3t", "ext.3d"],
  ["ext.4t", "ext.4d"],
  ["ext.5t", "ext.5d"],
  ["ext.6t", "ext.6d"],
];

export function Extras() {
  const t = useT();
  return (
    <Section id="extras" className="bg-surface/55">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {t("ext.heading")}
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{t("ext.lead")}</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXTRAS.map(([tk, dk]) => (
            <div key={tk} className="rounded-2xl border border-border bg-bg p-6">
              <h3 className="font-display text-lg font-bold text-ink">{t(tk)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(dk)}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted">{t("ext.note")}</p>
      </div>
    </Section>
  );
}
