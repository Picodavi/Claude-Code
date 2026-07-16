"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import { brand } from "@/content/i18n";

export function Footer() {
  const t = useT();
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-extrabold text-ink">
            Picodavi<span className="text-gold">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">{t("footer.tagline")}</p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-gold-800">
            {t("footer.contactTitle")}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-text">
            <li>
              <a className="hover:text-pine" href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
            </li>
            <li>
              <a className="hover:text-pine" href={`https://wa.me/${brand.whatsapp}`}>
                {brand.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-gold-800">
            {t("footer.areaTitle")}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-text">
            <li>{t("footer.area1")}</li>
            <li>{t("footer.area2")}</li>
            <li>{t("footer.area3")}</li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-gold-800">
            {t("footer.legalTitle")}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-text">
            <li>
              <Link className="hover:text-pine" href="/legal/aviso-legal/">
                {t("footer.legalAviso")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-pine" href="/legal/privacidad/">
                {t("footer.legalPriv")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-pine" href="/legal/cookies/">
                {t("footer.legalCookies")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 text-xs text-muted">
          <span>{t("footer.legal")}</span>
          <a href="#top" className="hover:text-pine">
            {t("footer.top")}
          </a>
        </div>
      </div>
    </footer>
  );
}
