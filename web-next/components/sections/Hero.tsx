"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useT } from "@/lib/i18n";
import { LaptopMock } from "@/components/hero3d/LaptopMock";

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
      <div
        data-hero-panel
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[linear-gradient(140deg,#F2B25C_0%,#DE8E29_40%,#A85D14_80%,#7c4712_100%)] px-6 py-12 shadow-[0_40px_90px_-25px_rgba(124,71,18,0.6)] sm:px-10 sm:py-16 lg:px-14"
      >
        {/* barrido de luz de entrada (una vez) */}
        <div aria-hidden className="panel-sweep z-0" />
        {/* decoración: círculos oscuros translúcidos (profundidad, estilo ref) */}
        <div aria-hidden className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-black/10" />
        <div aria-hidden className="absolute -bottom-32 right-1/3 h-96 w-96 rounded-full bg-black/10" />

        {/* Tipografía decorativa en capas (aria-hidden: el h1 real es el semántico).
            Capa trasera: palabra gigante en trazo, medio oculta tras el Mac. */}
        <div
          aria-hidden
          data-deco-back
          className="pointer-events-none absolute left-[-2%] top-[12%] z-0 select-none whitespace-nowrap font-display text-[15vw] font-extrabold uppercase leading-none tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.34)] lg:text-[11vw]"
        >
          Picodavi
        </div>
        {/* Capa delantera: banda editorial vertical (solo tablet/escritorio). */}
        <div
          aria-hidden
          data-deco-front
          className="pointer-events-none absolute bottom-[10%] right-[4%] z-30 hidden origin-bottom-right -rotate-90 select-none font-mono text-xs font-bold uppercase tracking-[0.4em] text-white/70 sm:block"
        >
          Disseny · Web · Catalunya
        </div>

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          {/* Mac protagonista, integrado entre las capas tipográficas */}
          <div
            data-hero-visual
            className="relative z-10 order-2 h-[320px] sm:h-[440px] lg:order-1 lg:h-[540px]"
          >
            {/* reflejo cálido que proyecta la pantalla del Mac */}
            <div aria-hidden className="mac-reflection" />
            <LaptopMock />
          </div>

          {/* Texto */}
          <motion.div
            data-hero-copy
            className="relative z-20 order-1 lg:order-2"
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
