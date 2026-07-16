"use client";

import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const VALUES: [string, string][] = [
  ["val.1t", "val.1d"],
  ["val.2t", "val.2d"],
  ["val.3t", "val.3d"],
  ["val.6t", "val.6d"],
];
const INCLUDES = ["inc.1t", "inc.2t", "inc.3t", "inc.4t", "inc.5t", "inc.6t"];

export function Services() {
  const t = useT();
  return (
    <Section id="services">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tagKey="services.tag"
          headingKey="services.heading"
          leadKey="services.lead"
        />

        <p className="mt-14 font-display text-2xl font-bold text-ink">
          {t("val.heading")}
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(([tk, dk]) => (
            <div
              key={tk}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-pine/40"
            >
              <h3 className="font-display text-lg font-bold text-ink">{t(tk)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(dk)}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-bg p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-gold-800">
            {t("inc.heading")}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {INCLUDES.map((k) => (
              <li
                key={k}
                className="flex items-center gap-2 text-sm font-medium text-text"
              >
                <span aria-hidden className="text-pine">
                  ✓
                </span>
                {t(k)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
