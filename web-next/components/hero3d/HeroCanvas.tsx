"use client";

import { Canvas } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { Component, Suspense, type ReactNode, useEffect, useRef, useState } from "react";
import { StudioScene } from "./StudioScene";
import type { SceneQuality } from "./quality";

type HeroCanvasProps = {
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  pointerEnabled: boolean;
  quality: SceneQuality;
  onReady: () => void;
  onError: () => void;
};

class CanvasBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroCanvas({
  progress,
  pointerX,
  pointerY,
  pointerEnabled,
  quality,
  onReady,
  onError,
}: HeroCanvasProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const node = wrapper.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const dpr: [number, number] =
    quality === "high" ? [1, 1.65] : quality === "medium" ? [0.85, 1.25] : [0.75, 1];

  return (
    <CanvasBoundary onError={onError}>
      <div ref={wrapper} className="hero-canvas" aria-hidden>
        <Canvas
          dpr={dpr}
          frameloop={active ? "always" : "demand"}
          camera={{ fov: 42, near: 0.1, far: 30, position: [0, 0.1, 7.1] }}
          gl={{
            alpha: true,
            antialias: quality !== "low",
            powerPreference: quality === "low" ? "default" : "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            onReady();
          }}
        >
          <Suspense fallback={null}>
            <StudioScene
              progress={progress}
              pointerX={pointerX}
              pointerY={pointerY}
              pointerEnabled={pointerEnabled}
              quality={quality}
            />
          </Suspense>
        </Canvas>
      </div>
    </CanvasBoundary>
  );
}
