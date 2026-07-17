"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Ball } from "@/components/ui/Ball";

// Fondo ambiental de página: malla de gradientes cálida + grano premium +
// auroras en movimiento + esferas con PARALLAX (cada una baja/sube a distinta
// velocidad con el scroll → sensación de profundidad 3D en toda la página).
export function Backdrop() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2400], [0, -420]);
  const y2 = useTransform(scrollY, [0, 2400], [0, 320]);
  const y3 = useTransform(scrollY, [0, 2400], [0, -220]);
  const y4 = useTransform(scrollY, [0, 2400], [0, 180]);
  const rot = useTransform(scrollY, [0, 2400], [0, 60]);

  return (
    <div className="backdrop" aria-hidden>
      <div className="backdrop__mesh" />
      <div className="backdrop__blob backdrop__blob--a" />
      <div className="backdrop__blob backdrop__blob--b" />
      <div className="backdrop__blob backdrop__blob--c" />

      {/* Esferas con parallax de scroll (profundidad) */}
      <motion.div style={{ y: y1, rotate: rot }} className="absolute left-[5%] top-[30%]">
        <Ball size={90} color="#DE8E29" style={{ position: "relative", opacity: 0.85 }} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute right-[7%] top-[38%]">
        <Ball size={56} color="#201a14" style={{ position: "relative", opacity: 0.8 }} />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute left-[12%] top-[74%]">
        <Ball size={40} color="#15533B" style={{ position: "relative", opacity: 0.8 }} />
      </motion.div>
      <motion.div style={{ y: y4 }} className="absolute right-[16%] top-[82%]">
        <Ball size={68} color="#f7f3ea" style={{ position: "relative", opacity: 0.9 }} />
      </motion.div>

      <div className="backdrop__grain" />
    </div>
  );
}
