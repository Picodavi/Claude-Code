"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type MouseEvent } from "react";

// Mockup de navegador (con una web dentro) en perspectiva 3D. Se inclina hacia
// el cursor y flota suavemente. 100% CSS/DOM: fiable y verificable.
export function BrowserMock() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ry = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.6 });
  const rx = useSpring(my, { stiffness: 120, damping: 18, mass: 0.6 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 22);
    my.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
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
      style={{ perspective: 1100 }}
    >
      <div className="mock-float w-full max-w-md">
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_90px_-25px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
        >
          {/* barra del navegador */}
          <div className="flex items-center gap-2 bg-[#efeae0] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-gold" />
            <span className="h-3 w-3 rounded-full bg-pine" />
            <span className="h-3 w-3 rounded-full bg-[#c9c2b5]" />
            <span className="ml-3 h-4 flex-1 rounded-full bg-white" />
          </div>

          {/* web dentro */}
          <div>
            <div className="bg-pine px-6 py-8 text-white">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/70">
                tu-negocio.com
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold leading-tight">
                Tu negocio,
                <br />
                online.
              </p>
              <span className="mt-4 inline-block rounded-full bg-gold px-4 py-1.5 text-xs font-bold text-ink">
                Reservar →
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 p-5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-border bg-surface p-3">
                  <div className="h-2 w-8 rounded bg-gold" />
                  <div className="mt-2 h-1.5 w-full rounded bg-border" />
                  <div className="mt-1 h-1.5 w-3/4 rounded bg-border" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
