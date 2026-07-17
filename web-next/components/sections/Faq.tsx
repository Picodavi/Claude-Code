"use client";

import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const QA = ["1", "2", "6", "8", "10", "12", "13", "15", "18", "19", "20"];

export function Faq() {
  const t = useT();
  return (
    <Section id="faq" className="bg-surface/55">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          tagKey="faq.tag"
          headingKey="faq.heading"
          leadKey="faq.lead"
        />
        <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-bg">
          {QA.map((n) => (
            <details key={n} className="group px-6 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-ink">
                {t(`faq.q${n}`)}
                <span
                  aria-hidden
                  className="shrink-0 text-xl text-gold-800 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(`faq.a${n}`)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
