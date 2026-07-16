"use client";

import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const PROMISES: [string, string][] = [
  ["comp.1t", "comp.1d"],
  ["comp.2t", "comp.2d"],
  ["comp.3t", "comp.3d"],
];

export function Promises() {
  const t = useT();
  return (
    <Section id="promises">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tagKey="comp.tag"
          headingKey="comp.heading"
          leadKey="comp.lead"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROMISES.map(([tk, dk], i) => (
            <div
              key={tk}
              className="rounded-2xl border border-border bg-surface p-7"
            >
              <span className="font-display text-5xl font-extrabold leading-none text-gold/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">
                {t(tk)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(dk)}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-sm text-muted">{t("comp.sign")}</p>
      </div>
    </Section>
  );
}
