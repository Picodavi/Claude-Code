"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useT } from "@/lib/i18n";
import { MagneticButton } from "@/components/ui/MagneticButton";
import coverImg from "@/assets/xalet-cover.jpg";

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

function Poster() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border shadow-xl">
      <Image
        src={coverImg}
        alt="Ejemplo de web hecha por Picodavi"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1024px) 100vw, 40vw"
      />
    </div>
  );
}

export function Hero() {
  const t = useT();
  const reduce = useReducedMotion();
  // Solo cargamos WebGL en pantallas grandes y sin "menos movimiento".
  const [enable3d, setEnable3d] = useState(false);
  useEffect(() => {
    const reduceQ = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnable3d(window.innerWidth >= 1024 && !reduceQ);
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
              className="rounded-full border border-border bg-bg px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-pine hover:text-pine"
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
          {enable3d ? <HeroScene /> : <Poster />}
        </div>
      </div>
    </section>
  );
}
