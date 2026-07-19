"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import brasa from "@/assets/plantillas/brasa.jpg";
import clinica from "@/assets/plantillas/clinica.jpg";
import estetica from "@/assets/plantillas/estetica.jpg";
import hotelRural from "@/assets/plantillas/hotel-rural.jpg";

const ITEMS = [
  { img: brasa, sec: "ex.sec1", href: "/plantillas/brasa/" },
  { img: clinica, sec: "ex.sec2", href: "/plantillas/clinica/" },
  { img: estetica, sec: "ex.sec3", href: "/plantillas/estetica/" },
  { img: hotelRural, sec: "ex.sec4", href: "/plantillas/hotel-rural/" },
] as const;

// Ejemplos de diseño por sector: capturas reales de plantillas conceptuales,
// cada una enlaza a su demo en vivo (/plantillas/...). Suman prueba visual.
export function Examples() {
  const t = useT();
  return (
    <Section id="examples">
      <div className="mx-auto max-w-6xl">
        <SectionHeader tagKey="ex.tag" headingKey="ex.heading" leadKey="ex.lead" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {ITEMS.map((it) => (
            <a
              key={it.href}
              href={it.href}
              target="_blank"
              rel="noopener"
              className="group block overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pine/40 hover:shadow-[0_24px_50px_-20px_rgba(8,52,38,0.3)]"
            >
              <div className="flex items-center gap-1.5 bg-[#efeae0] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="h-2.5 w-2.5 rounded-full bg-pine" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#c9c2b5]" />
              </div>
              <Image
                src={it.img}
                alt={`Ejemplo de web para ${t(it.sec)} — plantilla conceptual de Picodavi`}
                placeholder="blur"
                className="h-auto w-full"
                sizes="(max-width: 640px) 100vw, 45vw"
              />
              <div className="flex items-center justify-between px-5 py-4">
                <span className="font-display text-base font-bold text-ink">
                  {t(it.sec)}
                </span>
                <span className="font-mono text-xs font-bold text-pine transition-colors group-hover:text-pine-700">
                  {t("ex.cta")}
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted">{t("ex.note")}</p>
      </div>
    </Section>
  );
}
