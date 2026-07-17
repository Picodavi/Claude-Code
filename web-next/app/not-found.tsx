import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada · Picodavi",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold-800">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-5xl font-extrabold uppercase tracking-tight text-ink">
          Esta página no existe
        </h1>
        <p className="mt-4 text-muted">
          Puede que el enlace esté mal escrito o que la página se haya movido.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-pine px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pine-700"
        >
          Volver al inicio →
        </Link>
      </div>
    </main>
  );
}
