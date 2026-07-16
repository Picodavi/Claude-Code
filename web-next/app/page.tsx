// Placeholder de Fase 0: solo verifica que el sistema de diseño (tokens Montseny
// + fuentes propias) renderiza. El contenido real llega en la Fase 1.
export default function Home() {
  return (
    <main className="min-h-full flex items-center px-6 py-24">
      <div className="mx-auto w-full max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-800">
          Estudio web independiente · Catalunya
        </p>
        <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] text-ink sm:text-7xl">
          Diseño webs que <span className="text-pine">te hacen crecer.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Base técnica en marcha (Next.js + tema Montseny). El wow 3D viene en las
          siguientes fases.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <span className="rounded-full bg-pine px-6 py-3 font-medium text-white">
            Verde pino
          </span>
          <span className="rounded-full bg-gold px-6 py-3 font-medium text-ink">
            Oro
          </span>
          <span className="rounded-full border border-border bg-surface px-6 py-3 font-medium text-text">
            Blanco cálido
          </span>
        </div>
      </div>
    </main>
  );
}
