"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Orquesta el movimiento de las secciones inferiores. El hero gestiona su
 * propio progreso 0–1 para que HTML y WebGL compartan una única fuente.
 */
export function Scrollytelling() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const isDesktop = Boolean(ctx.conditions?.isDesktop);
          const reduceMotion = Boolean(ctx.conditions?.reduceMotion);

          if (reduceMotion) {
            gsap.set("[data-sr], [data-step], [data-depth-far], [data-depth-near], [data-section-ghost]", { clearProps: "all" });
            return;
          }

          gsap.utils.toArray<HTMLElement>(".section-immersive").forEach((section) => {
            const far = section.querySelector<HTMLElement>("[data-depth-far]");
            const near = section.querySelector<HTMLElement>("[data-depth-near]");
            const ghost = section.querySelector<HTMLElement>("[data-section-ghost]");
            const depthTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: isDesktop ? 0.8 : 0.45,
              },
            });

            if (far) {
              depthTimeline.fromTo(
                far,
                { yPercent: -10, xPercent: -2 },
                { yPercent: 12, xPercent: 2, ease: "none" },
                0,
              );
            }
            if (near) {
              depthTimeline.fromTo(
                near,
                { yPercent: 9, xPercent: 3 },
                { yPercent: -11, xPercent: -3, ease: "none" },
                0,
              );
            }
            if (ghost) {
              depthTimeline.fromTo(
                ghost,
                { yPercent: 18, xPercent: -5 },
                { yPercent: -18, xPercent: 5, ease: "none" },
                0,
              );
            }
          });

          gsap.utils.toArray<HTMLElement>("[data-sr]").forEach((element) => {
            gsap.fromTo(
              element,
              { clipPath: "inset(0 0 100% 0)", y: isDesktop ? 30 : 16 },
              {
                clipPath: "inset(0 0 -8% 0)",
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          });

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

          gsap.to(".backdrop__mesh--pine", {
            opacity: 0.94,
            ease: "none",
            scrollTrigger: {
              trigger: "#about",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

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

            if (document.querySelector(".backdrop__halo")) {
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

            const beamSkew = gsap.quickTo(".backdrop__beams", "skewY", {
              duration: 0.45,
              ease: "power3.out",
            });
            const wordPointerX = gsap.quickTo(".backdrop__word", "x", {
              duration: 1.2,
              ease: "power3.out",
            });
            const haloPointerX = gsap.quickTo(".backdrop__halo", "x", {
              duration: 1.4,
              ease: "power3.out",
            });
            const haloPointerY = gsap.quickTo(".backdrop__halo", "y", {
              duration: 1.4,
              ease: "power3.out",
            });
            const onPointerMove = (event: PointerEvent) => {
              const normalizedX = event.clientX / window.innerWidth - 0.5;
              const normalizedY = event.clientY / window.innerHeight - 0.5;
              wordPointerX(normalizedX * 34);
              haloPointerX(normalizedX * 52);
              haloPointerY(normalizedY * 34);
            };
            const velocityTrigger = ScrollTrigger.create({
              start: 0,
              end: "max",
              onUpdate: (self) => {
                beamSkew(gsap.utils.clamp(-2.6, 2.6, self.getVelocity() / -900));
              },
            });

            window.addEventListener("pointermove", onPointerMove, { passive: true });

            return () => {
              window.removeEventListener("pointermove", onPointerMove);
              velocityTrigger.kill();
            };
          }
        },
      );

      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
