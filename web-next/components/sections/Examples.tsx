"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";
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

// En escritorio, Scrollytelling fija esta sección y convierte el avance
// vertical en un recorrido horizontal. En táctil conserva scroll-snap nativo.
export function Examples() {
  const t = useT();
  return (
    <section
      id="examples"
      className="examples-horizontal section-immersive scroll-mt-20"
      data-examples-scene
    >
      <span
        className="section-immersive__depth section-immersive__depth--far"
        data-depth-far
        aria-hidden
      />
      <span
        className="section-immersive__depth section-immersive__depth--near"
        data-depth-near
        aria-hidden
      />

      <div className="examples-horizontal__pin" data-examples-pin>
        <div className="examples-horizontal__header">
          <SectionHeader tagKey="ex.tag" headingKey="ex.heading" leadKey="ex.lead" />
          <div className="examples-horizontal__direction" aria-hidden>
            <span>{t("ex.scroll")}</span>
            <i />
            <b>01&nbsp;&nbsp;02&nbsp;&nbsp;03&nbsp;&nbsp;04</b>
          </div>
        </div>

        <div
          className="examples-horizontal__viewport"
          aria-label={t("ex.heading")}
        >
          <div className="examples-horizontal__track" data-examples-track>
            {ITEMS.map((it, index) => (
              <a
                key={it.href}
                href={it.href}
                target="_blank"
                rel="noopener"
                className="examples-horizontal__card group"
                data-example-card
              >
                <span className="examples-horizontal__number" aria-hidden>
                  0{index + 1}
                </span>
                <div className="examples-horizontal__surface">
                  <div className="examples-horizontal__bar">
                    <span />
                    <span />
                    <span />
                    <b>PICODAVI / {t(it.sec)}</b>
                  </div>
                  <div className="examples-horizontal__image">
                    <Image
                      src={it.img}
                      alt={`Ejemplo de web para ${t(it.sec)} — plantilla conceptual de Picodavi`}
                      placeholder="blur"
                      sizes="(max-width: 640px) 82vw, (max-width: 1023px) 68vw, 48vw"
                      data-example-image
                    />
                    <span className="examples-horizontal__shine" aria-hidden />
                  </div>
                  <div className="examples-horizontal__meta">
                    <span>{t(it.sec)}</span>
                    <span>{t("ex.cta")}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="examples-horizontal__footer">
          <p>{t("ex.note")}</p>
          <div className="examples-horizontal__progress" aria-hidden>
            <span data-examples-progress />
          </div>
        </div>

        <noscript>
          <style>{`.examples-horizontal__viewport{overflow-x:auto!important}`}</style>
        </noscript>
      </div>
    </section>
  );
}
