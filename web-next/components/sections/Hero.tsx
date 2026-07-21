"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useT } from "@/lib/i18n";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroFallback } from "@/components/hero3d/HeroFallback";
import { LaptopMock } from "@/components/hero3d/LaptopMock";
import { useSceneCapabilities } from "@/components/hero3d/quality";
import { useMotionPreference } from "@/components/motion/MotionPreference";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HeroCanvas = dynamic(() => import("@/components/hero3d/HeroCanvas"), {
  ssr: false,
});

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.065, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const t = useT();
  const section = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const [canvasReady, setCanvasReady] = useState(false);
  const [canvasFailed, setCanvasFailed] = useState(false);
  const { hydrated, reduceMotion, toggleMotion } = useMotionPreference();
  const capabilities = useSceneCapabilities(reduceMotion);
  const renderCanvas =
    capabilities.ready && capabilities.webgl && !canvasFailed && !reduceMotion;

  useGSAP(
    () => {
      const root = section.current;
      if (!root) return;

      progress.set(0);
      if (reduceMotion) {
        gsap.set(
          "[data-hero-mac], [data-hero-phone], [data-hero-phone-screen], [data-hero-copy], [data-hero-word], [data-hero-plane], [data-hero-portal], [data-hero-progress]",
          { clearProps: "all" },
        );
        return;
      }

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 901px)",
          compact: "(max-width: 900px)",
        },
        (context) => {
          const desktop = Boolean(context.conditions?.desktop);
          const device = root.querySelector<HTMLElement>(
            desktop ? "[data-hero-mac]" : "[data-hero-phone]",
          );
          const pointerLayer = root.querySelector<HTMLElement>("[data-hero-pointer]");
          if (!device) return;

          gsap.set(device, {
            transformPerspective: desktop ? 1500 : 1100,
            transformOrigin: "50% 52%",
            force3D: true,
          });
          gsap.set("[data-hero-portal]", { autoAlpha: 0, scale: 0.18 });
          gsap.set("[data-hero-progress]", { scaleX: 0, transformOrigin: "left center" });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: desktop ? 0.65 : 0.35,
              invalidateOnRefresh: true,
              onUpdate: (self) => progress.set(self.progress),
            },
          });

          timeline
            .fromTo(
              device,
              desktop
                ? { xPercent: 8, yPercent: 8, rotationX: 5, rotationY: -13, rotationZ: -1, scale: 0.78 }
                : { xPercent: 2, yPercent: 4, rotationX: 3, rotationY: -8, scale: 0.8 },
              desktop
                ? { xPercent: 0, yPercent: 0, rotationX: -2, rotationY: 7, rotationZ: 0, scale: 1, duration: 0.2 }
                : { xPercent: 0, yPercent: -2, rotationX: -1, rotationY: 5, scale: 0.9, duration: 0.24 },
              0,
            )
            .to(
              device,
              desktop
                ? { xPercent: -16, yPercent: -5, rotationX: 4, rotationY: -24, rotationZ: 1.5, scale: 1.16, duration: 0.25 }
                : { xPercent: -2, yPercent: -6, rotationX: 3, rotationY: -12, scale: 1, duration: 0.28 },
            )
            .to(
              device,
              desktop
                ? { xPercent: -34, yPercent: 3, rotationX: -4, rotationY: 10, rotationZ: -1, scale: 1.52, duration: 0.25 }
                : { xPercent: -3, yPercent: -2, rotationX: -2, rotationY: 7, scale: 1.08, duration: 0.27 },
            )
            .to(
              device,
              desktop
                ? { xPercent: -48, yPercent: 12, rotationX: 0, rotationY: 0, rotationZ: 0, scale: 2.85, duration: 0.3 }
                : { xPercent: 2, yPercent: 6, rotationX: 0, rotationY: 0, scale: 1.18, duration: 0.21 },
            )
            .to("[data-hero-copy]", { autoAlpha: 0, yPercent: -20, duration: 0.28 }, 0.2)
            .to(".hero-title-line--one", { xPercent: -16, yPercent: -65, duration: 0.28 }, 0.18)
            .to(".hero-title-line--three", { xPercent: -22, yPercent: 28, duration: 0.36 }, 0.2)
            .fromTo(".hero-kinetic__word--back", { xPercent: 18, scale: 0.86 }, { xPercent: -26, scale: 1.12, duration: 1 }, 0)
            .fromTo(".hero-kinetic__word--mid", { xPercent: -34, yPercent: 18 }, { xPercent: 30, yPercent: -16, duration: 1 }, 0)
            .fromTo(".hero-kinetic__word--front", { xPercent: 35, yPercent: -20 }, { xPercent: -48, yPercent: 24, duration: 1 }, 0)
            .to(".hero-plane--a", { xPercent: -22, yPercent: -18, rotation: -9, duration: 1 }, 0)
            .to(".hero-plane--b", { xPercent: 18, yPercent: 24, rotation: 14, duration: 1 }, 0)
            .to(".hero-plane--c", { xPercent: -12, yPercent: -30, rotation: -4, duration: 1 }, 0)
            .to(".hero-mac__screen-accent", { xPercent: 210, duration: 0.72 }, 0.12)
            .fromTo(
              ".hero-experience__signal",
              { autoAlpha: 0, x: 32 },
              { autoAlpha: 1, x: 0, duration: 0.18 },
              0.2,
            )
            .to(".hero-experience__signal", { autoAlpha: 0, x: -22, duration: 0.16 }, 0.58)
            .to("[data-hero-progress]", { scaleX: 1, duration: 1 }, 0)
            .to(
              device,
              {
                autoAlpha: 0,
                duration: desktop ? 0.1 : 0.12,
                ease: "power1.in",
              },
              desktop ? 0.66 : 0.86,
            )
            .to(
              "[data-hero-portal]",
              {
                autoAlpha: 1,
                scale: desktop ? 4.8 : 4.2,
                borderRadius: 0,
                duration: desktop ? 0.3 : 0.18,
              },
              desktop ? 0.66 : 0.82,
            );

          if (!desktop) {
            timeline
              .fromTo(
                "[data-hero-phone-screen]",
                { yPercent: 0, scale: 1.08 },
                { yPercent: -10, scale: 1.18, duration: 0.82 },
                0.04,
              )
              .to(
                ".hero-phone__screen-accent",
                { xPercent: 220, duration: 0.68 },
                0.12,
              );
          }

          if (!desktop || !capabilities.pointerFine || !pointerLayer) return;

          const pointerRotateX = gsap.quickTo(pointerLayer, "rotationX", {
            duration: 0.55,
            ease: "power3.out",
          });
          const pointerRotateY = gsap.quickTo(pointerLayer, "rotationY", {
            duration: 0.55,
            ease: "power3.out",
          });
          const planeX = gsap.quickTo(".hero-plane--b", "x", {
            duration: 0.9,
            ease: "power3.out",
          });
          const onPointerMove = (event: PointerEvent) => {
            const x = (event.clientX / window.innerWidth - 0.5) * 2;
            const y = (event.clientY / window.innerHeight - 0.5) * 2;
            pointerX.set(x);
            pointerY.set(y);
            pointerRotateX(y * -4);
            pointerRotateY(x * 7);
            planeX(x * 24);
          };
          const onPointerLeave = () => {
            pointerX.set(0);
            pointerY.set(0);
            pointerRotateX(0);
            pointerRotateY(0);
            planeX(0);
          };

          root.addEventListener("pointermove", onPointerMove, { passive: true });
          root.addEventListener("pointerleave", onPointerLeave);
          return () => {
            root.removeEventListener("pointermove", onPointerMove);
            root.removeEventListener("pointerleave", onPointerLeave);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: section, dependencies: [reduceMotion, capabilities.pointerFine], revertOnUpdate: true },
  );

  return (
    <section
      ref={section}
      id="top"
      className={`hero-experience ${reduceMotion ? "hero-experience--reduced" : ""}`}
    >
      <div className="hero-experience__sticky">
        <div className="hero-experience__atmosphere" aria-hidden>
          <span className="hero-atmosphere__grid" />
          <span className="hero-atmosphere__beam" />
          <span className="hero-atmosphere__sheet hero-atmosphere__sheet--a" />
          <span className="hero-atmosphere__sheet hero-atmosphere__sheet--b" />
          <span className="hero-experience__grain" />
        </div>

        <div className="hero-experience__planes" aria-hidden>
          <span className="hero-plane hero-plane--a" data-hero-plane />
          <span className="hero-plane hero-plane--b" data-hero-plane />
          <span className="hero-plane hero-plane--c" data-hero-plane />
        </div>

        <div className="hero-kinetic hero-kinetic--back" aria-hidden>
          <span className="hero-kinetic__word hero-kinetic__word--back" data-hero-word>WEB</span>
          <span className="hero-kinetic__word hero-kinetic__word--mid" data-hero-word>DISEÑO</span>
        </div>
        <div className="hero-kinetic hero-kinetic--front" aria-hidden>
          <span className="hero-kinetic__word hero-kinetic__word--front" data-hero-word>CONVIERTE</span>
        </div>

        <div className="hero-experience__visual">
          <HeroFallback canvasReady={canvasReady && renderCanvas} />
          {renderCanvas ? (
            <HeroCanvas
              progress={progress}
              pointerX={pointerX}
              pointerY={pointerY}
              pointerEnabled={capabilities.pointerFine}
              quality={capabilities.quality}
              onReady={() => setCanvasReady(true)}
              onError={() => setCanvasFailed(true)}
            />
          ) : null}
        </div>

        <LaptopMock />

        <motion.div
          className="hero-experience__copy"
          data-hero-copy
          variants={container}
          initial={false}
          animate="show"
        >
          <motion.p variants={item} className="hero-experience__kicker">
            <span aria-hidden />
            {t("hero.kicker")}
          </motion.p>

          <motion.h1 variants={item} className="hero-experience__title">
            <span className="hero-title-line--one">{t("hero.title1")}</span>
            <strong className="hero-title-line--three">{t("hero.title2")}</strong>
          </motion.h1>

          <motion.p variants={item} className="hero-experience__lead">
            {t("hero.lead")}
          </motion.p>

          <motion.div variants={item} className="hero-experience__actions">
            <MagneticButton
              href="#contact"
              className="hero-cta hero-cta--primary"
              onClick={() => trackEvent("cta_clicked", { placement: "hero", action: "proposal" })}
            >
              {t("hero.ctaPrimary")}
            </MagneticButton>
            <a href="#work" className="hero-cta hero-cta--secondary">
              {t("hero.ctaSecondary")}
            </a>
          </motion.div>

          <motion.ul variants={item} className="hero-experience__proof">
            {["hero.chip1", "hero.chip2", "hero.chip3"].map((key) => (
              <li key={key}><span aria-hidden>✓</span>{t(key)}</li>
            ))}
          </motion.ul>
        </motion.div>

        <div aria-hidden className="hero-experience__signal">
          <span>01 / 04</span>
          <p>Diseño que avanza contigo</p>
          <i />
          <span>Web · estrategia · código</span>
        </div>

        <div className="hero-experience__portal" data-hero-portal aria-hidden />

        <div className="hero-experience__scroll" aria-hidden>
          <span>{t("hero.scroll")}</span>
          <i><b data-hero-progress /></i>
        </div>

        {hydrated ? (
          <button
            type="button"
            className="hero-motion-toggle"
            onClick={toggleMotion}
            aria-pressed={reduceMotion}
          >
            {reduceMotion ? "Activar movimiento 3D" : "Reducir movimiento"}
          </button>
        ) : null}
      </div>
    </section>
  );
}
