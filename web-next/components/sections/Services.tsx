"use client";

import { motion, type Variants } from "framer-motion";
import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const VALUES: [string, string][] = [
  ["val.1t", "val.1d"],
  ["val.2t", "val.2d"],
  ["val.3t", "val.3d"],
  ["val.6t", "val.6d"],
];
const INCLUDES = ["inc.1t", "inc.2t", "inc.3t", "inc.4t", "inc.5t", "inc.6t"];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Services() {
  const t = useT();
  return (
    <Section id="services">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          tagKey="services.tag"
          headingKey="services.heading"
          leadKey="services.lead"
        />

        <p className="mt-14 font-display text-2xl font-bold text-ink">
          {t("val.heading")}
        </p>
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VALUES.map(([tk, dk]) => (
            <motion.div
              key={tk}
              variants={card}
              className="rounded-2xl border border-border bg-bg/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-gold/60 hover:shadow-[0_24px_50px_-20px_rgba(124,71,18,0.35)]"
            >
              <h3 className="font-display text-lg font-bold text-ink">{t(tk)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(dk)}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-14 rounded-2xl border border-border bg-bg/80 p-8 shadow-sm backdrop-blur">
          <p className="font-mono text-xs uppercase tracking-widest text-gold-800">
            {t("inc.heading")}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {INCLUDES.map((k) => (
              <li
                key={k}
                className="flex items-center gap-2 text-sm font-medium text-text"
              >
                <span aria-hidden className="text-pine">
                  ✓
                </span>
                {t(k)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
