"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useT } from "@/lib/i18n";
import { BrowserMock } from "@/components/hero3d/BrowserMock";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <section id="top" className="px-4 pt-6 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#E9A94D_0%,#D98A34_45%,#B4671A_100%)] px-6 py-10 shadow-[0_30px_80px_-20px_rgba(180,103,26,0.5)] sm:px-10 sm:py-14 lg:px-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
          {/* Mockup de la web (perspectiva 3D en CSS) */}
          <div className="order-2 h-[320px] sm:h-[420px] lg:order-1 lg:h-[520px]">
            <BrowserMock />
          </div>

          {/* Texto */}
          <motion.div
            className="order-1 lg:order-2"
            variants={container}
            initial={reduce ? false : "hidden"}
            animate="show"
          >
            <motion.p
              variants={item}
              className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-white/80"
            >
              {t("hero.kicker")}
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              {t("hero.title1")} {t("hero.title2")}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-md text-base leading-relaxed text-white/85"
            >
              {t("hero.lead")}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="rounded-full bg-[#16130e] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-105"
              >
                {t("hero.ctaPrimary")}
              </a>
              <a
                href="#work"
                className="rounded-full border-2 border-white/80 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#16130e]"
              >
                {t("hero.ctaSecondary")}
              </a>
            </motion.div>

            <motion.ul variants={item} className="mt-10 flex flex-wrap gap-x-7 gap-y-2">
              {["hero.chip1", "hero.chip2", "hero.chip3"].map((k) => (
                <li key={k} className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <span aria-hidden className="text-white">
                    ✓
                  </span>
                  {t(k)}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
