"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type MouseEvent } from "react";

// Portátil estilo MacBook con una web dentro, en perspectiva 3D (CSS).
// GIRA 360° con el scroll (interactivo), se inclina hacia el cursor y flota.
// La trasera lleva el logo para que el giro luzca.
export function LaptopMock() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const pointerRy = useSpring(mx, { stiffness: 110, damping: 16, mass: 0.6 });
  const rx = useSpring(my, { stiffness: 110, damping: 16, mass: 0.6 });

  // Giro 360 ligado al scroll, espaciado: una vuelta completa cada ~1500px
  // (más lento y elegante al bajar). Suavizado extra con un muelle ligero.
  const { scrollY } = useScroll();
  const spinRaw = useTransform(scrollY, [0, 1500], [0, 360], { clamp: true });
  const spin = useSpring(spinRaw, { stiffness: 80, damping: 20, mass: 0.5 });
  const ry = useTransform(() => spin.get() + pointerRy.get());

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    my.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="flex h-full w-full items-center justify-center"
      style={{ perspective: 1300 }}
    >
      <div className="mock-float w-full max-w-lg">
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="relative"
        >
          {/* Trasera de la tapa (se ve al girar): logo */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center rounded-[1.1rem] bg-[linear-gradient(160deg,#332c24_0%,#1a1510_70%)] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)]"
            style={{
              transform: "rotateY(180deg) translateZ(2px)",
              backfaceVisibility: "hidden",
            }}
          >
            <span className="font-display text-3xl font-extrabold text-white/90">
              Picodavi<span className="text-gold">.</span>
            </span>
          </div>

          {/* Tapa / pantalla (frontal) */}
          <div
            className="relative z-10 rounded-[1.1rem] bg-[#1d1a16] p-[10px] pb-[14px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)]"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* cámara */}
            <span className="absolute left-1/2 top-[5px] h-1 w-1 -translate-x-1/2 rounded-full bg-[#3a352d]" />
            <div className="overflow-hidden rounded-lg bg-white">
              {/* barra del navegador */}
              <div className="flex items-center gap-1.5 bg-[#efeae0] px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="h-2.5 w-2.5 rounded-full bg-pine" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#c9c2b5]" />
                <span className="ml-2 flex h-4 flex-1 items-center rounded-full bg-white px-2 font-mono text-[9px] text-muted">
                  tu-negocio.com
                </span>
              </div>
              {/* mini web */}
              <div className="bg-pine px-5 py-5 text-white">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[11px] font-bold">Ca la Núria</span>
                  <span className="flex gap-2">
                    <span className="h-1.5 w-6 rounded bg-white/40" />
                    <span className="h-1.5 w-6 rounded bg-white/40" />
                    <span className="h-1.5 w-6 rounded bg-white/40" />
                  </span>
                </div>
                <p className="mt-3 font-display text-xl font-extrabold leading-tight">
                  Tu negocio,
                  <br />
                  online.
                </p>
                <span className="mt-3 inline-block rounded-full bg-gold px-3 py-1 text-[10px] font-bold text-ink">
                  Reservar →
                </span>
              </div>
              {/* "foto" + tarjetas */}
              <div className="h-14 bg-[linear-gradient(120deg,#C4DC7D_0%,#1F7655_55%,#0D3D2D_100%)]" />
              <div className="grid grid-cols-3 gap-2 p-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-md border border-border bg-surface p-2">
                    <div className="h-1.5 w-7 rounded bg-gold" />
                    <div className="mt-1.5 h-1 w-full rounded bg-border" />
                    <div className="mt-1 h-1 w-2/3 rounded bg-border" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Base / teclado */}
          <div className="relative left-[-7%] z-0 -mt-[2px] h-[16px] w-[114%] rounded-b-2xl rounded-t-[4px] bg-[linear-gradient(180deg,#4a4238_0%,#2b251e_45%,#15110d_100%)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]">
            <span className="absolute left-1/2 top-0 h-[7px] w-24 -translate-x-1/2 rounded-b-xl bg-[#0f0c09]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
