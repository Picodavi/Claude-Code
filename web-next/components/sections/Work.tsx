"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FEATS = ["feat.1", "feat.2", "feat.3", "feat.4"];

export function Work() {
  const t = useT();
  return (
    <Section id="work">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tagKey="work.tag"
          headingKey="work.heading"
          leadKey="work.lead"
        />

        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface">
          <a
            href="https://xaletlacoromina.com"
            target="_blank"
            rel="noopener"
            className="block"
          >
            <Image
              src="/xalet-cover.jpg"
              alt="Xalet La Coromina — web real"
              width={1400}
              height={875}
              className="h-auto w-full"
              priority
            />
          </a>
          <div className="p-7 sm:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-pine/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-pine">
                {t("w1.status")}
              </span>
              <span className="font-mono text-xs text-muted">{t("w1.type")}</span>
            </div>
            <h3 className="mt-4 font-display text-3xl font-extrabold text-ink">
              {t("w1.name")}
            </h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              {t("w1.desc")}
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {FEATS.map((k) => (
                <li key={k} className="flex items-center gap-2 text-sm text-text">
                  <span aria-hidden className="text-pine">
                    ✓
                  </span>
                  {t(k)}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <a
                href="https://xaletlacoromina.com"
                target="_blank"
                rel="noopener"
                className="inline-block rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pine-700"
              >
                {t("feat.visit")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
