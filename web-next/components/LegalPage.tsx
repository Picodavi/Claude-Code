"use client";

import Link from "next/link";
import { useLang, useT } from "@/lib/i18n";
import { legal, type LegalKey } from "@/content/legal";

export function LegalPage({ docKey }: { docKey: LegalKey }) {
  const { lang } = useLang();
  const t = useT();
  const doc = legal[docKey][lang] ?? legal[docKey].es;

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          prefetch={false}
          className="font-mono text-sm text-muted transition-colors hover:text-pine"
        >
          ← {t("dp.back")}
        </Link>

        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-gold-800">
          {doc.kicker}
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink">
          {doc.title}
        </h1>
        <p className="mt-2 text-sm text-muted">{doc.updated}</p>

        <div className="mt-8 space-y-5">
          {doc.blocks.map((b, i) => {
            switch (b.type) {
              case "box":
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-text"
                  >
                    {b.text}
                  </div>
                );
              case "h2":
                return (
                  <h2
                    key={i}
                    className="pt-4 font-display text-xl font-bold text-ink"
                  >
                    {b.text}
                  </h2>
                );
              case "p":
                return (
                  <p key={i} className="leading-relaxed text-text">
                    {b.text}
                  </p>
                );
              case "ul":
                return (
                  <ul
                    key={i}
                    className="list-disc space-y-2 pl-5 leading-relaxed text-text"
                  >
                    {b.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
            }
          })}
        </div>
      </div>
    </main>
  );
}
