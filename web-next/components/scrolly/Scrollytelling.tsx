"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { useMotionPreference } from "@/components/motion/MotionPreference";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Orquesta el movimiento de las secciones inferiores. El hero gestiona su
 * propio progreso 0–1 para que HTML y WebGL compartan una única fuente.
 */
export function Scrollytelling() {
  const pathname = usePathname();
  const { reduceMotion } = useMotionPreference();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduceMotion]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
        },
        (ctx) => {
          const isDesktop = Boolean(ctx.conditions?.isDesktop);

          if (reduceMotion) {
            gsap.set("[data-sr], [data-step], [data-depth-far], [data-depth-near], [data-section-ghost], [data-parallax-image], [data-parallax-frame], [data-parallax-copy], [data-examples-track], [data-example-card], [data-example-image], [data-examples-progress]", { clearProps: "all" });
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

          gsap.utils.toArray<HTMLElement>("[data-parallax-scene]").forEach((scene) => {
            const image = scene.querySelector<HTMLElement>("[data-parallax-image]");
            const farFrame = scene.querySelector<HTMLElement>('[data-parallax-frame="far"]');
            const nearFrame = scene.querySelector<HTMLElement>('[data-parallax-frame="near"]');
            const copy = scene.querySelector<HTMLElement>("[data-parallax-copy]");
            const sceneTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: scene,
                start: "top bottom",
                end: "bottom top",
                scrub: isDesktop ? 0.85 : 0.45,
              },
            });

            if (image) {
              sceneTimeline.fromTo(
                image,
                { yPercent: isDesktop ? -9 : -4, scale: isDesktop ? 1.14 : 1.08 },
                { yPercent: isDesktop ? 9 : 4, scale: isDesktop ? 1.14 : 1.08, ease: "none" },
                0,
              );
            }
            if (farFrame) {
              sceneTimeline.fromTo(
                farFrame,
                { yPercent: -14, xPercent: -4, rotation: -2 },
                { yPercent: 14, xPercent: 4, rotation: 2, ease: "none" },
                0,
              );
            }
            if (nearFrame) {
              sceneTimeline.fromTo(
                nearFrame,
                { yPercent: 16, xPercent: 5, rotation: 2.5 },
                { yPercent: -16, xPercent: -5, rotation: -2.5, ease: "none" },
                0,
              );
            }
            if (copy) {
              sceneTimeline.fromTo(
                copy,
                { yPercent: isDesktop ? 12 : 5 },
                { yPercent: isDesktop ? -12 : -5, ease: "none" },
                0,
              );
            }
          });

          if (isDesktop) {
            const examplesScene = document.querySelector<HTMLElement>("[data-examples-scene]");
            const examplesPin = examplesScene?.querySelector<HTMLElement>("[data-examples-pin]");
            const examplesTrack = examplesScene?.querySelector<HTMLElement>("[data-examples-track]");
            const exampleCards = examplesScene
              ? gsap.utils.toArray<HTMLElement>("[data-example-card]", examplesScene)
              : [];
            const exampleImages = examplesScene
              ? gsap.utils.toArray<HTMLElement>("[data-example-image]", examplesScene)
              : [];
            const examplesProgress = examplesScene?.querySelector<HTMLElement>("[data-examples-progress]");

            if (examplesScene && examplesPin && examplesTrack && exampleCards.length) {
              const horizontalTravel = () =>
                Math.max(
                  0,
                  examplesTrack.scrollWidth - window.innerWidth + window.innerWidth * 0.08,
                );

              gsap.set(exampleCards, {
                transformPerspective: 1500,
                transformOrigin: "center center",
              });

              const examplesTimeline = gsap.timeline({
                scrollTrigger: {
                  trigger: examplesScene,
                  start: "top top",
                  end: () =>
                    `+=${Math.max(window.innerHeight * 2.4, horizontalTravel() * 1.18)}`,
                  pin: examplesPin,
                  scrub: 0.9,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                },
              });

              examplesTimeline
                .fromTo(
                  examplesTrack,
                  { x: () => window.innerWidth * 0.07 },
                  { x: () => -horizontalTravel(), ease: "none" },
                  0,
                )
                .fromTo(
                  exampleCards,
                  {
                    rotationY: (index) => (index % 2 === 0 ? -13 : 11),
                    rotationX: (index) => (index % 2 === 0 ? 2.5 : -2),
                    z: (index) => (index % 2 === 0 ? -150 : -55),
                    y: (index) => (index % 2 === 0 ? 28 : -18),
                  },
                  {
                    rotationY: (index) => (index % 2 === 0 ? 7 : -8),
                    rotationX: (index) => (index % 2 === 0 ? -1.5 : 2),
                    z: (index) => (index % 2 === 0 ? -20 : -120),
                    y: (index) => (index % 2 === 0 ? -18 : 24),
                    ease: "none",
                  },
                  0,
                )
                .fromTo(
                  exampleImages,
                  { xPercent: -4, scale: 1.08 },
                  { xPercent: 4, scale: 1.08, ease: "none" },
                  0,
                );

              if (examplesProgress) {
                examplesTimeline.fromTo(
                  examplesProgress,
                  { scaleX: 0 },
                  { scaleX: 1, ease: "none" },
                  0,
                );
              }
            }
          }

          const cardScenes = [
            { id: "#services", x: 0, y: 44, rotate: 0, scale: 0.94 },
            { id: "#why", x: isDesktop ? 52 : 0, y: 10, rotate: 1.8, scale: 0.96 },
            { id: "#promises", x: isDesktop ? -44 : 0, y: 22, rotate: -1.6, scale: 0.92 },
            { id: "#extras", x: 0, y: 36, rotate: 0, scale: 0.9 },
            { id: "#sectors", x: isDesktop ? 36 : 0, y: 18, rotate: 1.2, scale: 0.95 },
            { id: "#care", x: 0, y: 42, rotate: 0, scale: 0.94 },
          ];

          cardScenes.forEach(({ id, x, y, rotate, scale }) => {
            const cards = gsap.utils.toArray<HTMLElement>(`${id} [data-scene-card]`);
            if (!cards.length) return;
            gsap.fromTo(
              cards,
              { autoAlpha: 0.3, x, y, rotation: rotate, scale },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: id,
                  start: "top 78%",
                  end: "center 58%",
                  scrub: isDesktop ? 0.65 : 0.35,
                },
              },
            );
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
              .to(".backdrop__editorial", { yPercent: -42, xPercent: -8, ease: "none" }, 0)
              .to(".backdrop__beams", { yPercent: -34, xPercent: 8, ease: "none" }, 0)
              .to(".backdrop__strata--a", { yPercent: 36, xPercent: 10, rotation: -4, ease: "none" }, 0)
              .to(".backdrop__strata--b", { yPercent: -28, xPercent: -8, rotation: 16, ease: "none" }, 0)
              .to(".backdrop__grid", { yPercent: -30, autoAlpha: 0.12, ease: "none" }, 0)
              .to(".backdrop__grid2", { autoAlpha: 0.55, ease: "none" }, 0.72);

            const beamSkew = gsap.quickTo(".backdrop__beams", "skewY", {
              duration: 0.45,
              ease: "power3.out",
            });
            const wordPointerX = gsap.quickTo(".backdrop__word", "x", {
              duration: 1.2,
              ease: "power3.out",
            });
            const editorialPointerX = gsap.quickTo(".backdrop__editorial", "x", {
              duration: 1.1,
              ease: "power3.out",
            });
            const strataPointerY = gsap.quickTo(".backdrop__strata--b", "y", {
              duration: 1.2,
              ease: "power3.out",
            });
            const onPointerMove = (event: PointerEvent) => {
              const normalizedX = event.clientX / window.innerWidth - 0.5;
              const normalizedY = event.clientY / window.innerHeight - 0.5;
              wordPointerX(normalizedX * 34);
              editorialPointerX(normalizedX * -28);
              strataPointerY(normalizedY * 24);
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
    { dependencies: [pathname, reduceMotion], revertOnUpdate: true },
  );

  return null;
}
