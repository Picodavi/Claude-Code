"use client";

import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";

const SECTORS: [string, string][] = [
  ["sect.1t", "sect.1d"],
  ["sect.2t", "sect.2d"],
  ["sect.3t", "sect.3d"],
  ["sect.4t", "sect.4d"],
];

export function Sectors() {
  const t = useT();
  return (
    <Section id="sectors" className="bg-surface/55">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {t("sect.heading")}
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{t("sect.lead")}</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map(([tk, dk]) => (
            <div key={tk} className="rounded-2xl border border-border bg-bg p-6">
              <h3 className="font-display text-lg font-bold text-pine">{t(tk)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(dk)}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
