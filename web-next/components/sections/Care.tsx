"use client";

import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";

const PLANS = [
  { name: "rec.1name", price: "rec.1price", desc: "rec.1desc", badge: null, save: null, featured: false },
  { name: "rec.2name", price: "rec.2price", desc: "rec.2desc", badge: "rec.2badge", save: null, featured: true },
  { name: "rec.3name", price: "rec.3price", desc: "rec.3desc", badge: "rec.3badge", save: "rec.3save", featured: false },
] as const;

export function Care() {
  const t = useT();
  return (
    <Section id="care">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {t("rec.heading")}
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{t("rec.lead")}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              data-scene-card
              className={`flex flex-col rounded-2xl border p-7 ${
                p.featured
                  ? "border-pine bg-pine/5"
                  : "border-border bg-surface"
              }`}
            >
              {p.badge ? (
                <span className="mb-3 self-start rounded-full bg-pine px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-white">
                  {t(p.badge)}
                </span>
              ) : null}
              <h3 className="font-display text-xl font-bold text-ink">
                {t(p.name)}
              </h3>
              <p className="mt-1 font-mono text-lg font-bold text-pine">
                {t(p.price)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(p.desc)}
              </p>
              {p.save ? (
                <p className="mt-3 font-mono text-xs text-gold-800">
                  {t(p.save)}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted">{t("rec.note")}</p>
      </div>
    </Section>
  );
}
