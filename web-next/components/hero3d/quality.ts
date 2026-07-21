"use client";

import { useEffect, useState } from "react";

export type SceneQuality = "high" | "medium" | "low";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

export type SceneCapabilities = {
  quality: SceneQuality;
  webgl: boolean;
  pointerFine: boolean;
  saveData: boolean;
  ready: boolean;
};

const INITIAL: SceneCapabilities = {
  quality: "low",
  webgl: false,
  pointerFine: false,
  saveData: false,
  ready: false,
};

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const options = { failIfMajorPerformanceCaveat: true };
    return Boolean(
      canvas.getContext("webgl2", options) || canvas.getContext("webgl", options),
    );
  } catch {
    return false;
  }
}

export function useSceneCapabilities(reducedMotion: boolean) {
  const [capabilities, setCapabilities] = useState<SceneCapabilities>(INITIAL);

  useEffect(() => {
    const nav = navigator as NavigatorWithHints;
    const width = window.innerWidth;
    const cores = nav.hardwareConcurrency || 4;
    const memory = nav.deviceMemory || 4;
    const pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isFirefox = /Firefox\//.test(navigator.userAgent);
    const saveData = Boolean(nav.connection?.saveData);
    // Firefox compone esta escena WebGL de pantalla completa junto al portatil
    // CSS 3D con bastante mas coste en algunos equipos. El fallback mantiene
    // la misma direccion visual y toda la animacion GSAP, sin el bucle WebGL.
    const webgl = width >= 901 && !isFirefox && supportsWebGL();

    let quality: SceneQuality = "high";
    if (width < 540 || cores <= 4 || memory <= 4 || saveData) quality = "low";
    else if (width < 1180 || !pointerFine || cores <= 8) quality = "medium";

    const frame = window.requestAnimationFrame(() => {
      setCapabilities({
        quality,
        webgl: webgl && !saveData && !reducedMotion,
        pointerFine: pointerFine && !isFirefox,
        saveData,
        ready: true,
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [reducedMotion]);

  return capabilities;
}
