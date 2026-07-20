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
    <section
      id={id}
      className={`section-immersive scroll-mt-20 px-6 py-20 sm:py-28 ${className}`}
    >
      <span className="section-immersive__depth section-immersive__depth--far" data-depth-far aria-hidden />
      <span className="section-immersive__depth section-immersive__depth--near" data-depth-near aria-hidden />
      <div className="section-immersive__content">{children}</div>
    </section>
  );
}
