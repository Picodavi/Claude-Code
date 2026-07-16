"use client";

import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const AUD: [string, string][] = [
  ["aud.2t", "aud.2d"],
  ["aud.3t", "aud.3d"],
  ["aud.4t", "aud.4d"],
];

export function Fit() {
  const t = useT();
  return (
    <Section id="fit">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tagKey="fit.tag"
          headingKey="fit.heading"
          leadKey="fit.lead"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {AUD.map(([tk, dk]) => (
            <div
              key={tk}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="font-display text-lg font-bold text-ink">{t(tk)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(dk)}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-pine/25 bg-pine/5 p-7">
            <p className="font-display text-lg font-bold text-pine">
              {t("fit.yesTitle")}
            </p>
            <ul className="mt-4 space-y-3">
              {["fit.yes1", "fit.yes2", "fit.yes3", "fit.yes4"].map((k) => (
                <li key={k} className="flex gap-3 text-sm text-text">
                  <span aria-hidden className="mt-0.5 text-pine">
                    ✓
                  </span>
                  {t(k)}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-7">
            <p className="font-display text-lg font-bold text-ink">
              {t("fit.noTitle")}
            </p>
            <ul className="mt-4 space-y-3">
              {["fit.no1", "fit.no2", "fit.no3", "fit.no4"].map((k) => (
                <li key={k} className="flex gap-3 text-sm text-muted">
                  <span aria-hidden className="mt-0.5 text-gold-800">
                    →
                  </span>
                  {t(k)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-5">
          <p className="max-w-3xl text-base leading-relaxed text-text">
            {t("fit.close")}
          </p>
          <a
            href="#contact"
            className="rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pine-700"
          >
            {t("aud.cta")}
          </a>
        </div>
      </div>
    </Section>
  );
}
