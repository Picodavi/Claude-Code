// Fondo ambiental por capas (estático en DOM; GSAP mueve halo y atmósfera):
// malla cálida + capa pino (crossfade por scroll) + grid con perspectiva +
// halo de luz viajero + auroras lentas + grano premium.
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden>
      <div className="backdrop__mesh" />
      <div className="backdrop__mesh--pine" />
      <div className="backdrop__word">Webs que venden</div>
      <div className="backdrop__grid" />
      <div className="backdrop__grid2" />
      <div className="backdrop__beams" />
      <div className="backdrop__halo" />
      <div className="backdrop__blob backdrop__blob--a" />
      <div className="backdrop__blob backdrop__blob--b" />
      <div className="backdrop__blob backdrop__blob--c" />
      <div className="backdrop__grain" />
    </div>
  );
}
