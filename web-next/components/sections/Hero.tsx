"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef, useState, type PointerEvent } from "react";
import { useT } from "@/lib/i18n";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroFallback } from "@/components/hero3d/HeroFallback";
import { useSceneCapabilities } from "@/components/hero3d/quality";

const HeroCanvas = dynamic(() => import("@/components/hero3d/HeroCanvas"), {
  ssr: false,
});

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const t = useT();
  const reduce = Boolean(useReducedMotion());
  const section = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const [canvasReady, setCanvasReady] = useState(false);
  const [canvasFailed, setCanvasFailed] = useState(false);
  const capabilities = useSceneCapabilities(reduce);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  const copyOpacity = useTransform(scrollYProgress, [0, 0.38, 0.64], [1, 1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.62], [0, -72]);
  const visualScale = useTransform(scrollYProgress, [0, 0.7, 1], [0.98, 1.03, 1.2]);
  const signalOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.4, 0.7, 0.84],
    [0, 1, 1, 0],
  );
  const signalY = useTransform(scrollYProgress, [0.2, 0.78], [32, -24]);
  const transitionOpacity = useTransform(scrollYProgress, [0.72, 0.94, 1], [0, 0.86, 1]);
  const transitionY = useTransform(scrollYProgress, [0.72, 1], ["30%", "0%"]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (!capabilities.pointerFine || reduce) return;
    pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
    pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const renderCanvas =
    capabilities.ready && capabilities.webgl && !canvasFailed && !reduce;

  return (
    <section
      ref={section}
      id="top"
      className={`hero-experience ${reduce ? "hero-experience--reduced" : ""}`}
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="hero-experience__sticky">
        <div className="hero-experience__atmosphere" aria-hidden>
          <span className="hero-experience__halo hero-experience__halo--a" />
          <span className="hero-experience__halo hero-experience__halo--b" />
          <span className="hero-experience__ridge hero-experience__ridge--a" />
          <span className="hero-experience__ridge hero-experience__ridge--b" />
          <span className="hero-experience__grain" />
        </div>

        <motion.div className="hero-experience__visual" style={{ scale: reduce ? 1 : visualScale }}>
          <HeroFallback canvasReady={canvasReady && renderCanvas} />
          {renderCanvas ? (
            <HeroCanvas
              progress={scrollYProgress}
              pointerX={pointerX}
              pointerY={pointerY}
              pointerEnabled={capabilities.pointerFine}
              quality={capabilities.quality}
              onReady={() => setCanvasReady(true)}
              onError={() => setCanvasFailed(true)}
            />
          ) : null}
        </motion.div>

        <motion.div
          className="hero-experience__copy"
          style={reduce ? undefined : { opacity: copyOpacity, y: copyY }}
          variants={container}
          initial={false}
          animate="show"
        >
          <motion.p variants={item} className="hero-experience__kicker">
            <span aria-hidden />
            {t("hero.kicker")}
          </motion.p>

          <motion.h1 variants={item} className="hero-experience__title">
            <span>{t("hero.title1")}</span>
            <strong>{t("hero.title2")}</strong>
          </motion.h1>

          <motion.p variants={item} className="hero-experience__lead">
            {t("hero.lead")}
          </motion.p>

          <motion.div variants={item} className="hero-experience__actions">
            <MagneticButton href="#contact" className="hero-cta hero-cta--primary">
              {t("hero.ctaPrimary")}
            </MagneticButton>
            <a href="#work" className="hero-cta hero-cta--secondary">
              {t("hero.ctaSecondary")}
            </a>
          </motion.div>

          <motion.ul variants={item} className="hero-experience__proof">
            {["hero.chip1", "hero.chip2", "hero.chip3"].map((key) => (
              <li key={key}>
                <span aria-hidden>✓</span>
                {t(key)}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {!reduce ? (
          <motion.div
            aria-hidden
            className="hero-experience__signal"
            style={{ opacity: signalOpacity, y: signalY }}
          >
            <span>01</span>
            <p>{t("hero.chip2")}</p>
            <i />
            <span>Web · estrategia · código</span>
          </motion.div>
        ) : null}

        <motion.div
          aria-hidden
          className="hero-experience__transition"
          style={reduce ? undefined : { opacity: transitionOpacity, y: transitionY }}
        >
          <div />
        </motion.div>

        {!reduce ? (
          <motion.div
            className="hero-experience__scroll"
            style={{ opacity: indicatorOpacity }}
            aria-hidden
          >
            <span>{t("hero.scroll")}</span>
            <i />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
