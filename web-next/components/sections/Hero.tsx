"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useT } from "@/lib/i18n";
import { MagneticButton } from "@/components/ui/MagneticButton";

// La escena WebGL solo se carga en el cliente (nunca en el HTML del servidor).
const HeroScene = dynamic(() => import("@/components/hero3d/HeroScene"), {
  ssr: false,
});

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// Panel decorativo para móvil (sin WebGL): degradado pino/oro animado.
function DecorFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border">
      <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-pine/30 blur-2xl" />
      <div className="absolute -bottom-8 right-0 h-40 w-40 rounded-full bg-gold/40 blur-2xl" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="h-24 w-24 rotate-12 rounded-3xl bg-gradient-to-br from-pine to-gold shadow-xl" />
      </div>
    </div>
  );
}

export function Hero() {
  const t = useT();
  const reduce = useReducedMotion();
  // El 3D se muestra en pantallas grandes (independiente de reduced-motion,
  // porque gira sobre todo con el scroll, que el usuario controla).
  const [enable3d, setEnable3d] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnable3d(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.p
            variants={item}
            className="font-mono text-xs uppercase tracking-[0.22em] text-gold-800"
          >
            {t("hero.kicker")}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            {t("hero.title1")}{" "}
            <span className="text-pine">{t("hero.title2")}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            {t("hero.lead")}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#contact"
              className="rounded-full bg-pine px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-pine-700"
            >
              {t("hero.ctaPrimary")}
            </MagneticButton>
            <a
              href="#work"
              className="rounded-full border border-border bg-bg/70 px-7 py-3.5 text-base font-semibold text-ink backdrop-blur transition-colors hover:border-pine hover:text-pine"
            >
              {t("hero.ctaSecondary")}
            </a>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3"
          >
            {["hero.chip1", "hero.chip2", "hero.chip3"].map((k) => (
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
          </motion.ul>
        </motion.div>

        <div className="h-[340px] sm:h-[440px] lg:h-[520px]">
          {enable3d ? <HeroScene /> : <DecorFallback />}
        </div>
      </div>
    </section>
  );
}
