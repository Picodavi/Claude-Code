"use client";

import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const WHY = ["why1", "why2", "why3", "why4", "why5", "why6"];

export function Why() {
  const t = useT();
  return (
    <Section id="why" className="bg-surface">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tagKey="why.tag"
          headingKey="why.heading"
          leadKey="why.lead"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w) => (
            <div
              key={w}
              data-scene-card
              className="rounded-2xl border border-border bg-bg/85 p-7 shadow-sm backdrop-blur transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-2 hover:border-gold/60 hover:shadow-[0_24px_50px_-20px_rgba(8,52,38,0.3)]"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-pine">
                  {t(`${w}.num`)}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-gold-800">
                  {t(`${w}.unit`)}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                {t(`${w}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`${w}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
