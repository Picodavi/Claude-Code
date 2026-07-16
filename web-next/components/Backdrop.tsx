// Fondo ambiental animado (aurora pino/oro), fijo detrás de todo el contenido.
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden>
      <div className="backdrop__blob backdrop__blob--a" />
      <div className="backdrop__blob backdrop__blob--b" />
      <div className="backdrop__blob backdrop__blob--c" />
    </div>
  );
}
