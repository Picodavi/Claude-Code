"use client";

import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { trackEvent } from "@/lib/analytics";

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

export function Pricing() {
  const t = useT();

  const renderCell = (cell: Cell) => {
    switch (cell.kind) {
      case "yes":
        return <span className="text-pine">✓</span>;
      case "no":
        return <span className="text-muted">—</span>;
      case "val":
        return <span className="font-mono text-sm">{t(cell.key)}</span>;
      case "yesval":
        return (
          <span className="font-mono text-sm">
            <span className="text-pine">✓</span> {t(cell.key)}
          </span>
        );
    }
  };

  return (
    <Section id="pricing">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tagKey="price.tag"
          headingKey="price.heading"
          leadKey="price.lead"
        />

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
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
                  <th
                    scope="row"
                    className="p-4 text-sm font-medium text-text"
                  >
                    {t(row.label)}
                  </th>
                  <td className="p-4 text-text">{renderCell(row.cells[0])}</td>
                  <td className="bg-pine/5 p-4 text-text">
                    {renderCell(row.cells[1])}
                  </td>
                  <td className="p-4 text-text">{renderCell(row.cells[2])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-muted">{t("price.note")}</p>
        <a
          href="#contact"
          onClick={() => trackEvent("cta_clicked", { placement: "pricing", action: "plan_help" })}
          className="mt-6 inline-block rounded-full border border-pine px-6 py-3 text-sm font-semibold text-pine transition-colors hover:bg-pine hover:text-white"
        >
          {t("price.cta")}
        </a>
      </div>
    </Section>
  );
}
