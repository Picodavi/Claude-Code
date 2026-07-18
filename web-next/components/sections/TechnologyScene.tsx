"use client";

import Image, { type StaticImageData } from "next/image";
import { useT } from "@/lib/i18n";

type TechnologySceneProps = {
  id: string;
  image: StaticImageData;
  copyKey: "ai" | "code" | "data";
  index: string;
  align?: "left" | "right";
};

export function TechnologyScene({
  id,
  image,
  copyKey,
  index,
  align = "left",
}: TechnologySceneProps) {
  const t = useT();
  const headingId = `${id}-heading`;
  const sceneClass =
    align === "right"
      ? "technology-scene technology-scene--right"
      : "technology-scene technology-scene--left";

  return (
    <section
      id={id}
      className={sceneClass}
      data-parallax-scene
      aria-labelledby={headingId}
    >
      <div className="technology-scene__media" aria-hidden>
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 94vw"
          className="technology-scene__image"
          data-parallax-image
        />
        <span className="technology-scene__veil" />
      </div>

      <span
        className="technology-scene__frame technology-scene__frame--far"
        data-parallax-frame="far"
        aria-hidden
      />
      <span
        className="technology-scene__frame technology-scene__frame--near"
        data-parallax-frame="near"
        aria-hidden
      />

      <div className="technology-scene__copy" data-parallax-copy>
        <p className="technology-scene__tag">{t(`techscene.${copyKey}.tag`)}</p>
        <h2 id={headingId}>{t(`techscene.${copyKey}.title`)}</h2>
        <p className="technology-scene__note">{t(`techscene.${copyKey}.note`)}</p>
      </div>

      <span className="technology-scene__index" aria-hidden>
        {index} / PICODAVI
      </span>
    </section>
  );
}
