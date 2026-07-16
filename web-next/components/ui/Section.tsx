"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Cada sección aparece con un fade-up al entrar en pantalla.
// Con prefers-reduced-motion, globals.css fuerza .reveal visible (sin animación).
export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className={`reveal scroll-mt-20 px-6 py-20 sm:py-28 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
