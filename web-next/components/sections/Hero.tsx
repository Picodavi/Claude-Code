"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useT } from "@/lib/i18n";
import { LaptopMock } from "@/components/hero3d/LaptopMock";
import { Ball } from "@/components/ui/Ball";

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
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[linear-gradient(140deg,#F2B25C_0%,#DE8E29_40%,#A85D14_80%,#7c4712_100%)] px-6 py-12 shadow-[0_40px_90px_-25px_rgba(124,71,18,0.6)] sm:px-10 sm:py-16 lg:px-14">
        {/* decoración: círculos oscuros translúcidos (profundidad, estilo ref) */}
        <div aria-hidden className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-black/10" />
        <div aria-hidden className="absolute -bottom-32 right-1/3 h-96 w-96 rounded-full bg-black/10" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          {/* Portátil + esferas flotantes */}
          <div className="relative order-2 h-[360px] sm:h-[440px] lg:order-1 lg:h-[540px]">
            {/* esferas detrás */}
            <Ball size={130} color="#201a14" className="ball-a -left-2 top-2 sm:left-0 sm:top-6" />
            <Ball size={56} color="#f7f3ea" className="ball-b right-6 top-0" />
            <Ball size={44} color="#15533B" className="ball-c left-10 bottom-24 z-0" />
            {/* portátil */}
            <div className="absolute inset-0 z-10 px-4 py-6 sm:px-8">
              <LaptopMock />
            </div>
            {/* esferas delante (solapan el portátil, como la referencia) */}
            <Ball size={84} color="#DE8E29" className="ball-b -right-2 bottom-16 z-20 sm:right-2" />
            <Ball size={38} color="#201a14" className="ball-a bottom-4 left-1/4 z-20" />
            <Ball size={26} color="#f7f3ea" className="ball-c right-1/4 top-10 z-20" />
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
