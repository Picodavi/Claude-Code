"use client";

import { useEffect, useRef } from "react";
import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { setContactIntent, trackEvent } from "@/lib/analytics";

type Cell =
  | { kind: "val"; key: string }
  | { kind: "yes" }
  | { kind: "no" }
  | { kind: "yesval"; key: string };

const ROWS: { label: string; cells: [Cell, Cell, Cell] }[] = [
  {
    label: "price.rowPrice",
    cells: [
      { kind: "val", key: "price.p1" },
      { kind: "val", key: "price.p2" },
      { kind: "val", key: "price.p3" },
    ],
  },
  {
    label: "price.rowPages",
    cells: [
      { kind: "val", key: "price.pages1" },
      { kind: "val", key: "price.pages2" },
      { kind: "val", key: "price.pages3" },
    ],
  },
  {
    label: "price.rowDesign",
    cells: [{ kind: "yes" }, { kind: "yes" }, { kind: "yes" }],
  },
  {
    label: "price.rowMobile",
    cells: [{ kind: "no" }, { kind: "yes" }, { kind: "no" }],
  },
  {
    label: "price.rowForm",
    cells: [{ kind: "no" }, { kind: "yes" }, { kind: "no" }],
  },
  {
    label: "price.rowLegal",
    cells: [
      { kind: "val", key: "price.changes1" },
      { kind: "yesval", key: "price.changes3" },
      { kind: "val", key: "price.changes1" },
    ],
  },
  {
    label: "price.rowRadar",
    cells: [{ kind: "no" }, { kind: "yesval", key: "price.radar2" }, { kind: "no" }],
  },
  {
    label: "price.rowRounds",
    cells: [{ kind: "no" }, { kind: "yes" }, { kind: "no" }],
  },
  {
    label: "price.rowChanges",
    cells: [
      { kind: "val", key: "price.panel1" },
      { kind: "yesval", key: "price.panel2" },
      { kind: "val", key: "price.panel3" },
    ],
  },
  {
    label: "price.rowHour",
    cells: [
      { kind: "val", key: "price.hour1" },
      { kind: "val", key: "price.hour2" },
      { kind: "val", key: "price.hour3" },
    ],
  },
];

const MOBILE_PLANS = [
  {
    name: "price.col2",
    price: "price.p2",
    fit: "price.fit2",
    features: ["price.m2a", "price.m2b", "price.m2c", "price.m2d"],
    recommended: true,
  },
  {
    name: "price.col1",
    price: "price.p1",
    fit: "price.fit1",
    features: ["price.m1a", "price.m1b", "price.m1c", "price.m1d"],
    recommended: false,
  },
  {
    name: "price.col3",
    price: "price.p3",
    fit: "price.fit3",
    features: ["price.m3a", "price.m3b", "price.m3c", "price.m3d"],
    recommended: false,
  },
] as const;

export function Pricing() {
  const t = useT();
  const observedRef = useRef<HTMLDivElement>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const element = observedRef.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasTrackedView.current) return;
        hasTrackedView.current = true;
        trackEvent("pricing_viewed", { placement: "pricing" });
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const renderCell = (cell: Cell) => {
    switch (cell.kind) {
      case "yes":
        return <span className="text-pine" aria-label={t("price.included")}>✓</span>;
      case "no":
        return <span className="text-muted" aria-label={t("price.notIncluded")}>—</span>;
      case "val":
        return <span className="font-mono text-sm">{t(cell.key)}</span>;
      case "yesval":
        return (
          <span className="font-mono text-sm">
            <span className="text-pine" aria-hidden="true">✓</span> {t(cell.key)}
          </span>
        );
    }
  };

  function onPlanHelp() {
    setContactIntent("plan_help");
    trackEvent("cta_clicked", { placement: "pricing", action: "plan_help" });
  }

  return (
    <Section id="pricing">
      <div ref={observedRef} className="mx-auto max-w-6xl">
        <SectionHeader
          tagKey="price.tag"
          headingKey="price.heading"
          leadKey="price.lead"
        />

        <div className="mt-10 grid gap-4 md:hidden" aria-label={t("price.compareCaption")}>
          {MOBILE_PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-3xl border p-6 ${
                plan.recommended
                  ? "border-pine/35 bg-pine/[0.045] shadow-[0_20px_50px_-38px_rgba(8,52,38,0.65)]"
                  : "border-border bg-bg"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">
                    {t(plan.name)}
                  </h3>
                  <p className="mt-2 font-mono text-sm font-bold text-pine">
                    {t(plan.price)}
                  </p>
                </div>
                {plan.recommended && (
                  <span className="rounded-full bg-pine px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-white">
                    {t("price.col2badge")}
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{t(plan.fit)}</p>
              <ul className="mt-5 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="grid grid-cols-[1rem_1fr] gap-2 text-sm leading-relaxed text-text">
                    <span className="font-bold text-pine" aria-hidden="true">✓</span>
                    <span>{t(feature)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{t("price.compareCaption")}</caption>
            <thead>
              <tr>
                <th className="w-1/4 p-4" />
                <th className="p-4 align-bottom font-display text-lg font-bold text-ink">
                  {t("price.col1")}
                </th>
                <th className="rounded-t-2xl bg-pine/5 p-4 align-bottom font-display text-lg font-bold text-pine">
                  {t("price.col2")}
                  <span className="ml-2 rounded-full bg-pine px-2 py-0.5 align-middle font-mono text-[10px] font-bold uppercase tracking-wide text-white">
                    {t("price.col2badge")}
                  </span>
                </th>
                <th className="p-4 align-bottom font-display text-lg font-bold text-ink">
                  {t("price.col3")}
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <th scope="row" className="p-4 text-sm font-medium text-text">
                    {t(row.label)}
                  </th>
                  <td className="p-4 text-text">{renderCell(row.cells[0])}</td>
                  <td className="bg-pine/5 p-4 text-text">{renderCell(row.cells[1])}</td>
                  <td className="p-4 text-text">{renderCell(row.cells[2])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-muted">{t("price.note")}</p>
        <a
          href="#contact"
          onClick={onPlanHelp}
          className="mt-6 inline-flex min-h-12 items-center rounded-full border border-pine px-6 py-3 text-sm font-semibold text-pine transition-colors hover:bg-pine hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine"
        >
          {t("price.cta")}
        </a>
      </div>
    </Section>
  );
}
