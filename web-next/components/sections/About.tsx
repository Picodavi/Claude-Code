"use client";

import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const STATS: [string, string][] = [
  ["about.stat1L", "about.stat1V"],
  ["about.stat2L", "about.stat2V"],
  ["about.stat3L", "about.stat3V"],
  ["about.stat4L", "about.stat4V"],
];

export function About() {
  const t = useT();
  return (
    <Section id="about">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tagKey="about.tag"
          headingKey="about.heading"
          leadKey="about.lead"
        />
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-lg leading-relaxed text-text">{t("about.p1")}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {STATS.map(([l, v]) => (
                <div
                  key={l}
                  className="rounded-2xl border border-border bg-surface p-5"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-gold-800">
                    {t(l)}
                  </p>
                  <p className="mt-1 font-display text-2xl font-extrabold text-ink">
                    {t(v)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-pine/20 bg-pine/5 p-8">
            <h3 className="font-display text-2xl font-bold text-ink">
              {t("tech.heading")}
            </h3>
            <p className="mt-4 leading-relaxed text-text">{t("tech.text")}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
