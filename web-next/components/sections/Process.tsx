"use client";

import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const STEPS: [string, string, string][] = [
  ["p1.tag", "p1.title", "p1.desc"],
  ["p2.tag", "p2.title", "p2.desc"],
  ["p3.tag", "p3.title", "p3.desc"],
];

export function Process() {
  const t = useT();
  return (
    <Section id="process" className="bg-surface">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tagKey="process.tag"
          headingKey="process.heading"
          leadKey="process.lead"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map(([tag, title, desc], i) => (
            <li
              key={tag}
              className="rounded-2xl border border-border bg-bg p-7"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-gold-800">
                {t(tag)}
              </span>
              <span className="mt-3 block font-display text-6xl font-extrabold leading-none text-pine/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-ink">
                {t(title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(desc)}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
