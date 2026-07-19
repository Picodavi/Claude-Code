"use client";

import Image from "next/image";
import { useState } from "react";
import { useT } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/SectionHeader";
import brasa from "@/assets/plantillas/brasa.jpg";
import clinica from "@/assets/plantillas/clinica.jpg";
import estetica from "@/assets/plantillas/estetica.jpg";
import hotelRural from "@/assets/plantillas/hotel-rural.jpg";
import styles from "./Examples.module.css";

const ITEMS = [
  { img: brasa, sec: "ex.sec1", href: "/plantillas/brasa/" },
  { img: clinica, sec: "ex.sec2", href: "/plantillas/clinica/" },
  { img: estetica, sec: "ex.sec3", href: "/plantillas/estetica/" },
  { img: hotelRural, sec: "ex.sec4", href: "/plantillas/hotel-rural/" },
] as const;

type CardPosition = "active" | "next" | "previous" | "back";

function getPosition(index: number, activeIndex: number): CardPosition {
  const relative = (index - activeIndex + ITEMS.length) % ITEMS.length;
  if (relative === 0) return "active";
  if (relative === 1) return "next";
  if (relative === ITEMS.length - 1) return "previous";
  return "back";
}

export function Examples() {
  const t = useT();
  const [activeIndex, setActiveIndex] = useState(0);

  const rotate = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + ITEMS.length) % ITEMS.length);
  };

  return (
    <section id="examples" className={`${styles.section} section-immersive scroll-mt-20`}>
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

      <div className={styles.header}>
        <SectionHeader tagKey="ex.tag" headingKey="ex.heading" leadKey="ex.lead" />
        <div className={styles.status} aria-live="polite" aria-atomic="true">
          <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
          <span>/</span>
          <span>{String(ITEMS.length).padStart(2, "0")}</span>
        </div>
      </div>

      <div
        className={styles.carousel}
        role="region"
        aria-roledescription="carrusel"
        aria-label={t("ex.heading")}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            rotate(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            rotate(1);
          }
        }}
      >
        <div className={styles.orbit} aria-hidden />

        {ITEMS.map((item, index) => {
          const position = getPosition(index, activeIndex);
          const isActive = position === "active";

          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener"
              className={`${styles.card} ${styles[position]}`}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              data-carousel-position={position}
            >
              <span className={styles.number} aria-hidden>
                0{index + 1}
              </span>
              <div className={styles.surface}>
                <div className={styles.browserBar}>
                  <span />
                  <span />
                  <span />
                  <b>PICODAVI / {t(item.sec)}</b>
                </div>
                <div className={styles.image}>
                  <Image
                    src={item.img}
                    alt={`Ejemplo de web para ${t(item.sec)} — plantilla conceptual de Picodavi`}
                    placeholder="blur"
                    sizes="(max-width: 640px) 84vw, (max-width: 1023px) 70vw, 54vw"
                    priority={index === 0}
                  />
                  <span className={styles.shine} aria-hidden />
                </div>
                <div className={styles.meta}>
                  <span>{t(item.sec)}</span>
                  <span>{t("ex.cta")}</span>
                </div>
              </div>
            </a>
          );
        })}

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrevious}`}
          onClick={() => rotate(-1)}
          aria-label={t("ex.prev")}
        >
          <span aria-hidden>←</span>
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => rotate(1)}
          aria-label={t("ex.next")}
        >
          <span aria-hidden>→</span>
        </button>
      </div>

      <div className={styles.footer}>
        <p>{t("ex.note")}</p>
        <p className={styles.hint}>{t("ex.hint")}</p>
      </div>
    </section>
  );
}
