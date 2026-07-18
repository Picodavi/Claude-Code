"use client";

import { useT } from "@/lib/i18n";

export function SectionHeader({
  tagKey,
  headingKey,
  leadKey,
}: {
  tagKey: string;
  headingKey: string;
  leadKey?: string;
}) {
  const t = useT();
  return (
    <header className="section-header-immersive">
      <span className="section-header-immersive__ghost" data-section-ghost aria-hidden>
        {t(headingKey)}
      </span>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-800">
        {t(tagKey)}
      </p>
      <h2
        data-sr
        className="mt-3 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight text-ink sm:text-5xl"
      >
        {t(headingKey)}
      </h2>
      {leadKey ? (
        <p className="mt-4 max-w-2xl text-lg text-muted">{t(leadKey)}</p>
      ) : null}
    </header>
  );
}
