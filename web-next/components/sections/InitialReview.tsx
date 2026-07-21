"use client";

import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { setContactIntent, trackEvent } from "@/lib/analytics";

const POINTS = ["audit.1", "audit.2", "audit.3"] as const;

export function InitialReview() {
  const t = useT();

  return (
    <Section id="revision" className="bg-surface/65">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-pine/20 bg-bg shadow-[0_28px_80px_-48px_rgba(8,52,38,0.55)]">
          <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-800">
                {t("audit.tag")}
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight text-ink sm:text-5xl">
                {t("audit.heading")}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {t("audit.lead")}
              </p>
              <div className="mt-8">
                <a
                  href="#contact"
                  onClick={() => {
                    setContactIntent("audit");
                    trackEvent("cta_clicked", {
                      placement: "initial_review",
                      action: "three_improvements",
                    });
                  }}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine"
                >
                  {t("audit.cta")}
                </a>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
                  {t("audit.micro")}
                </p>
              </div>
            </div>

            <div
              className="relative border-t border-pine/15 bg-pine/[0.045] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12"
              aria-label={t("audit.aria")}
            >
              <div className="pointer-events-none absolute inset-y-0 left-9 hidden w-px bg-gold/35 sm:block" />
              <p className="relative font-mono text-xs font-bold uppercase tracking-[0.18em] text-pine sm:pl-8">
                {t("audit.sheetTag")}
              </p>
              <ol className="relative mt-7 space-y-5">
                {POINTS.map((point, index) => (
                  <li
                    key={point}
                    className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-2xl border border-border/90 bg-bg/90 p-4 shadow-sm sm:gap-5 sm:p-5"
                  >
                    <span className="font-mono text-sm font-bold text-gold-800">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">
                        {t(`${point}t`)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {t(`${point}d`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="relative mt-5 text-sm leading-relaxed text-muted sm:pl-8">
                {t("audit.note")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
