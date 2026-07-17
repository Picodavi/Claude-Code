"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Orquestador del scrollytelling de toda la página.
 *
 * Narrativa (adaptada del storyboard de references/):
 *  0%   Hero estable y legible.
 *  ~10% Empieza el scroll: el hero se "pinea", la cámara empuja (el Mac crece
 *       y gira — el giro 360 ya lo aporta LaptopMock ligado a scrollY), los
 *       textos se despiden con intención y las esferas abren en profundidad.
 *  ...  La ESFERA DORADA (objeto de continuidad) viaja entre secciones,
 *       cambiando de escala y posición; los titulares se revelan con máscara;
 *       el bloque oscuro del proceso "enciende" sus pasos con el scroll;
 *       la captura del proyecto tiene parallax interno (ventana con vida).
 *  100% La atmósfera vira a pino, la esfera aterriza junto al CTA final.
 *
 * Todo con scrub → reversible al subir. Lenis va sincronizado con
 * ScrollTrigger a través del ticker de GSAP (un solo bucle).
 */
export function Scrollytelling() {
  const orbRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Lenis + sincronización con ScrollTrigger (un único rAF: el ticker de GSAP).
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

        /* ---- 1) HERO: pin + cámara que empuja (solo escritorio) ---- */
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
            .to(
              "[data-hero-panel]",
              { borderRadius: 0, scale: 1.015, ease: "none" },
              0,
            )
            .to(
              "#top .ball",
              {
                yPercent: (i: number) => (i % 2 ? -45 : 32),
                xPercent: (i: number) => (i % 2 ? 20 : -16),
                ease: "none",
              },
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

        /* ---- 3) Proceso (bloque oscuro): los pasos se encienden ---- */
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

        /* ---- 4) Proyecto real: parallax interno de la captura ---- */
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

        /* ---- 5) Atmósfera: la luz vira de oro a pino hacia el cierre ---- */
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

        /* ---- 6) La esfera dorada viaja por toda la página ---- */
        if (isDesktop && orbRef.current) {
          const W = () => window.innerWidth;
          const H = () => window.innerHeight;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "max",
                scrub: 1.1,
                invalidateOnRefresh: true,
              },
            })
            // cámara empuja: crece hacia el centro
            .fromTo(
              orbRef.current,
              { x: () => W() * 0.66, y: () => H() * 0.28, scale: 0.5, autoAlpha: 0.95 },
              { x: () => W() * 0.44, y: () => H() * 0.5, scale: 1, ease: "none" },
            )
            // se aparta a la izquierda mientras se leen los servicios
            .to(orbRef.current, {
              x: () => W() * 0.05,
              y: () => H() * 0.64,
              scale: 0.38,
              ease: "none",
            })
            // cruza al lado derecho sobre el bloque oscuro (brilla en contraste)
            .to(orbRef.current, {
              x: () => W() * 0.86,
              y: () => H() * 0.38,
              scale: 0.55,
              ease: "none",
            })
            // baja discreta durante precios (no molesta la lectura)
            .to(orbRef.current, {
              x: () => W() * 0.06,
              y: () => H() * 0.78,
              scale: 0.32,
              ease: "none",
            })
            // aterriza junto al CTA final
            .to(orbRef.current, {
              x: () => W() * 0.72,
              y: () => H() * 0.5,
              scale: 0.85,
              ease: "none",
            });
        } else if (orbRef.current) {
          gsap.set(orbRef.current, { autoAlpha: 0 });
        }
      },
    );
    // Re-crea las escenas al cambiar de ruta (limpieza automática vía revert).
  }, { dependencies: [pathname], revertOnUpdate: true });

  return (
    <div
      ref={orbRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 will-change-transform"
      // Posición inicial equivalente al primer fotograma del timeline, para
      // evitar un flash en (0,0) antes del primer tick de GSAP.
      style={{ transform: "translate(66vw, 28vh) scale(0.5)", opacity: 0.95 }}
    >
      <div
        className="ball"
        style={
          {
            position: "relative",
            width: 150,
            height: 150,
            "--ball-color": "#DE8E29",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
