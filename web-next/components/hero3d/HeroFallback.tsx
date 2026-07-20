export function HeroFallback({ canvasReady = false }: { canvasReady?: boolean }) {
  return (
    <div aria-hidden className={`hero-fallback ${canvasReady ? "hero-fallback--canvas-ready" : ""}`}>
      <div className="hero-fallback__frame hero-fallback__frame--one" />
      <div className="hero-fallback__frame hero-fallback__frame--two" />
      <div className="hero-fallback__frame hero-fallback__frame--three" />
      <div className="hero-fallback__slash hero-fallback__slash--one" />
      <div className="hero-fallback__slash hero-fallback__slash--two" />
    </div>
  );
}
