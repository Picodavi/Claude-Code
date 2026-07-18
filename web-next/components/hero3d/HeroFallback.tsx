export function HeroFallback({ canvasReady = false }: { canvasReady?: boolean }) {
  return (
    <div
      aria-hidden
      className={`hero-fallback ${canvasReady ? "hero-fallback--canvas-ready" : ""}`}
    >
      <div className="hero-fallback__orbit hero-fallback__orbit--one" />
      <div className="hero-fallback__orbit hero-fallback__orbit--two" />
      <div className="hero-fallback__glow" />
    </div>
  );
}
