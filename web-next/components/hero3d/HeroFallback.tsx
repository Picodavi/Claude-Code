export function HeroFallback({ canvasReady = false }: { canvasReady?: boolean }) {
  return (
    <div
      aria-hidden
      className={`hero-fallback ${canvasReady ? "hero-fallback--canvas-ready" : ""}`}
    >
      <div className="hero-fallback__orbit hero-fallback__orbit--one" />
      <div className="hero-fallback__orbit hero-fallback__orbit--two" />
      <div className="hero-fallback__glow" />
      <div className="hero-fallback__browser">
        <div className="hero-fallback__bar">
          <i />
          <i />
          <i />
          <span>tu-negocio.com</span>
        </div>
        <div className="hero-fallback__site">
          <div className="hero-fallback__site-nav" />
          <div className="hero-fallback__site-copy">
            <b />
            <b />
            <span />
          </div>
          <div className="hero-fallback__site-grid">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </div>
  );
}
