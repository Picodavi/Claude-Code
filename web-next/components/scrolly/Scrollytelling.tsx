"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Orquestador del scrollytelling.
 *  - Hero pineado: la cámara empuja, el Mac evoluciona (gira 360 vía LaptopMock),
 *    el titular se despide por bloques y las CAPAS TIPOGRÁFICAS se mueven en
 *    profundidad a ritmos distintos (la palabra trasera avanza, la banda
 *    delantera se retira) — composición editorial, reversible.
 *  - Titulares con reveal de máscara; pasos del proceso que se encienden;
 *    parallax interno de la captura; atmósfera oro→pino; halo de luz viajero.
 *  - Lenis sincronizado con ScrollTrigger (un solo rAF). Móvil sin pin.
 */
export function Scrollytelling() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023.9px)",
      },
      (ctx) => {
        const isDesktop = !!ctx.conditions?.isDesktop;

        /* ---- 1) HERO: pin + cámara + tipografía en profundidad ---- */
        if (isDesktop && document.querySelector("[data-hero-panel]")) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "#top",
                start: "top top",
                end: "+=110%",
                scrub: true,
                pin: true,
                anticipatePin: 1,
              },
            })
            .to(
              "[data-hero-copy] > *",
              { yPercent: -70, autoAlpha: 0, stagger: 0.055, ease: "none" },
              0,
            )
            .to(
              "[data-hero-visual]",
              { scale: 1.17, yPercent: 7, ease: "none" },
              0,
            )
            // la palabra gigante trasera AVANZA (crece y deriva, plano lejano→medio)
            .to(
              "[data-deco-back]",
              { xPercent: -14, yPercent: 12, scale: 1.22, ease: "none" },
              0,
            )
            // la banda delantera SE RETIRA hacia arriba (plano cercano, más rápida)
            .to(
              "[data-deco-front]",
              { yPercent: -220, autoAlpha: 0.15, ease: "none" },
              0,
            )
            .to(
              "[data-hero-panel]",
              { borderRadius: 0, scale: 1.015, ease: "none" },
              0,
            );
        }

        /* ---- 2) Titulares: reveal con máscara (reversible) ---- */
        gsap.utils.toArray<HTMLElement>("[data-sr]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)", y: isDesktop ? 30 : 16 },
            {
              clipPath: "inset(0 0 -8% 0)",
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        /* ---- 3) Proceso: los pasos se encienden con el scroll ---- */
        if (document.querySelector("#process [data-step]")) {
          gsap.fromTo(
            "#process [data-step]",
            { autoAlpha: 0.15, y: 48 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.25,
              ease: "none",
              scrollTrigger: {
                trigger: "#process",
                start: "top 78%",
                end: "center 55%",
                scrub: true,
              },
            },
          );
        }

        /* ---- 4) Proyecto: parallax interno de la captura ---- */
        if (document.querySelector("#work [data-parallax] img")) {
          gsap.fromTo(
            "#work [data-parallax] img",
            { yPercent: -9, scale: 1.18 },
            {
              yPercent: 9,
              scale: 1.18,
              ease: "none",
              scrollTrigger: {
                trigger: "#work",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }

        /* ---- 5) Atmósfera: oro → pino hacia el cierre ---- */
        gsap.to(".backdrop__mesh--pine", {
          opacity: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.fromTo(
          ".backdrop__mesh",
          { opacity: 1 },
          {
            opacity: 0.7,
            ease: "none",
            scrollTrigger: {
              trigger: "#process",
              start: "top bottom",
              end: "top 10%",
              scrub: true,
            },
          },
        );

        /* ---- 5a) Parallax multicapa del fondo: lejana/media/cercana ---- */
        if (isDesktop) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "max",
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            })
            .to(".backdrop__word", { xPercent: -12, yPercent: 26, scale: 1.08, ease: "none" }, 0)
            .to(".backdrop__beams", { yPercent: -34, xPercent: 8, ease: "none" }, 0)
            .to(".backdrop__grid", { yPercent: -30, autoAlpha: 0.12, ease: "none" }, 0)
            .to(".backdrop__grid2", { autoAlpha: 0.55, ease: "none" }, 0.72);

          // Los haces de luz se inclinan según la VELOCIDAD del scroll
          // (streak cinematográfico); vuelven a 0 con suavidad.
          if (document.querySelector(".backdrop__beams")) {
            const skewTo = gsap.quickTo(".backdrop__beams", "skewY", {
              duration: 0.6,
              ease: "power3",
            });
            ScrollTrigger.create({
              trigger: document.body,
              start: "top top",
              end: "max",
              onUpdate: (self) =>
                skewTo(gsap.utils.clamp(-7, 7, self.getVelocity() / -260)),
            });
          }
        }

        /* ---- 5b) Halo de luz que acompaña el scroll (escritorio) ---- */
        if (isDesktop && document.querySelector(".backdrop__halo")) {
          gsap.fromTo(
            ".backdrop__halo",
            { yPercent: -6, xPercent: -4 },
            {
              yPercent: 105,
              xPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "max",
                scrub: 1.4,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      },
    );
    // Re-crea las escenas al cambiar de ruta (limpieza automática vía revert).
  }, { dependencies: [pathname], revertOnUpdate: true });

  return null;
}
